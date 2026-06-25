<script lang="ts">
	import { SparklesIcon } from '@lucide/svelte';
</script>

<section
	class="relative mb-10 overflow-hidden bg-muted/30 bg-cover bg-center px-4 py-20 text-white sm:py-32"
	style="background-image: url('/event (3).webp')"
>
	<div class="absolute inset-0 bg-primary/70 dark:bg-primary-foreground/70"></div>
	<!-- <div
		class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"
	></div> -->

	<!-- Content -->
	<div class="relative mx-auto max-w-4xl px-4 text-center">
		<div
			class="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium"
		>
			<SparklesIcon class="size-4" />
			<span>Our Portfolio</span>
		</div>
		<h1 class="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
			Crafting Unforgettable
			<span class="text-white/80">Experiences</span>
		</h1>
		<p
			class="mx-auto max-w-2xl text-lg leading-relaxed text-secondary sm:text-xl dark:text-primary"
		>
			Explore our collection of meticulously planned events, from intimate gatherings to grand
			celebrations. Each event tells a unique story.
		</p>
	</div>
</section>
