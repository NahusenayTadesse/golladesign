import {
	mysqlTable,
	mysqlEnum,
	varchar,
	text,
	int,
	boolean,
	datetime,
	index,
	uniqueIndex
} from 'drizzle-orm/mysql-core';
import { contactStatuses, projectTypes, publishStatuses, quoteStatuses } from '../../enums';

export { contactStatuses, projectTypes, publishStatuses, quoteStatuses };

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

/** Audit (created/updated by) fields. */
const auditFields = () => ({
	createdBy: varchar('created_by', { length: 255 }),
	updatedBy: varchar('updated_by', { length: 255 })
});

/** Auto-increment integer primary key. */
const id = () => int().autoincrement().primaryKey();

/** Lower numbers are shown first. */
const sortOrder = () => int('sort_order').default(0).notNull();

/** Per-page SEO overrides; empty means "derive from the content". */
const seoFields = () => ({
	metaTitle: varchar('meta_title', { length: 255 }),
	metaDescription: varchar('meta_description', { length: 500 }),
	ogImage: varchar('og_image', { length: 255 })
});

/** Alt text, caption and ordering for gallery images. */
const imageFields = () => ({
	altText: varchar('alt_text', { length: 255 }),
	caption: varchar({ length: 255 }),
	sortOrder: sortOrder()
});

/** Draft content is only visible in the dashboard. */
const publishStatus = () => mysqlEnum('status', publishStatuses).default('published').notNull();

// ---------------------------------------------------------------------------
// Auth, users and permissions
// ---------------------------------------------------------------------------

export const roles = mysqlTable('roles', {
	id: id(),
	name: varchar({ length: 32 }).notNull().unique(),
	description: varchar({ length: 255 }),
	isActive: int('is_active').default(1).notNull()
});

export const permissions = mysqlTable('permissions', {
	id: id(),
	name: varchar({ length: 50 }).notNull().unique(),
	description: varchar({ length: 255 })
});

export const rolePermissions = mysqlTable(
	'role_permissions',
	{
		id: id(),
		roleId: int('role_id')
			.notNull()
			.references(() => roles.id, { onDelete: 'cascade' }),
		permissionId: int('permission_id')
			.notNull()
			.references(() => permissions.id, { onDelete: 'cascade' }),
		isActive: int('is_active').default(1).notNull(),
		...auditFields(),
		...timestamps()
	},
	(t) => [uniqueIndex('role_permission_unique').on(t.roleId, t.permissionId)]
);

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
	roleId: int('role_id').references(() => roles.id, { onDelete: 'set null' }),
	...timestamps()
});

export const session = mysqlTable('session', {
	id: varchar({ length: 36 }).primaryKey(),
	expiresAt: date('expires_at').notNull(),
	token: varchar({ length: 255 }).notNull().unique(),
	ipAddress: text('ip_address'),
	userAgent: text('user_agent'),
	userId: varchar('user_id', { length: 36 })
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	impersonatedBy: text('impersonated_by'),
	...timestamps()
});

export const account = mysqlTable('account', {
	id: varchar({ length: 36 }).primaryKey(),
	accountId: text('account_id').notNull(),
	providerId: text('provider_id').notNull(),
	userId: varchar('user_id', { length: 36 })
		.notNull()
		.references(() => user.id, { onDelete: 'cascade' }),
	accessToken: text('access_token'),
	refreshToken: text('refresh_token'),
	idToken: text('id_token'),
	accessTokenExpiresAt: date('access_token_expires_at'),
	refreshTokenExpiresAt: date('refresh_token_expires_at'),
	scope: text(),
	password: text(),
	...timestamps()
});

export const verification = mysqlTable('verification', {
	id: varchar({ length: 36 }).primaryKey(),
	identifier: varchar({ length: 255 }).notNull(),
	value: text().notNull(),
	expiresAt: date('expires_at').notNull(),
	...timestamps()
});

// ---------------------------------------------------------------------------
// Services
// ---------------------------------------------------------------------------

export const services = mysqlTable('services', {
	id: id(),
	name: varchar({ length: 255 }).notNull(),
	slug: varchar({ length: 255 }).notNull().unique(),
	description: text(),
	longDescription: text('long_description'),
	featuredImage: varchar('featured_image', { length: 255 }),
	status: publishStatus(),
	isFeatured: boolean('is_featured').default(false).notNull(),
	sortOrder: sortOrder(),
	nameAm: varchar('name_am', { length: 255 }),
	descriptionAm: text('description_am'),
	longDescriptionAm: text('long_description_am'),
	...seoFields(),
	...auditFields(),
	...timestamps()
});

