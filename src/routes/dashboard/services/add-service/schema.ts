import { z } from 'zod/v4';
import { amharicShape, contentMetaShape } from '$lib/schemas/content';

export const add = z.object({
	name: z.string('Name is required').trim().min(2).max(100),
	slug: z.string().trim().max(255).optional(),
	description: z.string('Description is required').min(2).max(300),
	longDescription: z.string('Long Description is required'),
	image: z.file('Featured Image is required').max(10000000),
	gallery: z.file().max(10000000).array().optional(),
	...contentMetaShape,
	...amharicShape(['name', 'description', 'longDescription'] as const)
});
