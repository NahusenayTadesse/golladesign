import { getServices } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { lang } }) => ({
	servicesItems: await getServices(lang)
});
