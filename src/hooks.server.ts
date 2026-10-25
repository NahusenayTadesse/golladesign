import { error, redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
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

/**
 * adapter-node pre-compresses static assets but sends rendered pages uncompressed.
 * Gzip HTML and data responses unless something upstream already compressed them.
 */
const compress: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	const type = response.headers.get('content-type') ?? '';
	if (
		!response.body ||
		response.headers.has('content-encoding') ||
		!/\bgzip\b/.test(event.request.headers.get('accept-encoding') ?? '') ||
		!/^(text\/html|application\/json|text\/plain|application\/javascript)/.test(type)
	) {
		return response;
	}

	const headers = new Headers(response.headers);
	headers.set('content-encoding', 'gzip');
	headers.delete('content-length');
	headers.append('vary', 'Accept-Encoding');
	return new Response(response.body.pipeThrough(new CompressionStream('gzip')), {
		status: response.status,
		statusText: response.statusText,
		headers
	});
};

export const handle: Handle = sequence(compress, handleBetterAuth);
