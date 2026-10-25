import { superValidate, fail, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { eq } from 'drizzle-orm';
import { redirect, setFlash } from 'sveltekit-flash-message/server';

import { addVideo, deleteFeature, edit, editGallery, editVideo } from './schema';
import { db } from '$lib/server/db';
import { blog, blogGallery, blogVideos as venueVideos } from '$lib/server/db/schema';
import { deleteUploadedFiles, saveUploadedFile, uploadGallery } from '$lib/server/upload';
import { amharicValues, contentMetaValues, uniqueSlug } from '$lib/server/forms';
import { imageMetaAction } from '$lib/server/imageMeta';
import { logActivity } from '$lib/server/activity';
import type { Actions } from './$types';

const getBlog = (id: number) =>
	db
		.select()
		.from(blog)
		.where(eq(blog.id, id))
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

		const { title, slug, category, image, excerpt, content, date } = form.data;

		try {
			const existing = await getBlog(id);
			if (!existing)
				return message(form, { type: 'error', text: 'Blog not found' }, { status: 404 });

			const featuredImage = await saveUploadedFile(image);
			const { isFeatured, ...meta } = await contentMetaValues(form.data);

			await db
				.update(blog)
				.set({
					title,
					slug: await uniqueSlug(blog, slug || title, id),
					categoryId: category,
					excerpt,
					content,
					publishedAt: new Date(date),
					isFeaturedOnHome: isFeatured ? 1 : 0,
					...(featuredImage ? { featuredImage } : {}),
					...meta,
					...amharicValues(form.data),
					updatedBy: locals.user?.id
				})
				.where(eq(blog.id, id));

			await deleteUploadedFiles([
				featuredImage ? existing.featuredImage : null,
				meta.ogImage ? existing.ogImage : null
			]);
			await logActivity(locals, 'update', 'blog', id, title);
			return message(form, { type: 'success', text: 'Blog Updated Successfully' });
		} catch (err) {
			console.error('Error updating blog:', err);
			return message(form, { type: 'error', text: 'Blog update failed' }, { status: 500 });
		}
	},

	delete: async ({ cookies, params, locals }) => {
		const id = Number(params.id);
		if (!id) {
			setFlash({ type: 'error', message: 'Missing ID' }, cookies);
			return fail(400);
		}

		try {
			const existing = await getBlog(id);
			const images = await db
				.select({ url: blogGallery.imageUrl })
				.from(blogGallery)
				.where(eq(blogGallery.blogId, id));

			// Gallery and video rows are removed by ON DELETE CASCADE.
			await db.delete(blog).where(eq(blog.id, id));
			await deleteUploadedFiles([
				existing?.featuredImage,
				existing?.ogImage,
				...images.map((i) => i.url)
			]);
			await logActivity(locals, 'delete', 'blog', id, existing?.title);
		} catch (err) {
			console.error('Error deleting blog:', err);
			setFlash({ type: 'error', message: 'Could not delete the blog.' }, cookies);
			return fail(500);
		}

		redirect(
			'/dashboard/blog',
			{ type: 'success', message: 'Blog Deleted Successfully!' },
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
			const current = await db.select().from(blogGallery).where(eq(blogGallery.blogId, id));
			const removed = current.filter((row) => !row.imageUrl || !kept.has(row.imageUrl));

			await db.transaction(async (tx) => {
				for (const row of removed) await tx.delete(blogGallery).where(eq(blogGallery.id, row.id));
				if (uploaded.length) {
					await tx
						.insert(blogGallery)
						.values(
							uploaded.map((url, i) => ({
								blogId: id,
								imageUrl: url,
								sortOrder: current.length + i
							}))
						);
				}
			});

			await deleteUploadedFiles(removed.map((r) => r.imageUrl));
			await logActivity(locals, 'update', 'blog', id, 'Updated gallery');
			return message(form, { type: 'success', text: 'Gallery updated successfully!' });
		} catch (err) {
			console.error('Error updating blog gallery:', err);
			return message(
				form,
				{ type: 'error', text: 'Could not update the gallery.' },
				{ status: 500 }
			);
		}
	},

	imageMeta: async ({ params, request, locals }) =>
		imageMetaAction(request, locals, blogGallery, blogGallery.blogId, Number(params.id), 'blog'),

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
				blogId: Number(id)
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
	}
};