export const serviceGallery = mysqlTable('service_gallery', {
	id: id(),
	serviceId: int('service_id')
		.notNull()
		.references(() => services.id, { onDelete: 'cascade' }),
	imageUrl: varchar('image_url', { length: 255 }),
	...imageFields()
});

// ---------------------------------------------------------------------------
// Projects (portfolio case studies)
// ---------------------------------------------------------------------------

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
	serviceId: int('service_id').references(() => services.id, { onDelete: 'set null' }),
	excerpt: text('excerpt').notNull(),
	content: text('content').notNull(),
	clientName: varchar('client_name', { length: 255 }),
	location: varchar('location', { length: 255 }),
	projectType: mysqlEnum('project_type', projectTypes),
	areaSqm: int('area_sqm'),
	floors: int(),
	yearCompleted: int('year_completed'),
	duration: varchar({ length: 100 }),
	featuredImage: varchar('featured_image', { length: 255 }).notNull(),
	blueprintUrl: varchar('blueprint_url', { length: 255 }),
	isFeatured: boolean('is_featured').default(false).notNull(),
	sortOrder: sortOrder(),
	status: publishStatus(),
	completedAt: date('completed_at'),
	titleAm: varchar('title_am', { length: 255 }),
	excerptAm: text('excerpt_am'),
	contentAm: text('content_am'),
	...seoFields(),
	...auditFields(),
	...timestamps()
});

export const projectImages = mysqlTable('project_images', {
	id: id(),
	projectId: int('project_id')
		.notNull()
		.references(() => projects.id, { onDelete: 'cascade' }),
	imageUrl: varchar('image_url', { length: 255 }).notNull(),
	isFeatured: int('is_featured').default(0),
	...imageFields(),
	...timestamps()
});

export const projectVideos = mysqlTable('project_videos', {
	id: id(),
	projectId: int('project_id')
		.notNull()
		.references(() => projects.id, { onDelete: 'cascade' }),
	videoUrl: varchar('video_url', { length: 255 }).notNull(),
	sortOrder: sortOrder(),
	...timestamps()
});

/** Before/after image pairs shown as a comparison slider on the case study. */
export const projectBeforeAfter = mysqlTable('project_before_after', {
	id: id(),
	projectId: int('project_id')
		.notNull()
		.references(() => projects.id, { onDelete: 'cascade' }),
	beforeUrl: varchar('before_url', { length: 255 }).notNull(),
	afterUrl: varchar('after_url', { length: 255 }).notNull(),
	caption: varchar({ length: 255 }),
	sortOrder: sortOrder(),
	...timestamps()
});

// ---------------------------------------------------------------------------
// Blog
// ---------------------------------------------------------------------------

export const blogCategories = mysqlTable('blog_categories', {
	id: id(),
	name: varchar({ length: 255 }).notNull(),
	description: varchar({ length: 255 }).notNull()
});

export const blog = mysqlTable('blog', {
	id: id(),
	title: varchar({ length: 255 }).notNull(),
	categoryId: int('category_id').references(() => blogCategories.id, { onDelete: 'set null' }),
	slug: varchar({ length: 255 }).notNull().unique(),
	excerpt: text(),
	content: text(),
	isFeaturedOnHome: int('is_featured_on_home').default(0),
	featuredImage: varchar('featured_image', { length: 255 }),
	status: publishStatus(),
	publishedAt: date('published_at'),
	authorId: varchar('author_id', { length: 36 }).references(() => user.id, {
		onDelete: 'set null'
	}),
	titleAm: varchar('title_am', { length: 255 }),
	excerptAm: text('excerpt_am'),
	contentAm: text('content_am'),
	...seoFields(),
	...auditFields(),
	...timestamps()
});

export const blogGallery = mysqlTable('blog_gallery', {
	id: id(),
	blogId: int('blog_id')
		.notNull()
		.references(() => blog.id, { onDelete: 'cascade' }),
	imageUrl: varchar('image_url', { length: 255 }),
	...imageFields()
});

export const blogVideos = mysqlTable('blog_videos', {
	id: id(),
	blogId: int('blog_id')
		.notNull()
		.references(() => blog.id, { onDelete: 'cascade' }),
	videoUrl: varchar('video_url', { length: 255 }).notNull(),
	sortOrder: sortOrder(),
	...timestamps()
});

// ---------------------------------------------------------------------------
// People and social proof
// ---------------------------------------------------------------------------

