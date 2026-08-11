<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import { Disc, Search } from '@lucide/svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { goto } from '$app/navigation';

	let isOpen = $state(false);

	// Kept in step with the routes that actually exist under /dashboard.
	const list = [
		{ label: 'Dashboard', path: '/dashboard' },

		{ label: 'Blogs', path: '/dashboard/blog' },
		{ label: 'Add Blog', path: '/dashboard/blog/add-blog' },
		{ label: 'Blog Categories', path: '/dashboard/blog/category' },

		{ label: 'Projects', path: '/dashboard/projects' },
		{ label: 'Add Project', path: '/dashboard/projects/add-project' },
		{ label: 'Project Categories', path: '/dashboard/projects/category' },

		{ label: 'Services', path: '/dashboard/services' },
		{ label: 'Add Service', path: '/dashboard/services/add-service' },

		{ label: 'Messages', path: '/dashboard/messages' },
		{ label: 'Partner Logos', path: '/dashboard/logos' },
		{ label: 'Testimonials', path: '/dashboard/testimonials' },
		{ label: 'Team Members', path: '/dashboard/team' },

		{ label: 'Admin Panel', path: '/dashboard/admin-panel' },
		{ label: 'Users', path: '/dashboard/admin-panel/users' },
		{ label: 'Add User', path: '/dashboard/admin-panel/users/add-users' },
		{ label: 'Roles', path: '/dashboard/admin-panel/roles' },
		{ label: 'Add Role', path: '/dashboard/admin-panel/roles/add-roles' }
	];

	const open = (path: string) => {
		isOpen = false;
		goto(path);
	};
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger title="Search for Pages">
		{#snippet child({ props })}
			<button
				{...props}
				type="button"
				aria-label="Search pages"
				class="flex size-11 shrink-0 touch-manipulation items-center justify-center rounded-lg transition-colors hover:bg-muted active:bg-muted"
			>
				<Search class="size-5" />
			</button>
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class="w-full">
		<Dialog.Header>
			<Dialog.Title>Search the whole site</Dialog.Title>
		</Dialog.Header>
		<ScrollArea class="h-auto rounded-md border p-2">
			<Command.Root class="rounded-lg shadow-md">
				<Command.Input placeholder="Type a page name..." type="search" />
				<Command.List>
					<Command.Empty>No results found.</Command.Empty>
					<Command.Group heading="Pages">
						{#each list as item (item.path)}
							<!-- The whole row navigates; it used to wrap a bare <a>, so taps
							     landing beside the link text did nothing. -->
							<Command.Item
								value={item.label}
								onSelect={() => open(item.path)}
								class="min-h-11 cursor-pointer touch-manipulation"
							>
								<Disc class="size-4" />
								<span>{item.label}</span>
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.List>
			</Command.Root>
		</ScrollArea>
	</Dialog.Content>
</Dialog.Root>
