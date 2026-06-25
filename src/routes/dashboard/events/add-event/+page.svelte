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
	<title>Add New Event Item</title>
</svelte:head>
<FormCard title="Add A Event" description="Add New Event Portfolio">
	<form
		use:enhance
		action="?/addEvent"
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
			label="Event Title"
			placeholder="Enter Title "
			required
		/>

		<InputComp
			{form}
			{errors}
			type="text"
			name="slug"
			label="Event Slug"
			placeholder="Enter Slug"
			required
		/>

		<InputComp
			{form}
			{errors}
			type="text"
			name="eventType"
			label="Event Type"
			placeholder="Enter Event Type"
			required
		/>

		<InputComp
			{form}
			{errors}
			type="text"
			name="client"
			label="Client"
			placeholder="Enter Client"
			required
		/>

		<InputComp
			{form}
			{errors}
			type="date"
			name="date"
			label="Event Date"
			placeholder="Enter Event Date"
			required
		/>

		<InputComp
			{form}
			{errors}
			type="text"
			name="location"
			label="Event Location"
			placeholder="Enter Event Location"
			required
		/>

		<InputComp
			{form}
			{errors}
			type="textarea"
			name="description"
			label="Product Discription"
			placeholder="Enter Product Description"
			required
		/>

		<InputComp
			{form}
			{errors}
			type="checkboxSingle"
			name="isFeaturedOnHome"
			label="Featured on Home"
			placeholder="Should this event be featured on the home page?"
			required
		/>

		<InputComp
			{form}
			{errors}
			type="file"
			name="image"
			label="Event Featured Image"
			placeholder="Upload Event Featured Image"
			required
		/>

		<InputComp
			{form}
			{errors}
			type="gallery"
			name="gallery"
			label="Event Gallery Images"
			placeholder="Upload Event Gallery Images"
			required
			bind:images
		/>

		<Button type="submit" class="mt-4" form="main">
			{#if $delayed}
				<LoadingBtn name="Adding Event" />
			{:else}
				<Plus class="h-4 w-4" />

				Add Event
			{/if}
		</Button>
	</form>
</FormCard>
