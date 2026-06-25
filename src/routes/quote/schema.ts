import { z } from 'zod/v4';
const ethiopianPhoneRegex = /^(?:\+251|251|0)?([79]\d{8})$/;
export const contactSchema = z.object({
	serviceType: z.string('Service Type is Required'),
	name: z.string('Name is Required').min(2, 'Name must be at least 2 characters'),
	email: z.email('Email is required'),
	guestCount: z.number('Guest Count is Required'),
	eventDate: z.string('Date is Required'),
	eventLocation: z.string('Location is Required'),
	budgetRange: z.number('Budget Range is Required'),
	phone: z
		.string()
		.trim()
		.regex(ethiopianPhoneRegex, 'Invalid Ethiopian phone number')
		// Optional: Transform the input to a standardized format (e.g., +251...)
		.transform((val) => {
			const match = val.match(ethiopianPhoneRegex);
			const mainNumber = match?.[1];
			return `+251${mainNumber}`;
		}),
	description: z.string().optional()
});
