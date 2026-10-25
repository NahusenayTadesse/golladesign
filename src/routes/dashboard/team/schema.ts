import { z } from 'zod/v4';

const fields = {
	name: z.string('Name is required').trim().min(2).max(100),
	position: z.string().max(255).optional(),
	testimonial: z.string('Description is required').min(2),
	positionAm: z.string().max(255).optional(),
	messageAm: z.string().optional(),
	isActive: z.boolean().default(true),
	sortOrder: z.coerce.number().int().min(0).default(0),
	avatar: z.file().max(10000000).optional()
};

export const paymentMethod = z.object(fields);

export const editPaymentMethod = z.object({ id: z.coerce.number(), ...fields });

export type EditPaymentMethod = z.infer<typeof editPaymentMethod>;

export const deleteTestimonial = z.object({
	id: z.coerce.number()
});

export type DeleteTestimonial = z.infer<typeof deleteTestimonial>;
