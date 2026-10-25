import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { asc, eq } from 'drizzle-orm';

import {
	paymentMethod as schema,
	editPaymentMethod as editSchema,
	deleteTestimonial
} from './schema';
import { db } from '$lib/server/db';
import { teamMembers, user } from '$lib/server/db/schema';
import { deleteUploadedFiles, saveUploadedFile } from '$lib/server/upload';
import { orNull } from '$lib/server/forms';
import { logActivity } from '$lib/server/activity';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [form, editForm, deleteForm, rows] = await Promise.all([
		superValidate(zod4(schema)),
		superValidate(zod4(editSchema)),
		superValidate(zod4(deleteTestimonial)),
		db
			.select({
				id: teamMembers.id,
				name: teamMembers.name,
				position: teamMembers.position,
				positionAm: teamMembers.positionAm,
				testimonial: teamMembers.message,
				messageAm: teamMembers.messageAm,
				avatar: teamMembers.avatar,
				isActive: teamMembers.isActive,
				sortOrder: teamMembers.sortOrder,
				createdBy: user.name,
				createdById: teamMembers.createdBy
			})
			.from(teamMembers)
			.leftJoin(user, eq(user.id, teamMembers.createdBy))
			.orderBy(asc(teamMembers.sortOrder), asc(teamMembers.id))
	]);

	return { form, editForm, deleteForm, allPaymentMethods: rows };
};

type Data = typeof schema._zod.output;

const values = (d: Data) => ({
	name: d.name,
	position: orNull(d.position),
	positionAm: orNull(d.positionAm),
	message: d.testimonial,
	messageAm: orNull(d.messageAm),
	isActive: d.isActive ? 1 : 0,
	sortOrder: d.sortOrder
});

export const actions: Actions = {
	add: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(schema));
		if (!form.valid) {
			return message(
				form,
				{ type: 'error', text: 'Please check the form for errors' },
				{ status: 400 }
			);
		}

		try {
			const avatar = (await saveUploadedFile(form.data.avatar)) ?? null;
			const [{ id }] = await db
				.insert(teamMembers)
				.values({ ...values(form.data), avatar, createdBy: locals.user?.id })
				.$returningId();
			await logActivity(locals, 'create', 'team member', id, form.data.name);
			return message(form, { type: 'success', text: 'Team Member Successfully Created' });
		} catch (err) {
			console.error('Error creating team member:', err);
			return message(
				form,
				{ type: 'error', text: 'Error while creating team member.' },
				{ status: 500 }
			);
		}
	},

	edit: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(editSchema));
		if (!form.valid) return fail(400, { form });

		const { id } = form.data;
		try {
			const [existing] = await db.select().from(teamMembers).where(eq(teamMembers.id, id));
			// Keep the current photo unless a new one was uploaded.
			const avatar = await saveUploadedFile(form.data.avatar);
			await db
				.update(teamMembers)
				.set({ ...values(form.data), ...(avatar ? { avatar } : {}), updatedBy: locals.user?.id })
				.where(eq(teamMembers.id, id));
			if (avatar) await deleteUploadedFiles([existing?.avatar]);
			await logActivity(locals, 'update', 'team member', id, form.data.name);
			return message(form, { type: 'success', text: 'Team Member Successfully Updated' });
		} catch (err) {
			console.error('Error updating team member:', err);
			return message(
				form,
				{ type: 'error', text: 'Error while updating team member.' },
				{ status: 500 }
			);
		}
	},

	delete: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(deleteTestimonial));
		if (!form.valid) return fail(400, { form });

		try {
			const [existing] = await db
				.select()
				.from(teamMembers)
				.where(eq(teamMembers.id, form.data.id));
			await db.delete(teamMembers).where(eq(teamMembers.id, form.data.id));
			await deleteUploadedFiles([existing?.avatar]);
			await logActivity(locals, 'delete', 'team member', form.data.id, existing?.name);
			return message(form, { type: 'success', text: 'Team Member Successfully Deleted' });
		} catch (err) {
			console.error('Error deleting team member:', err);
			return message(
				form,
				{ type: 'error', text: 'Error while deleting team member.' },
				{ status: 500 }
			);
		}
	}
};
