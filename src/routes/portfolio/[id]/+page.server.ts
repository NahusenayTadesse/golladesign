import { error } from '@sveltejs/kit';
import { getProject } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { lang } }) => {
	const result = await getProject(params.id, lang);
	if (!result) error(404, 'Project not found');

	return {
		...result,
		images: result.images.map((i) => i.imageUrl),
		imageAlts: result.images.map((i) => i.altText ?? '')
	};
};
