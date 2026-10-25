import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { redirect, setFlash } from 'sveltekit-flash-message/server';

import { add } from './schema';
import { db } from '$lib/server/db';
import { blog, blogCategories, blogGallery } from '$lib/server/db/schema';
import { saveUploadedFile, uploadGallery } from '$lib/server/upload';
import { amharicValues, contentMetaValues, uniqueSlug } from '$lib/server/forms';
import { logActivity } from '$lib/server/activity';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(add));
	const cats = await db
		.select({ value: blogCategories.id, name: blogCategories.name })
		.from(blogCategories);
	return { form, cats };
};

export const actions: Actions = {
	addBlog: async ({ request, cookies, locals }) => {
		const form = await superValidate(request, zod4(add));
		if (!form.valid) {
			setFlash({ type: 'error', message: 'Please check your form data.' }, cookies);
			return message(form, { type: 'error', text: 'Please check your form data.' });
		}

		const { title, category, slug, image, gallery, content, excerpt, date } = form.data;

		let newId: number;
		try {
			const featuredImage = await saveUploadedFile(image);
			const galleryImages = await uploadGallery(gallery);
			const { isFeatured, ...meta } = await contentMetaValues(form.data);

			newId = await db.transaction(async (tx) => {
				const [{ id }] = await tx
					.insert(blog)
					.values({
						title,
						slug: await uniqueSlug(blog, slug || title),
						categoryId: category,
						content,
						excerpt,
						featuredImage,
						publishedAt: new Date(date),
						isFeaturedOnHome: isFeatured ? 1 : 0,
						authorId: locals.user?.id,
						...meta,
						...amharicValues(form.data),
						createdBy: locals.user?.id
					})
					.$returningId();

				if (galleryImages.length) {
					await tx
						.insert(blogGallery)
						.values(galleryImages.map((url, i) => ({ blogId: id, imageUrl: url, sortOrder: i })));
				}
				return id;
			});
		} catch (err) {
			console.error('Error adding blog:', err);
			return message(
				form,
				{ type: 'error', text: 'An error occurred while adding the blog.' },
				{ status: 500 }
			);
		}

		await logActivity(locals, 'create', 'blog', newId, title);
		redirect(
			`/dashboard/blog/single/${newId}`,
			{ type: 'success', message: 'New Blog Successfully Added' },
			cookies
		);
	}
};
