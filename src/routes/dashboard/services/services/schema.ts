import { z } from 'zod/v4';

export const add = z.object({
	name: z.string('Name of Payment Method is required').min(2).max(50),
	description: z.string('Description is required').min(2).max(100),
	longDescription: z.string('Long Description is required').min(2).max(100),
	featuredImage: z.file('Featured Image is required').max(10000000),
	gallery: z.file('Featured Image is required').max(10000000).array().optional()
});

export const edit = z.object({
	id: z.coerce.string(),
	name: z.string('Name of Payment Method is required').min(2).max(50),
	description: z.string('Description is required').min(2).max(100),
	longDescription: z.string('Long Description is required').min(2).max(100),
	featuredImage: z.file('Featured Image is required').max(10000000).optional(),
	gallery: z.file('Featured Image is required').max(10000000).array().optional()
});
export type Edit = z.infer<typeof edit>;

export const deleteService = z.object({
	id: z.coerce.number()
});

export type DeleteService = z.infer<typeof deleteService>;
