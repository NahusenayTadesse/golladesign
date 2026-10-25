import { error, redirect, type Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { getUserPermissions, requiredPermission } from '$lib/server/permissions';
import { LANGS, type Lang } from '$lib/i18n';

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	const cookieLang = event.cookies.get('lang') as Lang | undefined;
	event.locals.lang = cookieLang && LANGS.includes(cookieLang) ? cookieLang : 'en';
	event.locals.permissions = [];

	// Layout loads don't run for form actions, so guard the whole dashboard here.
	if (event.url.pathname.startsWith('/dashboard')) {
		if (!event.locals.user) {
			if (event.request.method !== 'GET') error(401, 'Unauthorized');
			redirect(302, '/login');
		}

		event.locals.permissions = await getUserPermissions(event.locals.user);
		const needed = requiredPermission(event.url.pathname);
		if (needed && !event.locals.permissions.includes(needed)) {
			error(403, 'You do not have permission to open this page.');
		}
	}

	return svelteKitHandler({
		event,
		resolve: (e) =>
			resolve(e, {
				transformPageChunk: ({ html }) => html.replace('%lang%', event.locals.lang)
			}),
		auth,
		building
	});
};

export const handle: Handle = handleBetterAuth;
