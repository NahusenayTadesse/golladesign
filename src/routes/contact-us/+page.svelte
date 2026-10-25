<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import { z } from 'zod';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	import { MailIcon, SendIcon, PhoneIcon, CompassIcon, MapPinIcon } from '@lucide/svelte';

	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { IconBrandWhatsapp } from '@tabler/icons-svelte';
	import SocialLinks from '$lib/components/social-links.svelte';
	import { contactInfo as defaultContact } from '$lib/site';
	import { page } from '$app/state';

	const contactInfo = $derived(page.data.site?.contactInfo ?? defaultContact);

	let { data } = $props();
	const { form, errors, enhance, delayed, message } = superForm(data.form, {
		dataType: 'json'
	});

	// Direct Studio Contact Coordinates
	// One "Day: time" pair per line, from Dashboard → Settings.
	const hours = $derived(
		(contactInfo.hours ?? '')
			.split('\n')
			.filter((line: string) => line.trim())
			.map((line: string) => {
				const i = line.indexOf(':');
				return i > 0 ? [line.slice(0, i).trim(), line.slice(i + 1).trim()] : [line.trim(), ''];
			})
	);

	const contactRows = $derived([
		...contactInfo.phones.map((phone, index) => ({
			icon: PhoneIcon,
			label: index === 0 ? 'Studio Line' : 'Alternate Line',
			value: phone.display,
			href: phone.href,
			external: false
		})),
		{
			icon: IconBrandWhatsapp,
			label: 'WhatsApp',
			value: contactInfo.whatsapp.display,
			href: contactInfo.whatsapp.href,
			external: true
		},
		{
			icon: MailIcon,
			label: 'Email',
			value: contactInfo.email.display,
			href: contactInfo.email.href,
			external: false
		},
		{
			icon: MapPinIcon,
			label: 'Address',
			value: contactInfo.address.display,
			href: contactInfo.address.href,
			external: true
		}
	]);

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

<Seo
	title="Consult Our Studio | Golla Design Group Architecture"
	description="Get in touch with Golla Design Group in Addis Ababa for modern architectural blueprinting, photorealistic 3D renders, and custom built-in furniture fabrication inquiries."
/>

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
			<h1 class="text-4xl font-black tracking-tight uppercase sm:text-5xl">Get in Touch</h1>
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
									placeholder="+251 9XX XXX XXX"
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
								size="lg"
								class="h-12 w-full gap-2 rounded-xl font-bold tracking-wide uppercase transition-all"
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
						{#each contactRows as info (info.label)}
							<a
								href={info.href}
								target={info.external ? '_blank' : undefined}
								rel={info.external ? 'noopener noreferrer' : undefined}
								class="flex min-h-14 items-start gap-4 rounded-xl border border-transparent p-3 transition-all hover:border-border/40 hover:bg-secondary active:bg-secondary"
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
									<p class="text-sm font-semibold text-foreground">{info.value}</p>
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
						<SocialLinks layout="grid" />
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
						{#each hours as [day, time], i (i)}
							<div class="flex justify-between gap-4 border-border/30 pb-2 not-last:border-b">
								<span class="font-medium">{day}</span>
								<span class="text-right font-bold text-foreground">{time}</span>
							</div>
						{/each}
					</CardContent>
				</Card>
			</div>
		</div>
	</main>
</div>
