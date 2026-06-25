import { z } from 'zod/v4';

export const edit = z.object({
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
	image: z.file('Featured Image is required').max(10000000).optional()
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
