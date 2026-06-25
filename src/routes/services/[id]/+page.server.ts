import { db } from '$lib/server/db';
import { services as portfolio, serviceGallery as portfolioGallery } from '$lib/server/db/schema';
import { eq, getTableColumns } from 'drizzle-orm';

import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async ({ params }) => {
	const { id } = params;
	// First, get products
	const portfolioItems = await db
		.select()
		.from(portfolio)
		.where(eq(portfolio.id, Number(id)))
		.limit(1)
		.then((res) => res[0]);

	const result = await db
		.select({
			url: portfolioGallery.imageUrl
		})
		.from(portfolioGallery)

		.where(eq(portfolioGallery.serviceId, portfolioItems.id));

	const images = result.map((img) => img.url);

	return {
		portfolioItems,
		images
	};
};
