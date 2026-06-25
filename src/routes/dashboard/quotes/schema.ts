import { z } from 'zod/v4';

export const markRead = z.object({
	id: z.coerce.number()
});

export type MarkRead = z.infer<typeof markRead>;

export const deleteTestimonial = z.object({
	id: z.coerce.number()
});

export type DeleteTestimonial = z.infer<typeof deleteTestimonial>;

export const schema = z.object({
	name: z.string('Name is required'),
	email: z.email('Email is required'),
	subject: z.string('Subject is required'),
	emailMessage: z.string('Message is required').nonempty('Message is required')
});

export type EmailSchema = z.infer<typeof schema>;
