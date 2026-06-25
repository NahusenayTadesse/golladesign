import { z } from 'zod/v4';

export const edit = z.object({
	name: z.string('Name of Payment Method is required').min(2).max(50),
	description: z.string('Description is required').min(2).max(100),
	longDescription: z.string('Long Description is required'),
	image: z.file('Featured Image is required').max(10000000).optional()
});

export const editGallery = z.object({
	existing: z.string(),
	gallery: z.file().max(10000000).array().optional()
});

export type EditGallery = z.infer<typeof editGallery>;
