import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { edit, editGallery } from './schema';

import { db } from '$lib/server/db';
import { services as products, serviceGallery as productImages } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, message } from 'sveltekit-superforms';
import { redirect, setFlash } from 'sveltekit-flash-message/server';

import { saveUploadedFile, uploadGallery } from '$lib/server/upload';
import type { Actions } from './$types';

export const actions: Actions = {
	editProduct: async ({ request, cookies, locals, params }) => {
		const { id } = params;
		const form = await superValidate(request, zod4(edit));
		console.log(form.data);

		if (!form.valid) {
			// Stay on the same page and set a flash message
			setFlash({ type: 'error', message: 'Please check your form data.' }, cookies);
			return fail(400, { form });
		}

		const { name, image, description, longDescription } = form.data;

		try {
			if (image) {
				const featuredImage = await saveUploadedFile(image);

				await db
					.update(products)
					.set({
						name,
						featuredImage,
						description,
						longDescription,
						updatedBy: locals?.user?.id
					})
					.where(eq(products.id, Number(id)));
			} else {
				await db
					.update(products)
					.set({
						name,
						description,
						longDescription,

						updatedBy: locals?.user?.id
					})
					.where(eq(products.id, Number(id)));
			}

			return message(form, { type: 'success', text: 'Service Updated Successfully' });
		} catch (err) {
			console.error(err?.message);

			return message(form, { type: 'error', text: 'Service Update Failed' + err?.message });
		}
	},

	delete: async ({ cookies, params }) => {
		const { id } = params;

		try {
			if (!id) {
				setFlash({ type: 'error', message: 'Missing ID' }, cookies);
				return fail(400);
			}

			// Remove child rows too, otherwise they are left orphaned.
			await db.transaction(async (tx) => {
				await tx.delete(productImages).where(eq(productImages.serviceId, Number(id)));
				await tx.delete(products).where(eq(products.id, Number(id)));
			});
		} catch (err) {
			console.error('Error deleting Service:', err);
			setFlash({ type: 'error', message: `Unexpected Error: ${err?.message}` }, cookies);
			return fail(400);
		}

		redirect(
			'/dashboard/services',
			{ type: 'success', message: 'Service Deleted Successfully!' },
			cookies
		);
	},

	editGallery: async ({ params, request }) => {
		const { id } = params;
		const form = await superValidate(request, zod4(editGallery));

		const { existing, gallery } = form.data;

		try {
			if (!id) {
				return message(
					form,
					{ type: 'error', text: 'Unexpected Error: Event ID not provided' },
					{ status: 500 }
				);
			}

			await db.transaction(async (tx) => {
				let galleryImages = [];

				// 1. Upload new files if they exist
				if (gallery && gallery.length > 0) {
					galleryImages = await uploadGallery(gallery);
				}
				const old = existing.split(',');
				// 2. Combine existing (edited) strings with newly uploaded URLs
				// We filter out empty strings/nulls to ensure data integrity
				const finalList = [...new Set([...old, ...galleryImages])].filter(
					(item) => item && item.trim() !== ''
				);

				// 3. ALWAYS sync if the final list is valid,
				// even if galleryImages.length is 0 (e.g., you just deleted an old photo)
				if (finalList.length > 0) {
					const imageRecords = finalList.map((url) => ({
						serviceId: Number(id),
						imageUrl: url
					}));

					// Wipe the old associations and replace with the new "finalList"
					await tx.delete(productImages).where(eq(productImages.serviceId, Number(id)));
					await tx.insert(productImages).values(imageRecords);
				} else {
					// Handle the case where all images were removed
					await tx.delete(productImages).where(eq(productImages.serviceId, Number(id)));
				}
			});

			return message(form, { type: 'success', text: 'Service added Successfully!' });
		} catch (err) {
			console.error('Error marking adding service gallery:', err);
			return message(
				form,
				{ type: 'error', text: `Unexpected Error: ${err?.message}` },
				{ status: 500 }
			);
		}
	}
};
