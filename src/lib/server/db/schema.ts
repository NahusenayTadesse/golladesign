import {
	mysqlTable,
	mysqlEnum,
	varchar,
	text,
	int,
	boolean,
	datetime
} from 'drizzle-orm/mysql-core';

// ---------------------------------------------------------------------------
// Shared field helpers
// ---------------------------------------------------------------------------

/** DATETIME columns mapped to JS Date objects. */
const date = (name: string) => datetime(name, { mode: 'date', fsp: 3 });

/** createdAt + updatedAt mapped to JS Date objects. */
const timestamps = () => ({
	createdAt: date('created_at')
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: date('updated_at')
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date())
		.notNull()
});

/** Soft-delete fields. */
const softDelete = () => ({
	deletedAt: date('deleted_at'),
	deletedBy: varchar('deleted_by', { length: 255 })
});

/** Audit (created/updated by) fields. */
const auditFields = () => ({
	createdBy: varchar('created_by', { length: 255 }),
	updatedBy: varchar('updated_by', { length: 255 })
});

/** Auto-increment integer primary key. */
const id = () => int().autoincrement().primaryKey();

// ---------------------------------------------------------------------------
// Tables
// ---------------------------------------------------------------------------

export const account = mysqlTable('account', {
	id: varchar({ length: 36 }).primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: varchar('user_id', { length: 36 }).notNull(),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: date('access_token_expires_at'),
	refreshTokenExpiresAt: date('refresh_token_expires_at'),
	scope: text(),
	password: text(),
	...timestamps()
});

export const blog = mysqlTable('blog', {
	id: id(),
	title: varchar({ length: 255 }).notNull(),
	categoryId: int('category_id').notNull(),
	slug: varchar({ length: 255 }).notNull(),
	excerpt: text(),
	content: text(),
	isFeaturedOnHome: int('is_featured_on_home').default(0),
	featuredImage: varchar('featured_image', { length: 255 }),
	isActive: int('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const blogCategories = mysqlTable('blog_categories', {
	id: id(),
	name: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }).notNull()
});

export const blogGallery = mysqlTable('blog_gallery', {
	id: id(),
	blogId: int('blog_id').notNull(),
	imageUrl: varchar('image_url', { length: 255 })
});

export const blogVideos = mysqlTable('blog_videos', {
	id: id(),
	blogId: int('blog_id').notNull(),
	videoUrl: varchar('video_url', { length: 255 }).notNull(),
	isActive: int('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const contactMessages = mysqlTable('contact_messages', {
	id: id(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 100 }).notNull(),
	phone: varchar({ length: 20 }),
	subject: varchar({ length: 255 }).notNull(),
	message: text().notNull(),
	address: varchar({ length: 255 }),
	seen: int().default(0),
	...timestamps()
});

export const gallery = mysqlTable('gallery', {
	id: id(),
	imageUrl: varchar('image_url', { length: 255 })
});

export const permissions = mysqlTable('permissions', {
	id: id(),
	name: varchar({ length: 50 }).notNull(),
	description: varchar({ length: 255 })
});

