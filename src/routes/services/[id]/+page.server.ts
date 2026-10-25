import { error, redirect } from '@sveltejs/kit';
import { getService } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { lang } }) => {
	const result = await getService(params.id, lang);
	if (!result) error(404, 'Service not found');

	// Old links used the numeric id; send them to the slug URL.
	if (params.id !== result.service.slug) redirect(301, `/services/${result.service.slug}`);

	return {
		service: result.service,
		images: result.images.map((i) => i.url),
		imageAlts: result.images.map((i) => i.alt ?? ''),
		relatedProjects: result.relatedProjects
	};
};
