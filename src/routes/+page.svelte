<script lang="ts">
	import Hero from '$lib/components/hero.svelte';
	import About from '$lib/components/about.svelte';
	import Faq from '$lib/components/faq.svelte';
	import ServiceGrid from '$lib/components/services/service-grid.svelte';
	import * as Carousel from '$lib/components/ui/carousel/index.js';
	import PortfolioCard from '$lib/components/portfolio/portfolio-card.svelte';
	import BlogCard from '$lib/components/blogs/portfolio-card.svelte';

	import Testimonial from '$lib/components/testimonial.svelte';
	import Slider from '$lib/components/slider.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>Golla Design Group | Premium Architecture & Interior Design Addis Ababa</title>
	<meta
		name="title"
		content="Golla Design Group | Premium Architecture & Interior Design Addis Ababa"
	/>
	<meta
		name="description"
		content="Golla Design Group specializes in sophisticated structural design, high-end interior finishing, and custom luxury furniture manufacturing in Addis Ababa, Ethiopia."
	/>
	<meta
		name="keywords"
		content="Golla Design, Architecture Ethiopia, Interior Design Addis Ababa, Furniture Making Ethiopia, Luxury Finishings East Africa, Architectural Visualization"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://golladesign.com/" />
	<meta property="og:title" content="Golla Design Group | Architectural & Interior Perfection" />
	<meta
		property="og:description"
		content="We design beautiful, functional, and cozy spaces tailored perfectly to your lifestyle. Explore our luxury interiors and architectural portfolios."
	/>
	<meta property="og:image" content="/logo.jpg" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://golladesign.com/" />
	<meta property="twitter:title" content="Golla Design Group | Space Planning & Execution" />
	<meta
		property="twitter:description"
		content="Premium multi-disciplinary design studio based in Addis Ababa. From architectural blueprints to custom furniture fabrication."
	/>
	<meta property="twitter:image" content="/logo.jpg" />

	<!-- Canonical URL -->
	<link rel="canonical" href="https://golladesign.com/" />

	<!-- Favicon / Theming -->
	<link rel="icon" type="image/png" href="/logo.jpg" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>



<Hero />
<About />

{#if data?.servicesItems?.length}
	<div class="bg-background py-6">
		<ServiceGrid services={data.servicesItems} />
	</div>
{/if}

{#if data?.portfolioItems?.length}
	<section class="w-full space-y-8 bg-background pb-16">
		<!-- Section Header -->
		<div class="flex flex-col items-center space-y-3 text-center">
			<h2 class="text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
				Featured Projects
			</h2>
			<div class="h-1 w-10 rounded-full bg-primary"></div>
			<p class="max-w-xl text-sm text-muted-foreground sm:text-base">
				A curated collection of our architectural blueprints, sophisticated structural interiors,
				and custom residential spaces.
			</p>
		</div>

		<!-- Carousel Container -->
		<div class="relative mx-auto max-w-7xl px-12">
			<Carousel.Root opts={{ align: 'start', loop: true }} class="w-full">
				<Carousel.Content class="-ml-4">
					{#each data.portfolioItems as item (item.id)}
						<Carousel.Item class="basis-full pl-4 md:basis-1/2 lg:basis-1/3">
							<div class="h-full transition-all duration-300 hover:scale-[1.01]">
								<PortfolioCard {item} />
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Content>

				<!-- Styled Navigation Navigation using semantic borders -->
				<Carousel.Previous
					class="hidden border-border/60 bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground md:flex"
				/>
				<Carousel.Next
					class="hidden border-border/60 bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground md:flex"
				/>
			</Carousel.Root>
		</div>
	</section>
{/if}

{#if data?.blogItems?.length}
	<section class="w-full space-y-8 border-t border-border/40 bg-background py-16">
		<!-- Section Header -->
		<div class="flex flex-col items-center space-y-3 text-center">
			<h2 class="text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
				Design Journal
			</h2>
			<div class="h-1 w-10 rounded-full bg-primary"></div>
			<p class="max-w-xl text-sm text-muted-foreground sm:text-base">
				Explore our latest perspectives on architectural trends, minimalist layout tips, and
				material selection strategies.
			</p>
		</div>

		<!-- Carousel Container -->
		<div class="relative mx-auto max-w-7xl px-12">
			<Carousel.Root opts={{ align: 'start', loop: true }} class="w-full">
				<Carousel.Content class="-ml-4">
					{#each data.blogItems as item (item.id)}
						<Carousel.Item class="basis-full pl-4 md:basis-1/2 lg:basis-1/3">
							<div class="h-full transition-all duration-300 hover:scale-[1.01]">
								<BlogCard {item} />
							</div>
						</Carousel.Item>
					{/each}
				</Carousel.Content>

				<Carousel.Previous
					class="hidden border-border/60 bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground md:flex"
				/>
				<Carousel.Next
					class="hidden border-border/60 bg-background text-foreground hover:bg-secondary hover:text-secondary-foreground md:flex"
				/>
			</Carousel.Root>
		</div>
	</section>
{/if}

{#if data?.imagesList?.length > 0}
	<Slider imagesList={data?.imagesList} />
{/if}

{#if data?.testimonialList?.length > 0}
	<section
		class="flex flex-col items-center justify-center border-t border-border/40 bg-background px-4 py-16 md:py-24"
	>
		<!-- Section Header -->
		<div class="mb-14 max-w-2xl space-y-3 text-center">
			<h2 class="text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
				Client Experiences
			</h2>
			<div class="mx-auto h-1 w-10 rounded-full bg-primary"></div>
			<p class="text-sm text-muted-foreground sm:text-base">
				Hear from homeowners and business managers regarding their collaborative space design
				journeys with our studio.
			</p>
		</div>

		<!-- Testimonial Frame -->
		<Testimonial testimonials={data.testimonialList} />
	</section>
{/if}

<Faq />
