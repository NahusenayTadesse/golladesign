<script lang="ts">
	import { z } from 'zod';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	import { MailIcon, SendIcon, PhoneIcon, CompassIcon } from '@lucide/svelte';

	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import {
		IconBrandFacebook,
		IconBrandInstagram,
		IconBrandTiktok,
		IconBrandLinkedin
	} from '@tabler/icons-svelte';

	let { data } = $props();
	const { form, errors, enhance, delayed, message } = superForm(data.form, {
		dataType: 'json'
	});

	// Dynamic Studio Social Matrices
	const socialLinks = [
		{
			name: 'Facebook',
			href: 'https://www.facebook.com/golladesign',
			icon: IconBrandFacebook,
			color: 'hover:border-primary'
		},
		{
			name: 'Instagram',
			href: 'https://www.instagram.com/golladesign/',
			icon: IconBrandInstagram,
			color: 'hover:border-primary'
		},
		{
			name: 'TikTok',
			href: 'https://www.tiktok.com/@golladesign',
			icon: IconBrandTiktok,
			color: 'hover:border-primary'
		},
		{
			name: 'LinkedIn',
			href: 'https://www.linkedin.com/company/golladesign',
			icon: IconBrandLinkedin,
			color: 'hover:border-primary'
		}
	];

	// Direct Studio Contact Coordinates
	const contactInfo = [
		{
			icon: MailIcon,
			label: 'Email',
			value: 'studio@golladesign.com',
			href: 'mailto:studio@golladesign.com'
		},
		{
			icon: PhoneIcon,
			label: 'Studio Line (WhatsApp)',
			value: '+251 930 109 760',
			href: 'https://wa.me/+251930109760'
		}
	];

	$effect(() => {
		if ($message) {
			if ($message.type === 'error') {
				toast.error($message.text);
			} else {
				toast.success($message.text);
			}
		}
	});
</script>

<svelte:head>
	<!-- Primary Spatial Meta Tags -->
	<title>Consult Our Studio | Golla Design Group Architecture</title>
	<meta
		name="description"
		content="Get in touch with Golla Design Group in Addis Ababa for modern architectural blueprinting, photorealistic 3D renders, and custom built-in furniture fabrication inquiries."
	/>
	<meta
		name="keywords"
		content="Golla Design Group, Contact Architect Addis Ababa, Interior Designer Ethiopia, Custom Furniture Sourcing, Spatial Vis consultation"
	/>

	<!-- Open Graph / Social Configuration Matrices -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Consult Golla Design Group | Architecture &amp; Interiors" />
	<meta
		property="og:description"
		content="Ready to plan your space? Contact our team for luxury spatial designs, premium room finishes, and architectural master planning."
	/>
	<meta property="og:image" content="/studio-cta.webp" />
</svelte:head>

