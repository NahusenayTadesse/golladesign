import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { projects, projectCategories, projectImages, projectVideos } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	// Destination param mapping where route template reads [slug]
	const { id } = params;

	const slug = id;

	// 1. Fetch the primary target architectural project case study
	const currentProject = await db
		.select()
		.from(projects)
		.where(eq(projects.slug, slug))
		.limit(1)
		.then((res) => res[0]);

	// Safeguard frame for missing layout entries
	if (!currentProject) {
		throw error(404, {
			message: `Architectural case file [${slug}] could not be located in studio indexes.`
		});
	}

	// 2. Resolve relational joins concurrently to minimize execution waterfalls
	const [categoryResult, imagesResult, videosResult] = await Promise.all([
		currentProject.categoryId
			? db
					.select()
					.from(projectCategories)
					.where(eq(projectCategories.id, currentProject.categoryId))
					.limit(1)
					.then((res) => res[0])
			: null,

		db
			.select({
				id: projectImages.id,
				imageUrl: projectImages.imageUrl
			})
			.from(projectImages)
			.where(
				and(
					eq(projectImages.projectId, currentProject.id),
					eq(projectImages.isActive, 1) // Only source active assets
				)
			),

		db
			.select({
				id: projectVideos.id,
				videoUrl: projectVideos.videoUrl,
				isActive: projectVideos.isActive
			})
			.from(projectVideos)
			.where(and(eq(projectVideos.projectId, currentProject.id), eq(projectVideos.isActive, 1)))
	]);

	const images = imagesResult.map((img) => img.imageUrl);

	return {
		project: currentProject,
		category: categoryResult,
		images,
		videos: videosResult
	};
};
