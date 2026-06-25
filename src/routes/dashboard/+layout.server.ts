import { db } from '$lib/server/db';
import { user } from '$lib/server/db/schema';
import { error, redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

import {} from '$lib/server/db/schema';
import { eq, count, gte } from 'drizzle-orm';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return redirect(302, '/login');
	}

	const name = locals?.user?.name;

	return {
		name
	};
};
