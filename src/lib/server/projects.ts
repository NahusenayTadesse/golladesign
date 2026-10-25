import { projects } from '$lib/server/db/schema';
import { orNull } from '$lib/server/forms';

/** Column values for the project-specific fields (shared with the edit action). */
export function projectDetailValues(data: {
	serviceId?: string;
	clientName?: string;
	location?: string;
	projectType?: (typeof projects.$inferInsert)['projectType'];
	areaSqm?: number;
	floors?: number;
	yearCompleted?: number;
	duration?: string;
}) {
	return {
		serviceId: data.serviceId && /^\d+$/.test(data.serviceId) ? Number(data.serviceId) : null,
		clientName: orNull(data.clientName),
		location: orNull(data.location),
		projectType: data.projectType ?? null,
		areaSqm: data.areaSqm ?? null,
		floors: data.floors ?? null,
		yearCompleted: data.yearCompleted ?? null,
		duration: orNull(data.duration)
	};
}
