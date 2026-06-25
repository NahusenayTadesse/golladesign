<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Separator } from '$lib/components/ui/separator';
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import {
		CalendarIcon,
		MapPinIcon,
		UserIcon,
		LayersIcon,
		FileTextIcon,
		PlayCircle,
		Maximize2Icon,
		ArrowUpRightIcon,
		CompassIcon
	} from '@lucide/svelte';
	import Gallery from '$lib/components/gallery.svelte';

	// Svelte 5 Rune-based data intake mapping out Drizzle-inferred relations
	let { data } = $props();

	// Structured destruction matching updated projects schema relations
	let { project, category, videos, images } = $derived(data);

	function getId(videoUrl: string) {
		const regex =
			/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
		const match = videoUrl?.match(regex);
		return match ? match[1] : null;
	}

	// Architectural Page Anchor Jumps
	const navItems = $derived(
		[
			{ label: 'Overview', id: 'overview', show: true },
			{ label: 'Spatial Narrative', id: 'narrative', show: !!project?.content },
			{
				label: 'Blueprints & Specs',
				id: 'specifications',
				show: !!project?.blueprintUrl || !!project?.clientName
			},
			{ label: 'Media Renders', id: 'gallery', show: images?.length > 0 },
			{
				label: 'Video Walkthroughs',
				id: 'videos',
				show: videos?.filter((v) => v.isActive).length > 0
			}
		].filter((item) => item.show)
	);

	function scrollToSection(id: string) {
		const el = document.getElementById(id);
		if (el) {
			const offset = 90; // Sticky nav matrix offset
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

	const formattedDate = $derived(
		project?.completedAt
			? new Date(project.completedAt).toLocaleDateString('en-US', {
					month: 'long',
					year: 'numeric'
				})
			: null
	);
</script>

<svelte:head>
	<title>{project?.title} | Golla Design Group Architectural Works</title>
	<meta name="description" content={project?.excerpt} />
</svelte:head>

<!-- Cinematic Hero Cover Frame -->
<section class="relative h-[65vh] min-h-[500px] w-full overflow-hidden" in:fade={{ duration: 400 }}>
	<div class="absolute inset-0">
		<img
			src={project?.featuredImage ? `/files/${project.featuredImage}` : '/fallback-render.webp'}
			alt={project?.title}
			class="h-full w-full scale-102 object-cover"
		/>
		<!-- Sophisticated architecture studio dark gradient mask mapping -->
		<div
			class="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20"
		></div>
		<div class="absolute inset-0 bg-black/20"></div>
	</div>

	<!-- Content Core Layer -->
	<div class="absolute inset-0 flex flex-col justify-end p-6 md:p-12 lg:p-20">
		<div class="mx-auto w-full max-w-7xl space-y-4" in:fly={{ y: 30, duration: 600 }}>
			{#if category?.name}
				<Badge
					class="rounded-md bg-primary px-4 py-1.5 text-[10px] font-black tracking-widest text-primary-foreground uppercase shadow-lg hover:bg-primary"
				>
					{category.name}
				</Badge>
			{/if}

			<h1
				class="max-w-4xl text-4xl leading-none font-black tracking-tight text-white uppercase md:text-5xl lg:text-6xl"
			>
				{project?.title}
			</h1>

			{#if project?.excerpt}
				<p class="max-w-2xl text-base leading-relaxed font-medium text-white/80 sm:text-lg">
					{project.excerpt}
				</p>
				{#if project.isFeatured}
					<div
						class="inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-2.5 py-1 text-xs font-bold tracking-wider text-primary uppercase"
					>
						Flagship Commission
					</div>
				{/if}
			{/if}
		</div>
	</div>
</section>

<!-- Sticky Structural Sticky Navigation Strip -->
<nav class="sticky top-0 z-40 border-y border-border/60 bg-background/80 backdrop-blur-md">
	<div class="mx-auto max-w-7xl px-6 md:px-12">
		<div class="no-scrollbar flex h-14 items-center justify-start gap-8 overflow-x-auto">
			{#each navItems as item (item.id)}
				<button
					onclick={() => scrollToSection(item.id)}
					class="text-xs font-black tracking-widest whitespace-nowrap text-muted-foreground uppercase transition-colors hover:text-primary"
				>
					{item.label}
				</button>
			{/each}
		</div>
	</div>
</nav>

<!-- Spatial Metrics Index Segment -->
<section id="overview" class="border-b border-border/40 bg-muted/20">
	<div
		class="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 text-foreground sm:grid-cols-3 md:px-12"
	>
		<div class="flex items-center gap-4 rounded-xl border border-border/40 bg-card p-3">
			<div
				class="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-secondary text-primary"
			>
				<UserIcon class="size-5" />
			</div>
			<div class="min-w-0">
				<p class="text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase">
					Client Entity
				</p>
				<p class="truncate text-sm font-black">{project?.clientName || 'Private Commission'}</p>
			</div>
		</div>

		<div class="flex items-center gap-4 rounded-xl border border-border/40 bg-card p-3">
			<div
				class="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-secondary text-primary"
			>
				<MapPinIcon class="size-5" />
			</div>
			<div class="min-w-0">
				<p class="text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase">
					Site Coordinates
				</p>
				<p class="truncate text-sm font-black">{project?.location || 'Addis Ababa'}</p>
			</div>
		</div>

		<div class="flex items-center gap-4 rounded-xl border border-border/40 bg-card p-3">
			<div
				class="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border/40 bg-secondary text-primary"
			>
				<CalendarIcon class="size-5" />
			</div>
			<div class="min-w-0">
				<p class="text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase">
					Execution Timeline
				</p>
				<p class="truncate text-sm font-black">{formattedDate || 'In Development'}</p>
			</div>
		</div>
	</div>
</section>

<!-- Core Editorial Layout Shell -->
<section class="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:py-24">
	<div class="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
		<!-- Left: Core Architectural Text Renderings -->
		<div class="space-y-12 lg:col-span-2">
			<div id="narrative" class="space-y-4">
				<div
					class="inline-flex items-center gap-2 text-xs font-black tracking-widest text-primary uppercase"
				>
					<CompassIcon class="size-4" />
					Spatial Masterplan Narrative
				</div>
				<h2 class="text-3xl font-black tracking-tight text-foreground uppercase">
					Design Intent & Structural Flow
				</h2>
				<Separator class="bg-border/60" />
				<article
					class="prose prose-neutral dark:prose-invert max-w-none pt-2 text-base leading-relaxed text-muted-foreground"
				>
					<!-- Standard content markup string rendered natively -->
					{@html project?.content}
				</article>
			</div>
		</div>

		<!-- Right: Spec Sheet & Structural Documentation Download Hub -->
		<div id="specifications" class="space-y-6 lg:sticky lg:top-24">
			<Card class="overflow-hidden rounded-2xl border border-border/60 bg-card shadow-xs">
				<CardHeader class="border-b border-border/40 bg-secondary/40">
					<CardTitle
						class="flex items-center gap-2.5 text-xs font-black tracking-widest text-foreground uppercase"
					>
						<LayersIcon class="size-4 text-primary" />
						Studio Specification Logs
					</CardTitle>
				</CardHeader>
				<CardContent class="space-y-6 p-6">
					<div class="space-y-2 text-xs">
						<div class="flex justify-between border-b border-border/30 pb-2">
							<span class="font-medium text-muted-foreground">Verification State</span>
							<Badge
								variant="outline"
								class="rounded-xs border-primary bg-primary/5 text-[10px] font-bold tracking-wider text-primary uppercase"
							>
								{project?.status}
							</Badge>
						</div>
						<div class="flex justify-between border-b border-border/30 pt-1 pb-2">
							<span class="font-medium text-muted-foreground">Framework Index</span>
							<span class="font-bold text-foreground">G-{project?.id}</span>
						</div>
					</div>

					{#if project?.blueprintUrl}
						<div class="space-y-3 rounded-xl border border-border/40 bg-muted/30 p-4">
							<div class="flex items-start gap-3">
								<div class="rounded-lg border border-border/40 bg-background p-2 text-primary">
									<FileTextIcon class="size-4" />
								</div>
								<div>
									<h4 class="text-xs font-black tracking-wider text-foreground uppercase">
										CAD Schematic Set
									</h4>
									<p class="text-[11px] text-muted-foreground">
										Structural blueprints, spatial elevation maps and millwork details.
									</p>
								</div>
							</div>
							<Button
								href="/files/{project.blueprintUrl}"
								target="_blank"
								variant="default"
								class="mt-1 h-10 w-full gap-2 rounded-xl text-xs font-bold tracking-wide uppercase"
							>
								Access Technical Drawer <ArrowUpRightIcon class="size-3.5" />
							</Button>
						</div>
					{/if}

					<Button
						href="/contact-us"
						variant="outline"
						class="h-11 w-full rounded-xl border-border/60 text-xs font-bold tracking-wide uppercase"
					>
						Request Material Sample Board
					</Button>
				</CardContent>
			</Card>
		</div>
	</div>
</section>

<!-- High-fidelity Raytraced Gallery Component Insertion Row -->
{#if images?.length}
	<div id="gallery" class="border-y border-border/40 bg-secondary/20 py-16">
		<div class="mx-auto max-w-7xl px-6 md:px-12">
			<div class="mb-8 space-y-1">
				<h3 class="text-xs font-black tracking-widest text-primary uppercase">
					Orthographic Records
				</h3>
				<h2 class="text-2xl font-black tracking-tight text-foreground uppercase">
					Ray-Traced Visualizations & Captures
				</h2>
			</div>
			<!-- Uses your existing bento gallery parser cleanly -->
			<Gallery {images} title="{project?.title} Execution Portfolio" bento />
		</div>
	</div>
{/if}

<!-- Studio Video Render Walkthrough Deck -->
{#if videos?.filter((v) => v.isActive).length}
	<section id="videos" class="mx-auto max-w-7xl px-6 py-16 md:px-12 lg:py-24">
		<div class="mb-12 flex items-center gap-4">
			<Separator class="flex-1 bg-border/60" />
			<h2
				class="flex items-center gap-2 px-4 text-xs font-black tracking-widest text-muted-foreground uppercase"
			>
				<PlayCircle class="size-4 text-primary" /> Spatial Animation Walkthrough
			</h2>
			<Separator class="flex-1 bg-border/60" />
		</div>

		<div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
			{#each videos.filter((v) => v.isActive) as video (video.id)}
				<div class="group relative space-y-4">
					<div
						class="absolute -inset-4 scale-98 rounded-3xl border border-border/30 bg-secondary/50 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
					></div>
					<div
						class="relative aspect-video overflow-hidden rounded-2xl border border-border bg-muted shadow-xl"
					>
						<iframe
							src="https://www.youtube.com/embed/{getId(video.videoUrl)}"
							title="Architectural Presentation Render Video Player"
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
							allowfullscreen
							class="h-full w-full"
						></iframe>
					</div>
					<div class="relative flex items-start justify-between px-2">
						<div>
							<h3 class="text-base font-black tracking-tight text-foreground uppercase">
								Lumen Motion Walkthrough
							</h3>
							<p class="mt-0.5 text-xs text-muted-foreground">
								Experience volumetric depth and daylight pacing constraints.
							</p>
						</div>
						<Button
							variant="ghost"
							size="icon"
							class="rounded-lg text-muted-foreground hover:text-primary"
							href="https://www.youtube.com/embed/{getId(video.videoUrl)}"
							target="_blank"
						>
							<Maximize2Icon class="size-4" />
						</Button>
					</div>
				</div>
			{/each}
		</div>
	</section>
{/if}
