import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import {
	deleteFeature,
	edit,
	editFeature,
	editGallery,
	addFeature,
	addVideo,
	editVideo,
	deleteVideo
} from './schema';

import { db } from '$lib/server/db';
import {
	venueDetails as event,
	venueImages as productImages,
	user,
	venueFeatures,
	venueVideos,
	venueLottery,
} from '$lib/server/db/schema';
import { eq, sql, getTableColumns } from 'drizzle-orm';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params }) => {
	const { id } = params;

	const result = await db
		.select({
			url: productImages.imageUrl
		})
		.from(productImages)
		.where(eq(productImages.venueId, Number(id)));

	const images = result.map((img) => img.url);

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

	const features = await db
		.select({
			id: venueFeatures.id,
			name: venueFeatures.name,
			description: venueFeatures.description
		})
		.from(venueFeatures)
		.where(eq(venueFeatures.venueId, Number(id)));

	const videos = await db
		.select({
			id: venueVideos.id,
			videoUrl: venueVideos.videoUrl
		})
		.from(venueVideos)
		.where(eq(venueVideos.venueId, Number(id)));

	const lottery = await db
		.select()
		.from(venueLottery)
		.where(eq(venueLottery.venueId, Number(id)));

	const addForm = await superValidate(zod4(addFeature));
	const addVideoForm = await superValidate(zod4(addVideo));
	const editForm = await superValidate(zod4(editFeature));
	const editVideoForm = await superValidate(zod4(editVideo));
	const deleteForm = await superValidate(zod4(deleteFeature));
	const form = await superValidate(product, zod4(edit));
	const galleryEdit = await superValidate(zod4(editGallery));

	return {
		product,
		videos,
		addForm,
		addVideoForm,
		editVideoForm,
		editForm,
		deleteForm,
		form,
		images,
		features,
		galleryEdit,
		lottery
	};
};
