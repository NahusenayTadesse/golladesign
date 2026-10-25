<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { Save, Settings2 } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import DialogComp from '$lib/formComponents/DialogComp.svelte';
	import SelectComp from '$lib/formComponents/SelectComp.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';

	type Item = { value: string; name: string };
	let {
		id,
		details,
		status,
		assignedTo,
		notes,
		statusItems,
		userItems,
		action = '?/update'
	}: {
		id: number;
		details: [label: string, value: string | null | undefined][];
		status: string;
		assignedTo: string | null;
		notes: string | null;
		statusItems: Item[];
		userItems: Item[];
		action?: string;
	} = $props();

	// Writable copies, re-seeded when the row changes.
	let currentStatus = $derived(status);
	let currentAssignee = $derived(assignedTo ?? '');
	let saving = $state(false);
</script>

<DialogComp variant="outline" title="Manage" IconComp={Settings2}>
	<form
		method="post"
		{action}
		class="flex flex-col gap-4 p-2"
		use:enhance={() => {
			saving = true;
			return async ({ result, update }) => {
				saving = false;
				if (result.type === 'success') toast.success('Lead updated');
				else toast.error('Could not update the lead');
				await update({ reset: false });
			};
		}}
	>
		<input type="hidden" name="id" value={id} />
		<dl class="grid gap-x-4 gap-y-2 rounded-xl border p-4 text-sm sm:grid-cols-[auto_1fr]">
			{#each details.filter(([, v]) => v) as [label, value] (label)}
				<dt class="font-medium text-muted-foreground">{label}</dt>
				<dd class="break-words whitespace-pre-wrap">{value}</dd>
			{/each}
		</dl>
		<div class="grid gap-4 sm:grid-cols-2">
			<div class="space-y-2">
				<Label>Status</Label>
				<SelectComp name="status" bind:value={currentStatus} items={statusItems} />
			</div>
			<div class="space-y-2">
				<Label>Assigned to</Label>
				<SelectComp name="assignedTo" bind:value={currentAssignee} items={userItems} />
			</div>
		</div>
		<div class="space-y-2">
			<Label for="notes-{id}">Internal notes</Label>
			<Textarea id="notes-{id}" name="notes" rows={5} value={notes ?? ''} />
		</div>
		<Button type="submit">
			{#if saving}
				<LoadingBtn name="Saving" />
			{:else}
				<Save class="h-4 w-4" /> Save
			{/if}
		</Button>
	</form>
</DialogComp>
