import { sql } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { siteSettings } from '$lib/server/db/schema';
import { withDefaults, type SettingsMap } from '$lib/settings';

// Settings are read on every public page; cache them briefly.
let cache: { value: SettingsMap; at: number } | null = null;
const TTL = 60_000;

export async function getSettings(): Promise<SettingsMap> {
	if (cache && Date.now() - cache.at < TTL) return cache.value;
	const rows = await db.select().from(siteSettings);
	const value = withDefaults(Object.fromEntries(rows.map((r) => [r.key, r.value])));
	cache = { value, at: Date.now() };
	return value;
}

export async function saveSettings(values: Partial<SettingsMap>, userId?: string) {
	const entries = Object.entries(values).filter(([, v]) => v !== undefined);
	if (entries.length) {
		await db
			.insert(siteSettings)
			.values(entries.map(([key, value]) => ({ key, value: value ?? '', updatedBy: userId })))
			.onDuplicateKeyUpdate({
				set: { value: sql`VALUES(\`value\`)`, updatedBy: userId, updatedAt: new Date() }
			});
	}
	cache = null;
}
