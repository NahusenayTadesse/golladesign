<script lang="ts">
	// Drag (or use the arrow keys on) the slider to compare the two images.
	let {
		before,
		after,
		caption = ''
	}: { before: string; after: string; caption?: string | null } = $props();

	let position = $state(50);
</script>

<figure class="space-y-3">
	<div
		class="relative aspect-4/3 overflow-hidden rounded-2xl border border-border bg-muted select-none"
	>
		<img
			src={after}
			alt="After{caption ? `: ${caption}` : ''}"
			loading="lazy"
			decoding="async"
			class="absolute inset-0 h-full w-full object-cover"
		/>
		<img
			src={before}
			alt="Before{caption ? `: ${caption}` : ''}"
			loading="lazy"
			decoding="async"
			class="absolute inset-0 h-full w-full object-cover"
			style="clip-path: inset(0 {100 - position}% 0 0)"
		/>
		<div
			class="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow"
			style="left: {position}%"
		></div>
		<span
			class="absolute top-3 left-3 rounded bg-black/70 px-2 py-1 text-xs font-bold text-white uppercase"
			>Before</span
		>
		<span
			class="absolute top-3 right-3 rounded bg-black/70 px-2 py-1 text-xs font-bold text-white uppercase"
			>After</span
		>
		<input
			type="range"
			min="0"
			max="100"
			bind:value={position}
			aria-label="Compare before and after"
			class="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
		/>
	</div>
	{#if caption}
		<figcaption class="text-sm text-muted-foreground">{caption}</figcaption>
	{/if}
</figure>
