import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { addVideo, deleteFeature, edit, editGallery, editVideo } from './schema';

import { db } from '$lib/server/db';
import {
	blog as event,
	blogGallery as productImages,
	blogCategories,
	user,
	blogVideos
} from '$lib/server/db/schema';
import { asc, eq, getTableColumns } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const { id } = params;

	const galleryRows = await db
		.select({
			id: productImages.id,
			url: productImages.imageUrl,
			altText: productImages.altText,
			caption: productImages.caption,
			sortOrder: productImages.sortOrder
		})
		.from(productImages)
		.where(eq(productImages.blogId, Number(id)))
		.orderBy(asc(productImages.sortOrder), asc(productImages.id));

	const images = galleryRows.map((img) => img.url).filter((u): u is string => Boolean(u));

	const cats = await db
		.select({
			value: blogCategories.id,
			name: blogCategories.name
		})
		.from(blogCategories);

	const product = await db
		.select({
			...getTableColumns(event),
			categoryName: blogCategories.name,
			category: blogCategories.id,
			createdBy: user.name
		})
		.from(event)
		.leftJoin(blogCategories, eq(event.categoryId, blogCategories.id))
		.leftJoin(user, eq(event.createdBy, user.id))
		.where(eq(event.id, Number(id)))
		.limit(1)
		.then((rows) => rows[0]);

	if (!product) error(404, 'Blog not found');

	const form = await superValidate(
		{
			...product,
			isFeatured: product.isFeaturedOnHome === 1,
			date: (product.publishedAt ?? product.createdAt).toISOString().slice(0, 10)
		},
		zod4(edit)
	);
	const galleryEdit = await superValidate(zod4(editGallery));

	const addVideoForm = await superValidate(zod4(addVideo));
	const editVideoForm = await superValidate(zod4(editVideo));
	const deleteForm = await superValidate(zod4(deleteFeature));

	const videos = await db
		.select()
		.from(blogVideos)
		.where(eq(blogVideos.blogId, Number(id)))
		.orderBy(asc(blogVideos.sortOrder), asc(blogVideos.id));

	return {
		product,
		form,
		images,
		galleryRows,
		galleryEdit,
		cats,
		addVideoForm,
		editVideoForm,
		videos,
		deleteForm
	};
};
