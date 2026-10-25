import { superValidate, fail, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';
import { redirect, setFlash } from 'sveltekit-flash-message/server';

import { edit, editGallery } from './schema';
import { db } from '$lib/server/db';
import { services, serviceGallery } from '$lib/server/db/schema';
import { deleteUploadedFiles, saveUploadedFile, uploadGallery } from '$lib/server/upload';
import { amharicValues, contentMetaValues, uniqueSlug } from '$lib/server/forms';
import { imageMetaAction } from '$lib/server/imageMeta';
import { logActivity } from '$lib/server/activity';
import type { Actions } from './$types';

const getService = (id: number) =>
	db
		.select()
		.from(services)
		.where(eq(services.id, id))
		.then((r) => r[0]);

export const actions: Actions = {
	editProduct: async ({ request, locals, params }) => {
		const id = Number(params.id);
		const form = await superValidate(request, zod4(edit));
		if (!form.valid) {
			return message(
				form,
				{ type: 'error', text: 'Please check your form data.' },
				{ status: 400 }
			);
		}

		const { name, slug, image, description, longDescription } = form.data;

		try {
			const existing = await getService(id);
			if (!existing)
				return message(form, { type: 'error', text: 'Service not found' }, { status: 404 });

			const featuredImage = await saveUploadedFile(image);
			const meta = await contentMetaValues(form.data);

			await db
				.update(services)
				.set({
					name,
					slug: await uniqueSlug(services, slug || name, id),
					description,
					longDescription,
					...(featuredImage ? { featuredImage } : {}),
					...meta,
					...amharicValues(form.data),
					updatedBy: locals.user?.id
				})
				.where(eq(services.id, id));

			// Remove the files that were just replaced.
			await deleteUploadedFiles([
				featuredImage ? existing.featuredImage : null,
				meta.ogImage ? existing.ogImage : null
			]);
			await logActivity(locals, 'update', 'service', id, name);

			return message(form, { type: 'success', text: 'Service Updated Successfully' });
		} catch (err) {
			console.error('Error updating service:', err);
			return message(form, { type: 'error', text: 'Service update failed' }, { status: 500 });
		}
	},

	delete: async ({ cookies, params, locals }) => {
		const id = Number(params.id);
		if (!id) {
			setFlash({ type: 'error', message: 'Missing ID' }, cookies);
			return fail(400);
		}

		try {
			const existing = await getService(id);
			const images = await db
				.select({ url: serviceGallery.imageUrl })
				.from(serviceGallery)
				.where(eq(serviceGallery.serviceId, id));

			// Gallery rows are removed by ON DELETE CASCADE.
			await db.delete(services).where(eq(services.id, id));
			await deleteUploadedFiles([
				existing?.featuredImage,
				existing?.ogImage,
				...images.map((i) => i.url)
			]);
			await logActivity(locals, 'delete', 'service', id, existing?.name);
		} catch (err) {
			console.error('Error deleting service:', err);
			setFlash({ type: 'error', message: 'Could not delete the service.' }, cookies);
			return fail(500);
		}

		redirect(
			'/dashboard/services',
			{ type: 'success', message: 'Service Deleted Successfully!' },
			cookies
		);
	},

	editGallery: async ({ params, request, locals }) => {
		const id = Number(params.id);
		const form = await superValidate(request, zod4(editGallery));
		const { existing, gallery } = form.data;

		try {
			const uploaded = gallery?.length ? await uploadGallery(gallery) : [];
			const kept = new Set(existing.split(',').filter((u) => u.trim()));

			const current = await db
				.select()
				.from(serviceGallery)
				.where(eq(serviceGallery.serviceId, id));
			const removed = current.filter((row) => !row.imageUrl || !kept.has(row.imageUrl));

			await db.transaction(async (tx) => {
				for (const row of removed)
					await tx.delete(serviceGallery).where(eq(serviceGallery.id, row.id));
				if (uploaded.length) {
					const start = current.length;
					await tx
						.insert(serviceGallery)
						.values(
							uploaded.map((url, i) => ({ serviceId: id, imageUrl: url, sortOrder: start + i }))
						);
				}
			});

			await deleteUploadedFiles(removed.map((r) => r.imageUrl));
			await logActivity(locals, 'update', 'service', id, 'Updated gallery');
			return message(form, { type: 'success', text: 'Gallery updated successfully!' });
		} catch (err) {
			console.error('Error updating service gallery:', err);
			return message(
				form,
				{ type: 'error', text: 'Could not update the gallery.' },
				{ status: 500 }
			);
		}
	},

	imageMeta: async ({ params, request, locals }) =>
		imageMetaAction(
			request,
			locals,
			serviceGallery,
			serviceGallery.serviceId,
			Number(params.id),
			'service'
		)
};
