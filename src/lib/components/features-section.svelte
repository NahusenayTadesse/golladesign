<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription } from '$lib/components/ui/card';
	import { StarIcon, AwardIcon, TargetIcon, MapPinIcon } from '@lucide/svelte';

	const features = [
		{
			icon: StarIcon,
			title: 'Experience-Driven Approach',
			description:
				'We focus on creating memorable experiences that strengthen brand visibility and customer connection.'
		},
		{
			icon: AwardIcon,
			title: 'Professional Execution',
			description:
				'From planning to on-ground coordination, our team ensures every project is executed professionally.'
		},
		{
			icon: TargetIcon,
			title: 'Strategic Brand Engagement',
			description:
				'We design events and activations that do more than entertain — they help brands connect with people in meaningful ways.'
		},
		{
			icon: MapPinIcon,
			title: 'Local Market Understanding',
			description:
				'We understand the Ethiopian audience, culture, and event landscape, allowing us to create relevant and engaging experiences.'
		}
	];
</script>

<section class="bg-background px-4 py-20">
	<div class="mx-auto max-w-6xl">
		<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{#each features as feature (feature.title)}
				<Card
					class="group hover:shadow-lg-lg hover:shadow-lg-primary/5 relative overflow-hidden border-border/50 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
				>
					<div
						class="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					></div>
					<CardHeader class="relative">
						<div
							class="mb-4 inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground"
						>
							<feature.icon class="size-6" />
						</div>
						<CardTitle class="text-lg font-semibold">{feature.title}</CardTitle>
						<CardDescription class="leading-relaxed text-muted-foreground">
							{feature.description}
						</CardDescription>
					</CardHeader>
				</Card>
			{/each}
		</div>
	</div>
</section>
