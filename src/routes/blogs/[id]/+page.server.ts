import { db } from '$lib/server/db';
import {
	blog as portfolio,
	blogGallery as portfolioGallery,
	blogCategories,
	blogVideos
} from '$lib/server/db/schema';
import { eq, getTableColumns } from 'drizzle-orm';
import { error } from '@sveltejs/kit';

import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	// First, get products
	const portfolioItems = await db
		.select({
			...getTableColumns(portfolio),
			category: blogCategories.name
		})
		.from(portfolio)
		.leftJoin(blogCategories, eq(portfolio.categoryId, blogCategories.id))
		.where(eq(portfolio.slug, id))
		.limit(1)
		.then((res) => res[0]);

	if (!portfolioItems) {
		error(404, 'Blog post not found');
	}

	const result = await db
		.select({
			url: portfolioGallery.imageUrl
		})
		.from(portfolioGallery)

		.where(eq(portfolioGallery.blogId, portfolioItems.id));

	const images = result.map((img) => img.url);

	const videos = await db
		.select({
			id: blogVideos.id,
			videoUrl: blogVideos.videoUrl
		})
		.from(blogVideos)
		.where(eq(blogVideos.blogId, portfolioItems.id));
	return {
		portfolioItems,
		images,
		videos
	};
};
