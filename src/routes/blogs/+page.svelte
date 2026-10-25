<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import PortfolioHero from '$lib/components/blogs/portfolio-hero.svelte';
	import PortfolioFilters from '$lib/components/blogs/portfolio-filters.svelte';
	import PortfolioGrid from '$lib/components/blogs/portfolio-grid.svelte';
	import type { BlogItem } from '$lib/data/portfolio';

	// Svelte 5 state management for structural search filtering
	let searchQuery = $state('');
	let selectedCategory = $state<string | null>(null);
	let { data } = $props();

	// Highly dynamic tracking for real-time journal text matching
	const filteredItems = $derived.by(() => {
		let items: BlogItem[] = data?.portfolioItems ?? [];

		// Filter by architectural design category
		if (selectedCategory) {
			items = items.filter((item) => item.category === selectedCategory);
		}

		// Filter across nested copy strings using the search text query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			items = items.filter(
				(item) =>
					item.title.toLowerCase().includes(query) ||
					item.excerpt?.toLowerCase().includes(query) ||
					item.category?.toLowerCase().includes(query) ||
					item.content?.toLowerCase().includes(query)
			);
		}

		return items;
	});

	const resultsCount = $derived(filteredItems.length);
</script>

<Seo
	title="Design Journal & Architecture Trends | Golla Design Group"
	description="Professional insights on premium architectural layouts, minimalist interior finishing adjustments, and luxury custom furniture fabrication trends from our Addis Ababa studio."
/>

<div class="min-h-dvh bg-background text-foreground">
	<!-- Hero Display Layout Block -->
	<PortfolioHero />

	<!-- Primary Interactive Article Board Content Frame -->
	<div class="mx-auto mt-12 max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
		<!-- Unified Filtering Input System Frame -->
		<div class="mb-12">
			<PortfolioFilters
				portfolioItems={data?.portfolioItems}
				bind:searchQuery
				placeholder="Search design articles..."
				bind:selectedEventType={selectedCategory}
			/>
		</div>

		<!-- Semantic Results Metadata Section -->
		<div class="mx-auto mb-8 max-w-md border-b border-border/40 pb-4 text-center">
			<p class="text-sm text-muted-foreground">
				Showing <span class="font-bold text-foreground">{resultsCount}</span>
				{resultsCount === 1 ? 'journal article' : 'journal articles'}
			</p>
		</div>

		<!-- Render Grid Canvas -->
		<PortfolioGrid items={filteredItems} />
	</div>
</div>
