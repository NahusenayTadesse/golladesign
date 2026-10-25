<script lang="ts">
	import Seo from '$lib/components/Seo.svelte';
	import {
		Card,
		CardHeader,
		CardTitle,
		CardDescription,
		CardContent
	} from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { SendIcon, CompassIcon, ClockIcon, FileTextIcon, PhoneCallIcon } from '@lucide/svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { BUDGET_RANGES, TIMELINES } from '$lib/quote';

	let { data } = $props();

	const { form, errors, enhance, delayed, message } = superForm(data.form, {
		resetForm: true
	});

	const budgetItems = BUDGET_RANGES.map((b) => ({ value: b, name: b }));
	const timelineItems = TIMELINES.map((t) => ({ value: t, name: t }));

	$effect(() => {
		if ($message) {
			if ($message.type === 'error') toast.error($message.text);
			else toast.success($message.text);
		}
	});

	const steps = [
		{
			icon: FileTextIcon,
			title: 'Tell us about the project',
			text: 'Location, size, budget and timing.'
		},
		{ icon: PhoneCallIcon, title: 'We call you back', text: 'Within one business day.' },
		{
			icon: ClockIcon,
			title: 'Site visit & proposal',
			text: 'A clear scope, timeline and estimate.'
		}
	];
</script>

<Seo
	title="Request a Quote | Golla Design Group"
	description="Request a consultation or quote from Golla Design Group for architecture, interior design and finishing projects in Addis Ababa."
/>

<main class="mx-auto min-h-dvh max-w-7xl px-4 py-16 text-foreground sm:px-6 lg:px-8 lg:py-24">
	<div class="mb-14 space-y-4 text-center">
		<div
			class="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary px-4 py-1.5 text-xs font-bold tracking-widest text-primary uppercase"
		>
			<CompassIcon class="size-3.5" aria-hidden="true" />
			<span>Free consultation</span>
		</div>
		<h1 class="text-4xl font-black tracking-tight uppercase sm:text-5xl">Request a Quote</h1>
		<p class="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
			Planning a new build, renovation or interior? Share a few details and we will prepare a
			tailored proposal.
		</p>
	</div>

	<div class="grid gap-8 lg:grid-cols-3">
		<Card class="rounded-2xl border border-border/60 bg-card shadow-xs lg:col-span-2">
			<CardHeader class="space-y-1">
				<CardTitle class="text-2xl font-bold tracking-tight">Project details</CardTitle>
				<CardDescription>Fields marked required are needed to contact you.</CardDescription>
			</CardHeader>
			<CardContent>
				<form class="space-y-6" method="POST" use:enhance>
					<InputComp {form} {errors} type="text" name="name" label="Full name" required />
					<div class="grid gap-6 sm:grid-cols-2">
						<InputComp {form} {errors} type="email" name="email" label="Email" required />
						<InputComp
							{form}
							{errors}
							type="tel"
							name="phone"
							label="Phone"
							placeholder="+251 9XX XXX XXX"
							required
						/>
					</div>
					<div class="grid gap-6 sm:grid-cols-2">
						<InputComp
							{form}
							{errors}
							type="select"
							name="serviceId"
							label="Service"
							items={data.serviceOptions}
						/>
						<InputComp
							{form}
							{errors}
							type="text"
							name="location"
							label="Project location"
							placeholder="e.g. Bole, Addis Ababa"
						/>
					</div>
					<div class="grid gap-6 sm:grid-cols-3">
						<InputComp
							{form}
							{errors}
							type="text"
							name="plotSize"
							label="Plot / area size"
							placeholder="e.g. 500 m²"
						/>
						<InputComp
							{form}
							{errors}
							type="select"
							name="budgetRange"
							label="Budget"
							items={budgetItems}
						/>
						<InputComp
							{form}
							{errors}
							type="select"
							name="timeline"
							label="Timeline"
							items={timelineItems}
						/>
					</div>
					<InputComp
						{form}
						{errors}
						type="textarea"
						name="description"
						label="About the project"
						placeholder="What would you like to build or change?"
					/>
					<Button
						type="submit"
						size="lg"
						class="h-12 w-full gap-2 rounded-xl font-bold tracking-wide uppercase"
					>
						{#if $delayed}
							<LoadingBtn name="Sending request" />
						{:else}
							<SendIcon class="size-4" aria-hidden="true" />
							Send request
						{/if}
					</Button>
				</form>
			</CardContent>
		</Card>

		<Card class="h-fit rounded-2xl border border-border/60 bg-secondary/30 shadow-none">
			<CardHeader>
				<CardTitle class="text-sm font-black tracking-wider uppercase">What happens next</CardTitle>
			</CardHeader>
			<CardContent>
				<ol class="space-y-5">
					{#each steps as step, i (step.title)}
						<li class="flex gap-4">
							<div
								class="flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/40 bg-background text-primary"
							>
								<step.icon class="size-4" aria-hidden="true" />
							</div>
							<div>
								<p class="text-sm font-bold">{i + 1}. {step.title}</p>
								<p class="text-sm text-muted-foreground">{step.text}</p>
							</div>
						</li>
					{/each}
				</ol>
			</CardContent>
		</Card>
	</div>
</main>
