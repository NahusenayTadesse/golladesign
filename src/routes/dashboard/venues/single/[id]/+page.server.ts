import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import {
	deleteFeature,
	edit,
	editFeature,
	editGallery,
	addFeature,
	addVideo,
	editVideo
} from './schema';

import { db } from '$lib/server/db';
import {
	venueDetails as products,
	venueImages as productImages,
	venueFeatures as paymentMethods,
	venueVideos,
	venueLottery
} from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { fail, message } from 'sveltekit-superforms';
import { setFlash } from 'sveltekit-flash-message/server';

import { saveUploadedFile } from '$lib/server/upload';
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

		const { name, capacity, bookingPolicy, image, location, description, enableLottery } =
			form.data;

		try {
			if (image) {
				const featuredImage = await saveUploadedFile(image);

				await db
					.update(products)
					.set({
						name,
						capacity,
						bookingPolicy,
						location,
						description,
						featuredImage,
						updatedBy: locals?.user?.id,
						enableLottery: enableLottery
					})
					.where(eq(products.id, Number(id)));
			} else {
				await db
					.update(products)
					.set({
						name,
						capacity,
						bookingPolicy,
						location,
						description,
						enableLottery,
						updatedBy: locals?.user?.id
					})
					.where(eq(products.id, Number(id)));
			}

			return message(form, { type: 'success', text: 'Venue Updated Successfully' });
		} catch (err) {
			console.error(err?.message);

			return message(form, { type: 'error', text: 'Venue Update Failed' + err?.message });
		}
	},

	delete: async ({ cookies, params }) => {
		const { id } = params;

		try {
			if (!id) {
				setFlash({ type: 'error', message: `Unexpected Error: ${err?.message}` }, cookies);
				return fail(400);
			}

			await db.delete(products).where(eq(products.id, Number(id)));

			setFlash({ type: 'success', message: 'Venue Deleted Successfully!' }, cookies);
		} catch (err) {
			console.error('Error deleting Event:', err);
			setFlash({ type: 'error', message: `Unexpected Error: ${err?.message}` }, cookies);
			return fail(400);
		}
	},

	editGallery: async ({ params, request }) => {
		const { id } = params;
		const form = await superValidate(request, zod4(editGallery));

		const { existing, gallery } = form.data;

		try {
			if (!id) {
				return message(
					form,
					{ type: 'error', text: 'Unexpected Error: Venue Id not provided' },
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
						venueId: Number(id),
						imageUrl: url
					}));

					// Wipe the old associations and replace with the new "finalList"
					await tx.delete(productImages).where(eq(productImages.venueId, Number(id)));
					await tx.insert(productImages).values(imageRecords);
				} else {
					// Handle the case where all images were removed
					await tx.delete(productImages).where(eq(productImages.venueId, Number(id)));
				}
			});

			return message(form, { type: 'success', text: 'Venue Gallery added Successfully!' });
		} catch (err) {
			console.error('Error marking adding Venue gallery:', err);
			return message(
				form,
				{ type: 'error', text: `Unexpected Error: ${err?.message}` },
				{ status: 500 }
			);
		}
	},
	add: async ({ request, params }) => {
		const form = await superValidate(request, zod4(addFeature));
		const { id } = params;

		if (!form.valid) {
			return message(form, { type: 'error', text: 'Please check the form for Errors' });
		}

		const { name, description } = form.data;

		try {
			await db.insert(paymentMethods).values({
				name,
				description,
				venueId: Number(id)
			});

			return message(form, { type: 'success', text: 'Feature Successfully Created' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text:
						err.code === 'ER_DUP_ENTRY'
							? 'Feature is already taken. Please choose another one.'
							: err.message
				},
				{
					status: 500
				}
			);
		}
	},
	editFeature: async ({ request }) => {
		const form = await superValidate(request, zod4(editFeature));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id, name, description } = form.data;

		try {
			await db.update(paymentMethods).set({ name, description }).where(eq(paymentMethods.id, id));
			return message(form, { type: 'success', text: 'Feature  Successfully Updated' });
		} catch (err: any) {
			if (err.code === 'ER_DUP_ENTRY') return setError(form, 'name', 'Feature  already exists.');
			return message(form, {
				type: 'error',
				text:
					err.code === 'ER_DUP_ENTRY'
						? 'Feature  is already taken. Please choose another one.'
						: err.message
			});
		}
	},
	deleteFeature: async ({ request }) => {
		const form = await superValidate(request, zod4(deleteFeature));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			await db.delete(paymentMethods).where(eq(paymentMethods.id, id));
			return message(form, { type: 'success', text: 'Feature Successfully Deleted' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text: 'Error while deleting Feature.'
				},
				{ status: 500 }
			);
		}
	},
	addVideo: async ({ request, params }) => {
		const form = await superValidate(request, zod4(addVideo));
		const { id } = params;

		if (!form.valid) {
			return message(
				form,
				{ type: 'error', text: 'Please check the form for Errors' },
				{ status: 400 }
			);
		}

		const { videoUrl } = form.data;

		try {
			await db.insert(venueVideos).values({
				videoUrl,
				venueId: Number(id)
			});

			return message(form, { type: 'success', text: 'Video Successfully Created' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text:
						err.code === 'ER_DUP_ENTRY'
							? 'Venue is already taken. Please choose another one.'
							: err.message
				},
				{
					status: 500
				}
			);
		}
	},
	editVideo: async ({ request }) => {
		const form = await superValidate(request, zod4(editVideo));

		if (!form.valid) {
			return message(
				form,
				{ type: 'error', text: 'Please check the form for Errors' },
				{ status: 400 }
			);
		}

		const { id, videoUrl } = form.data;

		try {
			await db
				.update(venueVideos)
				.set({ videoUrl })
				.where(eq(venueVideos.id, Number(id)));

			return message(form, { type: 'success', text: 'Video Successfully Updated' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text:
						err.code === 'ER_DUP_ENTRY'
							? 'Venue Video is already taken. Please choose another one.'
							: err.message
				},
				{
					status: 500
				}
			);
		}
	},
	deleteVideo: async ({ request }) => {
		const form = await superValidate(request, zod4(deleteFeature));

		if (!form.valid) {
			return message(
				form,
				{
					type: 'error',
					text: 'Error while deleting Video.'
				},
				{ status: 500 }
			);
		}

		const { id } = form.data;

		try {
			await db.delete(venueVideos).where(eq(venueVideos.id, id));
			return message(form, { type: 'success', text: 'Video Successfully Deleted' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text: 'Error while deleting Video.'
				},
				{ status: 500 }
			);
		}
	},
	deleteLottery: async ({ request }) => {
		const form = await superValidate(request, zod4(deleteFeature));

		if (!form.valid) {
			return fail(400, { form });
		}

		const { id } = form.data;

		try {
			await db.delete(venueLottery).where(eq(venueLottery.id, id));
			return message(form, { type: 'success', text: 'Lottery Successfully Deleted' });
		} catch (err: any) {
			return message(
				form,
				{
					type: 'error',
					text: 'Error while deleting Feature.'
				},
				{ status: 500 }
			);
		}
	}
};

const uploadGallery = async (gallery: File[] | undefined) => {
	try {
		// 1. Map each file to the upload promise
		const uploadPromises = gallery.map(async (file) => {
			const address = await saveUploadedFile(file);
			return address; // This is the string returned by your function
		});

		// 2. Wait for all uploads to complete and store results in an array
		const uploadedAddresses: string[] = await Promise.all(uploadPromises);

		console.log('All files uploaded:', uploadedAddresses);

		return uploadedAddresses;
	} catch (error) {
		console.error('Error uploading gallery:', error);
		throw error;
	}
};
