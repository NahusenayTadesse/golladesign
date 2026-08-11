<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpRight } from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { siteLogos } from '$lib/site';

	const images = ['/hero.jpg', '/golla1.webp', '/golla2.webp', '/golla3.webp', '/golla4.webp'];
	let currentIndex = $state(0);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;
		const interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % images.length;
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

	<!-- Background Image Slot (Occupies the right structural hemisphere) -->
	<div class="absolute inset-y-0 right-0 z-0 hidden w-1/2 overflow-hidden bg-muted lg:block">
		{#each images as img, i (img)}
			{#if currentIndex === i}
				<div
					transition:fade={{ duration: 1400 }}
					class="absolute inset-0 bg-cover bg-center brightness-[0.95] contrast-[1.02] grayscale filter"
					style="background-image: url('{img}');"
				></div>
			{/if}
		{/each}
	</div>

	<!-- Primary Content Canvas -->
	<div class="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
		<div class="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
			<!-- Left Column: Pure Typographic Curation -->
			<div class="max-w-xl space-y-12">
				{#if mounted}
					<!-- Studio Identity Framework -->
					<div in:fly={{ y: 15, duration: 900, easing: cubicOut }} class="space-y-6">
						<!-- Primary brand lockup: official wordmark + studio descriptor -->
						<div class="flex flex-col gap-2">
							<img
								src={siteLogos.mark}
								alt="Golla Design Group"
								class="h-14 w-auto self-start object-contain brightness-[0.4] contrast-125 sm:h-20 dark:brightness-100 dark:contrast-100"
							/>
							<span
								class="text-sm font-black tracking-[0.42em] text-primary uppercase sm:text-base"
							>
								Design Group
							</span>
						</div>

						<h1
							class="text-3xl leading-[1.15] font-light tracking-tight uppercase sm:text-4xl xl:text-5xl"
						>
							Every Space tells a story <br />
							<span class="font-normal text-muted-foreground/60">let Us Write Yours</span>
						</h1>
					</div>

					<!-- Concept Core Paragraph -->
					<div in:fly={{ y: 15, duration: 900, delay: 200, easing: cubicOut }} class="space-y-6">
						<p class="text-base leading-relaxed font-light tracking-wide text-muted-foreground">
							An architectural and design-build practice based in Addis Ababa. We formulate quiet,
							intentional spaces, tactile bespoke materials, and luxury spatial solutions tailored
							completely around physical interaction.
						</p>
					</div>

					<!-- Intent Action & Index Tracker Row -->
					<div
						in:fly={{ y: 15, duration: 900, delay: 400, easing: cubicOut }}
						class="flex flex-col justify-between gap-8 border-t border-border/40 pt-4 sm:flex-row sm:items-center"
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
						<div class="flex items-center gap-3 font-mono text-[11px] text-muted-foreground/50">
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
				{/if}
			</div>

			<!-- Right Hemisphere (Mobile Only Frame) -->
			<div class="relative aspect-[4/3] w-full overflow-hidden bg-muted lg:hidden">
				{#if mounted}
					{#each images as img, i (img)}
						{#if currentIndex === i}
							<div
								transition:fade={{ duration: 1000 }}
								class="absolute inset-0 bg-cover bg-center grayscale"
								style="background-image: url('{img}');"
							></div>
						{/if}
					{/each}
				{/if}
			</div>
		</div>
	</div>
</section>
