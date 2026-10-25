import { z } from 'zod/v4';
import { projectTypes } from '$lib/enums';
import { amharicShape, contentMetaShape } from '$lib/schemas/content';

const optionalInt = (max: number) =>
	z.preprocess(
		(v) => (v === '' || v === null || v === undefined ? undefined : v),
		z.coerce.number().int().min(0).max(max).optional()
	);

/** Fields shared by the add and edit project forms. */
export const projectFields = {
	title: z.string('Title is required').min(2).max(200),
	slug: z.string().trim().max(200).optional(),
	category: z.number('Category is required'),
	serviceId: z.string().optional(),
	excerpt: z.string('Excerpt is required'),
	clientName: z.string().max(255).optional(),
	location: z.string().max(255).optional(),
	projectType: z.enum(projectTypes).optional(),
	areaSqm: optionalInt(10_000_000),
	floors: optionalInt(500),
	yearCompleted: optionalInt(2200),
	duration: z.string().max(100).optional(),
	date: z.string('Completion date is required'),
	bluePrint: z.file().max(10000000).optional(),
	content: z.string('Content is required'),
	...contentMetaShape,
	...amharicShape(['title', 'excerpt', 'content'] as const)
};
