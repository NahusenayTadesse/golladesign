import { and, eq, type Column } from 'drizzle-orm';
import type { MySqlTable } from 'drizzle-orm/mysql-core';
import { db } from '$lib/server/db';
import { saveUploadedFile } from '$lib/server/upload';

/** Empty strings from forms become NULL. */
export const orNull = (v: string | null | undefined) => (v && v.trim() ? v.trim() : null);

/** Turns the shared publishing/SEO form fields into column values. */
export async function contentMetaValues(data: {
	status: 'draft' | 'published' | 'archived';
	sortOrder: number;
	isFeatured: boolean;
	metaTitle?: string | null;
	metaDescription?: string | null;
	ogImageFile?: File;
}) {
	const ogImage = await saveUploadedFile(data.ogImageFile);
	return {
		status: data.status,
		sortOrder: data.sortOrder,
		isFeatured: data.isFeatured,
		metaTitle: orNull(data.metaTitle),
		metaDescription: orNull(data.metaDescription),
		...(ogImage ? { ogImage } : {})
	};
}

/** Copies `<field>Am` values, turning blanks into NULL. */
export function amharicValues<T extends Record<string, unknown>>(data: T) {
	return Object.fromEntries(
		Object.entries(data)
			.filter(([k]) => k.endsWith('Am'))
			.map(([k, v]) => [k, orNull(v as string | null | undefined)])
	);
}

type ImageTable = MySqlTable & {
	id: Column;
	altText: Column;
	caption: Column;
	sortOrder: Column;
};

/** Saves alt text, caption and order for images that belong to `parentId`. */
export async function saveImageMeta(
	table: ImageTable,
	parentColumn: Column | null,
	parentId: number | null,
	items: { id: number; altText?: string | null; caption?: string | null; sortOrder: number }[]
) {
	await db.transaction(async (tx) => {
		for (const item of items) {
			const where = parentColumn
				? and(eq(table.id, item.id), eq(parentColumn, parentId))
				: eq(table.id, item.id);
			await tx
				.update(table)
				.set({
					altText: orNull(item.altText),
					caption: orNull(item.caption),
					sortOrder: item.sortOrder
				} as never)
				.where(where);
		}
	});
}

/** URL-safe slug. */
export function slugify(text: string) {
	return text
		.toLowerCase()
		.replace(/&/g, ' and ')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

/** A slug based on `text` that no other row uses (ignoring `excludeId`). */
export async function uniqueSlug(
	table: MySqlTable & { id: Column; slug: Column },
	text: string,
	excludeId?: number
) {
	const base = slugify(text) || 'item';
	for (let n = 1; ; n++) {
		const candidate = n === 1 ? base : `${base}-${n}`;
		const [row] = (await db
			.select({ id: table.id as never })
			.from(table as MySqlTable)
			.where(eq(table.slug, candidate))
			.limit(1)) as { id: number }[];
		if (!row || row.id === excludeId) return candidate;
	}
}
