import { z } from 'zod/v4';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 5MB limit
const ACCEPTED_FILE_TYPES = [
	'image/jpeg', // Common for both platforms
	'image/png', // Common for both platforms (and screenshots)
	'image/webp', // Common modern format (often Android screenshots/exports)
	'image/heic', // High Efficiency Image File (iOS default)
	'image/heif', // High Efficiency Image File (related to HEIC)
	'application/pdf' // Document format, kept from original
];

export const edit = z.object({
	title: z.string().min(1, { message: 'Title Name is required.' }),
	slug: z.string('Slug cannot be empty. Please enter a slug.'),
	eventType: z.string('Event Type cannot be empty. Please select an Event Type.'),
	date: z.string('Event Date is Required').optional(),
	location: z.string('Event Date is Required').optional(),
	description: z.string().optional(),
	client: z.string().optional(),
	isFeaturedOnHome: z.boolean().default(false),
	image: z.file('Featured Image is required').max(10000000).optional()
});

export const editGallery = z.object({
	existing: z.string(),
	gallery: z.file().max(10000000).array().optional()
});

export type EditGallery = z.infer<typeof editGallery>;
