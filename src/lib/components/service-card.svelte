<script lang="ts">
	import { Card, CardContent } from '$lib/components/ui/card';
	import type { Component } from 'svelte';

	interface Props {
		service: {
			icon: Component;
			title: string;
			description: string;
		};
		delay?: number;
	}

	let { service, delay = 0 }: Props = $props();
</script>

<Card
	class="group hover:shadow-lg-xl hover:shadow-lg-primary/10 relative overflow-hidden border-primary/10 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
>
	<!-- Gradient overlay on hover -->
	<div
		class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
	></div>

	<CardContent class="relative p-6">
		<div
			class="mb-4 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
		>
			<service.icon class="size-6" />
		</div>
		<h3 class="mb-2 text-lg font-semibold text-foreground">{service.title}</h3>
		<p class="text-sm leading-relaxed text-muted-foreground">{service.description}</p>
	</CardContent>
</Card>
