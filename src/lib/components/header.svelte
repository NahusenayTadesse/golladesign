<script lang="ts">
	import { ArrowRight, MenuIcon, XIcon } from '@lucide/svelte';
	import DarkMode from './DarkMode.svelte';
	import { page } from '$app/state';
	import { siteLogos } from '$lib/site';

	import { Sheet, SheetContent, SheetTrigger } from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';

	let isOpen = $state(false);

	const handleMenuClick = () => {
		isOpen = false;
	};

	let { serviceNames }: { serviceNames: { id: number; name: string }[] } = $props();

	// Updated portfolio-oriented site navigation
	const menuItems = [
		{ label: 'Home', href: '/' },
		{ label: 'About', href: '/about-us' },
		{ label: 'Services', href: '/services' },
		{ label: 'Portfolio', href: '/portfolio' },
		{ label: 'Blogs', href: '/blogs' },
		{ label: 'Contact', href: '/contact-us' }
	];
</script>

<header
	class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 px-2 py-3 backdrop-blur-md lg:px-16"
>
	<div class="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6">
		<!-- Architectural Studio Branding Logo Frame -->
		<div class="flex shrink-0 items-center gap-3">
			<a
				href="/"
				aria-label="Golla Design Group — home"
				class="flex items-center gap-2.5 transition-opacity hover:opacity-90 active:opacity-75"
			>
				<img
					src={siteLogos.mark}
					class="block h-9 w-auto object-contain brightness-[0.4] contrast-125 dark:brightness-100 dark:contrast-100"
					alt="Golla Design Group"
				/>
				<span
					class="hidden text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase sm:block"
				>
					Design
				</span>
			</a>
		</div>

		<!-- Minimalist Desktop Navigation Menu -->
		<nav class="hidden items-center gap-1 lg:flex">
			{#each menuItems as item (item.href)}
				<Button
					variant={page.url.pathname === item.href ? 'secondary' : 'ghost'}
					href={item.href}
					onclick={handleMenuClick}
					class="relative h-10 px-3 text-sm font-medium tracking-wide transition-colors duration-200"
				>
					{item.label}
					{#if page.url.pathname === item.href}
						<span
							class="absolute right-2 bottom-0 left-2 h-[2px] rounded-full bg-primary"
							aria-hidden="true"
						></span>
					{/if}
				</Button>
			{/each}
		</nav>

		<!-- Action Block Configuration -->
		<div class="flex flex-row items-center gap-4">
			<div class="hidden flex-row items-center justify-end gap-3 lg:flex">
				<DarkMode />
				<Button href="/contact-us" size="lg" class="group gap-2">
					Consult Studio
					<ArrowRight class="size-4 transition-transform duration-300 group-hover:translate-x-1" />
				</Button>
			</div>

			<!-- Elegant Responsive Mobile Interface -->
			<div class="flex items-center gap-2 lg:hidden">
				<DarkMode />
				<Sheet bind:open={isOpen}>
					<SheetTrigger>
						{#snippet child({ props: triggerProps })}
							<Button
								variant="outline"
								size="icon-lg"
								aria-label={isOpen ? 'Close menu' : 'Open menu'}
								class="border-border/60 bg-background/50"
								{...triggerProps}
							>
								{#if isOpen}
									<XIcon class="size-5 text-foreground" />
								{:else}
									<MenuIcon class="size-5 text-foreground" />
								{/if}
							</Button>
						{/snippet}
					</SheetTrigger>
					<SheetContent
						side="right"
						class="flex w-72 flex-col border-l border-border/60 bg-background p-0"
					>
						<!-- Secondary Studio Branding header inside the mobile tray -->
						<div class="flex items-center gap-2.5 border-b border-border/40 p-6">
							<img
								src={siteLogos.mark}
								alt="Golla Design Group"
								class="h-7 w-auto object-contain brightness-[0.4] contrast-125 dark:brightness-100 dark:contrast-100"
							/>
							<span class="text-[10px] font-black tracking-[0.3em] text-muted-foreground uppercase">
								Design
							</span>
						</div>

						<nav class="flex flex-1 flex-col gap-1 p-4">
							{#each menuItems as item (item.href)}
								<Button
									variant={page.url.pathname === item.href ? 'secondary' : 'ghost'}
									href={item.href}
									class="h-12 w-full justify-start gap-3 rounded-xl px-4 text-base font-medium transition-all"
									onclick={handleMenuClick}
								>
									{item.label}
								</Button>
							{/each}
						</nav>

						<div class="border-t border-border/40 bg-muted/20 p-4">
							<Button
								href="/contact-us"
								size="lg"
								class="w-full justify-center gap-2"
								onclick={handleMenuClick}
							>
								Consult Studio
								<ArrowRight class="size-4" />
							</Button>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	</div>
</header>
