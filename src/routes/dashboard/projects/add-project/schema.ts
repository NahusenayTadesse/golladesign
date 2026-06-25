import { z } from 'zod/v4';

export const add = z.object({
	title: z.string('Title is required').min(2).max(100),
	slug: z.string('Slug is required').min(2).max(100),
	category: z.number('Category is required'),
	excerpt: z.string('Excerpt is required'),
	clientName: z.string('Client Name is required'),
	location: z.string('Location is required'),
	date: z.string('Completed At Date is required'),
	bluePrint: z.file('Blue Print is required').max(10000000).optional(),
	isFeatured: z.boolean('Is Featured is required').default(false),
	content: z.string('Long Description is required'),
	image: z.file('Featured Image is required').max(10000000),
	gallery: z.file('Featured Image is required').max(10000000).array().optional()
});
