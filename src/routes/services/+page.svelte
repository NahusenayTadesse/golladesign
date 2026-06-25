<script lang="ts">
	import ServiceGrid from '$lib/components/services/service-grid.svelte';
	import { SparklesIcon } from '@lucide/svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Our Services | Architecture, Interior Design &amp; Fabrication | Golla Design Group</title>
	<meta
		name="title"
		content="Our Services | Architecture, Interior Design &amp; Fabrication | Golla Design Group"
	/>
	<meta
		name="description"
		content="Explore Golla Design Group's premium services in Addis Ababa: comprehensive architectural blueprinting, high-end interior structural finishing, and bespoke custom furniture fabrication."
	/>

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="/services" />
	<meta
		property="og:title"
		content="Spatial Architecture &amp; Luxury Fabrication | Golla Design Group"
	/>
	<meta
		property="og:description"
		content="We handle every design layer—from photorealistic ray-traced 3D models to technical material execution and custom built-in furniture setup."
	/>
	<meta property="og:image" content="/logo.jpg" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:title" content="Golla Design Group | Architectural Studio Services" />
	<meta property="twitter:image" content="/logo.jpg" />

	<link rel="canonical" href="/services" />
</svelte:head>

<!-- Premium Studio Header Section -->
<section
	class="relative mb-12 overflow-hidden border-b border-border/40 bg-cover bg-center px-4 py-24 text-foreground sm:py-36"
	style="background-image: url('/golla1.webp')"
>
	<!-- Theme-compliant mask overlay -->
	<div class="absolute inset-0 bg-background/30 backdrop-blur-xs"></div>

	<!-- Content Box -->
	<div class="relative mx-auto max-w-4xl space-y-6 px-4 text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase"
		>
			<SparklesIcon class="size-3.5" />
			<span>Studio Services</span>
		</div>

		<h1
			class="text-4xl font-black tracking-tight text-foreground uppercase sm:text-5xl lg:text-6xl"
		>
			Beautiful &amp; Useful
		</h1>

		<p class="mx-auto max-w-2xl text-base leading-relaxed sm:text-lg">
			Golla Design Group delivers an interconnected spatial workflow spanning advanced structural
			layouts, photorealistic visualization models, sophisticated material finishing, and custom
			artisanal millwork.
		</p>
	</div>
</section>

<!-- Dynamic Services Render Frame -->
{#if data?.servicesItems?.length}
	<div class="bg-background py-6">
		<ServiceGrid services={data.servicesItems} />
	</div>
{/if}
