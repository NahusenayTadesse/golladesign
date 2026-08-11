import { db } from '$lib/server/db';
import { services, serviceGallery } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ params }) => {
	const id = Number(params.id);

	if (!Number.isInteger(id)) {
		error(404, 'Service not found');
	}

	const service = await db
		.select()
		.from(services)
		.where(eq(services.id, id))
		.limit(1)
		.then((res) => res[0]);

	if (!service) {
		error(404, 'Service not found');
	}

	const result = await db
		.select({
			url: serviceGallery.imageUrl
		})
		.from(serviceGallery)
		.where(eq(serviceGallery.serviceId, service.id));

	const images = result.map((img) => img.url).filter((url): url is string => Boolean(url));

	return {
		service,
		images
	};
};
