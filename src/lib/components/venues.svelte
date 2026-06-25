<script lang="ts">
	import { Calendar, Users, CircleChevronRight as ArrowUpRight, MapPin } from '@lucide/svelte';
	import Button from './ui/button/button.svelte';
	import Badge from './ui/badge/badge.svelte';

	// ── Types ─────────────────────────────────────────────────────────────────
	type VenueDetail = {
		id: number;
		name: string;
		description: string | null;
		capacity: number | null;
		location: string | null;
		featuredImage: string | null;
		bookingPolicy: string | null;
	};

	type Props = {
		venues: VenueDetail[];
		fallbackImage?: string;
		layout?: 'carousel' | 'grid'; // New Prop
	};

	// ── Props & State ─────────────────────────────────────────────────────────
	let { venues = [], fallbackImage = '/logo.webp', layout = 'carousel' }: Props = $props();

	let currentIndex = $state(0);
	let isAnimating = $state(false);
	let direction = $state<'left' | 'right'>('right');

	// ── Derived ───────────────────────────────────────────────────────────────
	const current = $derived(venues[currentIndex]);
	const hasMultiple = $derived(venues.length > 1);
	const isGrid = $derived(layout === 'grid');

	// ── Helpers ───────────────────────────────────────────────────────────────

	function navigate(dir: 'left' | 'right'): void {
		if (isAnimating || !hasMultiple) return;
		direction = dir;
		isAnimating = true;
		setTimeout(() => {
			currentIndex =
				dir === 'right'
					? (currentIndex + 1) % venues.length
					: (currentIndex - 1 + venues.length) % venues.length;
			isAnimating = false;
		}, 320);
	}

	function goTo(index: number): void {
		if (isAnimating || index === currentIndex) return;
		direction = index > currentIndex ? 'right' : 'left';
		isAnimating = true;
		setTimeout(() => {
			currentIndex = index;
			isAnimating = false;
		}, 320);
	}
</script>

