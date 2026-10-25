import { betterAuth } from 'better-auth/minimal';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { admin } from 'better-auth/plugins';

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'mysql' }),
	// Accounts are created by admins from the dashboard, never by public sign-up.
	emailAndPassword: { enabled: true, disableSignUp: true },
	user: {
		// Exposes the role used for dashboard permissions on session.user.
		additionalFields: {
			roleId: { type: 'number', required: false, input: false }
		}
	},
	plugins: [
		admin(),
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	]
});
