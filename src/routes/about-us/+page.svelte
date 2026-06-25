<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		ArrowRightIcon,
		CompassIcon,
		LayersIcon,
		ArmchairIcon,
		BadgeCheckIcon,
		UsersIcon,
		PhoneIcon,
		PaintbrushIcon,
		SparklesIcon
	} from '@lucide/svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import HeroSection from '$lib/components/hero-section.svelte';
	import FeaturesSection from '$lib/components/features-section.svelte';
	import IndustriesSection from '$lib/components/industries-section.svelte';
	import VisionMission from '$lib/components/vision-mission.svelte';
	import {
		IconBrandFacebook,
		IconBrandLinkedin,
		IconBrandInstagram,
		IconBrandTiktok
	} from '@tabler/icons-svelte';
	import FAQ from '$lib/components/faq.svelte';
	import Slider from '$lib/components/slider.svelte';
	import Testimonial from '$lib/components/testimonial.svelte';
	import ServiceGrid from '$lib/components/services/service-grid.svelte';
	import TeamCarousel from '$lib/components/teams/team-caro.svelte';

	let { data } = $props();

	const socialLinks = [
		{
			name: 'Facebook',
			url: 'https://www.facebook.com/golladesign',
			icon: IconBrandFacebook
		},
		{
			name: 'Instagram',
			url: 'https://www.instagram.com/golladesign',
			icon: IconBrandInstagram
		},
		{
			name: 'TikTok',
			url: 'https://www.tiktok.com/@golladesign',
			icon: IconBrandTiktok
		},
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/company/golladesign',
			icon: IconBrandLinkedin
		}
	];

	// Streamlined Architecture Studio Pillars
	const units = [
		{
			name: 'Architectural Blueprinting',
			description:
				'Comprehensive structural planning and modern layout conceptualization optimized for residential and corporate developments.',
			icon: CompassIcon,
			short: 'ARCHITECTURE'
		},
		{
			name: 'Interior Architecture & Finishing',
			description:
				'Sophisticated structural spatial modification and premium surface finishing adjustments that bridge standard construction with luxury design.',
			icon: LayersIcon,
			short: 'INTERIORS'
		},
		{
			name: 'Bespoke Furniture Fabrication',
			description:
				'Custom high-end industrial furniture making and tailored styling components crafted to match your room boundaries perfectly.',
			icon: ArmchairIcon,
			short: 'CRAFTSMANSHIP'
		},
		{
			name: 'Visual Consultation & Lighting',
			description:
				'Advanced spatial layout analysis and technical lighting engineering to make spaces look remarkably complete, practical, and cozy.',
			icon: PaintbrushIcon,
			short: 'CONSULTING'
		}
	];
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>About Our Studio | Golla Design Group Architecture &amp; Interiors</title>
	<meta
		name="title"
		content="Golla Design Group | Premium Architecture &amp; Interior Design Addis Ababa"
	/>
	<meta
		name="description"
		content="Discover Golla Design Group. We specialize in high-end structural interior finishes, custom luxury furniture making, and modern spatial architecture in Ethiopia."
	/>
	<meta
		name="keywords"
		content="Golla Design, Architecture Ethiopia, Interior Design Addis Ababa, Furniture Design East Africa, Luxury Construction Finishes, Space Planning Studio"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://golladesign.com/about" />
	<meta property="og:title" content="Golla Design Group | About Our Studio" />
	<meta
		property="og:description"
		content="We handle every design layer from architectural drafts to custom fabrication. Crafting environments that balance utility and beauty."
	/>
	<meta property="og:image" content="/logo.jpg" />

	<!-- Canonical URL -->
	<link rel="canonical" href="https://golladesign.com/about" />
	<meta name="theme-color" content="#ffffff" />
</svelte:head>

<!-- Premium Hero Banner Section -->
<section
	class="relative overflow-hidden border-b border-border/40 bg-cover bg-center px-4 py-24 text-white sm:py-36"
	style="background-image: url('/about-hero.webp')"
