import { db } from '$lib/server/db';
import { eq, getTableColumns } from 'drizzle-orm';

import {
	portfolio,
	testimonials,
	services,
	blog,
	blogCategories,
	gallery,
	serviceGallery,
	teamMembers
} from '$lib/server/db/schema';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	// First, get products
	const portfolioItems = await db.select().from(portfolio).where(eq(portfolio.isFeaturedOnHome, 1));
	const testimonialList = await db
		.select({
			name: testimonials.name,
			position: testimonials.position,
			testimonial: testimonials.message,
			avatar: testimonials.avatar
		})
		.from(testimonials);

	// Then, get services along with their gallery images, so cards can advertise
	// how many extra photos sit behind each service.
	const serviceRows = await db.select().from(services);
	const serviceImages = await db
		.select({ serviceId: serviceGallery.serviceId, imageUrl: serviceGallery.imageUrl })
		.from(serviceGallery);

	const servicesItems = serviceRows.map((service) => ({
		...service,
		galleryImages: serviceImages
			.filter((img) => img.serviceId === service.id)
			.map((img) => img.imageUrl)
			.filter((url): url is string => Boolean(url))
	}));

	const teamList = await db
		.select({
			id: teamMembers.id,
			name: teamMembers.name,
			position: teamMembers.position,
			description: teamMembers.message,
			avatar: teamMembers.avatar
		})
		.from(teamMembers);

	const blogItems = await db
		.select({
			...getTableColumns(blog),
			category: blogCategories.name
		})
		.from(blog)
		.leftJoin(blogCategories, eq(blog.categoryId, blogCategories.id));

	const images = await db.select().from(gallery);

	const imagesList = images.map((img) => img.imageUrl);

	return {
		portfolioItems,
		servicesItems,
		blogItems,
		testimonialList,
		teamMembers: teamList,
		imagesList
	};
};
