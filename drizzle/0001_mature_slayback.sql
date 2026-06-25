CREATE TABLE `teamMembers` (
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
