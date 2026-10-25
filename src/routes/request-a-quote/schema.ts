import { z } from 'zod/v4';

const ethiopianPhoneRegex = /^(?:\+251|251|0)?([79]\d{8})$/;

export const quoteSchema = z.object({
	name: z.string('Name is required').trim().min(2, 'Name must be at least 2 characters'),
	email: z.email('A valid email is required'),
	phone: z
		.string()
		.trim()
		.regex(ethiopianPhoneRegex, 'Invalid Ethiopian phone number')
		.transform((val) => `+251${val.match(ethiopianPhoneRegex)?.[1]}`),
	serviceId: z.string().optional(),
	location: z.string().trim().max(255).optional(),
	plotSize: z.string().trim().max(100).optional(),
	budgetRange: z.string().max(100).optional(),
	timeline: z.string().max(100).optional(),
	description: z.string().trim().max(5000).optional()
});