<div class="min-h-dvh w-full bg-background text-foreground">
	<!-- Primary Main Frame Container -->
	<main class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
		<!-- Hero Presentation Block -->
		<div class="mb-16 space-y-4 text-center">
			<div
				class="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase"
			>
				<CompassIcon class="size-3.5" />
				<span>Studio Intake Portfolio</span>
			</div>
			<h2 class="text-4xl font-black tracking-tight uppercase sm:text-5xl">Get in Touch</h2>
			<p class="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
				Initiate your project onboarding blueprint. For residential layout queries, interior styling
				quotes, and custom furniture production timelines.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<!-- Architecture Consultation Submission Form Box -->
			<div class="lg:col-span-2">
				<Card class="rounded-2xl border border-border/60 bg-card shadow-xs">
					<CardHeader class="space-y-1">
						<CardTitle class="text-2xl font-bold tracking-tight">Send us a Message</CardTitle>
						<CardDescription class="text-sm leading-relaxed text-muted-foreground">
							Provide details regarding your site coordinates, scale configurations, and desired
							finish layers.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form class="space-y-6" action="?/contact" method="POST" use:enhance>
							<!-- Client Identification fields -->
							<InputComp
								{form}
								{errors}
								type="text"
								name="name"
								label="Full Name"
								placeholder="Enter Your Name"
							/>

							<div class="grid gap-6 sm:grid-cols-2">
								<InputComp
									type="email"
									{form}
									{errors}
									name="email"
									label="Email Address"
									placeholder="your@email.com"
									required
								/>
								<InputComp
									type="tel"
									{form}
									{errors}
									name="phoneNumber"
									label="Phone Number"
									placeholder="+251 930 109 760"
								/>
							</div>

							<InputComp
								{form}
								{errors}
								type="text"
								name="subject"
								label="Project Classification"
								placeholder="e.g., Commercial Lounge Renovation / Modern Villa Blueprinting"
							/>

							<InputComp
								{form}
								{errors}
								type="textarea"
								name="contactMessage"
								label="Brief Project Scope Description"
								placeholder="Share layout dimensional specifications, structural targets, or custom cabinetry needs..."
							/>

							<!-- Reactive Submission Button Interaction Framework -->
							<Button
								type="submit"
								class="w-full gap-2 rounded-xl py-6 font-bold tracking-wide uppercase transition-all"
							>
								{#if $delayed}
									<LoadingBtn name="Transmitting Specification" />
								{:else}
									<SendIcon class="size-4" />
									Transmit Project Spec
								{/if}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>

			<!-- Media Feeds & Informational Data Column Panels -->
			<div class="space-y-6">
				<!-- Direct Communication Metrics -->
				<Card class="rounded-2xl border border-border/60 bg-card shadow-xs">
					<CardHeader>
						<CardTitle class="text-sm font-black tracking-wider text-foreground uppercase"
							>Contact Info</CardTitle
						>
					</CardHeader>
					<CardContent class="space-y-3">
						{#each contactInfo as info (info.label)}
							<a
								href={info.href}
								class="flex items-start gap-4 rounded-xl border border-transparent p-3 transition-all hover:border-border/40 hover:bg-secondary"
							>
								<div
									class="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-secondary text-primary"
								>
									<info.icon class="size-4" />
								</div>
								<div class="min-w-0 flex-1">
									<p
										class="text-[10px] font-bold tracking-wider text-muted-foreground/60 uppercase"
									>
										{info.label}
									</p>
									<p class="truncate text-sm font-semibold text-foreground">{info.value}</p>
								</div>
							</a>
						{/each}
					</CardContent>
				</Card>

				<!-- Studio Timeline Networks Display Block -->
				<Card class="rounded-2xl border border-border/60 bg-card shadow-xs">
					<CardHeader>
						<CardTitle class="text-sm font-black tracking-wider text-foreground uppercase"
							>Follow Our Timeline</CardTitle
						>
					</CardHeader>
					<CardContent>
						<div class="grid grid-cols-2 gap-3">
							{#each socialLinks as social (social.name)}
								<a
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									class={[
										'flex flex-col items-center gap-2 rounded-xl border border-border/60 bg-background/50 p-4 transition-all hover:bg-secondary hover:text-primary',
										social.color
									]}
									title={social.name}
								>
									<social.icon
										class="size-5 text-muted-foreground transition-colors group-hover:text-primary"
									/>
									<span class="text-xs font-semibold">{social.name}</span>
								</a>
							{/each}
						</div>
					</CardContent>
				</Card>

				<!-- Operational Availability Time Blocks -->
				<Card class="rounded-2xl border border-border/60 bg-secondary/30 shadow-none">
					<CardHeader>
						<CardTitle class="text-sm font-black tracking-wider text-foreground uppercase"
							>Studio Consultation Hours</CardTitle
						>
					</CardHeader>
					<CardContent class="space-y-2 text-sm leading-relaxed text-muted-foreground">
						<div class="flex justify-between border-b border-border/30 pb-2">
							<span class="font-medium">Monday - Friday</span>
							<span class="font-bold text-foreground">8:30 AM - 5:30 PM</span>
						</div>
						<div class="flex justify-between pt-1">
							<span class="font-medium">Saturday Desk</span>
							<span class="font-bold text-foreground">8:30 AM - 12:00 PM</span>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	</main>
</div>
