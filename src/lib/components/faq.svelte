<script lang="ts">
	import {
		Accordion,
		AccordionItem,
		AccordionTrigger,
		AccordionContent
	} from '$lib/components/ui/accordion';
	import {
		CompassIcon,
		LayersIcon,
		ArmchairIcon,
		PaintbrushIcon,
		FileTextIcon,
		SparklesIcon
	} from '@lucide/svelte';

	type Faq = { id: number; question: string; answer: string };
	let { faqs = [] }: { faqs?: Faq[] } = $props();

	const icons = [CompassIcon, ArmchairIcon, LayersIcon, PaintbrushIcon, FileTextIcon, SparklesIcon];
	const items = $derived(
		faqs.map((f, i) => ({
			id: String(f.id),
			title: f.question,
			description: f.answer,
			icon: icons[i % icons.length]
		}))
	);

	// Split the features array cleanly to build a balanced, dual-column desktop layout
	const half = $derived(Math.ceil(items.length / 2));
	const leftCol = $derived(items.slice(0, half));
	const rightCol = $derived(items.slice(half));
</script>

{#if items.length}
	<div class="min-h-dvh bg-background px-4 py-24 text-foreground sm:px-6 lg:px-8">
		<div class="mx-auto w-full max-w-7xl">
			<!-- Elegant Center Header -->
			<div class="mb-16 space-y-3 text-center">
				<h2 class="text-4xl font-black tracking-tight uppercase sm:text-5xl">
					Frequently Asked Questions
				</h2>
				<div class="mx-auto h-1 w-12 rounded-full bg-primary"></div>
				<p class="mx-auto max-w-xl text-base text-muted-foreground">
					Insights regarding our studio workflow, spatial visualization process, and custom
					fabrication stages.
				</p>
			</div>

			<!-- Asymmetric Dual Column Accordion System -->
			<div class="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 lg:grid-cols-2">
				<!-- Left Column Stack -->
				<Accordion type="single" class="w-full space-y-4">
					{#each leftCol as faq (faq.id)}
						<AccordionItem
							value={faq.id}
							class="overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-xs backdrop-blur-xs transition-all duration-300 hover:border-border hover:bg-card/70"
						>
							<AccordionTrigger
								class="px-5 py-4 transition-colors duration-200 hover:no-underline data-[state=open]:bg-secondary/40"
							>
								<div class="flex items-center gap-4 text-left">
									<div
										class="shrink-0 rounded-xl border border-border/40 bg-secondary p-2.5 text-primary"
									>
										<faq.icon class="size-5" />
									</div>
									<span class="text-base font-bold tracking-tight text-foreground">{faq.title}</span
									>
								</div>
							</AccordionTrigger>
							<AccordionContent
								class="border-t border-border/40 bg-background/30 px-5 py-4 text-sm leading-relaxed text-muted-foreground"
							>
								{faq.description}
							</AccordionContent>
						</AccordionItem>
					{/each}
				</Accordion>

				<!-- Right Column Stack -->
				<Accordion type="single" class="w-full space-y-4">
					{#each rightCol as faq (faq.id)}
						<AccordionItem
							value={faq.id}
							class="overflow-hidden rounded-2xl border border-border/60 bg-card/40 shadow-xs backdrop-blur-xs transition-all duration-300 hover:border-border hover:bg-card/70"
						>
							<AccordionTrigger
								class="px-5 py-4 transition-colors duration-200 hover:no-underline data-[state=open]:bg-secondary/40"
							>
								<div class="flex items-center gap-4 text-left">
									<div
										class="shrink-0 rounded-xl border border-border/40 bg-secondary p-2.5 text-primary"
									>
										<faq.icon class="size-5" />
									</div>
									<span class="text-base font-bold tracking-tight text-foreground">{faq.title}</span
									>
								</div>
							</AccordionTrigger>
							<AccordionContent
								class="border-t border-border/40 bg-background/30 px-5 py-4 text-sm leading-relaxed text-muted-foreground"
							>
								{faq.description}
							</AccordionContent>
						</AccordionItem>
					{/each}
				</Accordion>
			</div>
		</div>
	</div>
{/if}
