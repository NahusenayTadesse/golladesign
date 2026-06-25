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
	<title>Add New Venue Item</title>
</svelte:head>
<FormCard title="Add A Venue" description="Add New Venue">
	<form
		use:enhance
		action="?/addVenue"
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
			name="name"
			label="Venue Name"
			placeholder="Enter Venue Name"
			required
		/>

		<InputComp
			{form}
			{errors}
			type="number"
			name="capacity"
			label="Capacity"
			placeholder="Enter Capacity"
		/>

		<InputComp
			{form}
			{errors}
			type="text"
			name="location"
			label="Venue Location"
			placeholder="Enter Venue Location"
			required
		/>

		<InputComp
			{form}
			{errors}
			type="textarea"
			name="bookingPolicy"
			label="Booking Policy"
			placeholder="Enter Booking Policy"
			required
		/>

		<InputComp
			{form}
			{errors}
			type="textarea"
			name="description"
			label="Venue Discription"
			placeholder="Enter Product Description"
			required
		/>

		<InputComp
			{form}
			{errors}
			type="file"
			name="image"
			label="Venue Featured Image"
			placeholder="Upload Venue Featured Image"
			required
		/>

		<InputComp
			{form}
			{errors}
			type="gallery"
			name="gallery"
			label="Event Gallery Images"
			placeholder="Upload Event Gallery Images"
			bind:images
		/>

		<InputComp
			{form}
			{errors}
			type="select"
			name="enableLottery"
			label="Enable Lottery"
			placeholder="Enter Enable Lottery"
			items={[
				{ value: 0, name: 'No' },
				{ value: 1, name: 'Yes' }
			]}
			required
		/>

		<Button type="submit" class="mt-4" form="main">
			{#if $delayed}
				<LoadingBtn name="Adding Venue" />
			{:else}
				<Plus class="h-4 w-4" />

				Add Venue
			{/if}
		</Button>
	</form>
</FormCard>
