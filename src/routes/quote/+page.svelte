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

	import { MailIcon, Send, SendIcon, PhoneIcon } from '@lucide/svelte';

	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { IconBrandInstagram, IconBrandTiktok } from '@tabler/icons-svelte';
	import BrandLinkedin from '@tabler/icons-svelte/icons/brand-linkedin';
	let { data } = $props();
	const { form, errors, enhance, delayed, message } = superForm(data.form, {
		dataType: 'json'
	});

	let Tiktok = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tiktok" viewBox="0 0 16 16">
  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
</svg>`;

	// Social links
	const socialLinks = [
		{
			icon: IconBrandInstagram,
			name: 'Instagram',
			value: 'Contact us on Instagram',
			href: 'https://www.instagram.com/yebehir/'
		},
		{
			icon: IconBrandTiktok,
			name: 'TikTok',
			value: 'Follow us on TikTok',
			href: 'https://www.tiktok.com/@yebehir_'
		},
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/company/yebehir-marketing/',
			icon: BrandLinkedin,
			color: 'hover:text-black dark:hover:text-white'
		}
	];

	// Contact info
	const contactInfo = [
		{
			icon: MailIcon,
			label: 'Email',
			value: 'contact@yebehir.com',
			href: 'mailto:contact@yebehir.com'
		},
		{
			icon: PhoneIcon,
			label: 'WhatsApp',
			value: 'Contact us on WhatsApp',
			href: 'https://wa.me/+251930109760'
		}
	];

	$effect(() => {
		if ($message) {
			if ($message.type === 'error') toast.error($message.text);
			else {
				toast.success($message.text);
			}
		}
	});
</script>

<svelte:head>
	<title>Request a Quote | Yebehir Ventures - Event & Venue Planning</title>
	<meta
		name="description"
		content="Request a customized quote for event management, 4 Kilo Plaza venue booking, or brand sponsorship packages in Addis Ababa."
	/>
</svelte:head>

<div class="min-h-dvh w-full bg-background text-foreground">
	<main class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
		<div class="mb-12 text-center">
			<h2 class="mb-4 text-4xl font-black tracking-tight uppercase sm:text-5xl">Request a Quote</h2>
			<p class="mx-auto max-w-2xl text-lg text-muted-foreground">
				Ready to go ahead of the curve? Provide your event details below, and our team will prepare
				a cinematic proposal for you.
			</p>
		</div>

		<div class="grid gap-8 lg:grid-cols-3">
			<div class="lg:col-span-2">
				<Card class="border-border shadow-lg">
					<CardHeader class="border-b bg-muted/30">
						<CardTitle>Event Details</CardTitle>
						<CardDescription>
							Complete this form to receive a tailored estimate for your project.
						</CardDescription>
					</CardHeader>
					<CardContent class="pt-6">
						<form class="space-y-6" action="?/contact" method="POST" use:enhance>
							<!-- Name -->

							<InputComp
								{form}
								{errors}
								type="combo"
								name="serviceType"
								label="Service Type"
								placeholder="Select a Service Type"
								items={[
									{ value: 'event', name: 'Event' },
									{ value: 'venue', name: 'Venue' },
									{ value: 'brand', name: 'Brand' },
									{ value: 'other', name: 'Other' }
								]}
							/>
							<InputComp
								{form}
								{errors}
								type="text"
								name="name"
								label="Name"
								placeholder="Enter Your Name"
							/>

							<InputComp
								type="email"
								{form}
								{errors}
								name="email"
								label="Email Address"
								placeholder="your@email.com"
							/>
							<InputComp
								type="tel"
								{form}
								{errors}
								name="phone"
								label="Phone Number"
								placeholder="+251 901020304"
							/>

							<InputComp {form} {errors} type="date" name="eventDate" label="Event Date" />
							<InputComp {form} {errors} type="number" name="guestCount" label="Guest Count" />

							<InputComp
								{form}
								label="Budget Range"
								{errors}
								type="number"
								name="budgetRange"
								min="1000"
								max="10000000"
							/>

							<InputComp
								{form}
								{errors}
								type="text"
								name="eventLocation"
								label="Event Location"
								placeholder="Enter the location of your event"
							/>

							<InputComp
								{form}
								{errors}
								type="textarea"
								name="description"
								label="Event Description"
								placeholder="Tell us more about your event..."
							/>

							<!-- Message -->

							<!-- Submit Button -->
							<Button type="submit" class="w-full gap-2">
								{#if $delayed}
									<LoadingBtn name="Sending Inquiry" />
								{:else}
									<SendIcon class="h-4 w-4" />
									Get a Quote
								{/if}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>

			<!-- Contact Info & Social -->
			<div class="space-y-6">
				<!-- Direct Contact -->
				<Card class="border-2">
					<CardHeader>
						<CardTitle class="text-lg">Contact Info</CardTitle>
					</CardHeader>
					<CardContent class="space-y-4">
						{#each contactInfo as info (info.label)}
							<a
								href={info.href}
								class="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-accent/10"
							>
								<div class="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
									<info.icon class="h-4 w-4 text-primary" />
								</div>
								<div class="flex-1">
									<p class="text-sm font-medium text-muted-foreground">{info.label}</p>
									<p class="text-sm font-semibold">{info.value}</p>
								</div>
							</a>
						{/each}
					</CardContent>
				</Card>

				<!-- Social Media -->
				<Card class="border-2">
					<CardHeader>
						<CardTitle class="text-lg">Follow Us</CardTitle>
					</CardHeader>
					<CardContent>
						<div class="grid grid-cols-2 gap-3">
							{#each socialLinks as social (social.icon)}
								<a
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									class={[
										'flex flex-col items-center gap-2 rounded-lg border p-4 transition-all hover:border-primary hover:shadow-lg',
										social.color
									]}
									title={social.name}
								>
									{#if social.icon === Tiktok}
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											fill="currentColor"
											class="h-4 w-4 text-primary"
											viewBox="0 0 16 16"
										>
											<path
												d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"
											/>
										</svg>
									{:else}
										<social.icon class="h-4 w-4 text-primary" />
									{/if}
									<span class="text-xs font-medium">{social.name}</span>
								</a>
							{/each}
						</div>
					</CardContent>
				</Card>

				<!-- Hours -->
				<Card class="border-2 bg-linear-to-br from-primary/5 to-accent/5">
					<CardHeader>
						<CardTitle class="text-lg">Business Hours</CardTitle>
					</CardHeader>
					<CardContent class="space-y-2 text-sm">
						<div class="flex justify-between">
							<span class="text-muted-foreground">Monday - Friday</span>
							<span class="font-semibold">8:30 AM - 5:30 PM </span>
						</div>
						<div class="flex justify-between">
							<span class="text-muted-foreground">Saturday</span>
							<span class="font-semibold">8:30 AM - 4:00 PM</span>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	</main>
</div>

<!-- <section class="relative my-16 h-[50vh] w-full max-w-7xl justify-self-center lg:h-[90vh] lg:w-9/10">
	<iframe
		src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.6989163918774!2d38.74450221007991!3d8.999827389408697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8513494db273%3A0x88235dbe171c4224!2sDiplomat%20Building!5e0!3m2!1sen!2set!4v1772532021053!5m2!1sen!2set"
		style="border:0;"
		class="h-full w-full rounded-3xl"
		loading="lazy"
		referrerpolicy="no-referrer-when-downgrade"
		title="Map"
	></iframe>
</section> -->
