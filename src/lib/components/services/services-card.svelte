<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { LayersIcon } from '@lucide/svelte';
	type Service = {
		id: number;
		name: string;
		featuredImage: string | null;
		description: string | null;
	};

	const { service }: { service: Service } = $props();
</script>

<Card
	class="group hover:shadow-lg-lg hover:shadow-lg-primary/5 transition-all duration-300 hover:-translate-y-1"
>
	<CardHeader>
		<CardTitle class="flex flex-col gap-4 text-lg">
			<a href="/services/{service?.id}" class="relative aspect-4/3 overflow-hidden">
				<img
					src="/files/{service?.featuredImage}"
					alt={service.name}
					class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
				/>
				<div
					class="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				></div>
			</a>{service.name}</CardTitle
		>

		{#if service.description}
			<CardDescription class="line-clamp-3">{service.description}</CardDescription>
		{/if}
	</CardHeader>
</Card>
