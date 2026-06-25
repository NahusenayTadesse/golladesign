<script lang="ts">
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { edit } from './schema.js';
	let { data } = $props();

	import SingleTable from '$lib/components/SingleTable.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { superForm } from 'sveltekit-superforms/client';
	import { page } from '$app/state';
	import InputComp from '$lib/formComponents/InputComp.svelte';

	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { ArrowLeft, Pencil, Save } from '@lucide/svelte';
	import type { Snapshot } from '@sveltejs/kit';
	import Delete from '$lib/forms/Delete.svelte';
	import SingleView from '$lib/components/SingleView.svelte';
	import Errors from '$lib/formComponents/Errors.svelte';

	let singleTable = $derived([
		{ name: 'Name', value: data.product?.name },
		{ name: 'Capacity', value: data.product?.capacity },
		{ name: 'Location', value: data.product?.location },

		{ name: 'Booking Policy', value: data.product?.bookingPolicy },
		{ name: 'Description', value: data.product?.description },
		{ name: 'Lottery', value: data.product?.enableLottery ? 'Yes' : 'No' },
		{ name: 'Added On', value: formatEthiopianDate(new Date(data.product?.createdAt)) },
		{ name: 'Added By', value: data.product?.createdBy }
	]);

	const { form, errors, enhance, delayed, capture, restore, allErrors, message } = superForm(
		data.form,
		{
			validators: zod4Client(edit),
			resetForm: false,
			dataType: 'json',
			onUpdated({ form }) {
				if (form.message?.type === 'error') {
					toast.error(form.message.text);
				} else {
					toast.success(form.message.text);
				}
			}
		}
	);

	export const snapshot: Snapshot = { capture, restore };

	//   let date = $derived(dateProxy(editForm, 'appointmentDate', { format: 'date'}));

	let editForm = $state(false);
	let editGallery = $state(false);
	import { toast } from 'svelte-sonner';
	import Gallery from '$lib/components/gallery.svelte';
	import EditGallery from './editGallery.svelte';
	import { formatEthiopianDate } from '$lib/global.svelte.js';
	import AddFeatures from './addFeatures.svelte';
	import AddVideo from './addVideo.svelte';
	import Lottery from './lottery.svelte';
	import ViewOnSite from '$lib/components/ViewOnSite.svelte';

	// $effect(() => {
	// 	if ($message) {
	// 		if ($message.type === 'error') {
	// 			toast.error($message.text);
	// 		} else {
	// 			toast.success($message.text);
	// 		}
	// 	}
	// });

	let images = $derived(data?.images);
</script>

<svelte:head>
	<title>Venue Details</title>
</svelte:head>

<SingleView
	title={data?.product?.name}
	photo={String(data?.product?.featuredImage)}
	class="w-full!"
>
	<div class="mt-4 flex w-full flex-row flex-wrap items-start justify-start gap-2 pl-4">
		<Button onclick={() => (editForm = !editForm)}>
			{#if !editForm}
				<Pencil class="h-4 w-4" />
				Edit
			{:else}
				<ArrowLeft class="h-4 w-4" />

				Back
			{/if}
		</Button>

		<Delete redirect="/dashboard/products" />

		<ViewOnSite href="/venues/{data?.product.id}" />
	</div>

	{#if editForm === false}
		<div class="w-full p-4"><SingleTable {singleTable} /></div>
	{/if}
	{#if editForm}
		<div class="w-full p-4">
			<form
				action="?/editProduct"
				use:enhance
				class="flex w-full flex-col items-start justify-start gap-4 lg:w-full"
				id="edit"
				method="post"
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
					image={data?.product?.featuredImage ?? ''}
					label="Venue Featured Image"
					placeholder="Upload Venue Featured Image"
					required
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

				<Button form="edit" type="submit" class="mt-4">
					{#if $delayed}
						<LoadingBtn name="Saving Changes" />
					{:else}
						<Save class="h-4 w-4" />
						Save Changes
					{/if}
				</Button>
			</form>
		</div>
	{/if}
</SingleView>

{#if data?.lottery?.length}
	<h3 class="mt-16 text-2xl font-bold">Lottery {data.lottery.length} entries</h3>
	<Lottery features={data?.lottery} deleteForm={data?.deleteForm} />
{/if}

<div class="my-8">
	<AddFeatures
		data={data?.addForm}
		editForm={data?.editForm}
		deleteForm={data?.deleteForm}
		features={data?.features}
	/>
</div>

<div class="my-8">
	<AddVideo
		data={data?.addVideoForm}
		editForm={data?.editVideoForm}
		deleteForm={data?.deleteForm}
		videos={data?.videos}
	/>
</div>
<div class="mx-auto my-12 px-4 sm:px-6 lg:px-4">
	{#if data?.product?.name}
		<div class="mb-6 border-b border-gray-100 pb-4">
			<nav class="mb-2 text-xs font-medium tracking-wider text-gray-400 uppercase">
				Gallery Images
			</nav>
			<h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
				{data.product.name}
			</h1>
		</div>
	{/if}

	<div
		class="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl transition-shadow hover:shadow-2xl"
	>
		<div class="p-3 sm:p-6">
			<Button onclick={() => (editGallery = !editGallery)} class="mb-4">
				{#if !editGallery}
					<Pencil class="h-4 w-4" />
					Edit
				{:else}
					<ArrowLeft class="h-4 w-4" />

					Back
				{/if}
			</Button>

			{#if !editGallery}
				<Gallery {images} title={data?.product?.name} />
			{:else}
				<EditGallery data={data?.galleryEdit} bind:images />
			{/if}
		</div>
	</div>
</div>
