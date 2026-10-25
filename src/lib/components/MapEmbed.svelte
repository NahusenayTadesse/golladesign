<script lang="ts">
	import { MapPinIcon } from '@lucide/svelte';

	// Google Maps loads ~400 KB of script, so it only loads when asked for.
	let { src, title, address = '' }: { src: string; title: string; address?: string } = $props();
	let show = $state(false);
</script>

{#if show}
	<iframe
		{src}
		{title}
		style="border:0;"
		class="absolute inset-0 h-full w-full contrast-[1.1] grayscale dark:invert"
		referrerpolicy="no-referrer-when-downgrade"
	></iframe>
{:else}
	<button
		type="button"
		onclick={() => (show = true)}
		class="absolute inset-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-muted/40 bg-[linear-gradient(to_right,rgba(128,128,128,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.12)_1px,transparent_1px)] bg-[size:18px_18px] text-sm transition-colors hover:bg-muted"
	>
		<MapPinIcon class="size-6 text-primary" aria-hidden="true" />
		{#if address}<span class="px-4 text-center text-xs text-muted-foreground">{address}</span>{/if}
		<span class="font-semibold underline underline-offset-4">Show map</span>
	</button>
{/if}
