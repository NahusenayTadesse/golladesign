<script lang="ts">
	import { Badge } from "$lib/components/ui/badge";
	import { BuildingIcon, ShoppingBagIcon, MusicIcon, UtensilsIcon, HomeIcon, RocketIcon, ShirtIcon } from "@lucide/svelte";

	const industries = [
		{ icon: BuildingIcon, name: "Corporate Businesses" },
		{ icon: ShoppingBagIcon, name: "Consumer Brands" },
		{ icon: MusicIcon, name: "Entertainment & Lifestyle Brands" },
		{ icon: UtensilsIcon, name: "Restaurants & Hospitality" },
		{ icon: HomeIcon, name: "Real Estate Companies" },
		{ icon: RocketIcon, name: "Startups & SMEs" },
		{ icon: ShirtIcon, name: "Fashion & Retail Brands" },
	];
</script>

<section class="py-20 px-4 bg-muted/30">
	<div class="mx-auto max-w-6xl">
		<div class="mb-12 text-center">
			<Badge variant="outline" class="mb-4 border-primary/30 text-primary">Our Expertise</Badge>
			<h2 class="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Industries We Work With</h2>
			<p class="mt-4 text-muted-foreground max-w-2xl mx-auto">We partner with diverse sectors to deliver tailored event experiences that resonate with their unique audiences.</p>
		</div>

		<div class="flex flex-wrap justify-center gap-4">
			{#each industries as industry}
				<div class="group flex items-center gap-3 rounded-full border border-border/50 bg-card px-6 py-3 transition-all duration-300 hover:border-primary/50 hover:bg-primary/5 hover:shadow-lg-md">
					<div class="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
						<industry.icon class="size-5" />
					</div>
					<span class="font-medium text-foreground">{industry.name}</span>
				</div>
			{/each}
		</div>
	</div>
</section>
