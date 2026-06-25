<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Save, Plus } from '@lucide/svelte';

	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
	import Edit from './editFeature.svelte';
	import type { AddFeature, EditFeature, DeleteFeature } from './schema';

	let {
		data,
		editForm,
		deleteForm,
		features
	}: {
		data: SuperValidated<Infer<AddFeature>>;
		editForm: SuperValidated<Infer<EditFeature>>;
		deleteForm: SuperValidated<Infer<DeleteFeature>>;
		features: any[];
	} = $props();
	const columns = [
		{
			accessorKey: 'index',
			header: '#',
			cell: (info) => info.row.index + 1,
			sortable: false
		},
		{
			accessorKey: 'name',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Name',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return renderComponent(Edit, {
					id: row.original.id,
					name: row.original.name,
					description: row.original.description,
					action: '?/editFeature',
					data: editForm,
					icon: false
				});
			}
		},

		{
			accessorKey: 'description',
			header: 'Description',
			sortable: true,
			cell: ({ row }) => {
				return renderComponent(BigText, {
					text: row.original.description
				});
			}
		},

		{
			accessorKey: '',
			header: 'Edit',
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return renderComponent(Edit, {
					id: row.original.id,
					name: row.original.name,
					description: row.original.description,
					action: '?/editFeature',
					data: editForm,
					icon: true
				});
			}
		},
		{
			accessorKey: '',
			header: 'Delete',
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return renderComponent(Delete, {
					id: row.original.id,
					action: '?/deleteFeature',
					data: deleteForm
				});
			}
		}
	];

	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';

	import InputComp from '$lib/formComponents/InputComp.svelte';
	import { toast } from 'svelte-sonner';
	const { form, errors, enhance, delayed, message } = superForm(data, {
		onUpdated({ form }) {
			if (form.message?.type === 'error') {
				toast.error(form.message.text);
			} else {
				toast.success(form.message.text);
			}
		}
	});

	import DialogComp from '$lib/formComponents/DialogComp.svelte';
	import BigText from '$lib/components/Table/bigText.svelte';
	import Delete from './delete.svelte';
	// $effect(() => {
	// 	if ($message) {
	// 		if ($message.type === 'error') {
	// 			toast.error($message.text);
	// 		} else {
	// 			toast.success($message.text);
	// 		}
	// 	}
	// });
</script>

{#key features}
	<DialogComp title="Add New Feature" variant="default" IconComp={Plus}>
		<div class="flex flex-col items-center justify-center gap-4 pt-4">
			<form
				method="post"
				action="?/add"
				use:enhance
				class="flex w-full flex-col gap-3"
				enctype="multipart/form-data"
			>
				<InputComp
					{form}
					{errors}
					label="name"
					type="text"
					name="name"
					placeholder="Enter Feature Name"
					required={true}
				/>

				<InputComp
					{form}
					{errors}
					label="Description"
					type="textarea"
					name="description"
					placeholder="Enter FeatureDescription"
					required={true}
					rows={10}
				/>
				<Button type="submit" size="lg">
					{#if $delayed}
						<LoadingBtn name="Saving Feature" />
					{:else}
						<Save /> Save Changes
					{/if}
				</Button>
			</form>
		</div>
	</DialogComp>

	<DataTable {columns} data={features} fileName="Features" search={true} />
{/key}
