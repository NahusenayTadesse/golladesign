import {
	getBlogs,
	getFaqs,
	getPartnerLogos,
	getProjects,
	getServices,
	getTeam,
	getTestimonials
} from '$lib/server/content';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals: { lang } }) => {
	const [servicesItems, featured, blogItems, teamMembers, imagesList, testimonialList, faqs] =
		await Promise.all([
			getServices(lang),
			getProjects(lang, { featured: true, limit: 9 }),
			getBlogs(lang, 9),
			getTeam(lang),
			getPartnerLogos(),
			getTestimonials(lang),
			getFaqs(lang)
		]);

	// Fall back to the latest projects until some are marked as featured.
	const portfolioItems = featured.length ? featured : await getProjects(lang, { limit: 9 });

	return {
		servicesItems,
		portfolioItems,
		blogItems,
		teamMembers,
		imagesList,
		testimonialList,
		faqs
	};
};
