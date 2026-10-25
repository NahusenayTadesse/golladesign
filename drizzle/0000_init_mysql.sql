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
CREATE TABLE `blog` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`category_id` int NOT NULL,
	`slug` varchar(255) NOT NULL,
	`excerpt` text,
	`content` text,
	`is_featured_on_home` int DEFAULT 0,
	`featured_image` varchar(255),
	`is_active` int NOT NULL DEFAULT 1,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	`deleted_at` datetime(3),
	`deleted_by` varchar(255),
	CONSTRAINT `blog_id` PRIMARY KEY(`id`)
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
	CONSTRAINT `blog_gallery_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blog_videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`blog_id` int NOT NULL,
	`video_url` varchar(255) NOT NULL,
	`is_active` int NOT NULL DEFAULT 1,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	`deleted_at` datetime(3),
	`deleted_by` varchar(255),
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
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	CONSTRAINT `contact_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `gallery` (
	`id` int AUTO_INCREMENT NOT NULL,
	`image_url` varchar(255),
	CONSTRAINT `gallery_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`description` varchar(255),
	CONSTRAINT `permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portfolio` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`description` text,
	`featuredImage` varchar(255),
	`eventType` varchar(255),
	`date` datetime(3),
	`client` varchar(255),
	`location` varchar(255),
	`is_featured_on_home` int DEFAULT 0,
	`is_active` int NOT NULL DEFAULT 1,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	`deleted_at` datetime(3),
	`deleted_by` varchar(255),
	CONSTRAINT `portfolio_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `portfolio_gallery` (
	`id` int AUTO_INCREMENT NOT NULL,
	`portfolio_id` int NOT NULL,
	`image_url` varchar(255),
	CONSTRAINT `portfolio_gallery_id` PRIMARY KEY(`id`)
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
	`is_active` int NOT NULL DEFAULT 1,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	`deleted_at` datetime(3),
	`deleted_by` varchar(255),
	CONSTRAINT `project_images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `project_videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`project_id` int NOT NULL,
	`video_url` varchar(255) NOT NULL,
	`is_active` int NOT NULL DEFAULT 1,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	`deleted_at` datetime(3),
	`deleted_by` varchar(255),
	CONSTRAINT `project_videos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `projects` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`category_id` int,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`client_name` varchar(255),
	`location` varchar(255),
	`featured_image` varchar(255) NOT NULL,
	`blueprint_url` varchar(255),
	`is_featured` boolean NOT NULL DEFAULT false,
	`status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
	`completed_at` datetime(3),
	CONSTRAINT `projects_id` PRIMARY KEY(`id`),
	CONSTRAINT `projects_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `quotes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`service_type` varchar(100) NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`phone` varchar(50),
	`event_date` datetime(3),
	`event_location` varchar(255),
	`budget_range` varchar(100),
	`guest_count` int,
	`description` text,
	`status` varchar(50) DEFAULT 'pending',
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
	`deleted_at` datetime(3),
	`deleted_by` varchar(255),
	CONSTRAINT `role_permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(32) NOT NULL,
	`description` varchar(255),
	`is_active` int NOT NULL DEFAULT 1,
	CONSTRAINT `roles_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `service_gallery` (
	`id` int AUTO_INCREMENT NOT NULL,
	`service_id` int NOT NULL,
	`image_url` varchar(255),
	CONSTRAINT `service_gallery_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`long_description` text,
	`featured_image` varchar(255),
	`is_active` int NOT NULL DEFAULT 1,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	`deleted_at` datetime(3),
	`deleted_by` varchar(255),
	CONSTRAINT `services_id` PRIMARY KEY(`id`)
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
CREATE TABLE `special_permissions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`user_id` varchar(255) NOT NULL,
	`permission_id` int NOT NULL,
	`is_active` int NOT NULL DEFAULT 1,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	`deleted_at` datetime(3),
	`deleted_by` varchar(255),
	CONSTRAINT `special_permissions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `teamMembers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`position` varchar(255),
	`message` text NOT NULL,
	`avatar` varchar(255),
	`is_active` int NOT NULL DEFAULT 1,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	`deleted_at` datetime(3),
	`deleted_by` varchar(255),
	CONSTRAINT `teamMembers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`position` varchar(255),
	`message` text NOT NULL,
	`avatar` varchar(255),
	`is_active` int NOT NULL DEFAULT 1,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	`deleted_at` datetime(3),
	`deleted_by` varchar(255),
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
CREATE TABLE `venue_videos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`venue_id` int NOT NULL,
	`video_url` varchar(255) NOT NULL,
	`is_active` int NOT NULL DEFAULT 1,
	`created_by` varchar(255),
	`updated_by` varchar(255),
	`created_at` datetime(3) NOT NULL,
	`updated_at` datetime(3) NOT NULL,
	`deleted_at` datetime(3),
	`deleted_by` varchar(255),
	CONSTRAINT `venue_videos_id` PRIMARY KEY(`id`)
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
ALTER TABLE `projects` ADD CONSTRAINT `projects_category_id_project_categories_id_fk` FOREIGN KEY (`category_id`) REFERENCES `project_categories`(`id`) ON DELETE set null ON UPDATE no action;