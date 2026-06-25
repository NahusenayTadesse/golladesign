<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import {
		HomeIcon,
		RefreshCwIcon,
		AlertCircleIcon,
		ArrowLeftIcon,
		MailIcon,
		CircleAlert,
		House
	} from '@lucide/svelte';

	// SvelteKit error data
	const status = $derived(page.status);
	const message = $derived(page.error?.message || 'An unexpected error occurred');

	const handleRefresh = () => {
		window.location.reload();
	};
</script>

<svelte:head>
	<title>{status} | Yebehir Ventures</title>
</svelte:head>

<div class="relative min-h-dvh w-full overflow-hidden bg-background transition-colors duration-300">
	<div class="absolute inset-0 -z-10">
		<div
			class="absolute top-[-10%] left-[-10%] h-[40%] w-[40%] rounded-full bg-primary/5 blur-[120px]"
		></div>
		<div
			class="absolute right-[-10%] bottom-[-10%] h-[40%] w-[40%] rounded-full bg-primary/10 blur-[120px]"
		></div>
	</div>

	<main
		class="flex min-h-dvh flex-col items-center justify-center px-6 py-24 text-center sm:py-32 lg:px-8"
	>
		<div class="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-muted">
			<CircleAlert class="h-12 w-12 text-destructive" />
			<span
				class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/20 opacity-75"
			></span>
		</div>

		<p class="text-6xl font-black tracking-tighter text-destructive sm:text-8xl">
			{status}
		</p>

		<h1 class="mt-4 text-3xl font-bold tracking-tight text-destructive sm:text-5xl">
			{#if status === 404}
				Event Not Found
			{:else if status === 500}
				System Disruption
			{:else}
				Something went wrong
			{/if}
		</h1>

		<p class="mt-6 max-w-md text-lg leading-7 text-muted-foreground">
			{message}. We apologize for the interruption. Let's get you back to planning your next
			cinematic experience.
		</p>

		<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
			<Button href="/" size="lg" class="w-full gap-2 font-bold tracking-widest uppercase sm:w-auto">
				<House class="size-4" />
				Back to Home
			</Button>

			<Button variant="outline" size="lg" onclick={handleRefresh} class="w-full gap-2 sm:w-auto">
				<RefreshCwIcon class="size-4" />
				Try Again
			</Button>
		</div>

		<div class="mt-16 flex flex-col items-center gap-6 border-t border-border pt-8">
			<p class="text-sm text-muted-foreground italic">Need immediate assistance with an event?</p>
			<div class="flex flex-wrap justify-center gap-8">
				<a
					href="mailto:contact@yebehir.com"
					class="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
				>
					<MailIcon class="size-4" />
					contact@yebehir.com
				</a>
				<a
					href="/contact"
					class="flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
				>
					<ArrowLeftIcon class="size-4" />
					Contact Support
				</a>
			</div>
		</div>
	</main>

	<footer class="absolute bottom-8 w-full text-center">
		<p class="text-xs font-bold tracking-[0.2em] text-muted-foreground/50 uppercase">
			Yebehir Ventures • Ahead of the Curve
		</p>
	</footer>
</div>
