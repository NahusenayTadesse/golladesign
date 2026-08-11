<script lang="ts">
	import { page } from '$app/state';
	import { Book, Briefcase, LayoutDashboard, Mail, Menu } from '@lucide/svelte';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';

	const sidebar = useSidebar();

	// The four sections that get edited most often. Everything else stays one
	// tap away behind "More", which opens the full sidebar.
	const mobNav = [
		{ title: 'Home', url: '/dashboard', icon: LayoutDashboard, exact: true },
		{ title: 'Projects', url: '/dashboard/projects', icon: Briefcase, exact: false },
		{ title: 'Blogs', url: '/dashboard/blog', icon: Book, exact: false },
		{ title: 'Messages', url: '/dashboard/messages', icon: Mail, exact: false }
	];

	const isActive = (url: string, exact: boolean) => {
		const path = page.url.pathname;
		return exact ? path === url : path.startsWith(url);
	};

	const openSidebar = () => sidebar.setOpenMobile(true);
</script>

<nav
	aria-label="Dashboard sections"
	class="fixed inset-x-0 bottom-0 z-40 border-t border-border/60 bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl lg:hidden"
>
	<div class="grid grid-cols-5 items-stretch">
		{#each mobNav as item (item.url)}
			{@const active = isActive(item.url, item.exact)}
			<a
				href={item.url}
				aria-current={active ? 'page' : undefined}
				class={[
					'relative flex min-h-14 touch-manipulation flex-col items-center justify-center gap-1 px-1 py-2 transition-colors active:bg-muted',
					active ? 'text-primary' : 'text-muted-foreground'
				]}
			>
				<item.icon class="size-5" />
				<span class="text-[10px] leading-none font-medium">{item.title}</span>
				{#if active}
					<span class="absolute top-0 h-0.5 w-10 rounded-b-full bg-primary"></span>
				{/if}
			</a>
		{/each}

		<button
			type="button"
			onclick={openSidebar}
			aria-label="Open all dashboard sections"
			class="flex min-h-14 touch-manipulation flex-col items-center justify-center gap-1 px-1 py-2 text-muted-foreground transition-colors active:bg-muted"
		>
			<Menu class="size-5" />
			<span class="text-[10px] leading-none font-medium">More</span>
		</button>
	</div>
</nav>
