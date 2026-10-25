<script lang="ts">
	import Lightbox from './lightbox.svelte';
	import { MaximizeIcon } from '@lucide/svelte';

	let {
		images,
		title,
		alts = []
	}: { images: string[]; title: string; alts?: string[]; bento?: boolean } = $props();

	/* light-box state ------------------------------------------------------ */
	let lightboxOpen = $state(false);
	let currentIndex = $state(0);

	const openLightbox = (index: number) => {
		currentIndex = index;
		lightboxOpen = true;
	};
</script>

<!-- Affordance line so it is obvious the thumbnails open a larger gallery -->
{#if images.length}
	<p class="mb-3 text-xs font-semibold tracking-wide text-muted-foreground">
		{images.length}
		{images.length === 1 ? 'image' : 'images'} — tap any photo to open the full-screen gallery
	</p>
{/if}

<!-- thumbnail grid -------------------------------------------------------- -->
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
	{#each images as image, index (index)}
		<button
			type="button"
			class="group relative cursor-pointer touch-manipulation overflow-hidden rounded-lg bg-secondary transition-transform active:scale-[0.98]"
			aria-label="Open image {index + 1} of {images.length}"
			onclick={() => openLightbox(index)}
		>
			<img
				src="/files/{image}"
				alt={alts[index] || `${title} gallery image ${index + 1}`}
				loading="lazy"
				class="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-110"
			/>

			<!-- Persistent counter + expand cue (visible without hover, for touch) -->
			<span
				class="absolute right-2 bottom-2 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-sm"
			>
				<MaximizeIcon class="size-3" />
				{index + 1}/{images.length}
			</span>
		</button>
	{/each}
</div>

<!-- light-box : send ONLY full-size images -------------------------------- -->
<Lightbox {images} {title} bind:isOpen={lightboxOpen} bind:currentIndex />
