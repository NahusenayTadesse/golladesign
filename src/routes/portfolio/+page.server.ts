import { db } from '$lib/server/db';
import { projects, projectCategories } from '$lib/server/db/schema';
import { eq, getTableColumns } from 'drizzle-orm';
import type { PageServerLoad } from '../$types';
export const load: PageServerLoad = async () => {
	// First, get products
	const portfolioItems = await db
		.select({
			...getTableColumns(projects),
			category: projectCategories.name
		})
		.from(projects)
		.leftJoin(projectCategories, eq(projects.categoryId, projectCategories.id));

	return {
		portfolioItems
	};
};
