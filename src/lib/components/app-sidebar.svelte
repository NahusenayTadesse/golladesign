<script lang="ts">
	import {
		Users,
		UserRoundCog,
		LayoutDashboard,
		ShieldCheck,
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
			title: 'Blogs',
			url: '/dashboard/blog',
			icon: Book,
			items: [
				{ title: 'Add New Blog', url: '/dashboard/blog/add-blog', icon: Plus },
				{ title: 'View All Blogs', url: '/dashboard/blog', icon: Sheet }
			]
		},
		{
			title: 'Projects',
			url: '/dashboard/projects',
			icon: Briefcase,
			items: [
				{ title: 'Add New Project', url: '/dashboard/projects/add-project', icon: Plus },
				{ title: 'View All Projects', url: '/dashboard/projects', icon: Sheet }
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
			items: [
				{ title: 'Users', url: '/dashboard/admin-panel/users', icon: Users },
				{ title: 'Roles', url: '/dashboard/admin-panel/roles', icon: ShieldCheck }
			]
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
	<Sidebar.Content class="z-9999! h-full [scrollbar-width:thin] overflow-y-scroll pt-4">
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
						class="block h-32 w-32 object-contain text-center invert dark:invert-0"
						alt="Logo"
					/>
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