>
	<!-- Adaptive dynamic mask layer matching theme background strategies -->
	<div class="absolute inset-0 bg-background/90 backdrop-blur-xs dark:bg-background/95"></div>

	<div class="relative z-10 mx-auto max-w-4xl space-y-6 text-center">
		<div
			class="inline-block rounded-full border border-border/50 bg-secondary px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase"
		>
			Beautiful &amp; Useful
		</div>

		<h1
			class="text-center text-4xl font-black tracking-tight text-foreground uppercase sm:text-5xl lg:text-6xl"
		>
			Transforming Blueprints Into Living Art
		</h1>

		<p class="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
			Golla Design Group is a premium architecture and interior visualization studio based in Addis
			Ababa, Ethiopia. We specialize in complex architectural blueprints, structural space
			conversions, and high-end artisanal furniture installation. We help clients manifest cohesive,
			minimalist environments that balance ultimate utility with a cozy atmosphere.
		</p>

		<div class="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
			<Button size="lg" href="/contact" class="group w-full gap-2 sm:w-auto">
				Consult Studio
				<ArrowRightIcon class="size-4 transition-transform group-hover:translate-x-1" />
			</Button>
			<Button
				href="/services"
				size="lg"
				variant="outline"
				class="w-full border-border/60 bg-background/50 text-foreground sm:w-auto"
			>
				Explore Services
			</Button>
		</div>

		<div
			class="flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 md:flex-row"
		>
			<p class="text-xs font-medium tracking-wide text-muted-foreground uppercase">
				Follow our design timeline
			</p>
			<div class="flex gap-2">
				{#each socialLinks as social (social.name)}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						title={social.name}
						class="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-background/40 text-muted-foreground transition-all hover:border-primary hover:bg-secondary hover:text-primary"
					>
						<social.icon class="size-5" />
					</a>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- Narrative Corporate Overview Block -->
<section class="bg-background px-4 py-24 text-foreground sm:py-32">
	<div class="mx-auto max-w-6xl">
		<div class="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
			<div class="relative">
				<div class="aspect-square overflow-hidden rounded-2xl border border-border/60 bg-muted/20">
					<img
						src="/studio-growth.webp"
						alt="Golla Studio Production Design"
						class="h-full w-full object-cover"
					/>
				</div>
				<div
					class="absolute -right-2 -bottom-6 max-w-xs rounded-xl border border-border bg-card p-5 text-card-foreground shadow-xl lg:-right-6"
				>
					<p class="text-xs font-black tracking-wider text-primary uppercase">
						Redefining local structural standards across East Africa.
					</p>
				</div>
			</div>

			<div class="space-y-6">
				<div class="space-y-3">
					<span class="text-xs font-bold tracking-widest text-primary uppercase"
						>Studio Overview</span
					>
					<h2 class="text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
						Who We Are
					</h2>
					<p class="text-base leading-relaxed text-muted-foreground">
						Golla Design Group operates under the philosophy that our surroundings fundamentally
						impact our lifestyles. We integrate spatial geometry, technical material procurement,
						and precise industrial manufacturing workflows into a single cohesive process.
					</p>
					<p class="text-base leading-relaxed text-muted-foreground">
						By maintaining full control over every layer—from early architectural mockups to fine
						component joinery—we eliminate structural inconsistencies and build properties that look
						uniformly custom and exceptionally refined.
					</p>
				</div>

				<Card class="rounded-2xl border-border/60 bg-secondary/30 shadow-none">
					<CardHeader class="pb-2">
						<CardTitle
							class="flex items-center gap-2 text-sm font-black tracking-wider text-foreground uppercase"
						>
							<BadgeCheckIcon class="size-4 text-primary" />
							The Golla Core Advantage
						</CardTitle>
					</CardHeader>
					<CardContent>
						<p class="text-sm leading-relaxed text-muted-foreground italic">
							"We do not merely create interior drafts; we handle spatial execution, control
							furniture manufacturing variables, and synchronize layouts to support practical
							habits."
						</p>
					</CardContent>
				</Card>
			</div>
		</div>
	</div>
</section>

<!-- Intermediate Dynamic Components Structure Section -->
<div class="bg-background">
	<HeroSection />
	<FeaturesSection />
	<IndustriesSection />
	<VisionMission />
</div>

{#if data?.teamMembers?.length}
	<div class="border-t border-border/40 bg-background py-16">
		<TeamCarousel
			members={data.teamMembers}
			title="Studio Architects"
			subtitle="The structural engineers, industrial crafts experts, and visual artists coordinating your spatial blueprints."
		/>
	</div>
	<br />
{/if}

<!-- Core Strategic Design Pillars Grid -->
<section class="border-y border-border/40 bg-card px-4 py-24 text-card-foreground sm:py-32">
	<div class="mx-auto max-w-5xl">
		<div class="mb-16 space-y-2 text-center">
			<h2 class="text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
				Our Core Pillars
			</h2>
			<div class="mx-auto h-1 w-10 rounded-full bg-primary"></div>
			<p class="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base">
				Harmonizing three fundamental sectors of high-end property development
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-3">
			<Card
				class="rounded-2xl border-border/60 bg-background/50 transition-all duration-300 hover:border-primary/40 hover:bg-background"
			>
				<CardHeader>
					<div
						class="mb-3 inline-flex w-fit rounded-xl border border-border/40 bg-secondary p-3 text-primary"
					>
						<CompassIcon class="size-5" />
					</div>
					<CardTitle class="text-lg font-bold tracking-tight">Spatial Architecture</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-sm leading-relaxed text-muted-foreground">
						Meticulous room arrangements, custom ceiling elevations, and blueprint configurations
						calibrated for functional operations.
					</p>
				</CardContent>
			</Card>

			<Card
				class="rounded-2xl border-border/60 bg-background/50 transition-all duration-300 hover:border-primary/40 hover:bg-background"
			>
				<CardHeader>
					<div
						class="mb-3 inline-flex w-fit rounded-xl border border-border/40 bg-secondary p-3 text-primary"
					>
						<LayersIcon class="size-5" />
					</div>
					<CardTitle class="text-lg font-bold tracking-tight">Premium Finishing</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-sm leading-relaxed text-muted-foreground">
						Overseeing advanced micro-cementing, high-grade acoustic modeling, and luxurious custom
						cladding wall adjustments.
					</p>
				</CardContent>
			</Card>

			<Card
				class="rounded-2xl border-border/60 bg-background/50 transition-all duration-300 hover:border-primary/40 hover:bg-background"
			>
				<CardHeader>
					<div
						class="mb-3 inline-flex w-fit rounded-xl border border-border/40 bg-secondary p-3 text-primary"
					>
						<ArmchairIcon class="size-5" />
					</div>
					<CardTitle class="text-lg font-bold tracking-tight">Luxury Fabrication</CardTitle>
				</CardHeader>
				<CardContent>
					<p class="text-sm leading-relaxed text-muted-foreground">
						Direct structural assembly of individual cabinetry units, customized kitchen setups, and
						built-in wardrobes.
					</p>
				</CardContent>
			</Card>
		</div>
	</div>
</section>

<!-- Target Environments Integration Matrix -->
<section
	class="relative border-b border-border/40 bg-cover bg-center px-4 py-24 sm:py-32"
	style="background-image: url('/studio-ecosystem.webp')"
>
	<div class="absolute inset-0 bg-background/90 dark:bg-background/95"></div>
	<div class="relative z-10 mx-auto max-w-5xl">
		<div class="mb-16 space-y-2 text-center">
			<h2 class="text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
				Project Ecosystem
			</h2>
			<div class="mx-auto h-1 w-10 rounded-full bg-primary"></div>
			<p class="mx-auto max-w-xl text-sm text-muted-foreground sm:text-base">
				Comprehensive structural options tailored for distinct space requirements
			</p>
		</div>

		<div class="grid gap-6 md:grid-cols-2">
			<Card class="rounded-2xl border-border/60 bg-card/60 backdrop-blur-md">
				<CardHeader>
					<div
						class="mb-3 inline-flex w-fit rounded-xl border border-border/40 bg-secondary p-3 text-primary"
					>
						<UsersIcon class="size-5" />
					</div>
					<CardTitle class="text-lg font-bold tracking-tight">Client Sectors</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<p class="text-sm text-muted-foreground">We design spaces for:</p>
					<ul class="flex flex-col gap-2.5 text-sm font-medium text-foreground">
						<li class="flex items-center gap-2">
							<span class="size-1.5 rounded-full bg-primary"></span>
							Commercial Hubs (Corporate Headquarters, Retail Showrooms)
						</li>
						<li class="flex items-center gap-2">
							<span class="size-1.5 rounded-full bg-primary"></span>
							Hospitality Frameworks (Boutique Hotels, Luxury Salons &amp; Lounges)
						</li>
						<li class="flex items-center gap-2">
							<span class="size-1.5 rounded-full bg-primary"></span>
							Residential Projects (Private Modern Villas, Apartments)
						</li>
						<li class="flex items-center gap-2">
							<span class="size-1.5 rounded-full bg-primary"></span>
							Real Estate Developers seeking advanced 3D renders
						</li>
					</ul>
				</CardContent>
			</Card>

			<Card class="rounded-2xl border-border/60 bg-card/60 backdrop-blur-md">
				<CardHeader>
					<div
						class="mb-3 inline-flex w-fit rounded-xl border border-border/40 bg-secondary p-3 text-primary"
					>
						<SparklesIcon class="size-5" />
					</div>
					<CardTitle class="text-lg font-bold tracking-tight">Design Inclusions</CardTitle>
				</CardHeader>
				<CardContent class="space-y-4">
					<p class="text-sm text-muted-foreground">Integrated provisions containing:</p>
					<ul class="flex flex-col gap-2.5 text-sm font-medium text-foreground">
						<li class="flex items-center gap-2">
							<span class="size-1.5 rounded-full bg-primary"></span>
							Photorealistic Ray-Traced 3D Render Models
						</li>
						<li class="flex items-center gap-2">
							<span class="size-1.5 rounded-full bg-primary"></span>
							Material Specification &amp; Sourcing Frameworks
						</li>
						<li class="flex items-center gap-2">
							<span class="size-1.5 rounded-full bg-primary"></span>
							Custom Millwork &amp; Furniture Drafting Blueprints
						</li>
						<li class="flex items-center gap-2">
							<span class="size-1.5 rounded-full bg-primary"></span>
							On-Site Structural Installation Quality Control
						</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	</div>
</section>

{#if data?.servicesItems?.length}
	<div class="bg-background py-6">
		<ServiceGrid services={data.servicesItems} />
	</div>
{/if}

<!-- Operational Business Units Grid Section -->
<section class="mx-auto max-w-7xl bg-background px-4 py-24 text-foreground md:py-32">
	<div class="mb-16 space-y-2 md:mb-20">
		<h3
			class="text-4xl font-black tracking-tight text-foreground uppercase sm:text-5xl lg:text-6xl"
		>
			Studio <span class="text-muted-foreground/60">Units</span>
		</h3>
		<div class="h-1 w-12 rounded-full bg-primary"></div>
	</div>

	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		{#each units as unit (unit.short)}
			<div
				class="group relative flex flex-col gap-5 overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-8 shadow-xs transition-all duration-300 hover:border-border hover:bg-card"
			>
				<div
					class="absolute inset-x-0 top-0 h-1 bg-primary opacity-0 transition duration-300 group-hover:opacity-100"
				></div>

				<div class="flex items-center justify-between">
					<div
						class="flex size-14 items-center justify-center rounded-xl border border-border/40 bg-secondary text-primary"
					>
						<unit.icon class="size-6" />
					</div>
					<span class="text-xs font-bold tracking-widest text-muted-foreground uppercase">
						{unit.short}
					</span>
				</div>

				<div class="grow space-y-2">
					<p class="text-2xl font-bold tracking-tight text-foreground">{unit.name}</p>
					<p class="text-sm leading-relaxed text-muted-foreground">
						{unit.description}
					</p>
				</div>
			</div>
		{/each}
	</div>
</section>

{#if data?.imagesList?.length > 0}
	<Slider imagesList={data.imagesList} />
{/if}

{#if data?.testimonialList?.length > 0}
	<section
		class="flex flex-col items-center justify-center border-t border-border/40 bg-background px-4 py-16 md:py-24"
	>
		<div class="mb-12 max-w-2xl space-y-2 text-center">
			<h2 class="text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
				Client Reflections
			</h2>
			<div class="mx-auto h-1 w-10 rounded-full bg-primary"></div>
			<p class="text-sm text-muted-foreground sm:text-base">
				Hear from property owners regarding their collaborative spatial design experiences with our
				development group.
			</p>
		</div>

		<Testimonial testimonials={data.testimonialList} />
	</section>
{/if}

<FAQ />

<!-- Studio Closing Contact Section -->
<section
	class="relative bg-cover bg-center px-4 py-24 sm:py-32"
	style="background-image: url('/studio-cta.webp')"
>
	<div class="absolute inset-0 bg-background/80 backdrop-blur-xs dark:bg-background/90"></div>
	<div class="relative z-10 mx-auto max-w-4xl">
		<div
			class="space-y-8 rounded-2xl border border-border/60 bg-card/60 p-8 text-center shadow-2xl backdrop-blur-md sm:p-12"
		>
			<div class="flex flex-col items-center gap-4">
				<h2 class="text-3xl font-black tracking-tight text-foreground uppercase sm:text-4xl">
					Plan Your Space With Us
				</h2>
				<div class="h-1 w-10 rounded-full bg-primary"></div>
				<p class="mx-auto max-w-xl text-base leading-relaxed text-muted-foreground">
					Experience a fluid transition from advanced architectural visualization models to physical
					custom joinery execution.
				</p>
			</div>

			<div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
				<Button href="/contact" size="lg" class="group w-full gap-2 sm:w-auto">
					Get Your Estimate
					<ArrowRightIcon class="size-4 transition-transform group-hover:translate-x-1" />
				</Button>
				<Button
					href="tel:+251930109760"
					size="lg"
					variant="outline"
					class="w-full border-border/60 bg-background/50 text-foreground sm:w-auto"
				>
					<PhoneIcon class="size-4 text-primary" />
					Contact Studio
				</Button>
			</div>

			<div class="border-t border-border/40 pt-4">
				<p class="text-xs tracking-wide text-muted-foreground">
					Project consultation documentation and visual records coordinates managed via
					studio@golladesign.com
				</p>
			</div>
		</div>
	</div>
</section>
