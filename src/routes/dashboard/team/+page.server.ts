import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';

import {
	paymentMethod as schema,
	editPaymentMethod as editSchema,
	deleteTestimonial
} from './schema.js';
import { db } from '$lib/server/db';
import { teamMembers as paymentMethods, user } from '$lib/server/db/schema';
import type { PageServerLoad, Actions } from './$types.js';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(schema));
	const editForm = await superValidate(zod4(editSchema));
	const deleteForm = await superValidate(zod4(deleteTestimonial));

	const allPaymentMethods = await db
		.select({
			id: paymentMethods.id,
			name: paymentMethods.name,
			position: paymentMethods.position,
			testimonial: paymentMethods.message,
			avatar: paymentMethods.avatar,
			createdBy: user.name,
			createdById: paymentMethods.createdBy
		})
		.from(paymentMethods)
		.leftJoin(user, eq(user.id, paymentMethods.createdBy));

	return {
		form,
		editForm,
		deleteForm,
		allPaymentMethods
	};
};

import { saveUploadedFile } from '$lib/server/upload';

export const actions: Actions = {
	add: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(schema));

		if (!form.valid) {
			return message(
				form,
				{ type: 'error', text: 'Please check the form for Errors' },
				{ status: 400 }
			);
		}

		const { name, position, testimonial, avatar } = form.data;

		try {
			const avatarFile = await saveUploadedFile(avatar);
			await db.insert(paymentMethods).values({
				name,
				position,
				message: testimonial,
				avatar: avatarFile,
				createdBy: locals.user?.id
			});

			return message(form, { type: 'success', text: 'Team Member Successfully Created' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text: 'Error while creating Team Member.'
				},
				{ status: 500 }
			);
		}
	},
	edit: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(editSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id, name, position, testimonial, avatar } = form.data;

		try {
			const avatarFile = await saveUploadedFile(avatar);
			await db
				.update(paymentMethods)
				.set({
					name,
					position,
					message: testimonial,
					avatar: avatarFile,
					updatedBy: locals?.user?.id
				})
				.where(eq(paymentMethods.id, id));
			return message(form, { type: 'success', text: 'Team Member Successfully Updated' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text: 'Error while updating Team Member.'
				},
				{ status: 500 }
			);
		}
	},
	delete: async ({ request }) => {
		const form = await superValidate(request, zod4(deleteTestimonial));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			await db.delete(paymentMethods).where(eq(paymentMethods.id, id));
			return message(form, { type: 'success', text: 'Team Member Successfully Deleted' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text: 'Error while deleting Team Member.'
				},
				{ status: 500 }
			);
		}
	}
};
