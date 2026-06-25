<script lang="ts">
	import PortfolioHero from '$lib/components/portfolio/portfolio-hero.svelte';
	import PortfolioFilters from '$lib/components/portfolio/portfolio-filters.svelte';
	import PortfolioGrid from '$lib/components/portfolio/portfolio-grid.svelte';

	// Upgraded explicit type alignment to match the Golla Drizzle SQLite schema
	type PortfolioItem = {
		id: string | number;
		title: string;
		slug: string;
		category: string;
		description: string | null;
		isFeatured: boolean;
		featuredImage: string | null;
		completedAt: string | null;
		clientName: string | null;
		location: string | null;
		excerpt: string | null;
		content: string | null;
	};

	// Svelte 5 reactive filtering matrix configurations
	let searchQuery = $state('');
	let selectedCategory = $state<string | null>(null);

	let { data } = $props();

	// Derived filtration pipeline using Svelte 5 Runes
	const filteredItems = $derived.by(() => {
		let items: PortfolioItem[] = data?.portfolioItems ?? [];

		// Filter by Architectural Category Allocation
		if (selectedCategory) {
			items = items.filter((item) => item.category === selectedCategory);
		}

		// Search optimization vector matching structural strings
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			items = items.filter(
				(item) =>
					item.title.toLowerCase().includes(query) ||
					item.excerpt?.toLowerCase().includes(query) ||
					item.description?.toLowerCase().includes(query) ||
					item.clientName?.toLowerCase().includes(query) ||
					item.location?.toLowerCase().includes(query)
			);
		}

		return items;
	});

	const resultsCount = $derived(filteredItems.length);
</script>

<svelte:head>
	<!-- Studio SEO Metadata Blocks -->
	<title>Studio Portfolio | Golla Design Group Architecture</title>
	<meta name="title" content="Studio Portfolio | Golla Design Group Architecture" />
	<meta
		name="description"
		content="Explore our completed spatial portfolio, luxury room concepts, and photorealistic architectural visualizations executed across Addis Ababa."
	/>

	<!-- Open Graph / Social Engine Parameters -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="/portfolio" />
	<meta
		property="og:title"
		content="Golla Design Group Portfolio | Architectural Blueprint Archives"
	/>
	<meta
		property="og:description"
		content="From boutique commercial structural layouts to master planned residential interiors. Walk through our spatial project archive."
	/>
	<meta property="og:image" content="/golla1.webp" />

	<!-- Twitter Metric Frames -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content="Golla Design Group | Project Portfolio" />
	<meta property="twitter:image" content="/golla1.webp" />

	<link rel="canonical" href="/portfolio" />
</svelte:head>

<div class="min-h-dvh bg-background text-foreground transition-colors duration-200">
	<!-- Hero Presentation Block -->
	<PortfolioHero />

	<!-- Core Architectural Content Filter Grid Area -->
	<main class="mx-auto mt-6 max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
		<!-- Portfolio Interface Control Layout -->
		<div class="mb-12">
			<PortfolioFilters
				portfolioItems={data?.portfolioItems}
				bind:searchQuery
				bind:selectedEventType={selectedCategory}
				placeholder="Search blueprints, client codes, or locations..."
			/>
		</div>

		<!-- Real-time Metrics Readout Counter -->
		<div class="mb-8 text-center">
			<p class="text-xs font-bold tracking-widest text-muted-foreground/70 uppercase">
				Displaying <span class="font-black text-foreground">{resultsCount}</span>
				{resultsCount === 1 ? 'architectural case' : 'architectural cases'}
			</p>
		</div>

		<!-- Dynamic Spatial Layout Rendering Deck -->
		{#if resultsCount > 0}
			<PortfolioGrid items={filteredItems} />
		{:else}
			<div class="rounded-2xl border border-dashed border-border/60 bg-muted/20 py-16 text-center">
				<p class="text-sm font-semibold text-muted-foreground">
					No projects match your current filter constraints.
				</p>
			</div>
		{/if}
	</main>
</div>
