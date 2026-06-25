<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import type { Snippet, Component } from 'svelte';

	interface Props {
		icon: Component;
		label: string;
		children: Snippet;
	}

	const { icon: Icon, label, children }: Props = $props();
</script>

<Card
	class="group hover:shadow-lg-lg hover:shadow-lg-primary/10 border-border/50 bg-card/80 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1"
>
	<div class="flex items-start gap-4">
		<div
			class="rounded-xl bg-primary/10 p-3 transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
		>
			<Icon class="size-6" />
		</div>
		<div class="min-w-0 flex-1">
			<p class="mb-1 text-sm font-medium text-muted-foreground">{label}</p>
			<div class="text-lg font-semibold text-foreground">
				{@render children()}
			</div>
		</div>
	</div>
</Card>
