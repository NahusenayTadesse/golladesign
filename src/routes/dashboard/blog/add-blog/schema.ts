import { z } from 'zod/v4';
import { amharicShape, contentMetaShape } from '$lib/schemas/content';

export const add = z.object({
	title: z.string('Title is required').min(2).max(200),
	slug: z.string().trim().max(200).optional(),
	category: z.number('Category is required'),
	excerpt: z.string('Excerpt is required'),
	date: z.string('Publish date is required'),
	content: z.string('Content is required'),
	image: z.file('Featured Image is required').max(10000000),
	gallery: z.file().max(10000000).array().optional(),
	...contentMetaShape,
	...amharicShape(['title', 'excerpt', 'content'] as const)
});
