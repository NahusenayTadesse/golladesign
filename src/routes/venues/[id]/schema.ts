import { z } from 'zod/v4';

export const schema = z.object({
	name: z.string('Name is required'),
	phone: z.string('Phone is required'),
	email: z.email('Email is required')
});

export type Lottery = z.infer<typeof schema>;
