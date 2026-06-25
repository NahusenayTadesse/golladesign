<script lang="ts">
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { CompassIcon, LayersIcon, ArmchairIcon, SparklesIcon } from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	// Refined core pillars for an architectural & interior design studio
	const highlights = [
		{
			icon: CompassIcon,
			label: 'Architectural Design',
			description: 'Comprehensive modern layouts and tailored building solutions.'
		},
		{
			icon: LayersIcon,
			label: 'Interior & Finishing',
			description: 'Bespoke structural detailing and premium space transformations.'
		},
		{
			icon: ArmchairIcon,
			label: 'Furniture & Lighting',
			description: 'Custom luxury furniture making and specialized lighting consulting.'
		},
		{
			icon: SparklesIcon,
			label: 'Tailored Lifestyles',
			description: 'Crafting spaces that perfectly balance beauty, utility, and coziness.'
		}
	];
</script>

<section class="relative bg-background px-4 pt-24 pb-12 text-foreground sm:px-6 lg:px-8">
	<div class="mx-auto max-w-7xl">
		<!-- Header Section -->
		<div
			transition:fly={{ y: 20, duration: 600 }}
			class="mb-20 flex flex-col items-center justify-center gap-4 text-center"
		>
			<h2 class="text-4xl font-black tracking-tight uppercase sm:text-5xl">About Golla Design</h2>
			<div class="h-1 w-12 rounded-full bg-primary"></div>
			<p class="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground">
				Golla Design Group is a premium architecture and interior visualization studio based in
				Addis Ababa, Ethiopia. We specialize in producing sophisticated structural spaces, high-end
				interior finishes, and custom luxury furniture consultation designed perfectly around your
				lifestyle.
			</p>
		</div>

		<!-- Grid Layout -->
		<div class="grid items-stretch gap-8 lg:grid-cols-3">
			<!-- Feature Display Card -->
			<div transition:fly={{ y: 20, duration: 600, delay: 100 }} class="lg:col-span-2">
				<Card
					style="background-image: url('/golla (2).webp')"
					class="group relative flex h-full min-h-[400px] flex-col justify-end overflow-hidden border-border/40 bg-cover bg-center p-8 text-white shadow-xl"
				>
					<!-- Gradient overlay using theme shades instead of absolute alphas -->
					<div
						class="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20 transition-opacity duration-500 group-hover:via-background/75"
					></div>

					<div class="relative z-10 space-y-4">
						<CardHeader class="space-y-1 p-0">
							<CardTitle class="text-4xl font-black tracking-tight text-foreground">
								Beautiful &amp; Useful
							</CardTitle>
							<CardDescription class="text-lg font-medium tracking-wide text-primary">
								Tailored directly to your environment
							</CardDescription>
						</CardHeader>
						<CardContent class="flex max-w-xl flex-col gap-4 p-0 text-muted-foreground">
							<p class="text-sm leading-relaxed sm:text-base">
								We believe great design goes beyond aesthetics. Golla Design seamlessly integrates
								space planning, bespoke interior architecture, and industrial craftsmanship to
								transform both residential and commercial spaces across East Africa.
							</p>
							<p class="text-sm leading-relaxed sm:text-base">
								Our approach is minimalist, high-end, and collaborative. By controlling every layer
								of design—from initial architectural rendering to the structural finishing steps and
								final custom furniture positioning—we make spaces feel undeniably complete and
								exceptionally cozy.
							</p>
						</CardContent>
					</div>
				</Card>
			</div>

			<!-- Highlight Cards Stack -->
			<div
				transition:fly={{ y: 20, duration: 600, delay: 200 }}
				class="flex flex-col justify-between gap-4"
			>
				{#each highlights as highlight (highlight.label)}
					<Card
						class="border-border/60 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-border hover:bg-card hover:shadow-md"
					>
						<CardContent class="flex items-center gap-4 p-5">
							<div class="shrink-0">
								<div
									class="flex size-12 items-center justify-center rounded-xl border border-border/40 bg-secondary text-primary"
								>
									<highlight.icon class="size-5" />
								</div>
							</div>
							<div class="min-w-0 flex-1">
								<p class="text-base font-bold tracking-tight text-foreground">{highlight.label}</p>
								<p class="mt-1 text-sm leading-snug text-muted-foreground">
									{highlight.description}
								</p>
							</div>
						</CardContent>
					</Card>
				{/each}
			</div>
		</div>
	</div>
</section>
