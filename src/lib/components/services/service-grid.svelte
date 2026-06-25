<script lang="ts">
	import ServiceCard from './services-card.svelte';
	type Service = {
		id: number;
		name: string;
		featuredImage: string | null;
		description: string | null;
	};

	const { services, title = 'Our Services', subtitle }: Props = $props();

	type Props = {
		services: Service[];
		title?: string;
		subtitle?: string;
	};
</script>

<section class="w-full py-12">
	<div class="mx-auto max-w-6xl px-4">
		<!-- Section Header -->
		<div class="mb-10 text-center">
			<h2 class="text-3xl font-bold tracking-tight">{title}</h2>
			{#if subtitle}
				<p class="mt-2 text-muted-foreground">{subtitle}</p>
			{/if}
		</div>

		<!-- Services Grid -->
		{#if services.length > 0}
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each services as service (service.id)}
					<ServiceCard {service} />
				{/each}
			</div>
		{:else}
			<div
				class="flex flex-col items-center justify-center rounded-lg border border-dashed py-12 text-center"
			>
				<p class="text-muted-foreground">No services available at the moment.</p>
			</div>
		{/if}
	</div>
</section>
