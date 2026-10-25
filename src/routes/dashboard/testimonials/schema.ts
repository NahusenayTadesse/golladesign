import { z } from 'zod/v4';

const fields = {
	name: z.string('Name is required').trim().min(2).max(100),
	position: z.string().max(255).optional(),
	clientCompany: z.string().max(255).optional(),
	testimonial: z.string('Testimonial is required').min(2),
	rating: z.preprocess(
		(v) => (v === '' || v == null ? undefined : v),
		z.coerce.number().int().min(1).max(5).optional()
	),
	projectId: z.string().optional(),
	isActive: z.boolean().default(true),
	isFeatured: z.boolean().default(false),
	sortOrder: z.coerce.number().int().min(0).default(0),
	messageAm: z.string().optional(),
	avatar: z.file().max(10000000).optional()
};

export const paymentMethod = z.object(fields);

export const editPaymentMethod = z.object({ id: z.coerce.number(), ...fields });

export type EditPaymentMethod = z.infer<typeof editPaymentMethod>;

export const deleteTestimonial = z.object({
	id: z.coerce.number()
});

export type DeleteTestimonial = z.infer<typeof deleteTestimonial>;
