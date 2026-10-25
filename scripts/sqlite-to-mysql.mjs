// Copies every row from the old SQLite database into the MySQL database.
//
// Usage:
//   DATABASE_URL="mysql://user:pass@host:3306/db" node scripts/sqlite-to-mysql.mjs path/to/local.db
//
// The MySQL schema must already exist (run `npm run db:migrate` first).
// Tables with rows in SQLite are emptied and refilled, so the script can be re-run safely.
// Tables that are empty in SQLite are left alone, which keeps the seeded permissions and FAQs.
import { DatabaseSync } from 'node:sqlite';
import mysql from 'mysql2/promise';

const sqlitePath = process.argv[2];
const url = process.env.DATABASE_URL;

if (!sqlitePath || !url) {
	console.error('Usage: DATABASE_URL="mysql://..." node scripts/sqlite-to-mysql.mjs <sqlite.db>');
	process.exit(1);
}

const SKIP = new Set(['__drizzle_migrations', 'sqlite_sequence']);

const sqlite = new DatabaseSync(sqlitePath, { readOnly: true });
const conn = await mysql.createConnection({ uri: url, timezone: 'Z' });
const [[{ dbName }]] = await conn.query('SELECT DATABASE() AS dbName');

/** MySQL column name -> data type, per table. */
const [colRows] = await conn.query(
	'SELECT TABLE_NAME AS t, COLUMN_NAME AS c, DATA_TYPE AS type FROM information_schema.COLUMNS WHERE TABLE_SCHEMA = ?',
	[dbName]
);
const mysqlColumns = new Map();
for (const { t, c, type } of colRows) {
	if (!mysqlColumns.has(t)) mysqlColumns.set(t, new Map());
	mysqlColumns.get(t).set(c, type);
}

/** SQLite stored drizzle `mode: 'timestamp'` columns as unix seconds. */
function convert(value, type) {
	if (value === null || value === undefined) return null;
	if (type === 'datetime' || type === 'timestamp') {
		if (typeof value === 'number' || typeof value === 'bigint') {
			const n = Number(value);
			return new Date(n > 1e12 ? n : n * 1000);
		}
		return new Date(value);
	}
	if (typeof value === 'bigint') return Number(value);
	return value;
}

const tables = sqlite
	.prepare("SELECT name FROM sqlite_master WHERE type = 'table' ORDER BY name")
	.all()
	.map((r) => r.name)
	.filter((name) => !SKIP.has(name));

/** Data the new MySQL schema needs that SQLite didn't have. */
async function fixUp() {
	// Child rows whose parent was deleted (SQLite had no foreign keys).
	const orphans = [
		['service_gallery', 'service_id', 'services'],
		['project_images', 'project_id', 'projects'],
		['project_videos', 'project_id', 'projects'],
		['blog_gallery', 'blog_id', 'blog'],
		['blog_videos', 'blog_id', 'blog'],
		['session', 'user_id', 'user'],
		['account', 'user_id', 'user']
	];
	for (const [child, col, parent] of orphans) {
		const [res] = await conn.query(
			`DELETE c FROM \`${child}\` c LEFT JOIN \`${parent}\` p ON p.id = c.\`${col}\` WHERE p.id IS NULL`
		);
		if (res.affectedRows) console.log(`  removed ${res.affectedRows} orphaned ${child} rows`);
	}
	await conn.query(
		'UPDATE blog SET category_id = NULL WHERE category_id NOT IN (SELECT id FROM blog_categories)'
	);
	await conn.query('UPDATE `user` SET role_id = NULL WHERE role_id NOT IN (SELECT id FROM roles)');

	// The dashboard stored the publish date in created_at.
	await conn.query('UPDATE blog SET published_at = created_at WHERE published_at IS NULL');
	// "draft" was the column default but drafts were never hidden, so every project was live.
	await conn.query("UPDATE projects SET status = 'published' WHERE status = 'draft'");
	// Read messages become "in progress" in the new pipeline.
	await conn.query(
		"UPDATE contact_messages SET status = 'in_progress' WHERE seen = 1 AND status = 'new'"
	);
}

/** Per-table row changes applied before inserting. */
const transform = {
	// Services had no slug; derive a unique one from the name.
	services(rows) {
		const used = new Set();
		for (const row of rows) {
			let slug = row.slug || slugify(row.name) || `service-${row.id}`;
			if (used.has(slug)) slug = `${slug}-${row.id}`;
			used.add(slug);
			row.slug = slug;
		}
	}
};

function slugify(text) {
	return String(text)
		.toLowerCase()
		.replace(/&/g, ' and ')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

await conn.query('SET FOREIGN_KEY_CHECKS = 0');
await conn.beginTransaction();

let failed = false;
try {
	for (const table of tables) {
		const target = mysqlColumns.get(table);
		if (!target) {
			console.warn(`! ${table}: not in MySQL schema, skipped`);
			continue;
		}

		const rows = sqlite.prepare(`SELECT * FROM "${table}"`).all();
		if (rows.length === 0) {
			console.log(`  ${table}: 0 rows, left as is`);
			continue;
		}
		await conn.query(`DELETE FROM \`${table}\``);

		transform[table]?.(rows);
		const columns = Object.keys(rows[0]).filter((c) => target.has(c));
		const dropped = Object.keys(rows[0]).filter((c) => !target.has(c));
		if (dropped.length) console.warn(`! ${table}: columns not in MySQL, dropped: ${dropped}`);

		const values = rows.map((row) => columns.map((c) => convert(row[c], target.get(c))));
		const columnList = columns.map((c) => `\`${c}\``).join(', ');
		await conn.query(`INSERT INTO \`${table}\` (${columnList}) VALUES ?`, [values]);

		const [[{ n }]] = await conn.query(`SELECT COUNT(*) AS n FROM \`${table}\``);
		if (n !== rows.length) throw new Error(`${table}: copied ${n} of ${rows.length} rows`);
		console.log(`  ${table}: ${n} rows`);
	}
	await fixUp();
	await conn.commit();
	console.log(`Done. Copied ${tables.length} tables into ${dbName}.`);
} catch (err) {
	failed = true;
	await conn.rollback();
	console.error('Migration failed, nothing was written:', err.message);
} finally {
	await conn.query('SET FOREIGN_KEY_CHECKS = 1');
	await conn.end();
	sqlite.close();
}

process.exit(failed ? 1 : 0);
