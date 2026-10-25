<script lang="ts">
	import { SvelteSet } from 'svelte/reactivity';
	import { fileUrl, fileSrcset } from '$lib/files';
	import { Card, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { ChevronLeftIcon, ChevronRightIcon, ImagesIcon, ArrowRightIcon } from '@lucide/svelte';

	type Service = {
		id: number;
		name: string;
		featuredImage: string | null;
		description: string | null;
		slug?: string;
		galleryImages?: string[];
	};

	const { service }: { service: Service } = $props();

	// The featured image always leads, followed by whatever extra shots the
	// service gallery holds. Duplicates are dropped so the count stays honest.
	const images = $derived(
		[...(service.featuredImage ? [service.featuredImage] : []), ...(service.galleryImages ?? [])]
			.filter(Boolean)
			.filter((img, index, all) => all.indexOf(img) === index)
	);

	const hasMultiple = $derived(images.length > 1);

	let index = $state(0);
	// Stacked photos would all download at once; add each one only when it's first shown.
	const seen = new SvelteSet([0]);
	const show = (i: number) => {
		index = i;
		seen.add(i);
	};

	const step = (direction: number) => {
		show((index + direction + images.length) % images.length);
	};
</script>

<Card
	class="group overflow-hidden pt-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
>
	<!-- Image stage: doubles as the link into the service and as a mini gallery -->
	<div class="relative aspect-4/3 overflow-hidden bg-muted">
		<a
			href="/services/{service.slug ?? service.id}"
			aria-label="View {service.name}"
			class="block h-full w-full focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
		>
			{#if images.length}
				{#each images as image, i (image)}
					{#if seen.has(i)}
						<img
							src={fileUrl(image, 640)}
							srcset={fileSrcset(image, 1280)}
							sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
							width="640"
							height="480"
							alt="{service.name} — image {i + 1} of {images.length}"
							loading="lazy"
							decoding="async"
							class={[
								'absolute inset-0 h-full w-full object-cover transition-all duration-500',
								i === index ? 'opacity-100' : 'opacity-0',
								'group-hover:scale-105'
							]}
						/>
					{/if}
				{/each}
			{:else}
				<div class="flex h-full w-full items-center justify-center text-muted-foreground">
					<ImagesIcon class="size-8" />
				</div>
			{/if}

			<div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"></div>
		</a>

		{#if hasMultiple}
			<!-- Photo-count badge: the always-visible "there is more here" cue -->
			<div
				class="pointer-events-none absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white backdrop-blur-sm"
			>
				<ImagesIcon class="size-3.5" />
				{images.length} photos
			</div>

			<!-- Arrows: always rendered so touch users get them too -->
			<button
				type="button"
				aria-label="Previous image"
				onclick={() => step(-1)}
				class="absolute top-1/2 left-2 flex size-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-all hover:bg-black/80 active:scale-90"
			>
				<ChevronLeftIcon class="size-5" />
			</button>
			<button
				type="button"
				aria-label="Next image"
				onclick={() => step(1)}
				class="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 touch-manipulation items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-all hover:bg-black/80 active:scale-90"
			>
				<ChevronRightIcon class="size-5" />
			</button>

			<!-- Dots -->
			<div class="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
				{#each images as image, i (image)}
					<button
						type="button"
						aria-label="Show image {i + 1}"
						aria-current={i === index}
						onclick={() => show(i)}
						class="flex size-6 touch-manipulation items-center justify-center"
					>
						<span
							class={[
								'block h-1.5 rounded-full transition-all duration-300',
								i === index ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
							]}
						></span>
					</button>
				{/each}
			</div>
		{/if}
	</div>

	<CardHeader class="gap-1">
		<CardTitle class="text-lg">
			<a
				href="/services/{service.slug ?? service.id}"
				class="flex items-center justify-between gap-2 transition-colors hover:text-primary active:text-primary"
			>
				{service.name}
				<ArrowRightIcon
					class="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1"
				/>
			</a>
		</CardTitle>

		{#if service.description}
			<CardDescription class="line-clamp-3">{service.description}</CardDescription>
		{/if}

		{#if hasMultiple}
			<p class="pt-1 text-xs font-semibold tracking-wide text-primary">
				Tap to explore all {images.length} images
			</p>
		{/if}
	</CardHeader>
</Card>
