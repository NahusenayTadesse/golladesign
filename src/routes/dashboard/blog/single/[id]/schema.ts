import { z } from 'zod/v4';
import { amharicShape, contentMetaShape } from '$lib/schemas/content';

export const edit = z.object({
	title: z.string('Title is required').min(2).max(200),
	slug: z.string().trim().max(200).optional(),
	category: z.number('Category is required'),
	excerpt: z.string('Excerpt is required'),
	date: z.string('Publish date is required'),
	content: z.string('Content is required'),
	image: z.file('Featured Image is required').max(10000000).optional(),
	...contentMetaShape,
	...amharicShape(['title', 'excerpt', 'content'] as const)
});

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
