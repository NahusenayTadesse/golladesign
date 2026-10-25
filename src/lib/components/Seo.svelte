<script lang="ts">
	import { page } from '$app/state';
	import { siteLogos } from '$lib/site';

	let {
		title,
		description = '',
		image = '',
		type = 'website'
	}: {
		title: string;
		description?: string | null;
		image?: string | null;
		type?: string;
	} = $props();

	// Absolute URLs built from the domain actually serving the page.
	const origin = $derived(page.url.origin);
	const canonical = $derived(origin + page.url.pathname);
	const imageUrl = $derived(
		image ? (image.startsWith('http') ? image : origin + image) : origin + siteLogos.social
	);
	const desc = $derived(
		(description ?? '')
			.replace(/<[^>]*>/g, '')
			.trim()
			.slice(0, 300)
	);
</script>

<svelte:head>
	<title>{title}</title>
	{#if desc}<meta name="description" content={desc} />{/if}
	<link rel="canonical" href={canonical} />
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonical} />
	<meta property="og:title" content={title} />
	{#if desc}<meta property="og:description" content={desc} />{/if}
	<meta property="og:image" content={imageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	{#if desc}<meta name="twitter:description" content={desc} />{/if}
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>
