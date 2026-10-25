-- Permissions checked by src/lib/server/permissions.ts
INSERT IGNORE INTO `permissions` (`name`, `description`) VALUES
	('manage_content', 'Blogs, projects, services, team, testimonials, partner logos and FAQs'),
	('manage_leads', 'Contact messages and quote requests'),
	('manage_settings', 'Site settings: contact details and social links'),
	('manage_users', 'Users, roles and permissions'),
	('view_activity', 'Activity log');
--> statement-breakpoint
INSERT IGNORE INTO `roles` (`id`, `name`, `description`, `is_active`) VALUES
	(1, 'Admin', 'Can do anything', 1);
--> statement-breakpoint
-- The Admin role gets every permission.
INSERT IGNORE INTO `role_permissions` (`role_id`, `permission_id`, `is_active`, `created_at`, `updated_at`)
	SELECT 1, `id`, 1, NOW(3), NOW(3) FROM `permissions`;
--> statement-breakpoint
-- The FAQs that used to be hard-coded in faq.svelte.
INSERT INTO `faqs` (`question`, `answer`, `sort_order`, `is_active`, `created_at`, `updated_at`)
SELECT * FROM (
	SELECT 'What services does Golla Design offer?' AS q, 'We provide comprehensive structural architectural layout design, premium high-end interior finishes, and bespoke luxury furniture consultation.' AS a, 1 AS s, 1 AS act, NOW(3) AS c, NOW(3) AS u
	UNION ALL SELECT 'Can you manufacture custom furniture pieces?', 'Yes, custom furniture making and tailor-made lighting integration are core pillars of our studio, allowing us to deliver pieces perfectly sized for your space.', 2, 1, NOW(3), NOW(3)
	UNION ALL SELECT 'Do you handle the actual space finishing?', 'Absolutely. We focus on significant, sophisticated structural finishes and interior space adjustments to bridge the gap between design renderings and reality.', 3, 1, NOW(3), NOW(3)
	UNION ALL SELECT 'How does the studio consultation process work?', 'We start by discussing your target vision, lifestyle requirements, and space parameters. We then deliver beautiful, custom, and cozy space plans tailored around your goals.', 4, 1, NOW(3), NOW(3)
	UNION ALL SELECT 'What do I need to provide for a project estimate?', 'Simply share your site measurements, current layouts, architectural concepts, or structural references via our contact channel to get a tailored estimate.', 5, 1, NOW(3), NOW(3)
	UNION ALL SELECT 'What makes your design group unique?', 'We control every design layer, from complex architectural drawings to fine furniture finishes. This cohesive execution makes spaces exceptionally useful and functional.', 6, 1, NOW(3), NOW(3)
) AS seed
WHERE NOT EXISTS (SELECT 1 FROM `faqs`);
