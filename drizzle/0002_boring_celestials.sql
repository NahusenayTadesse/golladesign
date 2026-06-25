CREATE TABLE `venue_lottery` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`venue_id` integer NOT NULL,
	`name` text(255),
	`phone` text(20),
	`email` text(255),
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL
);
