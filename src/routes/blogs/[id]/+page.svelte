<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import { ArrowLeftIcon, CalendarIcon, PlayCircle } from '@lucide/svelte';
	import type { BlogItem } from '$lib/data/portfolio';
	import Gallery from '$lib/components/gallery.svelte';
	import { formatEthiopianDate } from '$lib/global.svelte.js';

	const { data } = $props();

	const item: BlogItem = $derived(data?.portfolioItems);

	const formattedDate = $derived(
		item?.createdAt ? formatEthiopianDate(new Date(item?.createdAt)) : null
	);

	const post: BlogItem = $derived(data?.portfolioItems);

	function getId(videoUrl: string) {
		const regex =
			/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
		const match = videoUrl?.match(regex);
		return match ? match[1] : null;
	}
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{post.title} | Golla Design Group Journal</title>
	<meta name="title" content="{post.title} | Golla Design Group" />
	<meta
		name="description"
		content={post.excerpt ||
			'Read the latest design journals, structural blueprints insights, and spatial ideas from Golla Design Group in Addis Ababa.'}
	/>

	<!-- Open Graph / Facebook Matrices -->
	<meta property="og:type" content="article" />
	<meta property="og:url" content="/blogs/{post.slug}" />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.excerpt} />
	<meta property="og:image" content="/files/{post.featuredImage}" />
	<meta property="article:section" content={post.category || 'Architecture'} />

	<!-- Twitter Frame -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="/blogs/{post.slug}" />
	<meta property="twitter:title" content={post.title} />
	<meta property="twitter:description" content={post.excerpt} />
	<meta property="twitter:image" content="/files/{post.featuredImage}" />

	<!-- Canonical URL Link alignment -->
	<link rel="canonical" href="https://golladesign.com/blogs/{post.slug}" />

	<!-- Article Schema Authorship -->
	<meta name="author" content="Golla Design Group" />
</svelte:head>

<div class="min-h-dvh bg-background text-foreground" in:fade={{ duration: 300 }}>
	<!-- Hero Image Section Layer -->
	<div class="relative h-[50vh] overflow-hidden lg:h-[60vh]">
		<img src={`/files/${item.featuredImage}`} alt={item.title} class="h-full w-full object-cover" />
		<div
			class="absolute inset-0 bg-linear-to-t from-background via-background/30 to-transparent"
		></div>

		<!-- Studio Back Button Anchor -->
		<div class="absolute top-6 left-6 z-10" in:fly={{ x: -20, duration: 400, delay: 200 }}>
			<Button
				variant="secondary"
				size="sm"
				class="rounded-full border border-border/40 bg-background/80 text-foreground shadow-md backdrop-blur-xs hover:bg-background"
				href="/blogs"
			>
				<ArrowLeftIcon class="mr-2 size-4" />
				Back to Journal
			</Button>
		</div>

		<!-- Spatial Classification Tag Badge -->
		{#if item.category}
			<div class="absolute top-6 right-6 z-10" in:fly={{ x: 20, duration: 400, delay: 200 }}>
				<Badge
					class="rounded-full bg-primary px-4 py-1.5 text-xs font-semibold tracking-wider text-primary-foreground uppercase shadow-md hover:bg-primary/90"
				>
					{item.category}
				</Badge>
			</div>
		{/if}
	</div>

	<!-- Main Core Content Grid Wrapper -->
	<div class="relative -mt-20 lg:-mt-32">
		<div class="mx-auto max-w-4xl px-4 lg:px-8">
			<div
				class="rounded-2xl border border-border/60 bg-card p-6 text-card-foreground shadow-xl lg:p-10"
				in:fly={{ y: 40, duration: 500, delay: 100 }}
			>
				<!-- Journal Article Header Title -->
				<h1
					class="mb-4 text-3xl leading-tight font-black tracking-tight text-foreground uppercase lg:text-4xl"
				>
					{item.title}
				</h1>

				<!-- Temporal Meta Metadata Deck -->
				<div class="mb-6 flex flex-wrap gap-4 lg:gap-6">
					{#if formattedDate}
						<div class="flex items-center gap-3 text-muted-foreground">
							<div
								class="flex size-9 items-center justify-center rounded-full border border-border/40 bg-secondary text-primary"
							>
								<CalendarIcon class="size-4" />
							</div>
							<div>
								<p class="text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase">
									Published
								</p>
								<p class="text-sm font-semibold text-foreground">{formattedDate}</p>
							</div>
						</div>
					{/if}
				</div>

				<Separator class="my-6 border-border/60" />

				<!-- Structural Summary Excerpt Frame -->
				{#if item.excerpt}
					<div class="flex flex-col gap-4">
						<p class="text-base leading-relaxed font-medium text-muted-foreground lg:text-lg">
							{item.excerpt}
						</p>
					</div>
				{/if}

				<!-- Rich Text / HTML Dynamic Article Entry Board -->
				<article
					class="prose prose-neutral dark:prose-invert mt-8 max-w-none rounded-xl border border-border/40 bg-muted/30 p-6 text-foreground"
				>
					{@html item?.content}

					{#if data?.images}
						<div class="mt-8 border-t border-border/40 pt-6">
							<Gallery bento images={data.images} title={item.title} />
						</div>
					{/if}
				</article>

				<!-- Video Render Framework Row -->
				{#if data?.videos?.length}
					<section id="videos" class="mx-auto max-w-7xl py-16">
						<div class="mb-12 flex items-center gap-4">
							<Separator class="flex-1 bg-border/60" />
							<h2
								class="flex items-center gap-2 px-4 text-lg font-black tracking-wider text-muted-foreground uppercase"
							>
								<PlayCircle class="size-5 text-primary" />
								Studio Walkthrough{#if data.videos.length !== 1}s{/if}
							</h2>
							<Separator class="flex-1 bg-border/60" />
						</div>

						<div class="grid grid-cols-1 items-center gap-12">
							{#each data?.videos as video (video.id)}
								<div class="group relative">
									<div
										class="absolute -inset-4 scale-95 rounded-[2.5rem] border border-border/20 bg-secondary/50 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
									></div>
									<div
										class="relative aspect-video overflow-hidden rounded-2xl border border-border bg-muted shadow-2xl"
									>
										<iframe
											src="https://www.youtube.com/embed/{getId(video.videoUrl)}"
											title="Studio Walkthrough Presentation"
											frameborder="0"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
											allowfullscreen
											class="h-full w-full"
										></iframe>
									</div>
								</div>
							{/each}
						</div>
					</section>
				{/if}

				<!-- Strategic CTA Interaction Segment -->
				<div class="mt-10 flex flex-col gap-3 border-t border-border/40 pt-8 sm:flex-row">
					<Button class="flex-1 rounded-xl" href="/contact" size="lg">
						Discuss This Design Framework
					</Button>
					<Button
						variant="outline"
						class="flex-1 rounded-xl border-border/60 bg-background text-foreground"
						size="lg"
						href="/blogs"
					>
						Explore More Articles
					</Button>
				</div>
			</div>
		</div>
	</div>

	<!-- Layout Buffer Spacer padding -->
	<div class="h-24"></div>
</div>
