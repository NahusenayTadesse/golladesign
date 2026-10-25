import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { desc, eq } from 'drizzle-orm';

import { deleteTestimonial, markRead } from './schema.js';
import { db } from '$lib/server/db';
import { contactMessages as paymentMethods, user } from '$lib/server/db/schema';
import { assigneeOptions, updateLead } from '$lib/server/leads';
import { logActivity } from '$lib/server/activity';
import type { Actions } from './$types.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
	const readForm = await superValidate(zod4(markRead));
	const deleteForm = await superValidate(zod4(deleteTestimonial));

	const allPaymentMethods = await db
		.select({
			id: paymentMethods.id,
			name: paymentMethods.name,
			email: paymentMethods.email,
			phone: paymentMethods.phone,
			subject: paymentMethods.subject,
			isRead: paymentMethods.seen,
			message: paymentMethods.message,
			status: paymentMethods.status,
			notes: paymentMethods.notes,
			assignedTo: paymentMethods.assignedTo,
			assignee: user.name,
			submittedAt: paymentMethods.createdAt
		})
		.from(paymentMethods)
		.leftJoin(user, eq(user.id, paymentMethods.assignedTo))
		.orderBy(desc(paymentMethods.createdAt));

	return {
		readForm,
		deleteForm,
		allPaymentMethods,
		users: await assigneeOptions()
	};
};

export const actions: Actions = {
	update: async ({ request, locals }) => updateLead('message', request, locals),

	read: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(deleteTestimonial));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			const [row] = await db.select().from(paymentMethods).where(eq(paymentMethods.id, id));
			await db
				.update(paymentMethods)
				.set({ seen: 1, ...(row?.status === 'new' ? { status: 'in_progress' as const } : {}) })
				.where(eq(paymentMethods.id, id));
			return message(form, { type: 'success', text: 'Message Successfully Marked as Read' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text: 'Error while marking message as read.'
				},
				{ status: 500 }
			);
		}
	},
	delete: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(deleteTestimonial));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			await db.delete(paymentMethods).where(eq(paymentMethods.id, id));
			await logActivity(locals, 'delete', 'contact message', id);
			return message(form, { type: 'success', text: 'Message Successfully Deleted' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text: 'Error while deleting message.'
				},
				{ status: 500 }
			);
		}
	}
};
