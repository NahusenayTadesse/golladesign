<script lang="ts">
	import type { Snapshot } from '@sveltejs/kit';

	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';

	import { Plus } from '@lucide/svelte';
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
	<title>Add New Project</title>
</svelte:head>
<FormCard title="Add A Project" description="Add New Project">
	<form
		use:enhance
		action="?/addProject"
		id="main"
		class="flex flex-col gap-4"
		method="POST"
		enctype="multipart/form-data"
	>
		<Errors allErrors={$allErrors} />

		<InputComp
			{form}
			{errors}
			type="text"
			name="title"
			label="Project Title"
			placeholder="Enter Title "
			required
		/>

		<InputComp
			{form}
			{errors}
			type="text"
			name="slug"
			label="Project Slug"
			placeholder="Enter Project Slug"
			required
		/>

		<InputComp
			{form}
			{errors}
			type="select"
			name="category"
			label="Category"
			placeholder="Select Category"
			items={data?.cats}
		/>
		<InputComp
			{form}
			{errors}
			type="text"
			name="clientName"
			label="Client Name"
			placeholder="Enter Client Name"
			required
		/>

		<InputComp
			{form}
			{errors}
			type="text"
			name="location"
			label="Location"
			placeholder="Enter Location"
			required
		/>
		<InputComp
			{form}
			{errors}
			label="Excerpt | Short Description"
			type="textarea"
			name="excerpt"
			placeholder="Enter Excerpt of Project"
			required={true}
			rows={10}
		/>

		<InputComp
			{form}
			{errors}
			label="Content"
			type="hidden"
			name="content"
			placeholder="Enter Content"
			required={true}
			rows={10}
		/>
		<RichTextEditor bind:value={$form.content} />
		<InputComp
			{form}
			{errors}
			type="file"
			name="image"
			label="Project Featured Image"
			placeholder="Upload Project Featured Image"
			required
		/>
		<InputComp
			{form}
			{errors}
			type="checkboxSingle"
			name="isFeatured"
			label="Featured"
			placeholder="Is Project Featured?"
		/>
		<InputComp
			{form}
			{errors}
			type="file"
			name="bluePrint"
			label="Project Blue Print"
			placeholder="Upload Project Blue Print"
		/>

		<InputComp
			{form}
			{errors}
			type="gallery"
			name="gallery"
			label="Project Gallery Images"
			placeholder="Upload Project Gallery Images"
			required
			bind:images
		/>
		<InputComp
			{form}
			{errors}
			type="date"
			name="date"
			label="Completed At Date"
			placeholder="Enter Date"
			required
		/>

		<Button type="submit" form="main">
			{#if $delayed}
				<LoadingBtn name="Adding Project" />
			{:else}
				<Plus /> Add Project
			{/if}
		</Button>
	</form>
</FormCard>
