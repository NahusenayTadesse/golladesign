import { z } from 'zod/v4';

export const edit = z.object({
	name: z.string().min(1, { message: 'Name is required.' }),
	capacity: z.number().optional().nullable(),
	description: z.string().optional(),
	bookingPolicy: z.string().optional(),
	location: z.string().optional(),
	enableLottery: z.number().default(0),
	image: z.file('Featured Image is required').max(10000000).optional()
});

export const addFeature = z.object({
	name: z.string('Name of Feature is required').min(2).max(50),
	description: z.string('Description is required').min(2).max(100)
});

export type AddFeature = z.infer<typeof addFeature>;

export const editFeature = z.object({
	id: z.coerce.string(),
	name: z.string('Name of Featured is required').min(2).max(50),
	description: z.string('Description is required').min(2).max(100)
});

export type EditFeature = z.infer<typeof editFeature>;

export const editGallery = z.object({
	existing: z.string(),
	gallery: z.file().max(10000000).array().optional()
});

export type EditGallery = z.infer<typeof editGallery>;

export const deleteFeature = z.object({
	id: z.number()
});

export type DeleteFeature = z.infer<typeof deleteFeature>;
const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
export const addVideo = z.object({
	videoUrl: z.url('Enter a valid YouTube URL').regex(youtubeRegex, 'Only YouTube URLs are allowed')
});

export type AddVideo = z.infer<typeof addVideo>;
export const editVideo = z.object({
	id: z.coerce.number(),
	videoUrl: z.url('Enter a valid YouTube URL').regex(youtubeRegex, 'Only YouTube URLs are allowed')
});

export type EditVideo = z.infer<typeof editVideo>;
