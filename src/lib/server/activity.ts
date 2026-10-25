import { db } from '$lib/server/db';
import { activityLog } from '$lib/server/db/schema';

type Action = 'create' | 'update' | 'delete' | 'status' | 'settings' | 'login';

/** Records who changed what. Never throws: a failed log must not fail the user's action. */
export async function logActivity(
	locals: App.Locals,
	action: Action,
	entity: string,
	entityId?: string | number | null,
	summary?: string
) {
	try {
		await db.insert(activityLog).values({
			userId: locals.user?.id ?? null,
			action,
			entity,
			entityId: entityId == null ? null : String(entityId),
			summary: summary?.slice(0, 255)
		});
	} catch (err) {
		console.error('Failed to write activity log:', err);
	}
}
