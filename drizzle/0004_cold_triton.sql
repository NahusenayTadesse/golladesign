CREATE TABLE `blog_videos` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`blog_id` integer NOT NULL,
	`video_url` text(255) NOT NULL,
	`is_active` integer DEFAULT 1 NOT NULL,
	`created_by` text(255),
	`updated_by` text(255),
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`deleted_at` integer,
	`deleted_by` text(255)
);
