<script lang="ts">
	import { enhance as kitEnhance } from '$app/forms';
	import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { Plus, Trash } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import BeforeAfter from '$lib/components/BeforeAfter.svelte';
	import type { addBeforeAfter } from './schema';

	type Pair = { id: number; beforeUrl: string; afterUrl: string; caption: string | null };
	let { data, pairs }: { data: SuperValidated<Infer<typeof addBeforeAfter>>; pairs: Pair[] } =
		$props();

	const { form, errors, enhance, delayed, message } = superForm(data, { resetForm: true });

	$effect(() => {
		if ($message) {
			if ($message.type === 'error') toast.error($message.text);
			else toast.success($message.text);
		}
	});
</script>

<div class="space-y-6">
	{#if pairs.length}
		<div class="grid gap-6 md:grid-cols-2">
			{#each pairs as pair (pair.id)}
				<div class="space-y-2">
					<BeforeAfter
						before="/files/{pair.beforeUrl}"
						after="/files/{pair.afterUrl}"
						caption={pair.caption}
					/>
					<form method="post" action="?/deleteBeforeAfter" use:kitEnhance>
						<input type="hidden" name="id" value={pair.id} />
						<Button type="submit" variant="destructive" size="sm"><Trash /> Remove pair</Button>
					</form>
				</div>
			{/each}
		</div>
	{:else}
		<p class="text-sm text-muted-foreground">No before/after pairs yet.</p>
	{/if}

	<form
		method="post"
		action="?/addBeforeAfter"
		enctype="multipart/form-data"
		use:enhance
		class="grid gap-4 rounded-xl border p-4 md:grid-cols-2"
	>
		<InputComp {form} {errors} type="file" name="before" label="Before image" />
		<InputComp {form} {errors} type="file" name="after" label="After image" />
		<div class="md:col-span-2">
			<InputComp {form} {errors} type="text" name="caption" label="Caption (optional)" />
		</div>
		<Button type="submit" class="md:col-span-2">
			{#if $delayed}
				<LoadingBtn name="Uploading" />
			{:else}
				<Plus /> Add before/after pair
			{/if}
		</Button>
	</form>
</div>
