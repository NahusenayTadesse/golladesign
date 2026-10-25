// Queries for the public site. Everything here only returns published/active
// content, in the order set in the dashboard, translated when Amharic is chosen.
import { and, asc, desc, eq, getTableColumns, inArray, or } from 'drizzle-orm';
import { db } from '$lib/server/db';
import {
	blog,
	blogCategories,
	blogGallery,
	blogVideos,
	faqs,
	gallery,
	projectBeforeAfter,
	projectCategories,
	projectImages,
	projects,
	projectVideos,
	serviceGallery,
	services,
	teamMembers,
	testimonials
} from '$lib/server/db/schema';
import { tr, type Lang } from '$lib/i18n';

const published = <T extends { status: unknown }>(table: T) =>
	eq(table.status as never, 'published');

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export async function getNavServices() {
	return db
		.select({ id: services.id, name: services.name, nameAm: services.nameAm, slug: services.slug })
		.from(services)
		.where(published(services))
		.orderBy(asc(services.sortOrder), asc(services.id));
}

export async function getServices(lang: Lang) {
	const rows = await db
		.select()
		.from(services)
		.where(published(services))
		.orderBy(asc(services.sortOrder), asc(services.id));
	if (!rows.length) return [];

	const images = await db
		.select({ serviceId: serviceGallery.serviceId, imageUrl: serviceGallery.imageUrl })
		.from(serviceGallery)
		.where(
			inArray(
				serviceGallery.serviceId,
				rows.map((r) => r.id)
			)
		)
		.orderBy(asc(serviceGallery.sortOrder), asc(serviceGallery.id));

	// Only what the cards show; everything returned here is serialized into the page.
	return rows.map((s) => ({
		id: s.id,
		slug: s.slug,
		featuredImage: s.featuredImage,
		name: tr(s, 'name', lang),
		description: tr(s, 'description', lang),
		galleryImages: images
			.filter((img) => img.serviceId === s.id && img.imageUrl)
			.map((img) => img.imageUrl as string)
	}));
}

/** Looks a service up by slug, or by its old numeric id (so old links keep working). */
export async function getService(slugOrId: string, lang: Lang) {
	const asId = /^\d+$/.test(slugOrId) ? Number(slugOrId) : null;
	const [service] = await db
		.select()
		.from(services)
		.where(
			and(
				published(services),
				asId ? or(eq(services.slug, slugOrId), eq(services.id, asId)) : eq(services.slug, slugOrId)
			)
		)
		.limit(1);
	if (!service) return null;

	const images = await db
		.select({
			url: serviceGallery.imageUrl,
			alt: serviceGallery.altText,
			caption: serviceGallery.caption
		})
		.from(serviceGallery)
		.where(eq(serviceGallery.serviceId, service.id))
		.orderBy(asc(serviceGallery.sortOrder), asc(serviceGallery.id));

	const relatedProjects = await getProjects(lang, { serviceId: service.id, limit: 6 });

	return {
		service: {
			...service,
			name: tr(service, 'name', lang),
			description: tr(service, 'description', lang),
			longDescription: tr(service, 'longDescription', lang)
		},
		images: images.filter((i): i is typeof i & { url: string } => Boolean(i.url)),
		relatedProjects
	};
}

// ---------------------------------------------------------------------------
// Projects
// ---------------------------------------------------------------------------

export async function getProjects(
	lang: Lang,
	opts: { featured?: boolean; serviceId?: number; limit?: number } = {}
) {
	const filters = [published(projects)];
	if (opts.featured) filters.push(eq(projects.isFeatured, true));
	if (opts.serviceId) filters.push(eq(projects.serviceId, opts.serviceId));

	const query = db
		.select({ ...getTableColumns(projects), category: projectCategories.name })
		.from(projects)
		.leftJoin(projectCategories, eq(projects.categoryId, projectCategories.id))
		.where(and(...filters))
		.orderBy(desc(projects.isFeatured), asc(projects.sortOrder), desc(projects.completedAt));

	const rows = opts.limit ? await query.limit(opts.limit) : await query;
	// Card fields only; the full content is loaded on the project page.
	return rows.map((p) => ({
		id: p.id,
		slug: p.slug,
		featuredImage: p.featuredImage,
		clientName: p.clientName,
		location: p.location,
		isFeatured: p.isFeatured,
		title: tr(p, 'title', lang),
		excerpt: tr(p, 'excerpt', lang),
		content: null,
		description: null,
		category: p.category ?? '',
		completedAt: p.completedAt ? p.completedAt.toISOString() : null
	}));
}

