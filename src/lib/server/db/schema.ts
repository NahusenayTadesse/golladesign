import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

// ---------------------------------------------------------------------------
// Shared field helpers
// ---------------------------------------------------------------------------

/** createdAt + updatedAt mapped to JS Date objects via integer({ mode: 'timestamp' }). */
const timestamps = () => ({
	createdAt: integer('created_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: integer('updated_at', { mode: 'timestamp' })
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date())
		.notNull()
});

/** Soft-delete fields. */
const softDelete = () => ({
	deletedAt: integer('deleted_at', { mode: 'timestamp' }),
	deletedBy: text('deleted_by', { length: 255 })
});

/** Audit (created/updated by) fields. */
const auditFields = () => ({
	createdBy: text('created_by', { length: 255 }),
	updatedBy: text('updated_by', { length: 255 })
});

// ---------------------------------------------------------------------------
// Tables
// ---------------------------------------------------------------------------

export const account = sqliteTable('account', {
	id: text({ length: 36 }).primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: text('user_id', { length: 36 }).notNull(),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: integer('access_token_expires_at', { mode: 'timestamp' }),
	refreshTokenExpiresAt: integer('refresh_token_expires_at', { mode: 'timestamp' }),
	scope: text(),
	password: text(),
	...timestamps()
});

