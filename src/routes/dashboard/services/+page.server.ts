import { db } from '$lib/server/db';
import { services } from '$lib/server/db/schema';
import type { PageServerLoad } from '../$types';
export const load: PageServerLoad = async () => {
	// First, get products
	const eventList = await db.select().from(services);

	return {
		eventList
	};
};
