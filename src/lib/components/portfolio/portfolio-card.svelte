<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { Card, CardContent } from '$lib/components/ui/card';
	import { CalendarIcon, MapPinIcon, UserIcon } from '@lucide/svelte';

	// Updated explicit type structure alignment
	export type PortfolioItem = {
		id: string | number;
		title: string;
		slug: string;
		category: string;
		description: string | null;
		isFeatured: boolean;
		featuredImage: string | null;
		completedAt: string | null;
		clientName: string | null;
		location: string | null;
		excerpt: string | null;
		content: string | null;
	};

	const { item }: { item: PortfolioItem } = $props();

	// Map completedAt to the design timeline calendar matrix
	const formattedDate = $derived(
		item.completedAt
			? new Date(item.completedAt).toLocaleDateString('en-US', {
					month: 'short',
					day: 'numeric',
					year: 'numeric'
				})
			: null
	);
</script>

<Card
	class="group overflow-hidden rounded-2xl border border-border/60 bg-card text-card-foreground shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
>
	<!-- Link mapped to studio projects hierarchy -->
	<a href="/portfolio/{item.slug}" class="relative block aspect-4/3 overflow-hidden bg-muted/20">
		{#if item.featuredImage}
			<img
				src="/files/{item.featuredImage}"
				alt={item.title}
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
		{:else}
			<div
				class="flex h-full w-full items-center justify-center bg-muted text-xs font-bold tracking-wider text-muted-foreground uppercase"
			>
				No Visual Render
			</div>
		{/if}

		<div
			class="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
		></div>

		{#if item.category}
			<Badge
				class="absolute top-4 left-4 rounded-md bg-primary text-[10px] font-semibold tracking-wider text-primary-foreground uppercase shadow-sm"
			>
				{item.category}
			</Badge>
		{/if}
	</a>

	<CardContent class="space-y-2.5 p-5">
		<h3
			class="line-clamp-1 text-lg font-black tracking-tight text-foreground uppercase transition-colors group-hover:text-primary"
		>
			<a href="/portfolio/{item.slug}">{item.title}</a>
		</h3>

		{#if item.excerpt || item.description}
			<p class="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
				{item.excerpt || item.description}
			</p>
		{/if}

		<div class="flex flex-wrap gap-x-4 gap-y-2 pt-1 text-xs font-medium text-muted-foreground">
			{#if formattedDate}
				<div class="flex shrink-0 items-center gap-1.5">
					<CalendarIcon class="size-3.5 text-primary/70" />
					<span>{formattedDate}</span>
				</div>
			{/if}

			{#if item.clientName}
				<div class="flex shrink-0 items-center gap-1.5">
					<UserIcon class="size-3.5 text-primary/70" />
					<span class="max-w-[120px] truncate">{item.clientName}</span>
				</div>
			{/if}

			{#if item.location}
				<div class="flex shrink-0 items-center gap-1.5">
					<MapPinIcon class="size-3.5 text-primary/70" />
					<span class="max-w-[140px] truncate">{item.location}</span>
				</div>
			{/if}
		</div>
	</CardContent>
</Card>
