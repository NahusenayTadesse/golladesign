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

	// Studio-focused interior design and architectural execution queries
	const faqs = [
		{
			id: 'design-services',
			title: 'What services does Golla Design offer?',
			description:
				'We provide comprehensive structural architectural layout design, premium high-end interior finishes, and bespoke luxury furniture consultation.',
			icon: CompassIcon
		},
		{
			id: 'custom-furniture',
			title: 'Can you manufacture custom furniture pieces?',
			description:
				'Yes, custom furniture making and tailor-made lighting integration are core pillars of our studio, allowing us to deliver pieces perfectly sized for your space.',
			icon: ArmchairIcon
		},
		{
			id: 'interior-finishing',
			title: 'Do you handle the actual space finishing?',
			description:
				'Absolutely. We focus on significant, sophisticated structural finishes and interior space adjustments to bridge the gap between design renderings and reality.',
			icon: LayersIcon
		},
		{
			id: 'project-consultation',
			title: 'How does the studio consultation process work?',
			description:
				'We start by discussing your target vision, lifestyle requirements, and space parameters. We then deliver beautiful, custom, and cozy space plans tailored around your goals.',
			icon: PaintbrushIcon
		},
		{
			id: 'quote-requirements',
			title: 'What do I need to provide for a project estimate?',
			description:
				'Simply share your site measurements, current layouts, architectural concepts, or structural references via our contact channel to get a tailored estimate.',
			icon: FileTextIcon
		},
		{
			id: 'studio-philosophy',
			title: 'What makes your design group unique?',
			description:
				'We control every design layer—from complex architectural drawings to fine furniture finishes. This cohesive execution makes spaces exceptionally useful and functional.',
			icon: SparklesIcon
		}
	];

	// Split the features array cleanly to build a balanced, dual-column desktop layout
	const half = Math.ceil(faqs.length / 2);
	const leftCol = faqs.slice(0, half);
	const rightCol = faqs.slice(half);
</script>

<div class="min-h-dvh bg-background px-4 py-24 text-foreground sm:px-6 lg:px-8">
	<div class="mx-auto w-full max-w-7xl">
		<!-- Elegant Center Header -->
		<div class="mb-16 space-y-3 text-center">
			<h1 class="text-4xl font-black tracking-tight uppercase sm:text-5xl">
				Frequently Asked Questions
			</h1>
			<div class="mx-auto h-1 w-12 rounded-full bg-primary"></div>
			<p class="mx-auto max-w-xl text-base text-muted-foreground">
				Insights regarding our studio workflow, spatial visualization process, and custom
				fabrication stages.
			</p>
		</div>

		<!-- Asymmetric Dual Column Accordion System -->
		<div class="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 lg:grid-cols-2">
			<!-- Left Column Stack -->
			<Accordion type="single" collapsible class="w-full space-y-4">
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
								<h3 class="text-base font-bold tracking-tight text-foreground">{faq.title}</h3>
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
			<Accordion type="single" collapsible class="w-full space-y-4">
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
								<h3 class="text-base font-bold tracking-tight text-foreground">{faq.title}</h3>
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
