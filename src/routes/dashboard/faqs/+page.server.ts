import { fail } from '@sveltejs/kit';
import { asc, eq } from 'drizzle-orm';
import { z } from 'zod/v4';
import { db } from '$lib/server/db';
import { faqs } from '$lib/server/db/schema';
import { orNull } from '$lib/server/forms';
import { logActivity } from '$lib/server/activity';
import type { Actions, PageServerLoad } from './$types';

const faqSchema = z.object({
	question: z.string().trim().min(3, 'Question is required').max(255),
	answer: z.string().trim().min(3, 'Answer is required').max(5000),
	questionAm: z.string().max(255).optional(),
	answerAm: z.string().max(5000).optional(),
	sortOrder: z.coerce.number().int().min(0).default(0),
	// Unchecked checkboxes are absent from the form data.
	isActive: z.preprocess((v) => v === 'on' || v === 'true', z.boolean())
});

async function parse(request: Request) {
	const data = Object.fromEntries(await request.formData());
	return { id: Number(data.id), result: faqSchema.safeParse(data) };
}

const values = (d: z.infer<typeof faqSchema>) => ({
	question: d.question,
	answer: d.answer,
	questionAm: orNull(d.questionAm),
	answerAm: orNull(d.answerAm),
	sortOrder: d.sortOrder,
	isActive: d.isActive
});

export const load: PageServerLoad = async () => ({
	faqs: await db.select().from(faqs).orderBy(asc(faqs.sortOrder), asc(faqs.id))
});

export const actions: Actions = {
	add: async ({ request, locals }) => {
		const { result } = await parse(request);
		if (!result.success) return fail(400, { error: result.error.issues[0]?.message });
		const [{ id }] = await db
			.insert(faqs)
			.values({ ...values(result.data), createdBy: locals.user?.id })
			.$returningId();
		await logActivity(locals, 'create', 'faq', id, result.data.question);
		return { ok: true };
	},

	update: async ({ request, locals }) => {
		const { id, result } = await parse(request);
		if (!id || !result.success)
			return fail(400, { error: result.success ? 'Missing ID' : result.error.issues[0]?.message });
		await db
			.update(faqs)
			.set({ ...values(result.data), updatedBy: locals.user?.id })
			.where(eq(faqs.id, id));
		await logActivity(locals, 'update', 'faq', id, result.data.question);
		return { ok: true };
	},

	delete: async ({ request, locals }) => {
		const id = Number((await request.formData()).get('id'));
		if (!id) return fail(400, { error: 'Missing ID' });
		await db.delete(faqs).where(eq(faqs.id, id));
		await logActivity(locals, 'delete', 'faq', id);
		return { ok: true };
	}
};
