import { error } from '@sveltejs/kit';
import { getBlog } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals: { lang } }) => {
	const result = await getBlog(params.id, lang);
	if (!result) error(404, 'Blog post not found');
	return { portfolioItems: result.post, images: result.images, videos: result.videos };
};
