<script lang="ts">
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { edit } from './schema.js';
	let { data } = $props();

	import SingleTable from '$lib/components/SingleTable.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { superForm } from 'sveltekit-superforms/client';
	import InputComp from '$lib/formComponents/InputComp.svelte';

	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { ArrowLeft, Pencil, Save } from '@lucide/svelte';
	import type { Snapshot } from '@sveltejs/kit';
	import Delete from '$lib/forms/Delete.svelte';
	import SingleView from '$lib/components/SingleView.svelte';
	import Errors from '$lib/formComponents/Errors.svelte';

	let singleTable = $derived([
		{ name: 'Title', value: data.product?.title },
		{ name: 'Slug', value: data.product?.slug },
		{ name: 'Category', value: data.product?.categoryName },

		{ name: 'Excerpt | Short Description', value: data.product?.excerpt },
		{ name: 'Client Name', value: data.product?.clientName },
		{ name: 'Location', value: data.product?.location },
		{ name: 'Featured Project', value: data?.product?.isFeatured ? 'Yes' : 'No' },
		{
			name: 'Completed On',
			value: data?.product?.completedAt
				? formatEthiopianDate(new Date(data?.product?.completedAt))
				: 'No Time Provided'
		}
	]);

	const { form, errors, enhance, delayed, capture, restore, allErrors, message } = superForm(
		data.form,
		{
			validators: zod4Client(edit),
			resetForm: false,
			dataType: 'json'
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

	let images = $derived(data?.images);
	import AddVideo from './addVideo.svelte';
	import ViewOnSite from '$lib/components/ViewOnSite.svelte';

	// $form.date = data?.product?.createdAt?.toLocaleString('en-CA');
</script>

<svelte:head>
	<title>Project Details</title>
</svelte:head>

<SingleView
	title={data?.product?.title}
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

		<Delete redirect="/dashboard/projects" />
		<ViewOnSite href="/projects/{data?.product.slug}" />
	</div>

	{#if editForm === false}
		<div class="flex w-full flex-col items-start justify-start gap-4 p-4">
			<SingleTable {singleTable} />

			<article class="max-auto mx-auto w-full max-w-4xl px-6 py-12">
				<div class="rounded-2xl border border-slate-100 p-8 shadow-sm md:p-12">
					<!-- Section Header -->
					<h2 class="mb-6 border-b border-slate-100 pb-4 text-3xl font-bold tracking-tight">
						Blueprint
					</h2>
					<div>
						<img
							src="/files/{data?.product?.blueprintUrl}"
							alt={data?.product?.title}
							class="w-full"
						/>
					</div>
				</div>
			</article>

			<article class="max-auto mx-auto w-full max-w-4xl px-6 py-12">
				<div class="rounded-2xl border border-slate-100 p-8 shadow-sm md:p-12">
					<!-- Section Header -->
					<h2 class="mb-6 border-b border-slate-100 pb-4 text-3xl font-bold tracking-tight">
						Content
					</h2>

					<!-- Injected Content -->
					<div
						class="prose prose-slate prose-headings:text-slate-800 prose-p:leading-relaxed prose-li:my-1 max-w-none"
					>
						{@html data?.product?.content}
					</div>
				</div>
			</article>
		</div>
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
					image={data?.product?.featuredImage ?? ''}
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
					image={data?.product?.blueprintUrl ?? ''}
					label="Project Blue Print"
					placeholder="Upload Project Blue Print"
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

<div class="mx-auto my-12 px-4 sm:px-6 lg:px-4">
	{#if data?.product?.title}
		<div class="mb-6 border-b border-gray-100 pb-4">
			<nav class="mb-2 text-xs font-medium tracking-wider text-gray-400 uppercase">
				Gallery Images
			</nav>
			<h1 class="text-3xl font-bold tracking-tight sm:text-4xl">
				{data.product.title}
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
				<Gallery {images} title={data?.product?.title} />
			{:else}
				<EditGallery data={data?.galleryEdit} bind:images />
			{/if}
		</div>
	</div>
</div>

<div class="my-8">
	<AddVideo
		data={data?.addVideoForm}
		editForm={data?.editVideoForm}
		deleteForm={data?.deleteForm}
		videos={data?.videos}
	/>
</div>
