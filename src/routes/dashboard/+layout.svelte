<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import DarkMode from '$lib/components/DarkMode.svelte';
	import Search from '$lib/components/Search.svelte';
	import AvatarSettings from '$lib/components/AvatarSettings.svelte';
	import BottomMenu from '$lib/components/bottomMenu.svelte';

	let { children, data } = $props();
</script>

<Sidebar.Provider>
	<AppSidebar />
	<main class="flex min-w-0 flex-1 flex-col">
		<!-- Sticky at every width. This used to be absolutely positioned at
		     w-[95%], so on mobile it floated over the page content. -->
		<header
			class="sticky top-0 z-30 flex items-center justify-between gap-2 border-b border-border/60 bg-background/90 px-2 py-2 backdrop-blur-md sm:px-4"
		>
			<Sidebar.Trigger class="size-11 shrink-0 rounded-lg" />
			<div class="flex min-w-0 flex-row items-center gap-1 sm:gap-3">
				<Search />
				<DarkMode />
				<AvatarSettings data={data?.name} />
			</div>
		</header>

		<!-- pb-24 clears the mobile bottom bar; lg has no bottom bar. -->
		<div class="min-w-0 flex-1 p-2 pb-24 sm:p-4 lg:pb-6">
			{@render children?.()}
		</div>
	</main>

	<BottomMenu />
</Sidebar.Provider>
