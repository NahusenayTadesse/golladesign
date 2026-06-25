-- SQLite seed data updated to match integer({ mode: 'timestamp' }) schema
-- Drizzle's 'timestamp' mode stores Unix epoch in SECONDS (not ms)
PRAGMA foreign_keys = OFF;
BEGIN TRANSACTION;

INSERT INTO "account" ("id", "account_id", "provider_id", "user_id", "access_token", "refresh_token", "id_token", "access_token_expires_at", "refresh_token_expires_at", "scope", "password", "created_at", "updated_at") VALUES
('ImTtTqorSZ7KX80GRwsNZnSipkDJXjdZ', 'CUhRWE2PyjZWL92VJMBTiymepDALLFiw', 'credential', 'CUhRWE2PyjZWL92VJMBTiymepDALLFiw', NULL, NULL, NULL, NULL, NULL, NULL, 'bc98df807925a4d791cdb858a1fa6565:cdfa2702c15101b5c43c3f8002a5b6d6d4b2dc1388bd252c8e8bc6e635edc500a1ed12ef7c6cc7e40e11b95117bcc5de00b1f75d9e3946da8927cfb1728228e7', 1745771608, 1745771608);

INSERT INTO "blog" ("id", "title", "category_id", "slug", "excerpt", "content", "is_featured_on_home", "featured_image", "is_active", "created_by", "updated_by", "created_at", "updated_at", "deleted_at", "deleted_by") VALUES
(1, 'The Future of Corporate Events in Addis Ababa', 1, 'future-corporate-events-addis  test test test ', 'How technology and changing audience expectations are reshaping the corporate landscape in Ethiopia. ethiopia', '<p><strong>test test check check.</strong></p>', 1, 'e94b08d3-4330-41d9-a086-5907e944163a.png', 1, NULL, 'CUhRWE2PyjZWL92VJMBTiymepDALLFiw', 1746038569, 1746282762, NULL, NULL),
(2, '5 Reasons 4 Kilo Plaza is the Best Venue for Your Next Launch', 2, '5-reasons-4-kilo-plaza', 'From central location to state-of-the-art facilities, discover why our venue stands out.', '<article><h3>The Central Hub of Innovation</h3><p>Location is everything. Situated in the heart of Addis, <strong>4 Kilo Plaza</strong> offers more than just space—it offers accessibility and prestige.</p><h4>Key Advantages:</h4><ol><li>Unmatched Centrality</li><li>Premium HVAC Systems</li><li>Integrated A/V Technology</li></ol></article>', 0, 'event.webp', 1, NULL, NULL, 1746038569, 1746038569, NULL, NULL),
(3, 'How to Attract High-Value Sponsors for Your Event', 3, 'attracting-high-value-sponsors', 'Learn the secrets to building sponsorship packages that brands can''t resist.', '<article><h3>Beyond Logo Placement</h3><p>Sponsorship in 2026 is about <strong>Value Alignment</strong>. Brands want to see measurable ROI and direct engagement with their target demographics.</p><p>We specialize in creating monetization strategies that benefit both the organizer and the sponsor.</p></article>', 1, 'event.webp', 1, NULL, NULL, 1746038569, 1746038569, NULL, NULL),
(4, 'Sustainability in Event Production: A New Standard', 1, 'sustainability-event-production', 'Reducing the carbon footprint of large-scale events without compromising on quality.', '<article><h3>Eco-Friendly Excellence</h3><p>At Yebehir, we believe premium doesn''t have to mean wasteful. From digital ticketing to biodegradable catering supplies, we are implementing green standards across all our managed events.</p></article>', 0, 'event.webp', 1, NULL, NULL, 1746038569, 1746038569, NULL, NULL),
(5, 'Yebehir Ventures: Expanding the Horizon', 4, 'yebehir-ventures-expansion', 'A look at our growth over the past year and our vision for the Ethiopian event industry.', '<article><h3>More Than Just Events</h3><p>Our journey has led us to become a multi-service powerhouse. By integrating venue management and sales platforms, we provide a holistic solution that the market has been craving.</p></article>', 0, 'event.webp', 1, NULL, NULL, 1746038569, 1746038569, NULL, NULL),
(6, 'test', 4, 'test 1 check 2', 'check check check', '<p><strong>check check </strong></p><p><br></p><p>checkcheck check checkcheck check checkcheck check check</p>', 0, 'f6c5e17f-a033-4a3e-813f-f8d67f466e8a.jpeg', 1, 'CUhRWE2PyjZWL92VJMBTiymepDALLFiw', 'CUhRWE2PyjZWL92VJMBTiymepDALLFiw', 1746702929, 1746703423, NULL, NULL);

