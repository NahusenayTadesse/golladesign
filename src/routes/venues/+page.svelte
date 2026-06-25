<script lang="ts">
	import ServiceGrid from '$lib/components/services/service-grid.svelte';
	import Venues from '$lib/components/venues.svelte';
	import { MapPin, SparklesIcon } from '@lucide/svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Premier Venues | 4 Kilo Plaza & Event Spaces | Yebehir Ventures</title>
	<meta name="title" content="Premier Venues | 4 Kilo Plaza & Event Spaces | Yebehir Ventures" />
	<meta
		name="description"
		content="Explore our curated selection of premier event spaces in Addis Ababa, including the flagship 4 Kilo Plaza. Modern facilities designed for corporate galas, summits, and brand launches."
	/>

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="/venues" />
	<meta property="og:title" content="Iconic Spaces for Iconic Events | Yebehir Ventures" />
	<meta
		property="og:description"
		content="From the heart of Addis Ababa at 4 Kilo Plaza to bespoke event settings, find the perfect stage for your next vision."
	/>
	<meta property="og:image" content="/logo.jpg" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content="Yebehir Ventures | Premier Venues" />
	<meta property="twitter:image" content="/logo.jpg" />

	<link rel="canonical" href="/venues" />
</svelte:head>

<section
	class="relative mb-10 overflow-hidden bg-muted/30 bg-cover bg-center px-4 py-20 text-white sm:py-32"
	style="background-image: url('/event (1).webp')"
>
	<div class="absolute inset-0 bg-primary/70 dark:bg-primary-foreground/70"></div>

	<!-- Content -->
	<div class="relative mx-auto max-w-4xl px-4 text-center">
		<div
			class="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium"
		>
			<MapPin class="size-4" />
			<span>Exclusive Locations</span>
		</div>
		<h1 class="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
			The Stage for Excellence
		</h1>
		<p class="mx-auto max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
			Discover sophisticated spaces designed to inspire. From our flagship operations at 4 Kilo
			Plaza to versatile luxury settings, we provide the infrastructure for unforgettable
			experiences.
		</p>
	</div>
</section>

{#if data?.venueList.length}
	<div class="container mx-auto mb-8 px-4 lg:mb-16 lg:px-16">
		<Venues venues={data?.venueList} layout="grid" fallbackImage="/event (1).webp" />
	</div>
{/if}
