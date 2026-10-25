import { superValidate, fail, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { and, eq } from 'drizzle-orm';
import { redirect, setFlash } from 'sveltekit-flash-message/server';

import {
	addBeforeAfter,
	addVideo,
	deleteBeforeAfter,
	deleteFeature,
	edit,
	editGallery,
	editVideo
} from './schema';
import { db } from '$lib/server/db';
import {
	projects,
	projectImages,
	projectBeforeAfter,
	projectVideos as venueVideos
} from '$lib/server/db/schema';
import { deleteUploadedFiles, saveUploadedFile, uploadGallery } from '$lib/server/upload';
import { amharicValues, contentMetaValues, uniqueSlug } from '$lib/server/forms';
import { projectDetailValues } from '$lib/server/projects';
import { imageMetaAction } from '$lib/server/imageMeta';
import { logActivity } from '$lib/server/activity';
import type { Actions } from './$types';

const getProject = (id: number) =>
	db
		.select()
		.from(projects)
		.where(eq(projects.id, id))
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

		const { title, category, slug, image, content, excerpt, date, bluePrint } = form.data;

		try {
			const existing = await getProject(id);
			if (!existing)
				return message(form, { type: 'error', text: 'Project not found' }, { status: 404 });

			const featuredImage = await saveUploadedFile(image);
			const blueprintUrl = await saveUploadedFile(bluePrint);
			const meta = await contentMetaValues(form.data);

			await db
				.update(projects)
				.set({
					title,
					slug: await uniqueSlug(projects, slug || title, id),
					categoryId: category,
					content,
					excerpt,
					completedAt: new Date(date),
					...(featuredImage ? { featuredImage } : {}),
					...(blueprintUrl ? { blueprintUrl } : {}),
					...projectDetailValues(form.data),
					...meta,
					...amharicValues(form.data),
					updatedBy: locals.user?.id
				})
				.where(eq(projects.id, id));

			await deleteUploadedFiles([
				featuredImage ? existing.featuredImage : null,
				blueprintUrl ? existing.blueprintUrl : null,
				meta.ogImage ? existing.ogImage : null
			]);
			await logActivity(locals, 'update', 'project', id, title);
			return message(form, { type: 'success', text: 'Project Updated Successfully' });
		} catch (err) {
			console.error('Error updating project:', err);
			return message(form, { type: 'error', text: 'Project update failed' }, { status: 500 });
		}
	},

	delete: async ({ cookies, params, locals }) => {
		const id = Number(params.id);
		if (!id) {
			setFlash({ type: 'error', message: 'Missing ID' }, cookies);
			return fail(400);
		}

		try {
			const existing = await getProject(id);
			const [images, pairs] = await Promise.all([
				db
					.select({ url: projectImages.imageUrl })
					.from(projectImages)
					.where(eq(projectImages.projectId, id)),
				db.select().from(projectBeforeAfter).where(eq(projectBeforeAfter.projectId, id))
			]);

			// Images, videos and before/after rows are removed by ON DELETE CASCADE.
			await db.delete(projects).where(eq(projects.id, id));
			await deleteUploadedFiles([
				existing?.featuredImage,
				existing?.blueprintUrl,
				existing?.ogImage,
				...images.map((i) => i.url),
				...pairs.flatMap((p) => [p.beforeUrl, p.afterUrl])
			]);
			await logActivity(locals, 'delete', 'project', id, existing?.title);
		} catch (err) {
			console.error('Error deleting project:', err);
			setFlash({ type: 'error', message: 'Could not delete the project.' }, cookies);
			return fail(500);
		}

		redirect(
			'/dashboard/projects',
			{ type: 'success', message: 'Project Deleted Successfully!' },
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
			const current = await db.select().from(projectImages).where(eq(projectImages.projectId, id));
			const removed = current.filter((row) => !kept.has(row.imageUrl));

			await db.transaction(async (tx) => {
				for (const row of removed)
					await tx.delete(projectImages).where(eq(projectImages.id, row.id));
				if (uploaded.length) {
					await tx
						.insert(projectImages)
						.values(
							uploaded.map((url, i) => ({
								projectId: id,
								imageUrl: url,
								sortOrder: current.length + i
							}))
						);
				}
			});

			await deleteUploadedFiles(removed.map((r) => r.imageUrl));
			await logActivity(locals, 'update', 'project', id, 'Updated gallery');
			return message(form, { type: 'success', text: 'Gallery updated successfully!' });
		} catch (err) {
			console.error('Error updating project gallery:', err);
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
			projectImages,
			projectImages.projectId,
			Number(params.id),
			'project'
		),

	addBeforeAfter: async ({ params, request, locals }) => {
		const id = Number(params.id);
		const form = await superValidate(request, zod4(addBeforeAfter));
		if (!form.valid) {
			return message(form, { type: 'error', text: 'Both images are required.' }, { status: 400 });
		}

		try {
			const beforeUrl = await saveUploadedFile(form.data.before);
			const afterUrl = await saveUploadedFile(form.data.after);
			const count = await db
				.select({ id: projectBeforeAfter.id })
				.from(projectBeforeAfter)
				.where(eq(projectBeforeAfter.projectId, id));
			await db.insert(projectBeforeAfter).values({
				projectId: id,
				beforeUrl,
				afterUrl,
				caption: form.data.caption || null,
				sortOrder: count.length
			});
			await logActivity(locals, 'update', 'project', id, 'Added before/after pair');
			return message(form, { type: 'success', text: 'Before/after pair added' });
		} catch (err) {
			console.error('Error adding before/after pair:', err);
			return message(form, { type: 'error', text: 'Could not add the pair.' }, { status: 500 });
		}
	},

	deleteBeforeAfter: async ({ params, request, locals }) => {
		const id = Number(params.id);
		const form = await superValidate(request, zod4(deleteBeforeAfter));
		if (!form.valid) return fail(400, { form });

		const where = and(
			eq(projectBeforeAfter.id, form.data.id),
			eq(projectBeforeAfter.projectId, id)
		);
		const [pair] = await db.select().from(projectBeforeAfter).where(where);
		if (pair) {
			await db.delete(projectBeforeAfter).where(where);
			await deleteUploadedFiles([pair.beforeUrl, pair.afterUrl]);
			await logActivity(locals, 'update', 'project', id, 'Removed before/after pair');
		}
		return message(form, { type: 'success', text: 'Pair removed' });
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