INSERT INTO "blog_categories" ("id", "name", "description") VALUES
(1, 'Event Trends', 'Stay ahead of the curve with the latest in event production and tech.'),
(2, 'Venue Spotlight', 'Updates and insights regarding 4 Kilo Plaza and venue management.'),
(3, 'Sponsorship & ROI', 'How to monetize events and build lasting brand partnerships.'),
(4, 'Industry News', 'Major milestones and updates from the Ethiopian event sector.');

INSERT INTO "blog_gallery" ("id", "blog_id", "image_url") VALUES
(1, 1, 'event.webp'),
(2, 1, 'event.webp'),
(3, 1, 'event.webp'),
(4, 2, 'event.webp'),
(5, 2, 'event.webp'),
(6, 2, 'event.webp'),
(7, 3, 'event.webp'),
(8, 3, 'event.webp'),
(9, 3, 'event.webp'),
(10, 4, 'event.webp'),
(11, 4, 'event.webp'),
(12, 4, 'event.webp'),
(13, 5, 'event.webp'),
(14, 5, 'event.webp'),
(15, 5, 'event.webp'),
(22, 6, '95450b0c-cec0-48b4-b9a0-37abfe7601b9.jpeg'),
(23, 6, '65793ab7-d5ab-4b8a-9c06-fe35168f01ff.png'),
(24, 6, 'a10baf39-fa81-4f4f-9203-0ef37ca5e55c.jpeg');

INSERT INTO "contact_messages" ("id", "name", "email", "phone", "subject", "message", "address", "seen", "created_at", "updated_at") VALUES
(1, 'SOL', 'solomonaberra54@gmail.com', '+251945341787', 'Sales tactics', 'PLEASE SHARE YOUR SALES TACTICS.', NULL, 1, 1746097385, 1746097385),
(2, 'Nahusenay Tadesse', 'nahusenaytadesse75@gmail.com', '+251947340602', 'Test', 'Twst', NULL, 0, 1746786840, 1746786840);

INSERT INTO "gallery" ("id", "image_url") VALUES
(54, 'b8aa6080-ea10-475c-8546-a9c10c0d84bc.png'),
(55, '2d2b817f-e373-4cf8-8989-2937102174d5.png'),
(56, 'b8571746-0539-48cb-bc38-982373ddaab0.png'),
(57, 'dbed649a-fa65-47e4-ad6f-06cd80b799e5.png'),
(58, '1d21b763-ea42-4dd4-9805-e180e93bf4a2.png'),
(59, 'e37adf85-8146-4f36-9bf5-8dbdc18280dc.png'),
(60, '3cb732e4-7611-48df-a1f5-daf8aa797f3b.png');

INSERT INTO "portfolio" ("id", "title", "slug", "description", "featuredImage", "eventType", "date", "client", "location", "is_featured_on_home", "is_active", "created_by", "updated_by", "created_at", "updated_at", "deleted_at", "deleted_by") VALUES
(1, 'Global Tech Summit 2026', 'global-tech-summit-2026', 'Yebehir managed the full production, from stage design to guest logistics.', '433dfba0-39e9-4b1b-b085-974fd870f722.png', 'Corporate Conference', 1746662400, 'Nexus Technologies', '4 Kilo Plaza Addis ababa', 1, 1, NULL, 'CUhRWE2PyjZWL92VJMBTiymepDALLFiw', 1746038407, 1746712621, NULL, NULL),
(2, 'Zion Energy Drink Launch', 'zion-energy-launch', 'A high-energy brand activation featuring immersive light shows and live performances. Focused on youth engagement and brand visibility.', 'event.webp', 'Brand Activation', 1737331200, 'Zion Beverages', 'Addis Exhibition Center', 1, 1, NULL, NULL, 1746038407, 1746038407, NULL, NULL),
(3, 'Annual Banker''s Gala', 'annual-bankers-gala', 'An exclusive black-tie evening for the financial sector. Premium catering, refined decor, and a sophisticated atmosphere.', 'event.webp', 'Corporate Gala', 1733788800, 'National Finance Group', '4 Kilo Plaza', 0, 1, NULL, NULL, 1746038407, 1746038407, NULL, NULL),
(4, 'Urban Lifestyle Expo', 'urban-lifestyle-expo', 'A three-day marketplace connecting SMEs with the local Addis youth. Yebehir handled vendor matching and sponsorship acquisition.', 'event.webp', 'Marketplace / Expo', 1730764800, 'Yebehir Ventures (Self-Produced)', '4 Kilo Plaza', 1, 1, NULL, NULL, 1746038407, 1746038407, NULL, NULL);

INSERT INTO "portfolio_gallery" ("id", "portfolio_id", "image_url") VALUES
(1, 1, 'event.webp'),
(2, 1, 'event.webp'),
(3, 1, 'event.webp'),
(4, 2, 'event.webp'),
(5, 2, 'event.webp'),
(6, 2, 'event.webp'),
(7, 3, 'event.webp'),
(8, 3, 'event.webp'),
(9, 3, 'event.webp'),
(10, 4, 'event.webp'),
(11, 4, 'event.webp'),
(12, 4, 'event.webp');

