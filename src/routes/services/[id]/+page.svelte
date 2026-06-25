<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { ArrowLeftIcon, CompassIcon, LayersIcon, ArrowRightIcon } from '@lucide/svelte';
	import Gallery from '$lib/components/gallery.svelte';

	type Service = {
		id: string | number;
		name: string;
		slug: string;
		featuredImage: string | null;
		description: string | null;
		longDescription: string | null;
	};

	let { data } = $props();

	// Resolved unified service entity binding from runtime page loading
	const service: Service = $derived(data?.service);

	const imageUrl = $derived(
		service?.featuredImage ? `/files/${service.featuredImage}` : `/logo.jpg`
	);

	const pageTitle = $derived(`${service?.name || 'Studio Pillar'} | Golla Design Group`);
</script>

<svelte:head>
	<!-- Primary Structural Meta Tags -->
	<title>{pageTitle}</title>
	<meta name="title" content={pageTitle} />
	<meta
		name="description"
		content={service?.description ||
			`Professional ${service?.name} consulting across Addis Ababa by Golla Design Group. We shape enduring human spatial narratives.`}
	/>

	<!-- Open Graph / Social Matrices -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://golladesign.com/services/${service?.slug}" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={service?.description} />
	<meta property="og:image" content={imageUrl} />

	<!-- Twitter Engine Specs -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://golladesign.com/services/${service?.slug}" />
	<meta property="twitter:title" content={pageTitle} />
	<meta property="twitter:description" content={service?.description} />
	<meta property="twitter:image" content={imageUrl} />

	<link rel="canonical" href="https://golladesign.com/services/${service?.slug}" />

	<!-- Local Architectural Practice Schema Injection -->
	{#if service}
		{@html `<script type="application/ld+json">
			{
				"@context": "https://schema.org",
				"@type": "Service",
				"serviceType": "${service.name}",
				"provider": {
					"@type": "ArchitecturalBusiness",
					"name": "Golla Design Group",
					"image": "https://golladesign.com/logo.png",
					"address": {
						"@type": "PostalAddress",
						"addressLocality": "Addis Ababa",
						"addressCountry": "ET"
					}
				},
				"description": "${service.description?.replace(/"/g, '\\"') || ''}",
				"image": "${imageUrl}"
			}
		</script>`}
	{/if}
</svelte:head>

<div class="min-h-dvh bg-background text-foreground" in:fade={{ duration: 250 }}>
	<!-- Studio Cover Banner Matrix -->
	<div class="relative h-[45vh] overflow-hidden border-b border-border/40 lg:h-[55vh]">
		<!-- Technical Layout Underlay Grid Background -->
		<div
			class="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:32px_32px]"
		></div>

		<img
			src={service?.featuredImage ? `/files/${service.featuredImage}` : '/fallback-blueprint.webp'}
			alt={service?.name}
			class="h-full w-full object-cover grayscale-25"
		/>
		<div
			class="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/50 to-transparent"
		></div>

		<!-- Back-jump Control Navigation -->
		<div class="absolute top-6 left-6 z-20" in:fly={{ x: -15, duration: 400, delay: 100 }}>
			<Button
				variant="outline"
				size="sm"
				class="h-9 rounded-xl border-border/60 bg-background/80 px-4 text-xs font-bold tracking-wider uppercase shadow-xs backdrop-blur-md"
				href="/services"
			>
				<ArrowLeftIcon class="mr-2 size-3.5" />
				All Services
			</Button>
		</div>
	</div>

	<!-- Main Content Shell Layout -->
	<div class="relative z-20 -mt-24 lg:-mt-36">
		<div class="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
			<div
				class="rounded-2xl border border-border/60 bg-card p-6 shadow-xl shadow-muted/20 md:p-10"
				in:fly={{ y: 30, duration: 450 }}
			>
				<!-- Service Branding Pillar -->
				<h1 class="text-3xl font-black tracking-tight text-foreground uppercase lg:text-4xl">
					{service?.name}
				</h1>

				<Separator class="my-6 bg-border/50" />

				<!-- Service Summary Callout Paragraph -->
				{#if service?.description}
					<div class="flex flex-col gap-3">
						<div
							class="flex items-center gap-2 text-xs font-black tracking-widest text-primary uppercase"
						>
							<CompassIcon class="size-4 stroke-[1.75]" />
							Consultation Frame
						</div>
						<p class="text-base leading-relaxed font-medium text-muted-foreground sm:text-lg">
							{service.description}
						</p>
					</div>
				{/if}

				<!-- Structural Long Content & Schematic Modules -->
				{#if service?.longDescription || data?.images?.length}
					<article class="mt-8 space-y-8 rounded-xl border border-border/50 bg-muted/20 p-6">
						{#if service?.longDescription}
							<div
								class="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed text-muted-foreground/90"
							>
								{@html service.longDescription}
							</div>
						{/if}

						<!-- Contextual Capabilities Work Gallery Embedding -->
						{#if data?.images?.length}
							<div class="space-y-3 border-t border-border/40 pt-4">
								<div
									class="flex items-center gap-2 text-[10px] font-black tracking-widest text-muted-foreground/70 uppercase"
								>
									<LayersIcon class="size-3.5" />
									Related Studio Reference Executions
								</div>
								<Gallery bento images={data.images} title={service?.name} />
							</div>
						{/if}
					</article>
				{/if}

				<!-- Interactive Brief Strategy Call To Actions -->
				<div class="mt-8 flex flex-col gap-3 sm:flex-row">
					<Button
						class="h-12 flex-1 gap-1.5 rounded-xl text-xs font-black tracking-widest uppercase"
						href="/contact"
						size="lg"
					>
						Request Structural Proposal <ArrowRightIcon class="size-3.5" />
					</Button>
					<Button
						variant="outline"
						class="h-12 flex-1 rounded-xl border-border/60 text-xs font-black tracking-widest uppercase"
						size="lg"
						href="/services"
					>
						Review Practice Portfolio
					</Button>
				</div>
			</div>
		</div>
	</div>

	<!-- Layout Frame Baseline Padding -->
	<div class="h-24"></div>
</div>
