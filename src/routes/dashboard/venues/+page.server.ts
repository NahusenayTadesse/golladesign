import { db } from '$lib/server/db';
import { venueDetails, venueFeatures } from '$lib/server/db/schema';
import type { PageServerLoad } from '../$types';
import { getTableColumns, count, eq } from 'drizzle-orm';
export const load: PageServerLoad = async () => {
	// First, get products
	const eventList = await db
		.select({
			...getTableColumns(venueDetails),
			features: count(venueFeatures.id)
		})
		.from(venueDetails)
		.leftJoin(venueFeatures, eq(venueDetails.id, venueFeatures.venueId))
		.groupBy(venueDetails.id);

	return {
		eventList
	};
};
