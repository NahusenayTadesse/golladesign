import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { edit, editGallery } from './schema';

import { db } from '$lib/server/db';
import { services as event, serviceGallery as productImages, user } from '$lib/server/db/schema';
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
		.where(eq(productImages.serviceId, Number(id)))
		.orderBy(asc(productImages.sortOrder), asc(productImages.id));

	const images = galleryRows.map((img) => img.url).filter((u): u is string => Boolean(u));

	const product = await db
		.select({
			...getTableColumns(event),
			createdBy: user.name
		})
		.from(event)
		.leftJoin(user, eq(event.createdBy, user.id))
		.where(eq(event.id, Number(id)))
		.limit(1)
		.then((rows) => rows[0]);

	if (!product) error(404, 'Service not found');

	const form = await superValidate(product, zod4(edit));
	const galleryEdit = await superValidate(zod4(editGallery));

	return {
		product,
		form,
		images,
		galleryRows,
		galleryEdit
	};
};
