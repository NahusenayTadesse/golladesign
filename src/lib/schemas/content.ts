import { z } from 'zod/v4';
import { publishStatuses } from '$lib/enums';

const optionalText = (max: number) => z.string().trim().max(max).optional().nullable();

/** Publishing, ordering and SEO fields shared by blogs, projects and services. */
export const contentMetaShape = {
	status: z.enum(publishStatuses).default('published'),
	sortOrder: z.coerce.number().int().min(0).max(100000).default(0),
	isFeatured: z.boolean().default(false),
	metaTitle: optionalText(255),
	metaDescription: optionalText(500),
	ogImageFile: z.file().max(10_000_000).optional()
};

/** Builds `<field>Am` optional fields for the Amharic translation. */
export const amharicShape = <const K extends string>(fields: readonly K[], max = 20000) =>
	Object.fromEntries(fields.map((f) => [`${f}Am`, optionalText(max)])) as {
		[P in `${K}Am`]: ReturnType<typeof optionalText>;
	};

/** One row of the image details editor. */
export const imageMetaSchema = z.object({
	items: z
		.array(
			z.object({
				id: z.coerce.number().int(),
				altText: optionalText(255),
				caption: optionalText(255),
				sortOrder: z.coerce.number().int().min(0).max(100000).default(0)
			})
		)
		.max(500)
});
