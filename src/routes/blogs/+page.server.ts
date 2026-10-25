import { getBlogs } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { lang } }) => ({
	portfolioItems: await getBlogs(lang)
});
