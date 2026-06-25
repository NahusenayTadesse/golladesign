<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { SearchIcon, XIcon } from '@lucide/svelte';
	import type { PortfolioItem } from '$lib/data/portfolio';

	let {
		searchQuery = $bindable(''),
		portfolioItems,
		selectedEventType = $bindable<string | null>(null), // Maintained prop binding for component signature interface stability
		placeholder = 'Search projects...'
	}: {
		searchQuery: string;
		portfolioItems: PortfolioItem[];
		selectedEventType: string | null;
		placeholder?: string;
	} = $props();

	// Extract unique categories safely from the spatial items collection
	const designCategories = $derived([
		...new Set((portfolioItems ?? []).map((item) => item.category).filter(Boolean))
	] as string[]);

	const clearFilters = () => {
		searchQuery = '';
		selectedEventType = null;
	};

	const hasActiveFilters = $derived(searchQuery.length > 0 || selectedEventType !== null);
</script>

<div class="space-y-6">
	<!-- Search Input Container -->
	<div class="relative mx-auto max-w-md">
		<SearchIcon class="absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted-foreground" />
		<Input
			type="text"
			{placeholder}
			bind:value={searchQuery}
			class="h-11 rounded-xl border border-border/60 bg-background/80 pr-10 pl-11 text-sm backdrop-blur-xs focus-visible:border-primary focus-visible:ring-1 focus-visible:ring-primary"
		/>
		{#if searchQuery.length > 0}
			<Button
				variant="ghost"
				size="icon"
				class="absolute top-1/2 right-1.5 size-7 -translate-y-1/2 rounded-lg"
				onclick={() => (searchQuery = '')}
			>
				<XIcon class="size-3.5" />
			</Button>
		{/if}
	</div>

	<!-- Architectural Category Alignment Badges -->
	<div class="flex flex-wrap items-center justify-center gap-2">
		<Button
			variant={selectedEventType === null ? 'default' : 'outline'}
			size="sm"
			class="h-8 rounded-xl px-4 py-1.5 text-xs font-bold tracking-wider uppercase"
			onclick={() => (selectedEventType = null)}
		>
			All Projects
		</Button>

		{#each designCategories as category}
			<Button
				variant={selectedEventType === category ? 'default' : 'outline'}
				size="sm"
				class="h-8 rounded-xl border-border/60 px-4 py-1.5 text-xs font-bold tracking-wider uppercase"
				onclick={() => (selectedEventType = selectedEventType === category ? null : category)}
			>
				{category}
			</Button>
		{/each}

		{#if hasActiveFilters}
			<Button
				variant="ghost"
				size="sm"
				class="h-8 rounded-xl px-3 text-xs font-semibold text-muted-foreground hover:text-foreground"
				onclick={clearFilters}
			>
				<XIcon class="mr-1 size-3.5" />
				Reset
			</Button>
		{/if}
	</div>
</div>
