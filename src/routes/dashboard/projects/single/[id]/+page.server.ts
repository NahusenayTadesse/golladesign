import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { addVideo, deleteFeature, edit, editGallery, editVideo } from './schema';

import { db } from '$lib/server/db';
import {
	projects as products,
	projectImages as productImages,
	projectVideos as venueVideos
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
			return message(form, { type: 'error', message: 'Please check your form data.' });
		}

		const {
			title,
			category,
			slug,
			image,
			clientName,
			content,
			excerpt,
			location,
			date,
			isFeatured,
			bluePrint
		} = form.data;

		try {
			const [existingImage] = await db
				.select({ featuredImage: products.featuredImage, bluePrintUrl: products.blueprintUrl })
				.from(products)
				.where(eq(products.id, Number(id)))
				.limit(1);

			const featuredImage = image ? await saveUploadedFile(image) : existingImage?.featuredImage;
			const blueprintUrl = bluePrint
				? await saveUploadedFile(bluePrint)
				: existingImage?.bluePrintUrl;

			await db
				.update(products)
				.set({
					title,
					categoryId: category,
					slug,
					featuredImage,
					clientName,
					content,
					excerpt,
					location,
					completedAt: new Date(date),
					isFeatured,
					blueprintUrl
				})
				.where(eq(products.id, Number(id)));

			return message(form, { type: 'success', text: 'Project Updated Successfully' });
		} catch (err) {
			console.error(err?.message);

			return message(form, { type: 'error', text: 'Project Update Failed' + err?.message });
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

			setFlash({ type: 'success', message: 'Project Deleted Successfully!' }, cookies);
		} catch (err) {
			console.error('Error deleting Project:', err);
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
					{ type: 'error', text: 'Unexpected Error: Project ID not provided' },
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
						projectId: Number(id),
						imageUrl: url
					}));

					// Wipe the old associations and replace with the new "finalList"
					await tx.delete(productImages).where(eq(productImages.projectId, Number(id)));
					await tx.insert(productImages).values(imageRecords);
				} else {
					// Handle the case where all images were removed
					await tx.delete(productImages).where(eq(productImages.projectId, Number(id)));
				}
			});

			return message(form, { type: 'success', text: 'Project added Successfully!' });
		} catch (err) {
			console.error('Error marking adding project gallery:', err);
			return message(
				form,
				{ type: 'error', text: `Unexpected Error: ${err?.message}` },
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
				projectId: Number(id)
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
							? 'Project Video is already taken. Please choose another one.'
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
