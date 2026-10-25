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
		Images,
		FileText,
		CircleHelp,
		Settings,
		History
	} from '@lucide/svelte';
	import { page } from '$app/state';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { siteLogos } from '$lib/site';
	import type { ComponentProps } from 'svelte';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';

	import NavMain from './NavMain.svelte';

	let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	const allNavigation = [
		{ title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
		{
			title: 'Blogs',
			url: '/dashboard/blog',
			icon: Book,
			perm: 'manage_content',
			items: [
				{ title: 'Add New Blog', url: '/dashboard/blog/add-blog', icon: Plus },
				{ title: 'View All Blogs', url: '/dashboard/blog', icon: Sheet }
			]
		},
		{
			title: 'Projects',
			url: '/dashboard/projects',
			icon: Briefcase,
			perm: 'manage_content',
			items: [
				{ title: 'Add New Project', url: '/dashboard/projects/add-project', icon: Plus },
				{ title: 'View All Projects', url: '/dashboard/projects', icon: Sheet }
			]
		},
		{ title: 'Services', url: '/dashboard/services', icon: TrendingUp, perm: 'manage_content' },
		{ title: 'Quote Requests', url: '/dashboard/quotes', icon: FileText, perm: 'manage_leads' },
		{ title: 'Messages', url: '/dashboard/messages', icon: Mail, perm: 'manage_leads' },
		{ title: 'Partner Logos', url: '/dashboard/logos', icon: Images, perm: 'manage_content' },
		{ title: 'Testimonials', url: '/dashboard/testimonials', icon: Star, perm: 'manage_content' },
		{ title: 'Team Members', url: '/dashboard/team', icon: Contact, perm: 'manage_content' },
		{ title: 'FAQs', url: '/dashboard/faqs', icon: CircleHelp, perm: 'manage_content' },
		{ title: 'Site Settings', url: '/dashboard/settings', icon: Settings, perm: 'manage_settings' },
		{ title: 'Activity Log', url: '/dashboard/activity', icon: History, perm: 'view_activity' },
		{
			title: 'Admin Panel',
			url: '/dashboard/admin-panel',
			icon: UserRoundCog,
			perm: 'manage_users',
			items: [
				{ title: 'Overview', url: '/dashboard/admin-panel', icon: LayoutDashboard },
				{ title: 'Users', url: '/dashboard/admin-panel/users', icon: Users },
				{ title: 'Roles', url: '/dashboard/admin-panel/roles', icon: ShieldCheck }
			]
		}
	];

	// Only show sections the user's role can open.
	const navigation = $derived(
		allNavigation.filter((item) => !item.perm || page.data.permissions?.includes(item.perm))
	);

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
						src={siteLogos.mark}
						class="block h-16 w-auto object-contain brightness-[0.4] contrast-125 dark:brightness-100 dark:contrast-100"
						alt="Golla Design Group"
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
