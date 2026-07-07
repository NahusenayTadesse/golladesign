<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { ArrowUpRight } from '@lucide/svelte';
	import { fade, fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	const images = ['/golla1.webp', '/golla2.webp', '/golla3.webp', '/golla4.webp'];
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

<section class="relative flex min-h-screen w-full items-center bg-background text-foreground antialiased selection:bg-foreground selection:text-background">
	
	<!-- Fine Boundary Architecture Grid (Extremely faint structural lines) -->
	<div class="pointer-events-none absolute inset-y-0 left-1/2 w-[1px] bg-border/20 hidden lg:block" aria-hidden="true"></div>

	<!-- Background Image Slot (Occupies the right structural hemisphere) -->
	<div class="absolute inset-y-0 right-0 z-0 hidden w-1/2 overflow-hidden bg-muted lg:block">
		{#each images as img, i (img)}
			{#if currentIndex === i}
				<div
					transition:fade={{ duration: 1400 }}
					class="absolute inset-0 bg-cover bg-center grayscale filter contrast-[1.02] brightness-[0.95]"
					style="background-image: url('{img}');"
				></div>
			{/if}
		{/each}
	</div>

	<!-- Primary Content Canvas -->
	<div class="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
		<div class="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
			
			<!-- Left Column: Pure Typographic Curation -->
			<div class="space-y-12 max-w-xl">
				{#if mounted}
					<!-- Studio Identity Framework -->
					<div in:fly={{ y: 15, duration: 900, easing: cubicOut }} class="space-y-3">
						<span class="block font-mono text-xs tracking-[0.3em] text-muted-foreground uppercase">
							Golla Design Group
						</span>
						<h1 class="text-4xl font-light tracking-tight sm:text-5xl xl:text-6xl uppercase leading-[1.1]">
							Architectural <br />
							<span class="font-normal text-muted-foreground/60">& Interior Systems.</span>
						</h1>
					</div>

					<!-- Concept Core Paragraph -->
					<div in:fly={{ y: 15, duration: 900, delay: 200, easing: cubicOut }} class="space-y-6">
						<p class="text-base text-muted-foreground leading-relaxed tracking-wide font-light">
							An architectural and design-build practice based in Addis Ababa. We formulate quiet, intentional spaces, tactile bespoke materials, and luxury spatial solutions tailored completely around physical interaction.
						</p>
					</div>

					<!-- Intent Action & Index Tracker Row -->
					<div in:fly={{ y: 15, duration: 900, delay: 400, easing: cubicOut }} class="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pt-4 border-t border-border/40">
						<div class="flex items-center gap-6">
							<Button href="/portfolio" variant="link" class="p-0 h-auto font-mono text-xs uppercase tracking-widest text-foreground hover:no-underline group">
								Portfolio <ArrowUpRight class="inline-block ml-1 size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</Button>
							<span class="h-3 w-[1px] bg-border"></span>
							<a href="/contact-us" class="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors duration-200">
								Inquire
							</a>
						</div>

						<!-- Structural Frame Pagination Tracker -->
						<div class="flex items-center gap-3 font-mono text-[11px] text-muted-foreground/50">
							<span>{String(currentIndex + 1).padStart(2, '0')}</span>
							<div class="relative w-12 h-[1px] bg-border/40">
								<div class="absolute top-0 left-0 h-full bg-foreground transition-all duration-700 ease-out" style="width: {((currentIndex + 1) / images.length) * 100}%"></div>
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