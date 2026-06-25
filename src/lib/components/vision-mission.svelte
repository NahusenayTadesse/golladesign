<script lang="ts">
	import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "$lib/components/ui/card";
	import { EyeIcon, CompassIcon } from "@lucide/svelte";
</script>

<section class="py-20 px-4 bg-background">
	<div class="mx-auto max-w-4xl">
		<div class="grid gap-8 md:grid-cols-2">
			<!-- Vision Card -->
			<Card class="group relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent transition-all duration-300 hover:border-primary/40 hover:shadow-lg-xl hover:shadow-lg-primary/10">
				<div class="absolute top-0 right-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:translate-x-4 group-hover:-translate-y-4"></div>
				<CardHeader class="relative pb-2">
					<div class="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg-lg shadow-lg-primary/30">
						<EyeIcon class="size-7" />
					</div>
					<CardTitle class="text-2xl font-bold">Our Vision</CardTitle>
				</CardHeader>
				<CardContent class="relative">
					<p class="text-lg leading-relaxed text-muted-foreground">To become one of Ethiopia's leading event, activation, and experience-focused companies.</p>
				</CardContent>
			</Card>

			<!-- Mission Card -->
			<Card class="group relative overflow-hidden border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent transition-all duration-300 hover:border-primary/40 hover:shadow-lg-xl hover:shadow-lg-primary/10">
				<div class="absolute top-0 right-0 size-32 translate-x-8 -translate-y-8 rounded-full bg-primary/10 blur-2xl transition-transform duration-500 group-hover:translate-x-4 group-hover:-translate-y-4"></div>
				<CardHeader class="relative pb-2">
					<div class="mb-4 inline-flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg-lg shadow-lg-primary/30">
						<CompassIcon class="size-7" />
					</div>
					<CardTitle class="text-2xl font-bold">Our Mission</CardTitle>
				</CardHeader>
				<CardContent class="relative">
					<p class="text-lg leading-relaxed text-muted-foreground">To help brands grow through impactful events, creative activations, and strategic customer engagement experiences.</p>
				</CardContent>
			</Card>
		</div>
	</div>
</section>
