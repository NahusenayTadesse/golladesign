<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { ArrowLeftIcon, CompassIcon, LayersIcon, ArrowRightIcon } from '@lucide/svelte';
	import Gallery from '$lib/components/gallery.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import PortfolioCard from '$lib/components/portfolio/portfolio-card.svelte';
	import { page } from '$app/state';

	type Service = {
		id: string | number;
		name: string;
		slug: string;
		featuredImage: string | null;
		description: string | null;
		longDescription: string | null;
		metaTitle: string | null;
		metaDescription: string | null;
		ogImage: string | null;
	};

	let { data } = $props();

	// Resolved unified service entity binding from runtime page loading
	const service: Service = $derived(data?.service);

	const imageUrl = $derived(
		service?.featuredImage ? `/files/${service.featuredImage}` : `/logo.jpg`
	);

	const pageTitle = $derived(`${service?.name || 'Studio Pillar'} | Golla Design Group`);

	const jsonLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'Service',
		serviceType: service?.name,
		provider: {
			'@type': 'ProfessionalService',
			name: 'Golla Design Group',
			image: `${page.url.origin}/logo.jpg`,
			address: { '@type': 'PostalAddress', addressLocality: 'Addis Ababa', addressCountry: 'ET' }
		},
		description: service?.description ?? '',
		image: `${page.url.origin}${imageUrl}`
	});
</script>

<Seo
	title={service?.metaTitle || pageTitle}
	description={service?.metaDescription ||
		service?.description ||
		`Professional ${service?.name} services in Addis Ababa by Golla Design Group.`}
	image={service?.ogImage ? `/files/${service.ogImage}` : imageUrl}
/>

<svelte:head>
	{#if service}
		<!-- JSON.stringify escapes quotes; "<" is escaped so content can't close the script tag. -->
		{@html `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>`}
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
								<Gallery images={data.images} alts={data.imageAlts} title={service?.name} />
							</div>
						{/if}
					</article>
				{/if}

				<!-- Interactive Brief Strategy Call To Actions -->
				<div class="mt-8 flex flex-col gap-3 sm:flex-row">
					<Button
						class="h-12 flex-1 gap-1.5 rounded-xl text-xs font-black tracking-widest uppercase"
						href="/request-a-quote"
						size="lg"
					>
						Request a Quote <ArrowRightIcon class="size-3.5" />
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

	{#if data.relatedProjects?.length}
		<section class="mx-auto max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
			<h2 class="mb-8 text-2xl font-black tracking-tight uppercase">Projects in this service</h2>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each data.relatedProjects as item (item.id)}
					<PortfolioCard {item} />
				{/each}
			</div>
		</section>
	{/if}

	<!-- Layout Frame Baseline Padding -->
	<div class="h-24"></div>
</div>
