<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Calendar, CalendarIcon, PlayCircle, SparklesIcon } from '@lucide/svelte';
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import InfoCard from './info-card.svelte';
	import {
		UsersIcon,
		CircleChevronRight,
		BuildingIcon,
		FileTextIcon,
		CheckCircleIcon
	} from '@lucide/svelte';
	import Gallery from '$lib/components/gallery.svelte';
	import { get } from 'svelte/store';
	import Lottery from './lottery.svelte';

	let { data } = $props();

	let { venue, videos, features, images } = data;

	function getId(videoUrl: string) {
		const regex =
			/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
		const match = videoUrl?.match(regex);
		return match ? match[1] : null;
	}

	const navItems = [
		{ label: 'Overview', id: 'overview' },
		{ label: 'Amenities', id: 'amenities', show: features?.length > 0 },
		{ label: 'Policy', id: 'policy', show: !!venue?.bookingPolicy },
		{ label: 'Gallery', id: 'gallery', show: images?.length > 0 },
		{ label: 'Videos', id: 'videos', show: videos?.length > 0 }
	].filter((item) => item.show !== false);

	function scrollToSection(id: string) {
		const el = document.getElementById(id);
		if (el) {
			const offset = 80; // Offset for the sticky nav height
			const bodyRect = document.body.getBoundingClientRect().top;
			const elementRect = el.getBoundingClientRect().top;
			const elementPosition = elementRect - bodyRect;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth'
			});
		}
	}
</script>

<svelte:head>
	<title>{venue?.name}</title>
</svelte:head>

<section class="relative h-[70vh] min-h-125 w-full overflow-hidden">
	<!-- Background Image -->
	<div class="absolute inset-0">
		<img
			src={venue?.featuredImage ? `/files/${venue?.featuredImage}` : '/event (1).webp'}
			loading="lazy"
			alt={venue?.name}
			class="h-full w-full object-cover"
		/>

		<div class="absolute inset-0 bg-primary/60 dark:bg-secondary/60"></div>
		<div class="absolute inset-0"></div>
	</div>

	<!-- Content Overlay -->
	<div class="relative flex h-full max-w-4xl flex-col justify-end gap-4 p-6 md:p-12 lg:p-16">
		<Badge variant="secondary">
			<SparklesIcon class="size-4" />
			Premium Venue
		</Badge>

		<h1 class="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
			{venue?.name}
		</h1>

		{#if venue?.location}
			<p class="max-w-2xl text-lg text-white/80 md:text-xl">
				{venue.location}
			</p>
		{/if}

		<div class="flex w-100 flex-row gap-2">
			<Button href="/quote" class="w-40" variant="outline">Book Now <CircleChevronRight /></Button>
			{#if venue.enableLottery === 1}
				<Lottery data={data?.form} />
			{/if}
		</div>
	</div>
</section>

<nav class="sticky top-0 z-40 border-b border-border/50 bg-background/80 backdrop-blur-md">
	<div class="mx-auto max-w-7xl px-6">
		<div class="no-scrollbar flex h-14 items-center justify-start gap-6 overflow-x-auto">
			{#each navItems as item (item.id)}
				<button
					onclick={() => scrollToSection(item.id)}
					class="text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-secondary"
				>
					{item.label}
				</button>
			{/each}
		</div>
	</div>
</nav>

<section class="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-32">
	<!-- Info Cards Grid -->

	<div class="grid grid-cols-1 gap-8">
		<!-- Main Content -->
		<div class="space-y-8 lg:col-span-2">
			<div id="overview" class="">
				{#if venue?.capacity}
					<InfoCard icon={UsersIcon} label="Capacity">
						{venue?.capacity.toLocaleString()} guests
					</InfoCard>
				{/if}
			</div>
			{#if features?.length}
				<Card id="amenities" class="border-border/50">
					<CardHeader>
						<CardTitle class="flex items-center gap-3 text-2xl">
							<div class="rounded-lg bg-primary p-2 text-secondary">
								<BuildingIcon class="size-5" />
							</div>
							Amenities & Features
						</CardTitle>
					</CardHeader>
					<CardContent>
						{#each features as amenity (amenity?.id)}
							<InfoCard icon={CheckCircleIcon} label={amenity?.name ?? ''}
								>{amenity?.description}</InfoCard
							>
						{/each}
					</CardContent>
				</Card>
			{/if}
			<!-- About Section -->
			{#if venue?.description}
				<Card class="border-border/50">
					<CardHeader>
						<CardTitle class="flex items-center gap-3 text-2xl">
							<div class="rounded-lg bg-primary/10 p-2">
								<BuildingIcon class="size-5" />
							</div>
							About the Venue
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-lg leading-relaxed">
							{venue?.description}
						</p>
					</CardContent>
				</Card>
			{/if}

			<!-- Booking Policy Section -->
			{#if venue?.bookingPolicy}
				<Card id="policy" class="border-border/50">
					<CardHeader>
						<CardTitle class="flex items-center gap-3 text-2xl">
							<div class="rounded-lg bg-primary/10 p-2">
								<FileTextIcon class="size-5" />
							</div>
							Booking Policy
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="leading-relaxed">
							{venue.bookingPolicy}
						</p>
					</CardContent>
				</Card>
			{/if}
		</div>

		<!-- <div class="space-y-6">
				<!-- Amenities Card -->
	</div>
</section>

<div id="gallery" class="mx-auto max-w-7xl px-6 py-12 md:px-12 lg:px-16">
	<Gallery {images} title="{venue?.name} Gallery" />
</div>

{#if videos?.length}
	<section id="videos" class="mx-auto max-w-7xl px-6 py-24">
		<div class="mb-12 flex items-center gap-4">
			<Separator class="flex-1 bg-primary/10" />
			<h2 class="flex items-center gap-2 px-4 text-2xl font-bold">
				<PlayCircle class="size-6" /> Video
			</h2>
			<Separator class="flex-1 bg-primary/10" />
		</div>

		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
			{#each videos as video}
				<div class="group relative">
					<div
						class="absolute -inset-4 scale-95 rounded-[2.5rem] bg-primary/5 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
					></div>
					<div
						class="relative aspect-video overflow-hidden rounded-[2rem] border-8 border-background shadow-2xl"
					>
						<iframe
							src="https://www.youtube.com/embed/{getId(video.videoUrl)}"
							title="YouTube video player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowfullscreen
							class="h-full w-full"
						></iframe>
					</div>
					<div class="mt-6 px-4">
						<h3 class="text-xl font-bold italic">Exclusive Walkthrough</h3>
						<p class="mt-1 text-sm text-muted-foreground">
							Experience the flow and scale of {venue?.name} in motion.
						</p>
					</div>
				</div>
			{/each}
		</div>
	</section>
{/if}
