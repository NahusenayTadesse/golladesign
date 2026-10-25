import { desc, eq, getTableColumns } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { blog, blogCategories } from '$lib/server/db/schema';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const eventList = await db
		.select({
			...getTableColumns(blog),
			category: blogCategories.name
		})
		.from(blog)
		.leftJoin(blogCategories, eq(blog.categoryId, blogCategories.id))
		.orderBy(desc(blog.publishedAt), desc(blog.id));

	return { eventList };
};
