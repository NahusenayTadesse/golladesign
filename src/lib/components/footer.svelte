<script lang="ts">
	import { MailIcon, PhoneIcon, MapPinIcon, CompassIcon } from '@lucide/svelte';
	import {
		IconBrandInstagram,
		IconBrandLinkedin,
		IconBrandTiktok,
		IconBrandFacebook,
		IconBrandWhatsapp
	} from '@tabler/icons-svelte';

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
			name: 'WhatsApp',
			url: 'https://wa.me/+251930109760',
			icon: IconBrandWhatsapp
		},
		{
			name: 'LinkedIn',
			url: 'https://www.linkedin.com/company/golladesign',
			icon: IconBrandLinkedin
		}
	];

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
				<div class="flex items-center gap-2 font-black tracking-widest text-foreground">
					<CompassIcon class="size-6 text-primary" />
					<div class="flex flex-col leading-none">
						<span class="text-lg font-black tracking-wider">GOLLA</span>
						<span class="text-[9px] font-light tracking-[0.25em] text-muted-foreground uppercase"
							>Design Group</span
						>
					</div>
				</div>
				<p class="max-w-xs text-sm leading-relaxed text-muted-foreground">
					Crafting luxury architectural layouts, sophisticated interior spaces, and custom furniture
					installations.
				</p>

				<div class="flex flex-col gap-2.5 pt-2 text-sm">
					<a
						href="https://maps.app.goo.gl/hFmfjGKUrHE59tNM9"
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
					>
						<MapPinIcon class="size-4 shrink-0 text-primary" />
						<span>4 Kilo Plaza, Addis Ababa, Ethiopia</span>
					</a>
					<a
						href="tel:+251930109760"
						class="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
					>
						<PhoneIcon class="size-4 shrink-0 text-primary" />
						<span>+251 93 010 9760</span>
					</a>
					<a
						href="mailto:studio@golladesign.com"
						class="flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
					>
						<MailIcon class="size-4 shrink-0 text-primary" />
						<span>studio@golladesign.com</span>
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
						src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.334431053691!2d38.761148010080085!3d9.033225888886403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b850037ac00ff%3A0x2718a1624b2fc1df!2zNCBLaWxvIFBsYXphIHwgNCDhiqrhiI4g4Y2V4YiL4Yub!5e0!3m2!1sen!2set!4v1779783487929!5m2!1sen!2set"
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
			<div class="flex flex-wrap gap-2.5">
				{#each socialLinks as social (social.name)}
					<a
						href={social.url}
						target="_blank"
						rel="noopener noreferrer"
						class="flex size-10 items-center justify-center rounded-xl border border-border/60 bg-background text-muted-foreground transition-all hover:border-primary hover:bg-secondary hover:text-primary hover:shadow-xs"
						title={social.name}
					>
						<social.icon class="size-5" />
					</a>
				{/each}
			</div>
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
