<script lang="ts">
	import { PlayIcon } from '@lucide/svelte';

	// Shows the thumbnail and only loads YouTube's (heavy) player when clicked.
	let { url, title = 'Video' }: { url: string; title?: string } = $props();

	const id = $derived(
		url?.match(
			/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|shorts\/)|youtu\.be\/)([^"&?/\s]{11})/i
		)?.[1] ?? null
	);
	let playing = $state(false);
</script>

{#if id}
	<div
		class="relative aspect-video overflow-hidden rounded-2xl border border-border bg-muted shadow-xl"
	>
		{#if playing}
			<iframe
				src="https://www.youtube-nocookie.com/embed/{id}?autoplay=1"
				{title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen
				class="h-full w-full"
			></iframe>
		{:else}
			<button
				type="button"
				class="group absolute inset-0 h-full w-full"
				onclick={() => (playing = true)}
				aria-label="Play video: {title}"
			>
				<img
					src="https://i.ytimg.com/vi/{id}/hqdefault.jpg"
					alt=""
					loading="lazy"
					decoding="async"
					width="480"
					height="360"
					class="h-full w-full object-cover"
				/>
				<span
					class="absolute inset-0 m-auto flex size-16 items-center justify-center rounded-full bg-black/70 text-white transition-transform group-hover:scale-110"
				>
					<PlayIcon class="size-7 translate-x-0.5" aria-hidden="true" />
				</span>
			</button>
		{/if}
	</div>
{/if}
