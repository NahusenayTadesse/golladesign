export const LANGS = ['en', 'am'] as const;
export type Lang = (typeof LANGS)[number];

/**
 * Picks the Amharic version of a field (`titleAm` for `title`) when the visitor
 * chose Amharic and a translation exists; otherwise the English value.
 */
export function tr<T extends Record<string, unknown>, K extends keyof T & string>(
	item: T | null | undefined,
	field: K,
	lang: Lang
): T[K] {
	if (!item) return undefined as T[K];
	if (lang === 'am') {
		const am = item[`${field}Am`];
		if (typeof am === 'string' && am.trim()) return am as T[K];
	}
	return item[field];
}
