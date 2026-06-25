<script lang="ts">
	import type { Snapshot } from '@sveltejs/kit';

	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';

	import { Plus, X } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { add as schema } from './schema';
	import { superForm } from 'sveltekit-superforms/client';
	import Errors from '$lib/formComponents/Errors.svelte';
	import FormCard from '$lib/formComponents/FormCard.svelte';
	import InputComp from '$lib/formComponents/InputComp.svelte';

	let { data } = $props();

	const { form, errors, enhance, delayed, allErrors, capture, restore, message } = superForm(
		data.form,
		{
			taintedMessage: () => {
				return new Promise((resolve) => {
					resolve(window.confirm('Do you want to leave?\nChanges you made may not be saved.'));
				});
			},
			onChange(event) {
				if (event.paths.includes('title')) {
					$form.slug = $form.title?.toLowerCase().replace(/\s+/g, '-');
				}
			},
			validators: zod4Client(schema),
			dataType: 'json'
		}
	);

	export const snapshot: Snapshot = { capture, restore };

	import { toast } from 'svelte-sonner';
	import RichTextEditor from '$lib/formComponents/RichTextEditor.svelte';
	$effect(() => {
		if ($message) {
			if ($message.type === 'error') {
				toast.error($message.text);
			} else {
				toast.success($message.text);
			}
		}
	});

	let images = $state([]);
</script>

<svelte:head>
	<title>Add New Service</title>
</svelte:head>
<FormCard title="Add A Service" description="Add New Service">
	<form
		use:enhance
		action="?/addService"
		id="main"
		class="flex flex-col gap-4"
		method="POST"
		enctype="multipart/form-data"
	>
		<Errors allErrors={$allErrors} />

		<InputComp {form} {errors} label="name" type="text" name="name" required={true} />

		<InputComp
			{form}
			{errors}
			label="Short Description"
			type="textarea"
			name="description"
			placeholder="Enter Service Description"
			required={true}
			rows={10}
		/>

		<InputComp
			{form}
			{errors}
			label="Long Description"
			type="hidden"
			name="longDescription"
			placeholder="Enter Service Description"
			required={true}
			rows={10}
		/>
		<RichTextEditor bind:value={$form.longDescription} />
		<InputComp
			{form}
			{errors}
			type="file"
			name="image"
			label="Service Featured Image"
			placeholder="Upload Service Featured Image"
			required
		/>

		<InputComp
			{form}
			{errors}
			type="gallery"
			name="gallery"
			label="Service Gallery Images"
			placeholder="Upload Service Gallery Images"
			required
			bind:images
		/>

		<Button type="submit" form="main">
			{#if $delayed}
				<LoadingBtn name="Adding Service" />
			{:else}
				<Plus /> Add Service
			{/if}
		</Button>
	</form>
</FormCard>
