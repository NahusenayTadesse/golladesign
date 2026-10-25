import { error, redirect, type Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	// Layout loads don't run for form actions, so guard the whole dashboard here.
	if (event.url.pathname.startsWith('/dashboard') && !event.locals.user) {
		if (event.request.method !== 'GET') error(401, 'Unauthorized');
		redirect(302, '/login');
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle: Handle = handleBetterAuth;
