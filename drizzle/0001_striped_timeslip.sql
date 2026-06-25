PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_projects` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`slug` text NOT NULL,
	`category_id` integer,
	`excerpt` text NOT NULL,
	`content` text NOT NULL,
	`client_name` text,
	`location` text,
	`featured_image` text NOT NULL,
	`blueprint_url` text,
	`is_featured` integer DEFAULT false NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`completed_at` integer,
	FOREIGN KEY (`category_id`) REFERENCES `project_categories`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_projects`("id", "title", "slug", "category_id", "excerpt", "content", "client_name", "location", "featured_image", "blueprint_url", "is_featured", "status", "completed_at") SELECT "id", "title", "slug", "category_id", "excerpt", "content", "client_name", "location", "featured_image", "blueprint_url", "is_featured", "status", "completed_at" FROM `projects`;--> statement-breakpoint
DROP TABLE `projects`;--> statement-breakpoint
ALTER TABLE `__new_projects` RENAME TO `projects`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `projects_slug_unique` ON `projects` (`slug`);