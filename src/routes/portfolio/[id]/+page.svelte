<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import { ArrowLeftIcon, CalendarIcon, MapPinIcon, UserIcon, SparklesIcon } from '@lucide/svelte';
	import type { PortfolioItem } from '$lib/data/portfolio';
	import Gallery from '$lib/components/gallery.svelte';
	const { data } = $props();

	const item: PortfolioItem = $derived(data?.portfolioItems);

	const formattedDate = $derived(
		item.date
			? new Date(item.date).toLocaleDateString('en-US', {
					weekday: 'long',
					month: 'long',
					day: 'numeric',
					year: 'numeric'
				})
			: null
	);

	const event: PortfolioItem = $derived(data?.portfolioItems);

	const pageTitle = `${event.title} ${event.client ? `for ${event.client}` : ''} | Yebehir Ventures`;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{pageTitle}</title>
	<meta name="title" content={pageTitle} />
	<meta
		name="description"
		content={event.description?.substring(0, 160) ||
			`Experience the ${event.title} executed by Yebehir Ventures. Specialized in ${event.eventType} at ${event.location || 'Addis Ababa'}.`}
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content="/events/{event.slug}" />
	<meta property="og:title" content="" />
	<meta property="og:description" content={event.description?.substring(0, 160)} />
	<meta property="og:image" content="/files/{event.featuredImage}" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="/events/{event.slug}" />
	<meta property="twitter:title" content={pageTitle} />
	<meta property="twitter:description" content={event.description?.substring(0, 160)} />
	<meta property="twitter:image" content="/files/{event.featuredImage}" />

	<!-- Canonical URL -->
	<link rel="canonical" href="/events/{event.slug}" />

	<!-- Schema.org / JSON-LD for Event Rich Snippets -->
	{@html `<script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": "${event.title}",
      "startDate": "${event.date}",
      "location": {
        "@type": "Place",
        "name": "${event.location || '4 Kilo Plaza'}",
        "address": "Addis Ababa, Ethiopia"
      },
      "image": ["${event.featuredImage ? `/files/${event.featuredImage}` : ''}"],
      "description": "${event.description?.replace(/"/g, '\\"')}",
      "organizer": {
        "@type": "Organization",
        "name": "Yebehir Ventures",
        "url": "https://yebehir.com"
      }
    }
  </script>`}
</svelte:head>

