<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import { ArrowLeftIcon, CalendarIcon, MapPinIcon, UserIcon, SparklesIcon } from '@lucide/svelte';
	type Service = {
		id: number;
		name: string;
		featuredImage: string | null;
		description: string | null;
	};
	import Gallery from '$lib/components/gallery.svelte';
	const { data } = $props();

	const item: Service = $derived(data?.portfolioItems);
	const service: Service = $derived(data?.portfolioItems);

	const imageUrl = $derived(
		service.featuredImage ? `/files/${service.featuredImage}` : `/logo.jpg`
	);

	// SEO optimization: Even if the URL uses ID, we keep the content brand-focused
	const pageTitle = `${service.name} | Yebehir Ventures`;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{pageTitle}</title>
	<meta name="title" content={pageTitle} />
	<meta
		name="description"
		content={service.description ||
			`Professional ${service.name} services in Addis Ababa by Yebehir Ventures. We deliver premium results ahead of the curve.`}
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="/services/${service.id}" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={service.description} />
	<meta property="og:image" content={imageUrl} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="/services/${service.id}" />
	<meta property="twitter:title" content={pageTitle} />
	<meta property="twitter:description" content={service.description} />
	<meta property="twitter:image" content={imageUrl} />

	<!-- Canonical URL to prevent duplicate content if query params are added -->
	<link rel="canonical" href="/services/${service.id}" />

	<!-- Local Business / Service Schema -->
	{@html `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "serviceType": "${service.name}",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Yebehir Ventures",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Addis Ababa",
          "addressCountry": "ET"
        }
      },
      "description": "${service.description?.replace(/"/g, '\\"')}",
      "image": "${imageUrl}"
    }
  </script>`}
</svelte:head>

<div class="min-h-dvh" in:fade={{ duration: 300 }}>
	<!-- Hero Image Section -->
	<div class="relative h-[50vh] overflow-hidden lg:h-[60vh]">
		<img src={`/files/${item.featuredImage}`} alt={item.name} class="h-full w-full object-cover" />
		<div
			class="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"
		></div>

		<!-- Back Button -->
		<div class="absolute top-6 left-6 z-10" in:fly={{ x: -20, duration: 400, delay: 200 }}>
			<Button
				variant="secondary"
				size="sm"
				class="shadow-lg-lg rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
				href="/services"
			>
				<ArrowLeftIcon class="mr-2 size-4" />
				Back to Services
			</Button>
		</div>

		<!-- Event Type Badge -->
	</div>

	<!-- Content Section -->
	<div class="relative -mt-20 lg:-mt-32">
		<div class="mx-auto max-w-4xl px-4 lg:px-8">
			<div
				class="shadow-lg-xl rounded-2xl border bg-card p-6 lg:p-10"
				in:fly={{ y: 40, duration: 500, delay: 100 }}
			>
				<!-- Title -->
				<h1 class="mb-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
					{item.name}
				</h1>

				<!-- Meta Information -->

				<Separator class="my-6" />

				<!-- Description -->
				{#if item.description}
					<div class="flex flex-col gap-4">
						<div class="flex items-center gap-2">
							<SparklesIcon
								class="size-5
							"
							/>
							<h2 class="text-lg font-semibold text-foreground">About This Service</h2>
						</div>
						<p class="text-base leading-relaxed text-muted-foreground lg:text-lg">
							{item.description}
						</p>
					</div>
				{/if}

				<!-- Additional Details Section -->
				<article class="mt-8 rounded-xl border border-border/50 bg-muted/50 p-6">
					{@html item.longDescription}

					{#if data?.images}
						<Gallery bento images={data.images} title={item.name} />
					{/if}
				</article>

				<!-- CTA Section -->
				<div class="mt-8 flex flex-col gap-3 sm:flex-row">
					<Button class="flex-1 rounded-full" href="/contact-us" size="lg"
						>Contact Us About This Service</Button
					>
					<Button variant="outline" class="flex-1 rounded-full" size="lg" href="/services"
						>View More Services</Button
					>
				</div>
			</div>
		</div>
	</div>

	<!-- Spacer -->
	<div class="h-20"></div>
</div>

<!-- ... existing code ... -->

<!-- Gallery Section -->
