import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';

import { db } from '$lib/server/db';
import {
	venueDetails as event,
	venueImages as productImages,
	venueFeatures,
	venueLottery,
	venueVideos
} from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad, Actions } from './$types';

import { schema } from './schema';
export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;

	const form = await superValidate(zod4(schema));

	const result = await db
		.select({
			url: productImages.imageUrl
		})
		.from(productImages)
		.where(eq(productImages.venueId, Number(id)));

	const images = result.map((img) => img.url);

	const product = await db
		.select()
		.from(event)
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

	return {
		venue: product,
		videos,
		images,
		features,
		form
	};
};

export const actions: Actions = {
	add: async ({ request, params }) => {
		const { id } = params;
		const form = await superValidate(request, zod4(schema));
		if (!form.valid) {
			return message(form, { type: 'error', text: 'Please check the form for Errors' });
		}

		const { name, phone, email } = form.data;

		try {
			await db.insert(venueLottery).values({ name, phone, email, venueId: Number(id) });

			// const adminMail = adminContactTemplate(form.data);
			// sendEmail(USER, adminMail.subject, adminMail.html);

			// const userMail = customerContactTemplate(name, subject);
			// sendEmail(email, userMail.subject, userMail.html);

			return message(form, { type: 'success', text: 'Submission Successfully Sent!' });
		} catch (err) {
			return message(form, {
				type: 'error',
				text: 'Error Submitting: Try again later'
			});
		}
	}
};
