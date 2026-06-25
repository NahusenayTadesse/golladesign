<script lang="ts">
	import {
		Users,
		UserRoundCog,
		LayoutDashboard,
		MapPin,
		TrendingUp,
		Plus,
		Sheet,
		Mail,
		Star,
		Contact,
		Quote,
		Briefcase,
		Book,
		Images
	} from '@lucide/svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';

	import NavMain from './NavMain.svelte';

	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	const navigation = [
		{ title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },

		{
			title: 'Quote Requests',
			url: '/dashboard/quotes',
			icon: Quote
		},

		{
			title: 'Events & Portfolio',
			url: '/dashboard/events',
			icon: Briefcase,
			items: [
				{ title: 'All Portfolio Items', url: '/dashboard/events', icon: Sheet },
				{ title: 'Add Event', url: '/dashboard/events/add-event', icon: Plus }
			]
		},

		{
			title: 'Blogs',
			url: '/dashboard/blog',
			icon: Book,
			items: [
				{ title: 'Add New Blog', url: '/dashboard/blog/add-blog', icon: Plus },
				{ title: 'View All Blogs', url: '/dashboard/blog', icon: Sheet }
			]
		},

		{
			title: 'Venue Management',
			url: '/dashboard/venues',
			icon: MapPin,
			items: [
				{ title: 'Add New Venue', url: '/dashboard/venues/add-venue', icon: Plus },
				{ title: 'View All Venues', url: '/dashboard/venues', icon: Sheet }
			]
		},

		{
			title: 'Services',
			url: '/dashboard/services',
			icon: TrendingUp
		},

		{
			title: 'Messages',
			url: '/dashboard/messages',
			icon: Mail
		},

		{
			title: 'Partner Logos',
			url: '/dashboard/logos',
			icon: Images
		},

		// {
		// 	title: 'Gallery',
		// 	url: '/dashboard/gallery',
		// 	icon: Image
		// },bu

		{
			title: 'Testimonials',
			url: '/dashboard/testimonials',
			icon: Star
		},

		{
			title: 'Team Members',
			url: '/dashboard/team',
			icon: Contact
		},

		// {
		// 	title: 'Reports',
		// 	url: '/dashboard/reports',
		// 	icon: ChartArea
		// },

		{
			title: 'Admin Panel',
			url: '/dashboard/admin-panel',
			icon: UserRoundCog,
			items: [{ title: 'Users', url: '/dashboard/admin-panel/users', icon: Users }]
		}
	];

	const sidebar = useSidebar();

	function closeSidebar() {
		if (sidebar.isMobile) {
			sidebar.setOpenMobile(false);
		}
	}
</script>

<Sidebar.Root collapsible="offcanvas" {...restProps}>
	<Sidebar.Content class="z-9999! h-full overflow-y-scroll pt-4 [scrollbar-width:thin]">
		<Sidebar.Group>
			<Sidebar.GroupLabel>
				<a
					class="flex flex-row items-center justify-center gap-4"
					href="/"
					title="Go to Website Home Page"
					target="_blank"
				>
					<img
						src="/logoForWhite.webp"
						class="block h-16 w-16 object-contain dark:hidden"
						alt="Logo"
					/>
					<img src="/logo.webp" class="hidden h-16 w-16 object-contain dark:block" alt="Logo" />
					<h4 class="text-center text-[16px]! font-bold">Yebehir Ventures</h4>
				</a>
			</Sidebar.GroupLabel>

			<Sidebar.GroupContent class="my-6">
				<NavMain {closeSidebar} items={navigation} />
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>

	<Sidebar.Footer class="flex flex-row border-t bg-background">
		<Sidebar.GroupLabel>
			Powered By <a
				href="https://nahusenaytadesse.vercel.app"
				target="_blank"
				class="ml-1 hover:underline">NT</a
			>
		</Sidebar.GroupLabel>
	</Sidebar.Footer>
</Sidebar.Root>
