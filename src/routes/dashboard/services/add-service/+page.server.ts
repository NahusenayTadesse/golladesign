import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { redirect, setFlash } from 'sveltekit-flash-message/server';

import { add } from './schema';
import { db } from '$lib/server/db';
import { services, serviceGallery } from '$lib/server/db/schema';
import { saveUploadedFile, uploadGallery } from '$lib/server/upload';
import { amharicValues, contentMetaValues, uniqueSlug } from '$lib/server/forms';
import { logActivity } from '$lib/server/activity';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(add));
	return { form };
};

export const actions: Actions = {
	addService: async ({ request, cookies, locals }) => {
		const form = await superValidate(request, zod4(add));
		if (!form.valid) {
			setFlash({ type: 'error', message: 'Please check your form data.' }, cookies);
			return message(form, { type: 'error', text: 'Please check your form data.' });
		}

		const { name, slug, image, description, gallery, longDescription } = form.data;

		let newId: number;
		try {
			// Write files before the transaction so it isn't held open during slow I/O.
			const featuredImage = await saveUploadedFile(image);
			const galleryImages = await uploadGallery(gallery);
			const meta = await contentMetaValues(form.data);

			newId = await db.transaction(async (tx) => {
				const [{ id }] = await tx
					.insert(services)
					.values({
						name,
						slug: await uniqueSlug(services, slug || name),
						description,
						longDescription,
						featuredImage,
						...meta,
						...amharicValues(form.data),
						createdBy: locals.user?.id
					})
					.$returningId();

				if (galleryImages.length) {
					await tx
						.insert(serviceGallery)
						.values(
							galleryImages.map((url, i) => ({ serviceId: id, imageUrl: url, sortOrder: i }))
						);
				}
				return id;
			});
		} catch (err) {
			console.error('Error adding service:', err);
			return message(
				form,
				{ type: 'error', text: 'An error occurred while adding the service.' },
				{ status: 500 }
			);
		}

		await logActivity(locals, 'create', 'service', newId, name);
		redirect(
			`/dashboard/services/single/${newId}`,
			{ type: 'success', message: 'New Service Successfully Added' },
			cookies
		);
	}
};
