import { auth } from '$lib/server/auth';
import { redirect } from 'sveltekit-flash-message/server';
import { eq, sql } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { contactMessages, quotes } from '$lib/server/db/schema';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.permissions.includes('manage_leads')) return { newQuotes: null, newMessages: null };
	const count = sql<number>`count(*)`;
	const [[q], [m]] = await Promise.all([
		db.select({ n: count }).from(quotes).where(eq(quotes.status, 'new')),
		db.select({ n: count }).from(contactMessages).where(eq(contactMessages.status, 'new'))
	]);
	return { newQuotes: Number(q.n), newMessages: Number(m.n) };
};

export const actions: Actions = {
	logout: async (event) => {
		await auth.api.signOut({
			headers: event.request.headers
		});
		redirect('/login', { type: 'success', message: 'Logout Successful' }, event.cookies);
	}
};
