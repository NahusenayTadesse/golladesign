<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import PortfolioCard from "./portfolio-card.svelte";
	import { FolderOpenIcon } from "@lucide/svelte";
	import type { PortfolioItem } from "$lib/data/portfolio";

	const { items }: { items: PortfolioItem[] } = $props();
</script>

{#if items.length > 0}
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
		{#each items as item, index (item.id)}
			<div in:fly={{ y: 20, duration: 400, delay: index * 50 }}>
				<PortfolioCard {item} />
			</div>
		{/each}
	</div>
{:else}
	<div class="flex flex-col items-center justify-center py-20 text-center" in:fade={{ duration: 300 }}>
		<div class="size-20 rounded-full bg-muted flex items-center justify-center mb-4">
			<FolderOpenIcon class="size-10 text-muted-foreground" />
		</div>
		<h3 class="text-xl font-semibold text-foreground mb-2">No events found</h3>
		<p class="text-muted-foreground max-w-sm">Try adjusting your search or filter criteria to find what you're looking for.</p>
	</div>
{/if}
