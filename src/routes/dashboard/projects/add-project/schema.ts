import { z } from 'zod/v4';
import { projectFields } from '../projectFields';

export const add = z.object({
	...projectFields,
	image: z.file('Featured Image is required').max(10000000),
	gallery: z.file().max(10000000).array().optional()
});
