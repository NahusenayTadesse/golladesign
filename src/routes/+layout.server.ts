import { getNavServices } from '$lib/server/content';
import { getSettings } from '$lib/server/settings';
import { buildSiteInfo } from '$lib/settings';
import { tr } from '$lib/i18n';
import type { LayoutServerLoad } from './$types';

// Only what every page needs. Each page loads its own content.
export const load: LayoutServerLoad = async ({ locals, url }) => {
	const lang = locals.lang;
	if (url.pathname.startsWith('/dashboard')) return { lang };

	const [navServices, settings] = await Promise.all([getNavServices(), getSettings()]);

	return {
		lang,
		site: buildSiteInfo(settings),
		servicesItems: navServices.map((s) => ({ ...s, name: tr(s, 'name', lang) }))
	};
};