INSERT INTO "quotes" ("id", "service_type", "name", "email", "phone", "event_date", "event_location", "budget_range", "guest_count", "description", "status", "created_at", "updated_at") VALUES
(1, 'venue', 'Sol', 'sol2@hotmail.com', '+251944563425', 1746057600, '4 kilo ', '51900.6115673598', 2, 'BLAH BLAH', 'pending', 1746114445, 1746114445),
(2, 'event', 'solo', 'solomon@yebehir.com', '+251945132932', 1746230400, '4 kilo', '58309.1866629464', 30, 'blah blah', 'pending', 1746287728, 1746287728);

INSERT INTO "services" ("id", "name", "description", "long_description", "featured_image", "is_active", "created_by", "updated_by", "created_at", "updated_at", "deleted_at", "deleted_by") VALUES
(1, 'Event Management', 'Full-service management for corporate, brand, and private events.', '<div class="service-content"><h3>Excellence in Execution</h3><p>We handle everything from conceptualization to post-event reporting. Our focus is on creating <strong>high-energy experiences</strong> that align with your brand goals.</p><ul><li>Corporate Galas & Meetings</li><li>Product Launches</li><li>Brand Activations</li><li>Private Premium Events</li></ul></div>', 'event.webp', 1, NULL, NULL, 1746038901, 1746038901, NULL, NULL),
(2, 'Venue Rental (4 Kilo Plaza)', 'A central, flexible venue for events in the heart of Addis Ababa.', '<div class="service-content"><h3>4 Kilo Plaza</h3><p>Located in a prime area, our venue offers unmatched flexibility. Whether it is a corporate seminar or a lifestyle launch, 4 Kilo Plaza provides the <strong>perfect canvas</strong>.</p><p>Capacity: Up to 500 guests with state-of-the-art HVAC and A/V systems.</p></div>', 'event.webp', 1, NULL, NULL, 1746038901, 1746038901, NULL, NULL),
(3, 'Sales & Sponsorship', 'Strategic partnership acquisition and event-based marketing.', '<div class="service-content"><h3>Monetize Your Vision</h3><p>We bridge the gap between brands and audiences. Our sales division specializes in:</p><ul><li>Sponsorship Acquisition</li><li>Brand Collaboration</li><li>Event-based Advertising</li></ul><p>We ensure your event isn''t just an expense, but a <strong>revenue opportunity</strong>.</p></div>', 'event.webp', 1, NULL, NULL, 1746038901, 1746038901, NULL, NULL),
(4, 'Catering & Add-ons', 'Premium food and coffee services for all event types.', '<div class="service-content"><h3>Taste of Excellence</h3><p>A complete event experience requires premium catering. We provide high-quality food services and specialized <strong>Ethiopian Coffee Ceremonies</strong> tailored to your event''s theme.</p></div>', 'event.webp', 1, NULL, NULL, 1746038901, 1746038901, NULL, NULL);

INSERT INTO "service_gallery" ("id", "service_id", "image_url") VALUES
(1, 1, 'event.webp'),
(2, 1, 'event.webp'),
(3, 1, 'event.webp'),
(4, 2, 'event.webp'),
(5, 2, 'event.webp'),
(6, 2, 'event.webp'),
(7, 3, 'event.webp'),
(8, 3, 'event.webp'),
(9, 3, 'event.webp'),
(10, 4, 'event.webp'),
(11, 4, 'event.webp'),
(12, 4, 'event.webp');

INSERT INTO "session" ("id", "expires_at", "token", "created_at", "updated_at", "ip_address", "user_agent", "user_id", "impersonated_by") VALUES
('JlrmMgpkQcVe7lnanofpZYnfSmo6chfh', 1747305485, 'gjpfyaZmQhTQJIdvgf9iqIpYNrkVjPnQ', 1746091841, 1746697685, '', '', 'CUhRWE2PyjZWL92VJMBTiymepDALLFiw', NULL),
('UJS1ac0hXrZhE9R8lmusGrmowPTkiYsS', 1747391625, 'U2yMesV57wkPI9qmWnkUqudwjG0LPXTi', 1746091836, 1746786825, '', '', 'CUhRWE2PyjZWL92VJMBTiymepDALLFiw', NULL),
('v2vWdHCBZqYwuf9rJW2Ak4HANx0ufQwV', 1747217684, '1HNtpq6iVebOSnk4mh45icSjq7TKIZO4', 1746055649, 1747131284, '', '', 'CUhRWE2PyjZWL92VJMBTiymepDALLFiw', NULL),
('Vif8mCL34HOHdC17AtWV6kx6LVGEC4XV', 1747305188, 'T2k8uk3LCHm4WlgaKhm5cL76hTEVBnEd', 1746280217, 1746697988, '', '', 'CUhRWE2PyjZWL92VJMBTiymepDALLFiw', NULL);