export const teamMembers = mysqlTable('teamMembers', {
	id: id(),
	name: varchar({ length: 255 }).notNull(),
	position: varchar({ length: 255 }),
	message: text().notNull(),
	avatar: varchar({ length: 255 }),
	isActive: int('is_active').default(1).notNull(),
	sortOrder: sortOrder(),
	positionAm: varchar('position_am', { length: 255 }),
	messageAm: text('message_am'),
	...auditFields(),
	...timestamps()
});

export const testimonials = mysqlTable('testimonials', {
	id: id(),
	name: varchar({ length: 255 }).notNull(),
	position: varchar({ length: 255 }),
	clientCompany: varchar('client_company', { length: 255 }),
	message: text().notNull(),
	avatar: varchar({ length: 255 }),
	rating: int(),
	projectId: int('project_id').references(() => projects.id, { onDelete: 'set null' }),
	isActive: int('is_active').default(1).notNull(),
	isFeatured: boolean('is_featured').default(false).notNull(),
	sortOrder: sortOrder(),
	messageAm: text('message_am'),
	...auditFields(),
	...timestamps()
});

/** Partner / client logos. */
export const gallery = mysqlTable('gallery', {
	id: id(),
	imageUrl: varchar('image_url', { length: 255 }),
	...imageFields()
});

export const faqs = mysqlTable('faqs', {
	id: id(),
	question: varchar({ length: 255 }).notNull(),
	answer: text().notNull(),
	questionAm: varchar('question_am', { length: 255 }),
	answerAm: text('answer_am'),
	isActive: boolean('is_active').default(true).notNull(),
	sortOrder: sortOrder(),
	...auditFields(),
	...timestamps()
});

// ---------------------------------------------------------------------------
// Leads
// ---------------------------------------------------------------------------

export const contactMessages = mysqlTable(
	'contact_messages',
	{
		id: id(),
		name: varchar({ length: 255 }).notNull(),
		email: varchar({ length: 100 }).notNull(),
		phone: varchar({ length: 20 }),
		subject: varchar({ length: 255 }).notNull(),
		message: text().notNull(),
		address: varchar({ length: 255 }),
		seen: int().default(0),
		status: mysqlEnum('status', contactStatuses).default('new').notNull(),
		notes: text(),
		assignedTo: varchar('assigned_to', { length: 36 }).references(() => user.id, {
			onDelete: 'set null'
		}),
		...timestamps()
	},
	(t) => [index('contact_status_idx').on(t.status)]
);

/** Consultation / quote requests from the public site, worked through as a pipeline. */
export const quotes = mysqlTable(
	'quotes',
	{
		id: id(),
		name: varchar({ length: 255 }).notNull(),
		email: varchar({ length: 255 }).notNull(),
		phone: varchar({ length: 50 }),
		serviceId: int('service_id').references(() => services.id, { onDelete: 'set null' }),
		serviceType: varchar('service_type', { length: 100 }),
		location: varchar({ length: 255 }),
		plotSize: varchar('plot_size', { length: 100 }),
		budgetRange: varchar('budget_range', { length: 100 }),
		timeline: varchar({ length: 100 }),
		description: text(),
		status: mysqlEnum('status', quoteStatuses).default('new').notNull(),
		notes: text(),
		assignedTo: varchar('assigned_to', { length: 36 }).references(() => user.id, {
			onDelete: 'set null'
		}),
		...timestamps()
	},
	(t) => [index('quote_status_idx').on(t.status)]
);

// ---------------------------------------------------------------------------
// Site configuration and audit
// ---------------------------------------------------------------------------

/** Editable contact details and links; missing keys fall back to the defaults in $lib/site. */
export const siteSettings = mysqlTable('site_settings', {
	key: varchar({ length: 64 }).primaryKey(),
	value: text().notNull(),
	updatedBy: varchar('updated_by', { length: 36 }),
	updatedAt: date('updated_at')
		.$defaultFn(() => new Date())
		.$onUpdateFn(() => new Date())
		.notNull()
});

export const activityLog = mysqlTable(
	'activity_log',
	{
		id: id(),
		userId: varchar('user_id', { length: 36 }).references(() => user.id, {
			onDelete: 'set null'
		}),
		action: varchar({ length: 32 }).notNull(),
		entity: varchar({ length: 64 }).notNull(),
		entityId: varchar('entity_id', { length: 64 }),
		summary: varchar({ length: 255 }),
		createdAt: date('created_at')
			.$defaultFn(() => new Date())
			.notNull()
	},
	(t) => [index('activity_created_idx').on(t.createdAt)]
);
