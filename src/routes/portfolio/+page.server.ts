import { getProjects } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { lang } }) => ({
	portfolioItems: await getProjects(lang)
});
