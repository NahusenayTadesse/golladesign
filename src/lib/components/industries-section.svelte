<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import {
		Building2Icon,
		HomeIcon,
		HotelIcon,
		StoreIcon,
		HammerIcon,
		FileTextIcon,
		CompassIcon
	} from '@lucide/svelte';

	const sectors = [
		{
			id: '01',
			icon: Building2Icon,
			name: 'Corporate Headquarters',
			tag: 'Workspace Planning',
			scale: 'SCALE 1:100',
			coordinates: 'X: 142.08 // Y: 902.14',
			specs:
				'Modular acoustic partitions, high-density utility integration, custom executive boardroom interfaces.'
		},
		{
			id: '02',
			icon: HomeIcon,
			name: 'Luxury Residential',
			tag: 'Bespoke Living',
			scale: 'SCALE 1:20',
			coordinates: 'X: 304.55 // Y: 112.80',
			specs:
				'Architectural millwork, structural fireplace assemblies, custom concealed door systems.'
		},
		{
			id: '03',
			icon: HotelIcon,
			name: 'Hospitality & Lounges',
			tag: 'Atmosphere Design',
			scale: 'SCALE 1:50',
			coordinates: 'X: 890.12 // Y: 445.67',
			specs: 'Sensory lighting integration, high-traffic custom furniture, spatial flow analysis.'
		},
		{
			id: '04',
			icon: StoreIcon,
			name: 'Premium Retail & Showrooms',
			tag: 'Spatial Branding',
			scale: 'SCALE 1:30',
			coordinates: 'X: 521.19 // Y: 713.88',
			specs:
				'Focal product staging structures, modular display systems, integrated perimeter illumination.'
		},
		{
			id: '05',
			icon: HammerIcon,
			name: 'Property Developers',
			tag: 'Execution Coordination',
			scale: 'SCALE 1:200',
			coordinates: 'X: 771.04 // Y: 290.15',
			specs:
				'Multi-unit design systematization, fabrication logistics scheduling, core assembly drafting.'
		},
		{
			id: '06',
			icon: FileTextIcon,
			name: 'Design & Architectural Firms',
			tag: 'Technical Partnership',
			scale: 'SCALE 1:10',
			coordinates: 'X: 954.22 // Y: 808.91',
			specs:
				'Detailed joinery design consults, raw substrate calculation, seamless direct CNC integration.'
		}
	];

	let activeIndex = 0;
</script>

