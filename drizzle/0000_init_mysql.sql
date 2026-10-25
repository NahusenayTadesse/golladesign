CREATE TABLE `account` (
	`id` varchar(36) NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` varchar(36) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` datetime(3),
	`refresh_token_expires_at` datetime(3),
	`scope` text,
	`password` text,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `account_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `activity_log` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(36),
	`action` varchar(32) NOT NULL,
	`entity` varchar(64) NOT NULL,
	`entity_id` varchar(64),
	`summary` varchar(255),
	`created_at` datetime(3) NOT NULL,
	CONSTRAINT `activity_log_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`category_id` int,
	`slug` varchar(255) NOT NULL,
	`excerpt` text,
	`content` text,
	`is_featured_on_home` int DEFAULT 0,
	`featured_image` varchar(255),
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'published',
	`published_at` datetime(3),
	`author_id` varchar(36),
	`title_am` varchar(255),
	`excerpt_am` text,
	`content_am` text,
	`meta_title` varchar(255),
	`meta_description` varchar(500),
	`og_image` varchar(255),
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `blog_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `blog_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	CONSTRAINT `blog_categories_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blog_gallery` (
	`id` int AUTO_INCREMENT NOT NULL,
	`blog_id` int NOT NULL,
	`image_url` varchar(255),
	`alt_text` varchar(255),
	`caption` varchar(255),
	`sort_order` int NOT NULL DEFAULT 0,
	CONSTRAINT `blog_gallery_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blog_videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`blog_id` int NOT NULL,
	`video_url` varchar(255) NOT NULL,
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `blog_videos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contact_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(100) NOT NULL,
	`phone` varchar(20),
	`subject` varchar(255) NOT NULL,
	`message` text NOT NULL,
	`address` varchar(255),
	`seen` int DEFAULT 0,
	`status` enum('new','in_progress','replied','closed') NOT NULL DEFAULT 'new',
	`notes` text,
	`assigned_to` varchar(36),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `contact_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `faqs` (
	`id` int AUTO_INCREMENT NOT NULL,
	`question` varchar(255) NOT NULL,
	`answer` text NOT NULL,
	`question_am` varchar(255),
	`answer_am` text,
	`is_active` boolean NOT NULL DEFAULT true,
	`sort_order` int NOT NULL DEFAULT 0,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `faqs_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gallery` (
	`id` int AUTO_INCREMENT NOT NULL,
	`image_url` varchar(255),
	`alt_text` varchar(255),
	`caption` varchar(255),
	`sort_order` int NOT NULL DEFAULT 0,
	CONSTRAINT `gallery_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`description` varchar(255),
	CONSTRAINT `permissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `permissions_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `project_before_after` (
	`id` int AUTO_INCREMENT NOT NULL,
	`project_id` int NOT NULL,
	`before_url` varchar(255) NOT NULL,
	`after_url` varchar(255) NOT NULL,
	`caption` varchar(255),
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `project_before_after_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_categories` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	CONSTRAINT `project_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `project_categories_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `project_images` (
	`id` int AUTO_INCREMENT NOT NULL,
	`project_id` int NOT NULL,
	`image_url` varchar(255) NOT NULL,
	`is_featured` int DEFAULT 0,
	`alt_text` varchar(255),
	`caption` varchar(255),
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `project_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`project_id` int NOT NULL,
	`video_url` varchar(255) NOT NULL,
	`sort_order` int NOT NULL DEFAULT 0,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `project_videos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`category_id` int,
	`service_id` int,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`client_name` varchar(255),
	`location` varchar(255),
	`project_type` enum('residential','commercial','hospitality','interior','other'),
	`area_sqm` int,
	`floors` int,
	`year_completed` int,
	`duration` varchar(100),
	`featured_image` varchar(255) NOT NULL,
	`blueprint_url` varchar(255),
	`is_featured` boolean NOT NULL DEFAULT false,
	`sort_order` int NOT NULL DEFAULT 0,
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'published',
	`completed_at` datetime(3),
	`title_am` varchar(255),
	`excerpt_am` text,
	`content_am` text,
	`meta_title` varchar(255),
	`meta_description` varchar(500),
	`og_image` varchar(255),
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `projects_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `quotes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(50),
	`service_id` int,
	`service_type` varchar(100),
	`location` varchar(255),
	`plot_size` varchar(100),
	`budget_range` varchar(100),
	`timeline` varchar(100),
	`description` text,
	`status` enum('new','contacted','proposal_sent','won','lost') NOT NULL DEFAULT 'new',
	`notes` text,
	`assigned_to` varchar(36),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `quotes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `role_permissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`role_id` int NOT NULL,
	`permission_id` int NOT NULL,
	`is_active` int NOT NULL DEFAULT 1,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `role_permissions_id` PRIMARY KEY(`id`),
	CONSTRAINT `role_permission_unique` UNIQUE(`role_id`,`permission_id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(32) NOT NULL,
	`description` varchar(255),
	`is_active` int NOT NULL DEFAULT 1,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`),
	CONSTRAINT `roles_name_unique` UNIQUE(`name`)
);
--> statement-breakpoint
CREATE TABLE `service_gallery` (
	`id` int AUTO_INCREMENT NOT NULL,
	`service_id` int NOT NULL,
	`image_url` varchar(255),
	`alt_text` varchar(255),
	`caption` varchar(255),
	`sort_order` int NOT NULL DEFAULT 0,
	CONSTRAINT `service_gallery_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text,
	`long_description` text,
	`featured_image` varchar(255),
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'published',
	`is_featured` boolean NOT NULL DEFAULT false,
	`sort_order` int NOT NULL DEFAULT 0,
	`name_am` varchar(255),
	`description_am` text,
	`long_description_am` text,
	`meta_title` varchar(255),
	`meta_description` varchar(500),
	`og_image` varchar(255),
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `services_id` PRIMARY KEY(`id`),
	CONSTRAINT `services_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` varchar(36) NOT NULL,
	`expires_at` datetime(3) NOT NULL,
	`token` varchar(255) NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` varchar(36) NOT NULL,
	`impersonated_by` text,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`),
	CONSTRAINT `session_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`key` varchar(64) NOT NULL,
	`value` text NOT NULL,
	`updated_by` varchar(36),
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `site_settings_key` PRIMARY KEY(`key`)
);
--> statement-breakpoint
CREATE TABLE `teamMembers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`position` varchar(255),
	`message` text NOT NULL,
	`avatar` varchar(255),
	`is_active` int NOT NULL DEFAULT 1,
	`sort_order` int NOT NULL DEFAULT 0,
	`position_am` varchar(255),
	`message_am` text,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `teamMembers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`position` varchar(255),
	`client_company` varchar(255),
	`message` text NOT NULL,
	`avatar` varchar(255),
	`rating` int,
	`project_id` int,
	`is_active` int NOT NULL DEFAULT 1,
	`is_featured` boolean NOT NULL DEFAULT false,
	`sort_order` int NOT NULL DEFAULT 0,
	`message_am` text,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`email_verified` int NOT NULL DEFAULT 0,
	`image` text,
	`role` text,
	`banned` int,
	`ban_reason` text,
	`ban_expires` datetime(3),
	`role_id` int,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` varchar(36) NOT NULL,
	`identifier` varchar(255) NOT NULL,
	`value` text NOT NULL,
	`expires_at` datetime(3) NOT NULL,
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `verification_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `activity_log` ADD CONSTRAINT `activity_log_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `blog` ADD CONSTRAINT `blog_category_id_blog_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `blog_categories`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `blog` ADD CONSTRAINT `blog_author_id_user_id_fk` FOREIGN KEY (`author_id`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `blog_gallery` ADD CONSTRAINT `blog_gallery_blog_id_blog_id_fk` FOREIGN KEY (`blog_id`) REFERENCES `blog`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `blog_videos` ADD CONSTRAINT `blog_videos_blog_id_blog_id_fk` FOREIGN KEY (`blog_id`) REFERENCES `blog`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `contact_messages` ADD CONSTRAINT `contact_messages_assigned_to_user_id_fk` FOREIGN KEY (`assigned_to`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_before_after` ADD CONSTRAINT `project_before_after_project_id_projects_id_fk` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_images` ADD CONSTRAINT `project_images_project_id_projects_id_fk` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `project_videos` ADD CONSTRAINT `project_videos_project_id_projects_id_fk` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `projects` ADD CONSTRAINT `projects_category_id_project_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `project_categories`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `projects` ADD CONSTRAINT `projects_service_id_services_id_fk` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quotes` ADD CONSTRAINT `quotes_service_id_services_id_fk` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `quotes` ADD CONSTRAINT `quotes_assigned_to_user_id_fk` FOREIGN KEY (`assigned_to`) REFERENCES `user`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `role_permissions` ADD CONSTRAINT `role_permissions_permission_id_permissions_id_fk` FOREIGN KEY (`permission_id`) REFERENCES `permissions`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `service_gallery` ADD CONSTRAINT `service_gallery_service_id_services_id_fk` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `testimonials` ADD CONSTRAINT `testimonials_project_id_projects_id_fk` FOREIGN KEY (`project_id`) REFERENCES `projects`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `user_role_id_roles_id_fk` FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE INDEX `activity_created_idx` ON `activity_log` (`created_at`);--> statement-breakpoint
CREATE INDEX `contact_status_idx` ON `contact_messages` (`status`);--> statement-breakpoint
CREATE INDEX `quote_status_idx` ON `quotes` (`status`);