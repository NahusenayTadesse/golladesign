import { z } from 'zod/v4';

export const add = z.object({
	title: z.string().min(1, { message: 'Title Name is required.' }),
	slug: z.string('Slug cannot be empty. Please enter a slug.'),
	eventType: z.string('Event Type cannot be empty. Please select an Event Type.'),
	client: z.string().optional(),
	date: z.string('Event Date is Required').optional(),
	location: z.string('Event Date is Required').optional(),
	description: z.string().optional(),
	isFeaturedOnHome: z.boolean().default(false),
	image: z.file('Featured Image is required').max(10000000),
	gallery: z.file().max(10000000).array().optional()
});