export async function getProject(slug: string, lang: Lang) {
	const [project] = await db
		.select()
		.from(projects)
		.where(and(eq(projects.slug, slug), published(projects)))
		.limit(1);
	if (!project) return null;

	const [category, service, images, videos, beforeAfter, projectTestimonials] = await Promise.all([
		project.categoryId
			? db
					.select()
					.from(projectCategories)
					.where(eq(projectCategories.id, project.categoryId))
					.then((r) => r[0] ?? null)
			: null,
		project.serviceId
			? db
					.select({ name: services.name, nameAm: services.nameAm, slug: services.slug })
					.from(services)
					.where(and(eq(services.id, project.serviceId), published(services)))
					.then((r) => (r[0] ? { ...r[0], name: tr(r[0], 'name', lang) } : null))
			: null,
		db
			.select()
			.from(projectImages)
			.where(eq(projectImages.projectId, project.id))
			.orderBy(asc(projectImages.sortOrder), asc(projectImages.id)),
		db
			.select()
			.from(projectVideos)
			.where(eq(projectVideos.projectId, project.id))
			.orderBy(asc(projectVideos.sortOrder), asc(projectVideos.id)),
		db
			.select()
			.from(projectBeforeAfter)
			.where(eq(projectBeforeAfter.projectId, project.id))
			.orderBy(asc(projectBeforeAfter.sortOrder), asc(projectBeforeAfter.id)),
		getTestimonials(lang, { projectId: project.id })
	]);

	return {
		project: {
			...project,
			title: tr(project, 'title', lang),
			excerpt: tr(project, 'excerpt', lang),
			content: tr(project, 'content', lang)
		},
		category,
		service,
		images,
		videos,
		beforeAfter,
		testimonials: projectTestimonials
	};
}

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

function localizeBlog<T extends typeof blog.$inferSelect>(b: T, lang: Lang) {
	return {
		...b,
		title: tr(b, 'title', lang),
		excerpt: tr(b, 'excerpt', lang),
		content: tr(b, 'content', lang),
		// The blog card reads `date`.
		date: (b.publishedAt ?? b.createdAt)?.toISOString() ?? null
	};
}

export async function getBlogs(lang: Lang, limit?: number) {
	const query = db
		.select({ ...getTableColumns(blog), category: blogCategories.name })
		.from(blog)
		.leftJoin(blogCategories, eq(blog.categoryId, blogCategories.id))
		.where(published(blog))
		.orderBy(desc(blog.publishedAt), desc(blog.id));
	const rows = limit ? await query.limit(limit) : await query;
	return rows.map((b) => {
		const post = localizeBlog(b, lang);
		return {
			id: post.id,
			slug: post.slug,
			title: post.title,
			excerpt: post.excerpt,
			featuredImage: post.featuredImage,
			date: post.date,
			createdAt: post.createdAt,
			category: b.category ?? '',
			// Plain text for the list page search; the HTML is only needed on the post page.
			content: (post.content ?? '')
				.replace(/<[^>]*>/g, ' ')
				.replace(/\s+/g, ' ')
				.trim()
				.slice(0, 2000)
		};
	});
}

export async function getBlog(slug: string, lang: Lang) {
	const [post] = await db
		.select({ ...getTableColumns(blog), category: blogCategories.name })
		.from(blog)
		.leftJoin(blogCategories, eq(blog.categoryId, blogCategories.id))
		.where(and(eq(blog.slug, slug), published(blog)))
		.limit(1);
	if (!post) return null;

	const [images, videos] = await Promise.all([
		db
			.select({ url: blogGallery.imageUrl, alt: blogGallery.altText })
			.from(blogGallery)
			.where(eq(blogGallery.blogId, post.id))
			.orderBy(asc(blogGallery.sortOrder), asc(blogGallery.id)),
		db
			.select({ id: blogVideos.id, videoUrl: blogVideos.videoUrl })
			.from(blogVideos)
			.where(eq(blogVideos.blogId, post.id))
			.orderBy(asc(blogVideos.sortOrder), asc(blogVideos.id))
	]);

	return {
		post: { ...localizeBlog(post, lang), category: post.category ?? '' },
		images: images.map((i) => i.url).filter((u): u is string => Boolean(u)),
		videos
	};
}

// ---------------------------------------------------------------------------
// People, logos, FAQs
// ---------------------------------------------------------------------------

export async function getTestimonials(
	lang: Lang,
	opts: { featured?: boolean; projectId?: number } = {}
) {
	const filters = [eq(testimonials.isActive, 1)];
	if (opts.featured) filters.push(eq(testimonials.isFeatured, true));
	if (opts.projectId) filters.push(eq(testimonials.projectId, opts.projectId));

	const rows = await db
		.select()
		.from(testimonials)
		.where(and(...filters))
		.orderBy(desc(testimonials.isFeatured), asc(testimonials.sortOrder), asc(testimonials.id));

	return rows.map((t) => ({
		name: t.name,
		position: [t.position, t.clientCompany].filter(Boolean).join(', '),
		testimonial: tr(t, 'message', lang),
		avatar: t.avatar ?? undefined,
		rating: t.rating
	}));
}

export async function getTeam(lang: Lang) {
	const rows = await db
		.select()
		.from(teamMembers)
		.where(eq(teamMembers.isActive, 1))
		.orderBy(asc(teamMembers.sortOrder), asc(teamMembers.id));
	return rows.map((m) => ({
		id: m.id,
		name: m.name,
		position: tr(m, 'position', lang),
		description: tr(m, 'message', lang),
		avatar: m.avatar
	}));
}

export async function getPartnerLogos() {
	const rows = await db.select().from(gallery).orderBy(asc(gallery.sortOrder), asc(gallery.id));
	return rows.map((r) => r.imageUrl).filter((u): u is string => Boolean(u));
}

export async function getFaqs(lang: Lang) {
	const rows = await db
		.select()
		.from(faqs)
		.where(eq(faqs.isActive, true))
		.orderBy(asc(faqs.sortOrder), asc(faqs.id));
	return rows.map((f) => ({
		id: f.id,
		question: tr(f, 'question', lang),
		answer: tr(f, 'answer', lang)
	}));
}
