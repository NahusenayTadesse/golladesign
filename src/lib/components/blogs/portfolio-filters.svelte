<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { SearchIcon, XIcon } from '@lucide/svelte';
	import type { BlogItem } from '$lib/data/portfolio';

	let {
		searchQuery = $bindable(''),
		portfolioItems,
		selectedEventType = $bindable<string | null>(null)
	}: {
		searchQuery: string;
		portfolioItems: BlogItem[];
		selectedEventType: string | null;
	} = $props();

	const eventTypes = [
		...new Set(portfolioItems.map((item) => item.category).filter(Boolean))
	] as string[];

	const clearFilters = () => {
		searchQuery = '';
		selectedEventType = null;
	};

	const hasActiveFilters = $derived(searchQuery.length > 0 || selectedEventType !== null);
</script>

<div class="space-y-6">
	<!-- Search Input -->
	<div class="relative mx-auto max-w-md">
		<SearchIcon class="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
		<Input
			type="text"
			placeholder="Search blogs..."
			bind:value={searchQuery}
			class="h-12 rounded-full border-2 border-border bg-background/80 pr-4 pl-12 text-base backdrop-blur-sm focus:border-primary"
		/>
		{#if searchQuery.length > 0}
			<Button
				variant="ghost"
				size="icon"
				class="absolute top-1/2 right-2 size-8 -translate-y-1/2 rounded-full"
				onclick={() => (searchQuery = '')}
			>
				<XIcon class="size-4" />
			</Button>
		{/if}
	</div>

	<!-- Event Type Filters -->
	<div class="flex flex-wrap items-center justify-center gap-2">
		<Button
			variant={selectedEventType === null ? 'default' : 'outline'}
			size="sm"
			class="rounded-full"
			onclick={() => (selectedEventType = null)}>All Blogs</Button
		>
		{#each eventTypes as eventType}
			<Button
				variant={selectedEventType === eventType ? 'default' : 'outline'}
				size="sm"
				class="rounded-full"
				onclick={() => (selectedEventType = selectedEventType === eventType ? null : eventType)}
			>
				{eventType}
			</Button>
		{/each}
		{#if hasActiveFilters}
			<Button
				variant="ghost"
				size="sm"
				class="rounded-full text-muted-foreground hover:text-foreground"
				onclick={clearFilters}
			>
				<XIcon class="mr-1 size-4" />
				Clear
			</Button>
		{/if}
	</div>
</div>
