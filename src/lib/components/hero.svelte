<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { CompassIcon, LayersIcon, ArmchairIcon, ArrowRightIcon } from '@lucide/svelte';
	import { fly, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';

	// Architectural and Interior capabilities to replace event stats
	const capabilities = [
		{
			title: 'Architectural Design',
			description: 'Comprehensive design & build solutions for modern living.',
			icon: CompassIcon,
			delay: 600
		},
		{
			title: 'Interior & Finishing',
			description: 'Sophisticated and significant bespoke structural spaces.',
			icon: LayersIcon,
			delay: 800
		},
		{
			title: 'Furniture Making',
			description: 'Custom luxury furniture pieces and tailored lighting integration.',
			icon: ArmchairIcon,
			delay: 1000
		}
	];

	// Portfolio preview slideshow images
	const images = ['/golla1.webp', '/golla2.webp', '/golla3.webp', '/golla4.webp'];
	let currentIndex = $state(0);
	let mounted = $state(false);

	onMount(() => {
		mounted = true;

		const interval = setInterval(() => {
			currentIndex = (currentIndex + 1) % images.length;
		}, 6000);
		return () => clearInterval(interval);
	});
</script>

<section class="relative flex min-h-dvh w-full items-center overflow-hidden text-foreground">
	<!-- Ambient Background Elements using theme variables -->
	<div class="pointer-events-none absolute inset-0 z-0 opacity-20" aria-hidden="true">
		<div
			class="absolute top-[-10%] left-[-10%] h-150 w-150 animate-pulse rounded-full bg-primary/20 blur-[120px] duration-10000"
		></div>
		<div
			class="blur-25 absolute right-[-10%] bottom-[-10%] h-125 w-125 rounded-full bg-accent/30"
		></div>
	</div>

	<!-- Minimal Grid Overlay -->
	<!-- <div
		class="pointer-events-none absolute inset-0 z-1 bg-[linear-gradient(to_right,rgba(128,128,128,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.03)_1px,transparent_1px)] bg-[size:64px_64px]"
		aria-hidden="true"
	></div> -->

	<!-- Background Slideshow Frame -->
	<div class="absolute inset-0 z-0 overflow-hidden">
		{#each images as img, i (img)}
			{#if currentIndex === i}
				<div
					transition:fade={{ duration: 1600 }}
					class="absolute inset-0 scale-105 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-luminosity"
					style="background-image: url('{img}'); animation: slowPan 12s ease-out forwards;"
				></div>
			{/if}
		{/each}
		<!-- Sophisticated Dark Vignette overlay -->
		<!-- <div
			class="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/30"
		></div> -->
	</div>

	<!-- Main Layout Container -->
	<div class="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 lg:px-10">
		<div class="grid gap-16 lg:grid-cols-12 lg:items-center">
			<!-- Left Column: Copy & Identity -->
			<div class="flex flex-col space-y-8 lg:col-span-7">
				{#if mounted}
					<!-- Brand Eyebrow Tag -->
					<div in:fly={{ y: 20, duration: 800, delay: 100, easing: cubicOut }}>
						<div
							class="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-1.5 backdrop-blur-md"
						>
							<span class="h-2 w-2 animate-pulse rounded-full bg-primary"></span>
							<span class="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">
								Visualization Studio · Addis Ababa
							</span>
						</div>
					</div>

					<!-- Studio Headline -->
					<div in:fly={{ y: 30, duration: 800, delay: 250, easing: cubicOut }}>
						<h1 class="relative tracking-tighter">
							<span class="block text-[clamp(3.5rem,8vw,6.5rem)] leading-[0.9] font-black">
								GOLLA
							</span>
							<span
								class="mt-1 block text-[clamp(1.5rem,4vw,3rem)] font-light tracking-[0.2em] uppercase"
							>
								Design Group
							</span>
						</h1>
					</div>

					<!-- Core Philosophy Card -->
					<div
						in:fly={{ y: 20, duration: 800, delay: 450, easing: cubicOut }}
						class="max-w-xl space-y-4"
					>
						<p class="text-xl leading-relaxed font-medium text-foreground/90">
							"We design beautiful, useful, and cozy spaces tailored perfectly to your lifestyle."
						</p>
						<p class="max-w-lg text-base leading-relaxed">
							Producing sophisticated, significant architectural layouts, high-end interior
							finishes, and customized furniture consulting across Ethiopia.
						</p>
					</div>

					<!-- Actions Line -->
					<div
						in:fly={{ y: 20, duration: 800, delay: 600, easing: cubicOut }}
						class="flex flex-wrap gap-4 pt-2"
					>
						<Button href="/portfolio" size="lg" class="group gap-2">
							Explore Portfolio
							<ArrowRightIcon class="size-4 transition-transform group-hover:translate-x-1" />
						</Button>
						<Button href="/contact" size="lg" variant="outline">Get in Touch</Button>
					</div>

					<!-- Modern Presentation Slide Indicators -->
					<div in:fade={{ duration: 600, delay: 800 }} class="flex items-center gap-4 pt-4">
						<div class="flex gap-1.5">
							{#each images as _, i}
								<button
									class="h-1 rounded-full transition-all duration-500 {currentIndex === i
										? 'w-8 bg-primary'
										: 'w-3 bg-muted-foreground/30'}"
									onclick={() => (currentIndex = i)}
									aria-label="View design slide {i + 1}"
								></button>
							{/each}
						</div>
						<span class="font-mono text-xs text-muted-foreground/60">
							{String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
						</span>
					</div>
				{/if}
			</div>

			<!-- Right Column: Asymmetric Pillar Features -->
			<div class="flex flex-col gap-4 lg:col-span-5">
				{#if mounted}
					{#each capabilities as item, i (item.title)}
						<div
							in:fly={{ x: 40, duration: 800, delay: item.delay, easing: cubicOut }}
							class="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-6 backdrop-blur-md transition-all duration-300 hover:border-border hover:bg-card/80"
						>
							<div class="flex items-start gap-5">
								<div
									class="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border/50 bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
								>
									<item.icon class="size-5" />
								</div>
								<div class="space-y-1">
									<h3 class="text-lg font-bold tracking-tight text-foreground">{item.title}</h3>
									<p class="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
								</div>
							</div>
							<!-- Subtle decorative corner hover edge -->
							<!-- <div
								class="absolute top-0 right-0 h-12 w-12 bg-linear-to-bl from-primary/10 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
							></div> -->
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	/* Purely structural scale animation for the sleek studio transition effect */
	@keyframes slowPan {
		from {
			transform: scale(1.05) translate(0, 0);
		}
		to {
			transform: scale(1) translate(1%, 0.5%);
		}
	}
</style>
