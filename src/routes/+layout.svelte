<script lang="ts">
	import './layout.css';
	// Body text font; preloaded so text doesn't repaint late when it swaps in.
	import interLatin from '@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url';
	import { getFlash } from 'sveltekit-flash-message';
	import { page } from '$app/state';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	import { ProgressBar } from '@prgm/sveltekit-progress-bar';

	const flash = getFlash(page, { clearAfterMs: 5000 });

	import { ModeWatcher } from 'mode-watcher';

	import { toast } from 'svelte-sonner';

	async function notifyBrowser(title: string, body: string) {
		if (!('Notification' in window)) return; // Safari iOS etc.

		if (Notification.permission === 'granted') {
			new Notification(title, { body, icon: siteLogos.raster });
		} else if (Notification.permission !== 'denied') {
			const perm = await Notification.requestPermission();

			if (perm === 'granted') new Notification(title, { body, icon: siteLogos.raster });
		}
	}

	import { siteLogos } from '$lib/site';

	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';

	// This initializes the class and puts it into Svelte's context

	let { data, children } = $props();

	// async function requestNotificationPermission() {
	// 	if (!('Notification' in window)) return;
	// 	await Notification.requestPermission();
	// }
	// let iconify = $state('h-6 w-6 animate-ping');
	$effect(() => {
		if (!$flash) return;
		if (page.data.flash?.type === 'success') toast.success($flash.message);
		if (page.data.flash?.type === 'error') toast.error($flash?.message);

		if (Notification.permission === 'granted') {
			notifyBrowser(
				page.data.flash?.type === 'success'
					? 'Success'
					: page.data.flash?.type === 'error'
						? 'Error'
						: 'Message',
				$flash.message
			);
		}

		$flash = undefined;
	});
</script>

<svelte:head>
	<link rel="preload" href={interLatin} as="font" type="font/woff2" crossorigin="anonymous" />
	<link rel="icon" href="/favicon-64.png" sizes="64x64" type="image/png" />
	<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</svelte:head>
<ModeWatcher />
<Toaster position="bottom-right" richColors closeButton />
<ProgressBar color="#F2E1D1" zIndex={1000} />

{#if !page.url.pathname.startsWith('/dashboard')}
	<a
		href="#main-content"
		class="sr-only z-[100] rounded bg-background px-4 py-2 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
		>Skip to content</a
	>
	<Header serviceNames={data.servicesItems} />
	<main id="main-content">
		{@render children()}
	</main>
	<Footer />
{:else}
	{@render children()}
{/if}