{#if venues.length === 0}
	<div
		class="flex min-h-48 items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 text-muted-foreground"
	>
		<p class="text-sm italic">No premier venues available at the moment.</p>
	</div>
{:else if isGrid}
	<!-- ── GRID LAYOUT ──────────────────────────────────────────────────────── -->
	<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
		{#each venues as venue (venue.id)}
			<article
				class="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-[#091b38] shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
			>
				<a href="/venues/{venue.id}" class="relative aspect-4/3 overflow-hidden">
					<img
						src="/files/{venue?.featuredImage}"
						alt={venue.name}
						class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
					/>
					<div
						class="absolute inset-0 bg-linear-to-t from-[#091b38]/80 via-transparent to-transparent opacity-60"
					></div>
				</a>

				<div class="flex flex-1 flex-col p-6 text-white">
					{#if venue.location}
						<div
							class="mb-2 flex items-center gap-1 text-[10px] font-bold tracking-widest text-white/60 uppercase"
						>
							<MapPin size="12" />
							{venue.location}
						</div>
					{/if}

					<a href="/venues/{venue.id}" class="transition-colors group-hover:text-primary">
						<h3 class="mb-2 text-xl leading-tight font-bold">{venue.name}</h3>
					</a>

					<p class="mb-4 line-clamp-2 text-sm text-white/80">
						{venue.description ?? 'Experience luxury at one of our premier locations.'}
					</p>

					<div class="mt-auto flex items-center justify-between border-t border-border pt-4">
						<div class="flex gap-3">
							{#if venue.capacity}
								<div class="flex items-center gap-1 text-xs font-medium text-white/80">
									<Users size="14" />
									{venue.capacity}
								</div>
							{/if}
						</div>
						<Button
							variant="ghost"
							size="sm"
							href="/venues/{venue.id}"
							class="gap-1 group-hover:bg-primary group-hover:text-white"
						>
							Details <ArrowUpRight size="14" />
						</Button>

						<Button variant="secondary" size="sm" href="/quote">Book Now ></Button>
					</div>
				</div>
			</article>
		{/each}
	</div>
{:else if venues.length === 1}
	<!-- ── SINGLE VENUE HERO ────────────────────────────────────────────────── -->
	{@const venue = venues[0]}
	<article
		class="group relative w-full overflow-hidden rounded-2xl border border-border shadow-2xl"
		style="min-height: 580px;"
	>
		<a href="/venues/{venue.id}" class="absolute inset-0 block h-full w-full overflow-hidden">
			<img
				src="/files/{venue?.featuredImage}"
				alt={venue.name}
				class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
			/>
			<div
				class="absolute inset-0 bg-linear-to-r from-[#091b38] via-[#091b38]/80 to-transparent"
			></div>
		</a>

		<div class="relative flex h-full max-w-4xl flex-col justify-end p-8 text-white md:p-16">
			{#if venue.location}
				<span
					class="mb-4 inline-flex items-center gap-2 rounded-full bg-[#f2e1d1] px-4 py-1.5 text-xs font-bold tracking-widest text-[#091b38] uppercase"
				>
					<MapPin size="14" />
					{venue.location}
				</span>
			{/if}

			<h1 class="mb-4 text-5xl font-black tracking-tight text-white lg:text-7xl">
				{venue.name}
			</h1>

			<p class="mb-8 max-w-2xl text-lg leading-relaxed text-[#f2e1d1]/80">
				{venue.description ?? ''}
			</p>

			<div class="mb-10 flex flex-wrap items-center gap-8">
				{#if venue.capacity}
					<div class="flex items-center gap-3">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2e1d1]/10 text-[#f2e1d1]"
						>
							<Users size="20" />
						</div>
						<div class="text-white">
							<p class="text-xs tracking-tighter uppercase opacity-60">Capacity</p>
							<p class="font-bold">{venue.capacity.toLocaleString()} Guests</p>
						</div>
					</div>
				{/if}
				{#if venue.bookingPolicy}
					<div class="flex items-center gap-3">
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2e1d1]/10 text-[#f2e1d1]"
						>
							<Calendar size="20" />
						</div>
						<div class="text-white">
							<p class="text-xs tracking-tighter uppercase opacity-60">Availability</p>
							<p class="max-w-50 truncate font-bold">{venue.bookingPolicy}</p>
						</div>
					</div>
				{/if}
			</div>

			<Button
				size="lg"
				href="/venues/{venue.id}"
				class="h-14 w-fit rounded-full bg-[#f2e1d1] px-8 text-lg font-bold text-[#091b38] hover:bg-white"
			>
				Explore Venue <ArrowUpRight class="ml-2" />
			</Button>
			<Button variant="secondary" size="sm" href="/quote">Book Now ></Button>
		</div>
	</article>
{:else}
	<!-- ── CAROUSEL LAYOUT ──────────────────────────────────────────────────── -->
	<div class="group/carousel relative w-full" role="region" aria-label="Venue showcase">
		<div
			class="relative min-h-125 overflow-hidden rounded-2xl border border-border bg-[#091b38] shadow-2xl"
		>
			<!-- Image Link -->
			<a href="/venues/{current.id}" class="absolute inset-0 block h-full w-full">
				<img
					src="/files/{current?.featuredImage}"
					alt={current.name}
					class="h-full w-full object-cover transition-opacity duration-500"
					style="opacity: {isAnimating ? 0.3 : 1};"
				/>
				<div
					class="absolute inset-0 bg-linear-to-r from-[#091b38] via-[#091b38]/80 to-transparent"
				></div>
			</a>

			<!-- Content -->
			<div
				class="relative flex h-full flex-col justify-end p-8 text-white transition-all duration-300 md:p-12"
				style="opacity: {isAnimating ? 0 : 1}; transform: translateY({isAnimating ? '10px' : '0'});"
			>
				<div class="max-w-2xl">
					{#if current.location}
						<Badge>
							{current.location}
						</Badge>
					{/if}

					<a href="/venues/{current.id}"
						><h2
							class="mb-3 text-4xl font-bold text-white transition-all ease-in-out hover:scale-102"
						>
							{current.name}
						</h2></a
					>

					<p class="mb-6 line-clamp-2 text-white/80">{current.description}</p>

					<div class="mb-8 flex items-center gap-6">
						{#if current.capacity}
							<span class="flex items-center gap-2 text-sm font-medium text-white/80"
								><Users size="16" class="text-white/80" /> {current.capacity} Guests</span
							>
						{/if}
						<Button size="sm" variant="secondary" href="/venues/{current.id}"
							>View Venue <ArrowUpRight size="14" /></Button
						>
						<Button variant="secondary" size="sm" href="/quote"
							>Book Now <ArrowUpRight size="14" /></Button
						>
					</div>
				</div>
			</div>

			<!-- Navigation -->
			<div
				class="absolute top-1/2 right-0 left-0 flex -translate-y-1/2 justify-between px-4 opacity-0 transition-opacity group-hover/carousel:opacity-100"
			>
				<Button
					size="icon"
					onclick={() => navigate('left')}
					class="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-primary"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M15 19l-7-7 7-7"
						/></svg
					>
				</Button>
				<button
					onclick={() => navigate('right')}
					class="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-all hover:bg-primary"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5l7 7-7 7"
						/></svg
					>
				</button>
			</div>

			<!-- Counter -->
			<div
				class="absolute top-6 right-6 rounded-full border border-white/10 bg-black/40 px-4 py-1 text-[10px] font-bold tracking-widest text-white uppercase backdrop-blur-md"
			>
				{currentIndex + 1} / {venues.length}
			</div>
		</div>

		<!-- Dots -->
		<div class="mt-6 flex justify-center gap-3">
			{#each venues as _, i}
				<button
					onclick={() => goTo(i)}
					class="h-1 rounded-full transition-all duration-300 {i === currentIndex
						? 'w-8 bg-primary'
						: 'w-2 bg-border hover:bg-muted-foreground'}"
				></button>
			{/each}
		</div>
	</div>
{/if}