<section class="relative overflow-hidden bg-background px-6 py-24">
	<!-- Architectural grid layout -->
	<div
		class="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary-rgb),0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary-rgb),0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]"
	></div>

	<div class="relative z-10 mx-auto max-w-6xl">
		<!-- Technical Header -->
		<div
			class="mb-16 flex flex-col justify-between gap-6 border-b border-primary/10 pb-8 md:flex-row md:items-end"
		>
			<div class="max-w-2xl space-y-4">
				<div class="flex items-center gap-2">
					<Badge
						variant="outline"
						class="border-primary/30 bg-primary/5 px-3 py-0.5 font-mono text-[10px] tracking-widest text-primary uppercase"
					>
						[ SECTOR MATRIX 02 ]
					</Badge>
				</div>
				<h2 class="text-4xl font-extralight tracking-tight text-foreground uppercase sm:text-5xl">
					Ecosystems We <span class="font-bold text-primary">Shape</span>
				</h2>
				<p class="text-base font-light text-muted-foreground">
					We adapt our structural layout methodologies and custom millwork workflows to targets
					requiring uncompromising, tailor-made spatial quality.
				</p>
			</div>

			<div class="hidden text-right font-mono text-xs text-muted-foreground md:block">
				<span>ADDIS ABABA // EST. 2018</span><br />
				<span>LAT: 9.0300° N // LON: 38.7400° E</span>
			</div>
		</div>

		<!-- Interactive Split Board -->
		<div class="grid items-start gap-8 lg:grid-cols-12">
			<!-- Left: Dynamic Viewport Panel (Interactive CAD Box) -->
			<div
				class="relative sticky top-8 overflow-hidden rounded-2xl border border-primary/15 bg-card/20 p-8 backdrop-blur-md lg:col-span-5"
			>
				<!-- Outer Plotter Corner Crosshairs -->
				<div class="absolute top-2 left-2 font-mono text-[8px] text-primary">+ 0,0</div>
				<div class="absolute right-2 bottom-2 font-mono text-[8px] text-primary">+ 1000,1000</div>

				<!-- Dynamic Content Container -->
				<div class="flex min-h-[340px] flex-col justify-between space-y-8">
					<div>
						<!-- Rotating Compass HUD element -->
						<div class="mb-8 flex items-center justify-between">
							<div class="flex items-center gap-2">
								<span class="size-2 animate-ping rounded-full bg-primary"></span>
								<span class="font-mono text-xs tracking-wider text-primary uppercase"
									>Live Viewport</span
								>
							</div>
							<CompassIcon
								class="size-5 animate-spin text-primary"
								style="animation-duration: 20s"
							/>
						</div>

						<!-- Active Technical Specs -->
						<div class="space-y-3">
							<span class="font-mono text-xs text-primary"
								>{sectors[activeIndex].scale} // {sectors[activeIndex].coordinates}</span
							>
							<h3 class="text-3xl font-extralight tracking-tight text-foreground">
								{sectors[activeIndex].name}
							</h3>
							<div
								class="my-4 h-[1px] w-full bg-gradient-to-r from-primary/30 to-transparent"
							></div>
							<p class="text-sm leading-relaxed font-light text-muted-foreground">
								{sectors[activeIndex].specs}
							</p>
						</div>
					</div>

					<!-- Bottom Specs Footer -->
					<div
						class="flex justify-between border-t border-primary/5 pt-4 font-mono text-[10px] text-muted-foreground"
					>
						<span>DWG REF: SEC-{sectors[activeIndex].id}</span>
						<span>STATUS: ACTIVE_SPEC</span>
					</div>
				</div>
			</div>

			<!-- Right: Architectural Interactive List -->
			<div class="flex flex-col lg:col-span-7">
				{#each sectors as sector, index}
					<!-- svelte-ignore a11y-mouse-events-have-key-events -->
					<div
						class="group relative flex cursor-pointer items-center justify-between border-b border-primary/10 px-4 py-8 transition-all duration-300 md:px-8 {activeIndex ===
						index
							? 'bg-primary/[0.02]'
							: 'hover:bg-primary/[0.01]'}"
						on:mouseover={() => (activeIndex = index)}
					>
						<!-- Active Dimension line (Visual Slide Line) -->
						<div
							class="absolute top-0 bottom-0 left-0 w-[3px] origin-center scale-y-0 bg-primary transition-all duration-300 {activeIndex ===
							index
								? 'scale-y-100'
								: ''}"
						></div>

						<div class="flex items-center gap-6">
							<!-- Number Indicator inside architectural brackets -->
							<span
								class="font-mono text-sm transition-all duration-300 {activeIndex === index
									? 'font-bold text-primary'
									: 'text-muted-foreground'}"
							>
								[{sector.id}]
							</span>

							<div class="space-y-1">
								<h4
									class="text-lg font-medium tracking-tight text-foreground transition-all duration-300 group-hover:text-primary md:text-xl"
								>
									{sector.name}
								</h4>
								<p class="font-mono text-xs tracking-wider text-muted-foreground">
									// {sector.tag}
								</p>
							</div>
						</div>

						<!-- Technical Icon Outer Shell -->
						<div class="flex items-center gap-4">
							<div
								class="flex size-10 items-center justify-center rounded-lg border transition-all duration-300
                                {activeIndex === index
									? 'scale-110 border-primary/40 bg-primary/10 text-primary'
									: 'border-border bg-background text-muted-foreground group-hover:border-primary/20 group-hover:text-primary'}"
							>
								<svelte:component this={sector.icon} class="size-4" />
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>
