import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { asc } from 'drizzle-orm';
import { redirect } from 'sveltekit-flash-message/server';

import { add } from './schema';
import { db } from '$lib/server/db';
import { projects, projectImages, projectCategories, services } from '$lib/server/db/schema';
import { saveUploadedFile, uploadGallery } from '$lib/server/upload';
import { amharicValues, contentMetaValues, uniqueSlug } from '$lib/server/forms';
import { projectDetailValues } from '$lib/server/projects';
import { logActivity } from '$lib/server/activity';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [form, cats, serviceRows] = await Promise.all([
		superValidate(zod4(add)),
		db
			.select({ value: projectCategories.id, name: projectCategories.name })
			.from(projectCategories),
		db
			.select({ id: services.id, name: services.name })
			.from(services)
			.orderBy(asc(services.sortOrder), asc(services.name))
	]);
	return {
		form,
		cats,
		serviceOptions: serviceRows.map((s) => ({ value: String(s.id), name: s.name }))
	};
};

export const actions: Actions = {
	addProject: async ({ request, cookies, locals }) => {
		const form = await superValidate(request, zod4(add));
		if (!form.valid) {
			return message(form, { type: 'error', text: 'Please check your form data.' });
		}

		const { title, category, slug, image, gallery, content, excerpt, date, bluePrint } = form.data;

		let newId: number;
		try {
			const featuredImage = await saveUploadedFile(image);
			const blueprintUrl = (await saveUploadedFile(bluePrint)) ?? null;
			const galleryImages = await uploadGallery(gallery);
			const meta = await contentMetaValues(form.data);

			newId = await db.transaction(async (tx) => {
				const [{ id }] = await tx
					.insert(projects)
					.values({
						title,
						slug: await uniqueSlug(projects, slug || title),
						categoryId: category,
						content,
						excerpt,
						featuredImage,
						blueprintUrl,
						completedAt: new Date(date),
						...projectDetailValues(form.data),
						...meta,
						...amharicValues(form.data),
						createdBy: locals.user?.id
					})
					.$returningId();

				if (galleryImages.length) {
					await tx
						.insert(projectImages)
						.values(
							galleryImages.map((url, i) => ({ projectId: id, imageUrl: url, sortOrder: i }))
						);
				}
				return id;
			});
		} catch (err) {
			console.error('Error adding project:', err);
			return message(
				form,
				{ type: 'error', text: 'An error occurred while adding the project.' },
				{ status: 500 }
			);
		}

		await logActivity(locals, 'create', 'project', newId, title);
		redirect(
			`/dashboard/projects/single/${newId}`,
			{ type: 'success', message: 'New Project Successfully Added' },
			cookies
		);
	}
};
