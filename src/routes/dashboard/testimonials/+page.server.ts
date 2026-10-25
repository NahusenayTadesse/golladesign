import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { asc, eq } from 'drizzle-orm';

import {
	paymentMethod as schema,
	editPaymentMethod as editSchema,
	deleteTestimonial
} from './schema';
import { db } from '$lib/server/db';
import { projects, testimonials, user } from '$lib/server/db/schema';
import { deleteUploadedFiles, saveUploadedFile } from '$lib/server/upload';
import { orNull } from '$lib/server/forms';
import { logActivity } from '$lib/server/activity';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [form, editForm, deleteForm, rows, projectRows] = await Promise.all([
		superValidate(zod4(schema)),
		superValidate(zod4(editSchema)),
		superValidate(zod4(deleteTestimonial)),
		db
			.select({
				id: testimonials.id,
				name: testimonials.name,
				position: testimonials.position,
				clientCompany: testimonials.clientCompany,
				testimonial: testimonials.message,
				messageAm: testimonials.messageAm,
				avatar: testimonials.avatar,
				rating: testimonials.rating,
				projectId: testimonials.projectId,
				project: projects.title,
				isActive: testimonials.isActive,
				isFeatured: testimonials.isFeatured,
				sortOrder: testimonials.sortOrder,
				createdBy: user.name,
				createdById: testimonials.createdBy
			})
			.from(testimonials)
			.leftJoin(user, eq(user.id, testimonials.createdBy))
			.leftJoin(projects, eq(projects.id, testimonials.projectId))
			.orderBy(asc(testimonials.sortOrder), asc(testimonials.id)),
		db
			.select({ id: projects.id, title: projects.title })
			.from(projects)
			.orderBy(asc(projects.title))
	]);

	return {
		form,
		editForm,
		deleteForm,
		allPaymentMethods: rows,
		projectOptions: projectRows.map((p) => ({ value: String(p.id), name: p.title }))
	};
};

type Data = typeof schema._zod.output;

const values = (d: Data) => ({
	name: d.name,
	position: orNull(d.position),
	clientCompany: orNull(d.clientCompany),
	message: d.testimonial,
	messageAm: orNull(d.messageAm),
	rating: d.rating ?? null,
	projectId: d.projectId && /^\d+$/.test(d.projectId) ? Number(d.projectId) : null,
	isActive: d.isActive ? 1 : 0,
	isFeatured: d.isFeatured,
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
				.insert(testimonials)
				.values({ ...values(form.data), avatar, createdBy: locals.user?.id })
				.$returningId();
			await logActivity(locals, 'create', 'testimonial', id, form.data.name);
			return message(form, { type: 'success', text: 'Testimonial Successfully Created' });
		} catch (err) {
			console.error('Error creating testimonial:', err);
			return message(
				form,
				{ type: 'error', text: 'Error while creating testimonial.' },
				{ status: 500 }
			);
		}
	},

	edit: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(editSchema));
		if (!form.valid) return fail(400, { form });

		const { id } = form.data;
		try {
			const [existing] = await db.select().from(testimonials).where(eq(testimonials.id, id));
			// Keep the current photo unless a new one was uploaded.
			const avatar = await saveUploadedFile(form.data.avatar);
			await db
				.update(testimonials)
				.set({ ...values(form.data), ...(avatar ? { avatar } : {}), updatedBy: locals.user?.id })
				.where(eq(testimonials.id, id));
			if (avatar) await deleteUploadedFiles([existing?.avatar]);
			await logActivity(locals, 'update', 'testimonial', id, form.data.name);
			return message(form, { type: 'success', text: 'Testimonial Successfully Updated' });
		} catch (err) {
			console.error('Error updating testimonial:', err);
			return message(
				form,
				{ type: 'error', text: 'Error while updating testimonial.' },
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
				.from(testimonials)
				.where(eq(testimonials.id, form.data.id));
			await db.delete(testimonials).where(eq(testimonials.id, form.data.id));
			await deleteUploadedFiles([existing?.avatar]);
			await logActivity(locals, 'delete', 'testimonial', form.data.id, existing?.name);
			return message(form, { type: 'success', text: 'Testimonial Successfully Deleted' });
		} catch (err) {
			console.error('Error deleting testimonial:', err);
			return message(
				form,
				{ type: 'error', text: 'Error while deleting testimonial.' },
				{ status: 500 }
			);
		}
	}
};
