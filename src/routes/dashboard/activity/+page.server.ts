import { desc, eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { activityLog, user } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => ({
	entries: await db
		.select({
			id: activityLog.id,
			action: activityLog.action,
			entity: activityLog.entity,
			entityId: activityLog.entityId,
			summary: activityLog.summary,
			createdAt: activityLog.createdAt,
			user: user.name
		})
		.from(activityLog)
		.leftJoin(user, eq(user.id, activityLog.userId))
		.orderBy(desc(activityLog.createdAt))
		.limit(1000)
});
