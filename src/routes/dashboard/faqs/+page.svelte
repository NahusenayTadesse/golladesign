<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { toast } from 'svelte-sonner';
	import { Plus, Save, Trash } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';

	let { data } = $props();

	const submit =
		(success: string): SubmitFunction =>
		() =>
		async ({ result, update }) => {
			if (result.type === 'success') toast.success(success);
			else if (result.type === 'failure')
				toast.error(String(result.data?.error ?? 'Please check the form'));
			await update({ reset: success === 'FAQ added' });
		};
</script>

<svelte:head>
	<title>FAQs</title>
</svelte:head>

{#snippet fields(faq?: (typeof data.faqs)[number])}
	{@const key = faq?.id ?? 'new'}
	<div class="grid gap-4 lg:grid-cols-2">
		<div class="space-y-2">
			<Label for="q-{key}">Question</Label>
			<Input id="q-{key}" name="question" value={faq?.question ?? ''} required />
		</div>
		<div class="space-y-2">
			<Label for="qa-{key}">Question (Amharic)</Label>
			<Input id="qa-{key}" name="questionAm" value={faq?.questionAm ?? ''} />
		</div>
		<div class="space-y-2">
			<Label for="a-{key}">Answer</Label>
			<Textarea id="a-{key}" name="answer" rows={4} value={faq?.answer ?? ''} required />
		</div>
		<div class="space-y-2">
			<Label for="aa-{key}">Answer (Amharic)</Label>
			<Textarea id="aa-{key}" name="answerAm" rows={4} value={faq?.answerAm ?? ''} />
		</div>
	</div>
	<div class="flex flex-wrap items-end gap-6">
		<div class="space-y-2">
			<Label for="o-{key}">Display order</Label>
			<Input
				id="o-{key}"
				name="sortOrder"
				type="number"
				min="0"
				class="w-28"
				value={faq?.sortOrder ?? data.faqs.length + 1}
			/>
		</div>
		<label class="flex items-center gap-2 pb-2 text-sm">
			<input type="checkbox" name="isActive" checked={faq?.isActive ?? true} class="size-4" />
			Show on site
		</label>
	</div>
{/snippet}

<div class="space-y-6 p-4">
	<h1 class="text-2xl font-bold">Frequently asked questions</h1>

	<form
		method="post"
		action="?/add"
		use:enhance={submit('FAQ added')}
		class="space-y-4 rounded-xl border border-dashed p-4"
	>
		<h2 class="font-semibold">Add a question</h2>
		{@render fields()}
		<Button type="submit"><Plus class="h-4 w-4" /> Add FAQ</Button>
	</form>

	{#each data.faqs as faq (faq.id)}
		<div class="space-y-4 rounded-xl border p-4 {faq.isActive ? '' : 'opacity-60'}">
			<form method="post" action="?/update" use:enhance={submit('FAQ saved')} class="space-y-4">
				<input type="hidden" name="id" value={faq.id} />
				{@render fields(faq)}
				<Button type="submit"><Save class="h-4 w-4" /> Save</Button>
			</form>
			<form method="post" action="?/delete" use:enhance={submit('FAQ deleted')}>
				<input type="hidden" name="id" value={faq.id} />
				<Button type="submit" variant="destructive" size="sm"
					><Trash class="h-4 w-4" /> Delete</Button
				>
			</form>
		</div>
	{/each}
</div>
