<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { CalendarIcon, MapPinIcon, UserIcon } from '@lucide/svelte';
	import type { PortfolioItem } from '$lib/data/portfolio';

	const { item }: { item: PortfolioItem } = $props();

	const formattedDate = $derived(
		item.date
			? new Date(item.date).toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
				})
			: null
	);
</script>

<Card
	class="group shadow-lg-lg hover:shadow-lg-xl overflow-hidden border-0 bg-card transition-all duration-300 hover:-translate-y-1"
>
	<a href="/events/{item.slug}" class="relative aspect-4/3 overflow-hidden">
		<img
			src="/files/{item.featuredImage}"
			alt={item.title}
			class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
		/>
		<div
			class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		></div>
		{#if item.eventType}
			<Badge class="absolute top-4 left-4 bg-primary/90 text-primary-foreground backdrop-blur-sm">
				{item.eventType}
			</Badge>
		{/if}
	</a>
	<CardContent class="space-y-3 p-5">
		<h3
			class="line-clamp-1 text-lg font-semibold text-foreground transition-colors group-hover:text-primary"
		>
			{item.title}
		</h3>
		{#if item.description}
			<p class="line-clamp-2 text-sm text-muted-foreground">
				{item.description}
			</p>
		{/if}
		<div class="flex flex-wrap gap-3 pt-2 text-xs text-muted-foreground">
			{#if formattedDate}
				<div class="flex items-center gap-1.5">
					<CalendarIcon class="size-3.5" />
					<span>{formattedDate}</span>
				</div>
			{/if}
			{#if item.client}
				<div class="flex items-center gap-1.5">
					<UserIcon class="size-3.5" />
					<span class="max-w-24 truncate">{item.client}</span>
				</div>
			{/if}
			{#if item.location}
				<div class="flex items-center gap-1.5">
					<MapPinIcon class="size-3.5" />
					<span class="max-w-32 truncate">{item.location}</span>
				</div>
			{/if}
		</div>
	</CardContent>
</Card>
