import { asc, desc, eq, getTableColumns } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { projects, projectCategories } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const eventList = await db
		.select({
			...getTableColumns(projects),
			category: projectCategories.name
		})
		.from(projects)
		.leftJoin(projectCategories, eq(projects.categoryId, projectCategories.id))
		.orderBy(asc(projects.sortOrder), desc(projects.completedAt));

	return { eventList };
};