export const portfolio = mysqlTable('portfolio', {
	id: id(),
	title: varchar({ length: 255 }).notNull(),
	slug: varchar({ length: 255 }).notNull(),
	description: text(),
	featuredImage: varchar({ length: 255 }),
	eventType: varchar({ length: 255 }),
	date: date('date'),
	client: varchar({ length: 255 }),
	location: varchar({ length: 255 }),
	isFeaturedOnHome: int('is_featured_on_home').default(0),
	isActive: int('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const portfolioGallery = mysqlTable('portfolio_gallery', {
	id: id(),
	portfolioId: int('portfolio_id').notNull(),
	imageUrl: varchar('image_url', { length: 255 })
});

export const quotes = mysqlTable('quotes', {
	id: id(),
	serviceType: varchar('service_type', { length: 100 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	phone: varchar({ length: 50 }),
	eventDate: date('event_date'),
	eventLocation: varchar('event_location', { length: 255 }),
	budgetRange: varchar('budget_range', { length: 100 }),
	guestCount: int('guest_count'),
	description: text(),
	status: varchar({ length: 50 }).default('pending'),
	...timestamps()
});

export const roles = mysqlTable('roles', {
	id: id(),
	name: varchar({ length: 32 }).notNull(),
	description: varchar({ length: 255 }),
	isActive: int('is_active').default(1).notNull()
});

export const rolePermissions = mysqlTable('role_permissions', {
	id: id(),
	roleId: int('role_id').notNull(),
	permissionId: int('permission_id').notNull(),
	isActive: int('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const services = mysqlTable('services', {
	id: id(),
	name: varchar({ length: 255 }).notNull(),
	description: text(),
	longDescription: text('long_description'),
	featuredImage: varchar('featured_image', { length: 255 }),
	isActive: int('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const serviceGallery = mysqlTable('service_gallery', {
	id: id(),
	serviceId: int('service_id').notNull(),
	imageUrl: varchar('image_url', { length: 255 })
});

export const session = mysqlTable('session', {
	id: varchar({ length: 36 }).primaryKey(),
	expiresAt: date('expires_at').notNull(),
	token: varchar({ length: 255 }).notNull().unique(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: varchar('user_id', { length: 36 }).notNull(),
	impersonatedBy: text('impersonated_by'),
	...timestamps()
});

export const specialPermissions = mysqlTable('special_permissions', {
	id: id(),
	userId: varchar('user_id', { length: 255 }).notNull(),
	permissionId: int('permission_id').notNull(),
	isActive: int('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const testimonials = mysqlTable('testimonials', {
	id: id(),
	name: varchar({ length: 255 }).notNull(),
	position: varchar({ length: 255 }),
	message: text().notNull(),
	avatar: varchar({ length: 255 }),
	isActive: int('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const user = mysqlTable('user', {
	id: varchar({ length: 36 }).primaryKey(),
	name: varchar({ length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull().unique(),
	emailVerified: int('email_verified').default(0).notNull(),
	image: text(),
	role: text(),
	banned: int(),
	banReason: text('ban_reason'),
	banExpires: date('ban_expires'),
	roleId: int('role_id'),
	...timestamps()
});

export const venueVideos = mysqlTable('venue_videos', {
	id: id(),
	venueId: int('venue_id').notNull(),
	videoUrl: varchar('video_url', { length: 255 }).notNull(),
	isActive: int('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const verification = mysqlTable('verification', {
	id: varchar({ length: 36 }).primaryKey(),
	identifier: varchar({ length: 255 }).notNull(),
	value: text().notNull(),
	expiresAt: date('expires_at').notNull(),
	...timestamps()
});

export const teamMembers = mysqlTable('teamMembers', {
	id: id(),
	name: varchar({ length: 255 }).notNull(),
	position: varchar({ length: 255 }),
	message: text().notNull(),
	avatar: varchar({ length: 255 }),
	isActive: int('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const projectCategories = mysqlTable('project_categories', {
	id: id(),
	name: varchar('name', { length: 255 }).notNull().unique(),
	description: text('description')
});

export const projects = mysqlTable('projects', {
	id: id(),
	title: varchar('title', { length: 255 }).notNull(),
	slug: varchar('slug', { length: 255 }).notNull().unique(),
	categoryId: int('category_id').references(() => projectCategories.id, {
		onDelete: 'set null'
	}),
	excerpt: text('excerpt').notNull(),
	content: text('content').notNull(),
	clientName: varchar('client_name', { length: 255 }),
	location: varchar('location', { length: 255 }),
	featuredImage: varchar('featured_image', { length: 255 }).notNull(),
	blueprintUrl: varchar('blueprint_url', { length: 255 }),
	isFeatured: boolean('is_featured').default(false).notNull(),
	status: mysqlEnum('status', ['draft', 'published', 'archived']).default('draft').notNull(),
	completedAt: date('completed_at')
});

export const projectImages = mysqlTable('project_images', {
	id: id(),
	projectId: int('project_id').notNull(),
	imageUrl: varchar('image_url', { length: 255 }).notNull(),
	isFeatured: int('is_featured').default(0),
	isActive: int('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const projectVideos = mysqlTable('project_videos', {
	id: id(),
	projectId: int('project_id').notNull(),
	videoUrl: varchar('video_url', { length: 255 }).notNull(),
	isActive: int('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});