export const blog = sqliteTable('blog', {
	id: integer().primaryKey({ autoIncrement: true }),
	title: text({ length: 255 }).notNull(),
	categoryId: integer('category_id').notNull(),
	slug: text({ length: 255 }).notNull(),
	excerpt: text(),
	content: text(),
	isFeaturedOnHome: integer('is_featured_on_home').default(0),
	featuredImage: text('featured_image', { length: 255 }),
	isActive: integer('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const blogCategories = sqliteTable('blog_categories', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text({ length: 255 }).notNull(),
	description: text({ length: 255 }).notNull()
});

export const blogGallery = sqliteTable('blog_gallery', {
	id: integer().primaryKey({ autoIncrement: true }),
	blogId: integer('blog_id').notNull(),
	imageUrl: text('image_url', { length: 255 })
});

export const blogVideos = sqliteTable('blog_videos', {
	id: integer().primaryKey({ autoIncrement: true }),
	blogId: integer('blog_id').notNull(),
	videoUrl: text('video_url', { length: 255 }).notNull(),
	isActive: integer('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const contactMessages = sqliteTable('contact_messages', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text({ length: 255 }).notNull(),
	email: text({ length: 100 }).notNull(),
	phone: text({ length: 20 }),
	subject: text({ length: 255 }).notNull(),
	message: text().notNull(),
	address: text({ length: 255 }),
	seen: integer().default(0),
	...timestamps()
});

export const gallery = sqliteTable('gallery', {
	id: integer().primaryKey({ autoIncrement: true }),
	imageUrl: text('image_url', { length: 255 })
});

export const permissions = sqliteTable('permissions', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text({ length: 50 }).notNull(),
	description: text({ length: 255 })
});

export const portfolio = sqliteTable('portfolio', {
	id: integer().primaryKey({ autoIncrement: true }),
	title: text({ length: 255 }).notNull(),
	slug: text({ length: 255 }).notNull(),
	description: text(),
	featuredImage: text({ length: 255 }),
	eventType: text({ length: 255 }),
	date: integer({ mode: 'timestamp' }),
	client: text({ length: 255 }),
	location: text({ length: 255 }),
	isFeaturedOnHome: integer('is_featured_on_home').default(0),
	isActive: integer('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const portfolioGallery = sqliteTable('portfolio_gallery', {
	id: integer().primaryKey({ autoIncrement: true }),
	portfolioId: integer('portfolio_id').notNull(),
	imageUrl: text('image_url', { length: 255 })
});

export const quotes = sqliteTable('quotes', {
	id: integer().primaryKey({ autoIncrement: true }),
	serviceType: text('service_type', { length: 100 }).notNull(),
	name: text({ length: 255 }).notNull(),
	email: text({ length: 255 }).notNull(),
	phone: text({ length: 50 }),
	eventDate: integer('event_date', { mode: 'timestamp' }),
	eventLocation: text('event_location', { length: 255 }),
	budgetRange: text('budget_range', { length: 100 }),
	guestCount: integer('guest_count'),
	description: text(),
	status: text({ length: 50 }).default('pending'),
	...timestamps()
});

export const roles = sqliteTable('roles', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text({ length: 32 }).notNull(),
	description: text({ length: 255 }),
	isActive: integer('is_active').default(1).notNull()
});

export const rolePermissions = sqliteTable('role_permissions', {
	id: integer().primaryKey({ autoIncrement: true }),
	roleId: integer('role_id').notNull(),
	permissionId: integer('permission_id').notNull(),
	isActive: integer('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const services = sqliteTable('services', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text({ length: 255 }).notNull(),
	description: text(),
	longDescription: text('long_description'),
	featuredImage: text('featured_image', { length: 255 }),
	isActive: integer('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const serviceGallery = sqliteTable('service_gallery', {
	id: integer().primaryKey({ autoIncrement: true }),
	serviceId: integer('service_id').notNull(),
	imageUrl: text('image_url', { length: 255 })
});

export const session = sqliteTable('session', {
	id: text({ length: 36 }).primaryKey(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	token: text({ length: 255 }).notNull(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: text('user_id', { length: 36 }).notNull(),
	impersonatedBy: text('impersonated_by'),
	...timestamps()
});

export const specialPermissions = sqliteTable('special_permissions', {
	id: integer().primaryKey({ autoIncrement: true }),
	userId: text('user_id', { length: 255 }).notNull(),
	permissionId: integer('permission_id').notNull(),
	isActive: integer('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const testimonials = sqliteTable('testimonials', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text({ length: 255 }).notNull(),
	position: text({ length: 255 }),
	message: text().notNull(),
	avatar: text({ length: 255 }),
	isActive: integer('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const user = sqliteTable('user', {
	id: text({ length: 36 }).primaryKey(),
	name: text({ length: 255 }).notNull(),
	email: text({ length: 255 }).notNull(),
	emailVerified: integer('email_verified').default(0).notNull(),
	image: text(),
	role: text(),
	banned: integer(),
	banReason: text('ban_reason'),
	banExpires: integer('ban_expires', { mode: 'timestamp' }),
	roleId: integer('role_id'),
	...timestamps()
});

export const venueBooking = sqliteTable('venue_booking', {
	id: integer().primaryKey({ autoIncrement: true }),
	venueId: integer('venue_id').notNull(),
	guestCount: integer('guest_count'),
	description: text(),
	status: text({ length: 50 }).default('pending'),
	...timestamps()
});

export const venueDetails = sqliteTable('venue_details', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text({ length: 255 }).default('4 Kilo Plaza'),
	description: text(),
	capacity: integer(),
	bookingPolicy: text('booking_policy'),
	isActive: integer('is_active').default(1).notNull(),
	featuredImage: text({ length: 255 }),
	location: text({ length: 255 }),
	enableLottery: integer('enable_lottery').default(0).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const venueFeatures = sqliteTable('venue_features', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text({ length: 255 }),
	description: text(),
	venueId: integer('venue_id').notNull()
});

export const venueLottery = sqliteTable('venue_lottery', {
	id: integer().primaryKey({ autoIncrement: true }),
	venueId: integer('venue_id').notNull(),
	name: text({ length: 255 }),
	phone: text({ length: 20 }),
	email: text({ length: 255 }),
	...timestamps()
});

export const venueImages = sqliteTable('venue_images', {
	id: integer().primaryKey({ autoIncrement: true }),
	venueId: integer('venue_id').notNull(),
	imageUrl: text('image_url', { length: 255 }).notNull(),
	isFeatured: integer('is_featured').default(0),
	isActive: integer('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const venueVideos = sqliteTable('venue_videos', {
	id: integer().primaryKey({ autoIncrement: true }),
	venueId: integer('venue_id').notNull(),
	videoUrl: text('video_url', { length: 255 }).notNull(),
	isActive: integer('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});

export const verification = sqliteTable('verification', {
	id: text({ length: 36 }).primaryKey(),
	identifier: text({ length: 255 }).notNull(),
	value: text().notNull(),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
	...timestamps()
});

export const teamMembers = sqliteTable('teamMembers', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text({ length: 255 }).notNull(),
	position: text({ length: 255 }),
	message: text().notNull(),
	avatar: text({ length: 255 }),
	isActive: integer('is_active').default(1).notNull(),
	...auditFields(),
	...timestamps(),
	...softDelete()
});
