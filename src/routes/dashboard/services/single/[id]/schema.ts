import { z } from 'zod/v4';
import { amharicShape, contentMetaShape } from '$lib/schemas/content';

export const edit = z.object({
	name: z.string('Name is required').trim().min(2).max(100),
	slug: z.string().trim().max(255).optional(),
	description: z.string('Description is required').min(2).max(300),
	longDescription: z.string('Long Description is required'),
	image: z.file('Featured Image is required').max(10000000).optional(),
	...contentMetaShape,
	...amharicShape(['name', 'description', 'longDescription'] as const)
});

export const editGallery = z.object({
	existing: z.string(),
	gallery: z.file().max(10000000).array().optional()
});

export type EditGallery = z.infer<typeof editGallery>;
