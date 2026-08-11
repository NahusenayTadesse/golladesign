<script lang="ts">
	import { MailIcon, PhoneIcon, MapPinIcon } from '@lucide/svelte';
	import { IconBrandWhatsapp } from '@tabler/icons-svelte';
	import SocialLinks from './social-links.svelte';
	import { contactInfo, siteLogos } from '$lib/site';

	const menuItems = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about-us' },
		{ label: 'Design Services', href: '/services' },
		{ label: 'Project Portfolio', href: '/portfolio' },
		{ label: 'Design Journal', href: '/blogs' },
		{ label: 'Contact Us', href: '/contact-us' }
	];
</script>

<footer class="border-t border-border/40 bg-card text-card-foreground">
	<div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
		<!-- Main Footer Content Grid -->
		<div class="grid grid-cols-1 items-start gap-10 pb-12 md:grid-cols-3">
			<!-- Studio Identity Column -->
			<div class="space-y-4">
				<a href="/" class="inline-flex items-center transition-opacity hover:opacity-90">
					<img
						src={siteLogos.mark}
						alt="Golla Design Group"
						class="h-10 w-auto object-contain brightness-50 saturate-150 dark:brightness-100 dark:saturate-100"
					/>
				</a>
				<p class="max-w-xs text-sm leading-relaxed text-muted-foreground">
					Crafting luxury architectural layouts, sophisticated interior spaces, and custom furniture
					installations.
				</p>

				<div class="flex flex-col gap-1 pt-2 text-sm">
					<a
						href={contactInfo.address.href}
						target="_blank"
						rel="noopener noreferrer"
						class="flex min-h-11 items-center gap-2 text-muted-foreground transition-colors hover:text-foreground active:text-foreground"
					>
						<MapPinIcon class="size-4 shrink-0 text-primary" />
						<span>{contactInfo.address.display}, {contactInfo.address.city}</span>
					</a>
					{#each contactInfo.phones as phone (phone.href)}
						<a
							href={phone.href}
							class="flex min-h-11 items-center gap-2 text-muted-foreground transition-colors hover:text-foreground active:text-foreground"
						>
							<PhoneIcon class="size-4 shrink-0 text-primary" />
							<span>{phone.display}</span>
						</a>
					{/each}
					<a
						href={contactInfo.whatsapp.href}
						target="_blank"
						rel="noopener noreferrer"
						class="flex min-h-11 items-center gap-2 text-muted-foreground transition-colors hover:text-foreground active:text-foreground"
					>
						<IconBrandWhatsapp class="size-4 shrink-0 text-primary" />
						<span>{contactInfo.whatsapp.display}</span>
					</a>
					<a
						href={contactInfo.email.href}
						class="flex min-h-11 items-center gap-2 text-muted-foreground transition-colors hover:text-foreground active:text-foreground"
					>
						<MailIcon class="size-4 shrink-0 text-primary" />
						<span>{contactInfo.email.display}</span>
					</a>
				</div>
			</div>

			<!-- Quick Links Column -->
			<div class="md:justify-self-center">
				<h4 class="mb-4 text-sm font-bold tracking-tight text-foreground uppercase">
					Studio Exploration
				</h4>
				<ul class="flex flex-col gap-x-8 gap-y-2.5 text-sm">
					{#each menuItems as item (item.href)}
						<li>
							<a
								href={item.href}
								class="text-muted-foreground transition-colors hover:text-foreground"
							>
								{item.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Interactive Studio Map Frame -->
			<div class="space-y-4">
				<h4
					class="flex items-center gap-2 text-sm font-bold tracking-tight text-foreground uppercase"
				>
					<MapPinIcon class="size-4 text-primary" /> Studio Location
				</h4>
				<div class="relative h-36 w-full overflow-hidden rounded-2xl border border-border/50">
					<iframe
						src={contactInfo.mapEmbed}
						style="border:0;"
						class="absolute inset-0 h-full w-full contrast-[1.1] grayscale dark:invert"
						loading="lazy"
						referrerpolicy="no-referrer-when-downgrade"
						title="Golla Design Location Map"
					></iframe>
				</div>
			</div>
		</div>

		<!-- Social Media Grid Connection & Divider -->
		<div
			class="flex flex-col items-center justify-between gap-6 border-t border-border/40 pt-8 md:flex-row"
		>
			<p class="text-sm text-muted-foreground">Follow our design process across social platforms</p>
			<SocialLinks />
		</div>

		<!-- Copyright & Technical Performance Signatures -->
		<div
			class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 text-xs text-muted-foreground sm:flex-row"
		>
			<p>&copy; {new Date().getFullYear()} Golla Design Group. All rights reserved.</p>
			<p class="tracking-wide">
				Built by <a
					href="https://nahusenaytadesse.vercel.app"
					target="_blank"
					rel="noopener noreferrer"
					class="font-medium underline underline-offset-4 transition-colors hover:text-primary"
					>NT</a
				>
			</p>
		</div>
	</div>
</footer>
