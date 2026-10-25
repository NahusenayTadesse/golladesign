<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpRight } from '@lucide/svelte';
	import { siteLogos } from '$lib/site';
	import hero from '$lib/assets/photos/hero.jpg?enhanced';
	import golla1 from '$lib/assets/photos/golla1.webp?enhanced';
	import golla2 from '$lib/assets/photos/golla2.webp?enhanced';
	import golla3 from '$lib/assets/photos/golla3.webp?enhanced';
	import golla4 from '$lib/assets/photos/golla4.webp?enhanced';

	const images = [hero, golla1, golla2, golla3, golla4];
	let currentIndex = $state(0);
	// Slides are only added to the page once the slideshow reaches them, so the
	// first visit downloads one photo instead of five.
	let loadedUpTo = $state(0);

	onMount(() => {
		loadedUpTo = 1;
		const interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % images.length;
			loadedUpTo = Math.max(loadedUpTo, Math.min(currentIndex + 1, images.length - 1));
		}, 7000);
		return () => clearInterval(interval);
	});
</script>

<section
	class="relative flex min-h-screen w-full items-center bg-background text-foreground antialiased selection:bg-foreground selection:text-background"
>
	<!-- Fine Boundary Architecture Grid (Extremely faint structural lines) -->
	<div
		class="pointer-events-none absolute inset-y-0 left-1/2 hidden w-1 bg-border/20 lg:block"
		aria-hidden="true"
	></div>

	<!-- Primary Content Canvas -->
	<div class="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:static lg:px-12">
		<div class="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
			<!-- Left Column: Pure Typographic Curation -->
			<div class="max-w-xl space-y-12">
				<!-- Studio Identity Framework -->
				<div class="hero-rise space-y-6">
					<!-- Primary brand lockup: official wordmark + studio descriptor -->
					<div class="flex flex-col gap-2">
						<img
							src={siteLogos.mark}
							width="558"
							height="160"
							alt="Golla Design Group"
							class="h-14 w-auto self-start object-contain brightness-[0.4] contrast-125 sm:h-20 dark:brightness-100 dark:contrast-100"
						/>
						<span class="text-sm font-black tracking-[0.42em] text-primary uppercase sm:text-base">
							Design Group
						</span>
					</div>

					<h1
						class="text-3xl leading-[1.15] font-light tracking-tight uppercase sm:text-4xl xl:text-5xl"
					>
						Every Space tells a story <br />
						<span class="font-normal text-muted-foreground">let Us Write Yours</span>
					</h1>
				</div>

				<!-- Concept Core Paragraph -->
				<div class="hero-rise space-y-6" style="animation-delay: 200ms">
					<p class="text-base leading-relaxed font-light tracking-wide text-muted-foreground">
						An architectural and design-build practice based in Addis Ababa. We formulate quiet,
						intentional spaces, tactile bespoke materials, and luxury spatial solutions tailored
						completely around physical interaction.
					</p>
				</div>

				<!-- Intent Action & Index Tracker Row -->
				<div
					style="animation-delay: 400ms"
					class="hero-rise flex flex-col justify-between gap-8 border-t border-border/40 pt-4 sm:flex-row sm:items-center"
				>
					<div class="flex flex-wrap items-center gap-3">
						<Button
							href="/portfolio"
							size="lg"
							class="group h-12 gap-2 px-6 font-mono text-xs tracking-widest uppercase active:scale-[0.98]"
						>
							Portfolio
							<ArrowUpRight
								class="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
							/>
						</Button>
						<Button
							href="/contact-us"
							size="lg"
							variant="outline"
							class="h-12 px-6 font-mono text-xs tracking-widest uppercase active:scale-[0.98]"
						>
							Inquire
						</Button>
					</div>

					<!-- Structural Frame Pagination Tracker -->
					<div class="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
						<span>{String(currentIndex + 1).padStart(2, '0')}</span>
						<div class="relative h-[1px] w-12 bg-border/40">
							<div
								class="absolute top-0 left-0 h-full bg-foreground transition-all duration-700 ease-out"
								style="width: {((currentIndex + 1) / images.length) * 100}%"
							></div>
						</div>
						<span>{String(images.length).padStart(2, '0')}</span>
					</div>
				</div>
			</div>

			<!-- One frame: a 4:3 box on mobile, the right half of the section on desktop -->
			<div
				class="relative aspect-4/3 w-full overflow-hidden bg-muted lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-1/2"
			>
				{#each images as img, i (i)}
					{#if i <= loadedUpTo}
						<enhanced:img
							src={img}
							alt=""
							sizes="(min-width: 1024px) 50vw, 100vw"
							fetchpriority={i === 0 ? 'high' : 'low'}
							loading={i === 0 ? 'eager' : 'lazy'}
							class="absolute inset-0 h-full w-full object-cover brightness-[0.95] contrast-[1.02] grayscale transition-opacity duration-[1400ms] {currentIndex ===
							i
								? 'opacity-100'
								: 'opacity-0'}"
						/>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</section>

<style>
	/* Entrance animation without hiding server-rendered content behind JavaScript. */
	.hero-rise {
		animation: hero-rise 900ms cubic-bezier(0.33, 1, 0.68, 1) both;
	}
	@keyframes hero-rise {
		from {
			opacity: 0;
			transform: translateY(15px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.hero-rise {
			animation: none;
		}
	}
</style>