<div class="min-h-dvh" in:fade={{ duration: 300 }}>
	<!-- Hero Image Section -->
	<div class="relative h-[50vh] overflow-hidden lg:h-[60vh]">
		<img src={`/files/${item.featuredImage}`} alt={item.title} class="h-full w-full object-cover" />
		<div
			class="absolute inset-0 bg-linear-to-t from-background via-background/40 to-transparent"
		></div>

		<!-- Back Button -->
		<div class="absolute top-6 left-6 z-10" in:fly={{ x: -20, duration: 400, delay: 200 }}>
			<Button
				variant="secondary"
				size="sm"
				class="shadow-lg-lg rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
				href="/events"
			>
				<ArrowLeftIcon class="mr-2 size-4" />
				Back to Portfolio
			</Button>
		</div>

		<!-- Event Type Badge -->
		{#if item.eventType}
			<div class="absolute top-6 right-6 z-10" in:fly={{ x: 20, duration: 400, delay: 200 }}>
				<Badge
					class="shadow-lg-lg bg-primary/90 px-4 py-1.5 text-sm text-primary-foreground backdrop-blur-sm"
				>
					{item.eventType}
				</Badge>
			</div>
		{/if}
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
					{item.title}
				</h1>

				<!-- Meta Information -->
				<div class="mb-6 flex flex-wrap gap-4 lg:gap-6">
					{#if formattedDate}
						<div class="flex items-center gap-2 text-muted-foreground">
							<div class="flex size-9 items-center justify-center rounded-full">
								<CalendarIcon class="size-4 " />
							</div>
							<div>
								<p class="text-xs text-muted-foreground/70">Date</p>
								<p class="text-sm font-medium text-foreground">{formattedDate}</p>
							</div>
						</div>
					{/if}
					{#if item.client}
						<div class="flex items-center gap-2 text-muted-foreground">
							<div class="flex size-9 items-center justify-center rounded-full">
								<UserIcon class="size-4" />
							</div>
							<div>
								<p class="text-xs text-muted-foreground/70">Client</p>
								<p class="text-sm font-medium text-foreground">{item.client}</p>
							</div>
						</div>
					{/if}
					{#if item.location}
						<div class="flex items-center gap-2 text-muted-foreground">
							<div class="flex size-9 items-center justify-center rounded-full">
								<MapPinIcon class="size-4" />
							</div>
							<div>
								<p class="text-xs text-muted-foreground/70">Location</p>
								<p class="text-sm font-medium text-foreground">{item.location}</p>
							</div>
						</div>
					{/if}
				</div>

				<Separator class="my-6" />

				<!-- Description -->
				{#if item.description}
					<div class="flex flex-col gap-4">
						<div class="flex items-center gap-2">
							<SparklesIcon
								class="size-5
							"
							/>
							<h2 class="text-lg font-semibold text-foreground">About This Event</h2>
						</div>
						<p class="text-base leading-relaxed text-muted-foreground lg:text-lg">
							{item.description}
						</p>
					</div>
				{/if}

				<!-- Additional Details Section -->
				<div class="mt-8 rounded-xl border border-border/50 bg-muted/50 p-6">
					<h3 class="mb-4 text-sm font-semibold tracking-wider text-foreground uppercase">
						Event Details
					</h3>
					<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<div class="space-y-1">
							<p class="text-xs text-muted-foreground">Event Type</p>
							<p class="text-sm font-medium text-foreground">{item.eventType || 'Not specified'}</p>
						</div>
						<!-- <div class="space-y-1">
							<p class="text-xs text-muted-foreground">Event ID</p>
							<p class="text-sm font-medium text-foreground">#{item.id}</p>
						</div>
						<div class="space-y-1">
							<p class="text-xs text-muted-foreground">Slug</p>
							<p class="font-mono text-sm font-medium text-foreground">{item.slug}</p>
						</div> -->
						<div class="space-y-1">
							<p class="text-xs text-muted-foreground">Status</p>
							<Badge variant="outline" class="text-xs">Completed</Badge>
						</div>
					</div>
				</div>

				<!-- CTA Section -->
				<div class="mt-8 flex flex-col gap-3 sm:flex-row">
					<Button class="flex-1 rounded-full" size="lg">Contact Us About This Event</Button>
					<Button variant="outline" class="flex-1 rounded-full" size="lg" href="/events"
						>View More Events</Button
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
{#if data?.images}
	<section class="relative bg-muted/30 py-20 lg:py-32">
		<!-- Subtle Decorative Background Element -->
		<div class="pointer-events-none absolute inset-0 overflow-hidden">
			<div class="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
			<div class="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl"></div>
		</div>

		<div class="container mx-auto px-4">
			<!-- Gallery Header -->
			<div
				class="mb-12 flex flex-col items-center space-y-4 text-center"
				in:fade={{ duration: 600, delay: 200 }}
			>
				<Badge variant="outline" class="px-4 py-1 tracking-widest uppercase">Gallery</Badge>
				<h2 class="text-3xl font-bold tracking-tight lg:text-5xl">Capturing the Moments</h2>
				<div class="h-1 w-20 rounded-full"></div>
				<p class="max-w-2xl">
					A visual journey through {item.title}. Take a closer look at the details and atmosphere we
					captured during this event.
				</p>
			</div>

			<!-- The Gallery Component -->
			<div
				class="relative rounded-3xl border bg-background/50 p-4 shadow-2xl backdrop-blur-sm lg:p-8"
			>
				<Gallery bento images={data.images} title={data?.portfolioItems?.title} />
			</div>

			<!-- Bottom CTA or Footer Note -->
			<div class="mt-12 text-center">
				<p class="text-sm italic">
					Interested in seeing more? <a href="/events" class="font-medium hover:underline"
						>Explore our full archive</a
					>.
				</p>
			</div>
		</div>
	</section>
{/if}

<!-- Extra Padding for Footer -->
<div class="h-12"></div>
