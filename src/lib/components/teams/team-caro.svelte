<script lang="ts">
	import {
		Carousel,
		CarouselContent,
		CarouselItem,
		CarouselPrevious,
		CarouselNext
	} from '$lib/components/ui/carousel';
	import TeamCard from './team-card.svelte';
	type TeamMember = {
		name: string;
		position: string;
		avatar: string;
		description: string;
	};

	type Props = {
		members: TeamMember[];
		title?: string;
		subtitle?: string;
	};

	const {
		members,
		title = 'Meet Our Team',
		subtitle = 'The talented people behind our success'
	}: Props = $props();
</script>

<section class="w-full px-4 py-12">
	<!-- Section Header -->
	<div class="mb-10 text-center">
		<h2 class="mb-3 text-3xl font-bold tracking-tight text-foreground">
			{title}
		</h2>
		<p class="mx-auto max-w-2xl text-muted-foreground">
			{subtitle}
		</p>
	</div>

	<!-- Carousel -->
	<div class="relative mx-auto max-w-6xl">
		<Carousel
			opts={{
				align: 'start',
				loop: true
			}}
			class="w-full"
		>
			<CarouselContent class="-ml-4">
				{#each members as member, index (index)}
					<CarouselItem
						class="basis-full pl-4 sm:basis-1/2 {members.length >= 3
							? 'lg:basis-1/3'
							: members.length === 2
								? 'lg:basis-1/2'
								: 'lg:basis-full'}"
					>
						<TeamCard {member} />
					</CarouselItem>
				{/each}
			</CarouselContent>
			<CarouselPrevious
				class="-left-4 border-border bg-background/80 backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground lg:-left-12"
			/>
			<CarouselNext
				class="-right-4 border-border bg-background/80 backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground lg:-right-12"
			/>
		</Carousel>
	</div>
</section>
