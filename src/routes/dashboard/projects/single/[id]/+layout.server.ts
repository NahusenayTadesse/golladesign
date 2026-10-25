import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
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
	projects as event,
	projectImages as productImages,
	projectCategories as blogCategories,
	projectVideos as blogVideos,
	projectBeforeAfter,
	services
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
		.where(eq(productImages.projectId, Number(id)))
		.orderBy(asc(productImages.sortOrder), asc(productImages.id));

	const images = galleryRows.map((img) => img.url);

	const [serviceRows, beforeAfter] = await Promise.all([
		db
			.select({ id: services.id, name: services.name })
			.from(services)
			.orderBy(asc(services.sortOrder), asc(services.name)),
		db
			.select()
			.from(projectBeforeAfter)
			.where(eq(projectBeforeAfter.projectId, Number(id)))
			.orderBy(asc(projectBeforeAfter.sortOrder), asc(projectBeforeAfter.id))
	]);

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
			category: blogCategories.id
		})
		.from(event)
		.leftJoin(blogCategories, eq(event.categoryId, blogCategories.id))
		.where(eq(event.id, Number(id)))
		.limit(1)
		.then((rows) => rows[0]);

	if (!product) error(404, 'Project not found');

	const form = await superValidate(
		{
			...product,
			serviceId: product.serviceId ? String(product.serviceId) : undefined,
			projectType: product.projectType ?? undefined,
			areaSqm: product.areaSqm ?? undefined,
			floors: product.floors ?? undefined,
			yearCompleted: product.yearCompleted ?? undefined,
			clientName: product.clientName ?? undefined,
			location: product.location ?? undefined,
			duration: product.duration ?? undefined,
			date: (product.completedAt ?? new Date()).toISOString().slice(0, 10)
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
		.where(eq(blogVideos.projectId, Number(id)))
		.orderBy(asc(blogVideos.sortOrder), asc(blogVideos.id));

	const [beforeAfterForm, deleteBeforeAfterForm] = await Promise.all([
		superValidate(zod4(addBeforeAfter)),
		superValidate(zod4(deleteBeforeAfter))
	]);

	return {
		product,
		form,
		images,
		galleryRows,
		beforeAfter,
		beforeAfterForm,
		deleteBeforeAfterForm,
		serviceOptions: serviceRows.map((s) => ({ value: String(s.id), name: s.name })),
		galleryEdit,
		cats,
		addVideoForm,
		editVideoForm,
		videos,
		deleteForm
	};
};
