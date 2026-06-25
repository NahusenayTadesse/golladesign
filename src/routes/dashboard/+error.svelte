<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import { RefreshCwIcon, MailIcon, ArrowRightIcon, CompassIcon, LayersIcon } from '@lucide/svelte';

	// SvelteKit error state vectors
	const status = $derived(page.status);
	const message = $derived(page.error?.message || 'An unexpected structural error occurred');

	const handleRefresh = () => {
		window.location.reload();
	};
</script>

<svelte:head>
	<title>{status} | Golla Design Group Architectural Errors</title>
</svelte:head>

<div
	class="relative min-h-dvh w-full overflow-hidden bg-background text-foreground transition-colors duration-200"
>
	<!-- Technical Grid / Blueprint Mesh Accents -->
	<div
		class="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]"
	></div>
	<div class="absolute inset-0 -z-10">
		<div
			class="absolute top-[-10%] left-[-10%] h-[50%] w-[50%] rounded-full bg-primary/5 blur-[140px]"
		></div>
	</div>

	<main
		class="flex min-h-dvh flex-col items-center justify-center px-6 py-24 text-center sm:py-32 lg:px-8"
	>
		<!-- Studio Status Framing Icon -->
		<div
			class="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-border/60 bg-muted/30"
		>
			<CompassIcon class="h-10 w-10 stroke-[1.5] text-primary/80" />
			<span
				class="text-destructive-foreground absolute -right-1 -bottom-1 flex h-4 w-4 items-center justify-center rounded-md bg-destructive px-1 text-[9px] font-black shadow-md"
			>
				!
			</span>
		</div>

		<!-- Structural Code Metrics -->
		<p
			class="font-mono text-7xl font-black tracking-tighter text-foreground opacity-90 selection:bg-destructive selection:text-white sm:text-9xl"
		>
			{status}
		</p>

		<h1
			class="mt-2 max-w-xl text-2xl font-black tracking-tight text-foreground uppercase sm:text-4xl"
		>
			{#if status === 404}
				Case Blueprint Not Found
			{:else if status === 500}
				Internal Engine Disruption
			{:else}
				Layout Compilation Failure
			{/if}
		</h1>

		<p class="mt-4 max-w-md text-sm leading-relaxed font-medium text-muted-foreground">
			{message}. The requested coordinates or project blueprints could not be mapped inside our
			current archive index.
		</p>

		<!-- Control Pipeline Elements -->
		<div
			class="mt-10 flex w-full max-w-xs flex-col items-center justify-center gap-4 sm:max-w-none sm:flex-row"
		>
			<Button
				href="/"
				size="lg"
				class="h-12 w-full gap-2 rounded-xl px-6 text-xs font-black tracking-widest uppercase sm:w-auto"
			>
				<LayersIcon class="size-4" />
				Studio Index
			</Button>

			<Button
				variant="outline"
				size="lg"
				onclick={handleRefresh}
				class="h-12 w-full gap-2 rounded-xl border-border/60 bg-background/50 px-6 text-xs font-black tracking-widest uppercase sm:w-auto"
			>
				<RefreshCwIcon class="size-3.5" />
				Recompile Layout
			</Button>
		</div>

		<!-- Support / Communications Matrix Links -->
		<div
			class="mt-16 flex w-full max-w-md flex-col items-center gap-4 border-t border-border/50 pt-8"
		>
			<p class="text-xs font-black tracking-widest text-muted-foreground/60 uppercase">
				Direct Support Pipeline
			</p>
			<div class="flex flex-wrap justify-center gap-x-8 gap-y-3">
				<a
					href="mailto:studio@golladesign.com"
					class="flex items-center gap-2 text-xs font-bold tracking-wider text-muted-foreground uppercase transition-colors hover:text-primary"
				>
					<MailIcon class="size-3.5" />
					studio@golladesign.com
				</a>
				<a
					href="/contact-us"
					class="flex items-center gap-1.5 text-xs font-bold tracking-wider text-muted-foreground uppercase transition-colors hover:text-primary"
				>
					Contact Studio <ArrowRightIcon class="size-3.5" />
				</a>
			</div>
		</div>
	</main>

	<!-- Clean Studio Terminal Branding -->
	<footer class="pointer-events-none absolute bottom-6 w-full text-center">
		<p class="text-[10px] font-black tracking-[0.25em] text-muted-foreground/40 uppercase">
			Golla Design Group • Enduring Space & Narrative
		</p>
	</footer>
</div>
