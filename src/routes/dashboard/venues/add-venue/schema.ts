import { z } from 'zod/v4';

export const add = z.object({
	name: z.string().min(1, { message: 'Name is required.' }),
	capacity: z.number().optional(),
	description: z.string().optional(),
	bookingPolicy: z.string().optional(),
	location: z.string().optional(),
	image: z.file('Featured Image is required').max(10000000),
	gallery: z.file().max(10000000).array().optional(),
	enableLottery: z.number().default(0)
});
