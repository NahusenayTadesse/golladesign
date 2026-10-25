import { z } from 'zod/v4';
import { projectFields } from '../../projectFields';

export const edit = z.object({
	...projectFields,
	image: z.file('Featured Image is required').max(10000000).optional()
});

export const addBeforeAfter = z.object({
	before: z.file('Before image is required').max(10000000),
	after: z.file('After image is required').max(10000000),
	caption: z.string().max(255).optional()
});

export const deleteBeforeAfter = z.object({ id: z.coerce.number().int() });

export const editGallery = z.object({
	existing: z.string(),
	gallery: z.file().max(10000000).array().optional()
});

export type EditGallery = z.infer<typeof editGallery>;

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

export const deleteFeature = z.object({
	id: z.number()
});

export type DeleteFeature = z.infer<typeof deleteFeature>;