INSERT INTO "testimonials" ("id", "name", "position", "message", "avatar", "is_active", "created_by", "updated_by", "created_at", "updated_at", "deleted_at", "deleted_by") VALUES
(1, 'Dawit Abraham', 'Marketing Director, Nexus Technologies', 'The execution of our Global Tech Summit was flawless. Yebehir Ventures truly lives up to their tagline "Ahead of the curve." Their attention to detail in event production is unmatched in Addis.', 'event.webp', 1, NULL, NULL, 1746039430, 1746039430, NULL, NULL),
(2, 'Sara Tadesse', 'Senior Brand Manager, Zion Beverages', 'Working with Yebehir for our energy drink launch was a game changer. They didn''t just provide a venue', 'event.webp', 1, NULL, NULL, 1746039430, 1746039430, NULL, NULL);

INSERT INTO "user" ("id", "name", "email", "email_verified", "image", "role", "banned", "ban_reason", "ban_expires", "role_id", "created_at", "updated_at") VALUES
('CUhRWE2PyjZWL92VJMBTiymepDALLFiw', 'Admin', 'yebehir@gmail.com', 0, NULL, NULL, NULL, NULL, 1745782408, NULL, 1745771608, 1745771608);

INSERT INTO "venue_details" ("id", "name", "description", "capacity", "booking_policy", "is_active", "created_by", "updated_by", "created_at", "updated_at", "deleted_at", "deleted_by", "featuredImage", "location") VALUES
(1, '4 Kilo Plaza', 'A central, flexible venue for events in Addis Ababa. Designed for corporate gatherings, brand activations, and lifestyle experiences with a premium, modern atmosphere.', 500, 'Bookings must be confirmed 14 days in advance. 50% deposit required at booking.', 1, NULL, 'CUhRWE2PyjZWL92VJMBTiymepDALLFiw', 1746038750, 1746704899, NULL, NULL, 'f638b583-296a-4df5-9e53-d18ff8e3f78c.jpeg', '4 Kilo, Addis Ababa, Ethiopia'),
(2, 'test 1 ', 'check check check 1 check check check 1check check check 1', 200, 'check check check 1', 1, 'CUhRWE2PyjZWL92VJMBTiymepDALLFiw', NULL, 1746703740, 1746703740, NULL, NULL, '2f0af133-1c0a-4dd2-9845-2f6a76aeb608.png', '4 killo venue');

INSERT INTO "venue_features" ("id", "name", "description", "venue_id") VALUES
(1, 'High-Speed WiFi', 'Dedicated fiber optic connection for live streaming and corporate needs.', 1),
(2, 'Ample Parking', 'Secure underground and surface parking for up to 100 vehicles.', 1),
(3, 'Advanced Audio/Visual', 'Built-in LED screens and surround sound system.', 1),
(4, 'Climate Control', 'Full HVAC system to ensure guest comfort regardless of weather.', 1),
(5, 'Flexible Layout', 'Modulable space that can be transformed for gala dinners or standing cocktail events.', 1),
(6, 'high speed wifi', 'high speed wifi', 2);

INSERT INTO "venue_images" ("id", "venue_id", "image_url", "is_featured", "is_active", "created_by", "updated_by", "created_at", "updated_at", "deleted_at", "deleted_by") VALUES
(1, 1, 'event.webp', 1, 1, NULL, NULL, 1746038750, 1746038750, NULL, NULL),
(2, 1, 'event.webp', 0, 1, NULL, NULL, 1746038750, 1746038750, NULL, NULL),
(3, 1, 'event.webp', 0, 1, NULL, NULL, 1746038750, 1746038750, NULL, NULL),
(4, 1, 'event.webp', 0, 1, NULL, NULL, 1746038750, 1746038750, NULL, NULL),
(5, 1, 'event.webp', 0, 1, NULL, NULL, 1746038750, 1746038750, NULL, NULL),
(6, 2, 'c927c85b-1732-490c-bcdb-3e011ff7f27e.png', 0, 1, NULL, NULL, 1746703740, 1746703740, NULL, NULL);

INSERT INTO "venue_videos" ("id", "venue_id", "video_url", "is_active", "created_by", "updated_by", "created_at", "updated_at", "deleted_at", "deleted_by") VALUES
(1, 1, 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 1, NULL, NULL, 1746038750, 1746038750, NULL, NULL),
(2, 1, 'https://www.youtube.com/watch?v=ScMzIvxBSi4', 1, NULL, NULL, 1746038750, 1746038750, NULL, NULL);

COMMIT;
PRAGMA foreign_keys = ON;
