import { getPartnerLogos, getServices, getTeam, getTestimonials } from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { lang } }) => {
	const [servicesItems, teamMembers, imagesList, testimonialList] = await Promise.all([
		getServices(lang),
		getTeam(lang),
		getPartnerLogos(),
		getTestimonials(lang)
	]);
	return { servicesItems, teamMembers, imagesList, testimonialList };
};
