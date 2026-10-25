import { asc } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { services } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	eventList: await db.select().from(services).orderBy(asc(services.sortOrder), asc(services.id))
});
