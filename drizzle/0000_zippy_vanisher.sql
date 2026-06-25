CREATE TABLE `account` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`account_id` text NOT NULL,
	`provider_id` text NOT NULL,
	`user_id` text(36) NOT NULL,
	`access_token` text,
	`refresh_token` text,
	`id_token` text,
	`access_token_expires_at` integer,
	`refresh_token_expires_at` integer,
	`scope` text,
	`password` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `blog` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(255) NOT NULL,
	`category_id` integer NOT NULL,
	`slug` text(255) NOT NULL,
	`excerpt` text,
	`content` text,
	`is_featured_on_home` integer DEFAULT 0,
	`featured_image` text(255),
	`is_active` integer DEFAULT 1 NOT NULL,
	`created_by` text(255),
	`updated_by` text(255),
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`deleted_by` text(255)
);
--> statement-breakpoint
CREATE TABLE `blog_categories` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`description` text(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `blog_gallery` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`blog_id` integer NOT NULL,
	`image_url` text(255)
);
--> statement-breakpoint
CREATE TABLE `contact_messages` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`email` text(100) NOT NULL,
	`phone` text(20),
	`subject` text(255) NOT NULL,
	`message` text NOT NULL,
	`address` text(255),
	`seen` integer DEFAULT 0,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `gallery` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`image_url` text(255)
);
--> statement-breakpoint
CREATE TABLE `permissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(50) NOT NULL,
	`description` text(255)
);
--> statement-breakpoint
CREATE TABLE `portfolio` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text(255) NOT NULL,
	`slug` text(255) NOT NULL,
	`description` text,
	`featuredImage` text(255),
	`eventType` text(255),
	`date` integer,
	`client` text(255),
	`location` text(255),
	`is_featured_on_home` integer DEFAULT 0,
	`is_active` integer DEFAULT 1 NOT NULL,
	`created_by` text(255),
	`updated_by` text(255),
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`deleted_by` text(255)
);
--> statement-breakpoint
CREATE TABLE `portfolio_gallery` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`portfolio_id` integer NOT NULL,
	`image_url` text(255)
);
--> statement-breakpoint
CREATE TABLE `quotes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`service_type` text(100) NOT NULL,
	`name` text(255) NOT NULL,
	`email` text(255) NOT NULL,
	`phone` text(50),
	`event_date` integer,
	`event_location` text(255),
	`budget_range` text(100),
	`guest_count` integer,
	`description` text,
	`status` text(50) DEFAULT 'pending',
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `role_permissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`role_id` integer NOT NULL,
	`permission_id` integer NOT NULL,
	`is_active` integer DEFAULT 1 NOT NULL,
	`created_by` text(255),
	`updated_by` text(255),
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`deleted_by` text(255)
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(32) NOT NULL,
	`description` text(255),
	`is_active` integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE `service_gallery` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`service_id` integer NOT NULL,
	`image_url` text(255)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`description` text,
	`long_description` text,
	`featured_image` text(255),
	`is_active` integer DEFAULT 1 NOT NULL,
	`created_by` text(255),
	`updated_by` text(255),
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`deleted_by` text(255)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`expires_at` integer NOT NULL,
	`token` text(255) NOT NULL,
	`ip_address` text,
	`user_agent` text,
	`user_id` text(36) NOT NULL,
	`impersonated_by` text,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `special_permissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text(255) NOT NULL,
	`permission_id` integer NOT NULL,
	`is_active` integer DEFAULT 1 NOT NULL,
	`created_by` text(255),
	`updated_by` text(255),
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`deleted_by` text(255)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) NOT NULL,
	`position` text(255),
	`message` text NOT NULL,
	`avatar` text(255),
	`is_active` integer DEFAULT 1 NOT NULL,
	`created_by` text(255),
	`updated_by` text(255),
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`deleted_by` text(255)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`name` text(255) NOT NULL,
	`email` text(255) NOT NULL,
	`email_verified` integer DEFAULT 0 NOT NULL,
	`image` text,
	`role` text,
	`banned` integer,
	`ban_reason` text,
	`ban_expires` integer,
	`role_id` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `venue_booking` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`venue_id` integer NOT NULL,
	`guest_count` integer,
	`description` text,
	`status` text(50) DEFAULT 'pending',
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `venue_details` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255) DEFAULT '4 Kilo Plaza',
	`description` text,
	`capacity` integer,
	`booking_policy` text,
	`is_active` integer DEFAULT 1 NOT NULL,
	`featuredImage` text(255),
	`location` text(255),
	`created_by` text(255),
	`updated_by` text(255),
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`deleted_by` text(255)
);
--> statement-breakpoint
CREATE TABLE `venue_features` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text(255),
	`description` text,
	`venue_id` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `venue_images` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`venue_id` integer NOT NULL,
	`image_url` text(255) NOT NULL,
	`is_featured` integer DEFAULT 0,
	`is_active` integer DEFAULT 1 NOT NULL,
	`created_by` text(255),
	`updated_by` text(255),
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`deleted_by` text(255)
);
--> statement-breakpoint
CREATE TABLE `venue_videos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`venue_id` integer NOT NULL,
	`video_url` text(255) NOT NULL,
	`is_active` integer DEFAULT 1 NOT NULL,
	`created_by` text(255),
	`updated_by` text(255),
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`deleted_by` text(255)
);
--> statement-breakpoint
CREATE TABLE `verification` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`identifier` text(255) NOT NULL,
	`value` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
