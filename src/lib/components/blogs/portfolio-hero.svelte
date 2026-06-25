<script lang="ts">
	import { CompassIcon } from '@lucide/svelte';
</script>

<section
	class="relative overflow-hidden border-b border-border/40 bg-cover bg-center px-4 py-24 text-foreground sm:py-36"
	style="background-image: url('/golla4.webp')"
>
	<!-- Adaptive dynamic mask layer matching shadcn background strategies -->
	<div class="absolute inset-0 bg-background/40 backdrop-blur-xs"></div>

	<!-- Premium Content Block -->
	<div class="relative mx-auto max-w-4xl space-y-6 px-4 text-center">
		<!-- Studio Tag / Badge -->
		<div
			class="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase"
		>
			<CompassIcon class="size-3.5" />
			<span>Perspectives &amp; Insights</span>
		</div>

		<!-- Studio Main Title -->
		<h1
			class="text-4xl font-black tracking-tight text-foreground uppercase sm:text-5xl lg:text-6xl"
		>
			Blueprints, Materials, &amp;
			<span class="text-primary dark:text-primary/80">Spatial Form</span>
		</h1>

		<!-- Design Subtext -->
		<p class="mx-auto max-w-2xl text-base leading-relaxed sm:text-lg">
			Explore our studio's latest structural deep-dives, minimalist spatial theories, and
			behind-the-scenes engineering logs from architectural layout blueprints to high-end custom
			joinery execution.
		</p>
	</div>
</section>
