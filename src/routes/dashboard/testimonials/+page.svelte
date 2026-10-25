<script>
	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import DataTableLinks from '$lib/components/Table/data-table-links.svelte';
	import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
	import DialogComp from '$lib/formComponents/DialogComp.svelte';
	import { Button } from '$lib/components/ui/button/index';
	import Edit from './edit.svelte';
	import Delete from './delete.svelte';
	import BigText from './bigText.svelte';
	import ImageViewer from '$lib/components/Table/image-viewer.svelte';

	const columns = [
		{
			id: 'index',
			header: '#',
			cell: (info) => {
				const rowIndex = info.table.getRowModel().rows.findIndex((row) => row.id === info.row.id);
				return rowIndex + 1;
			},
			enableSorting: false
		},
		{
			accessorKey: 'avatar',
			header: 'Image',
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return renderComponent(ImageViewer, {
					src: row.original.avatar,
					alt: row.original.name
				});
			}
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
					row: row.original,
					projectOptions: data.projectOptions,
					action: '?/edit',
					data: data.editForm,
					icon: false
				});
			}
		},

		{
			accessorKey: 'position',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Position',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true
		},
		{
			accessorKey: 'rating',
			header: 'Rating',
			cell: ({ row }) => (row.original.rating ? '★'.repeat(row.original.rating) : '—')
		},
		{
			accessorKey: 'project',
			header: 'Project',
			cell: ({ row }) => row.original.project ?? '—'
		},
		{
			accessorKey: 'sortOrder',
			header: 'Order'
		},

		{
			accessorKey: 'testimonial',
			header: 'Testimonials',
			sortable: true,
			cell: ({ row }) => renderComponent(BigText, { text: row.original.testimonial })
		},

		{
			accessorKey: 'createdBy',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Created By',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return renderComponent(DataTableLinks, {
					id: row.original.createdById,
					name: row.original.createdBy,
					link: '/dashboard/users'
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
					row: row.original,
					projectOptions: data.projectOptions,
					action: '?/edit',
					data: data.editForm,
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
					action: '?/delete',
					data: data.deleteForm
				});
			}
		}
	];
	let { data } = $props();
	import { superForm } from 'sveltekit-superforms/client';
	import Fields from './fields.svelte';
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { Plus } from '@lucide/svelte';

	const { form, errors, enhance, delayed, message } = superForm(data.form, {});

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
</script>

<svelte:head>
	<title>Testimonials</title>
</svelte:head>
{#key data?.allPaymentMethods}
	<DialogComp title="+ Add New Testimonial" variant="default">
		<form
			action="?/add"
			use:enhance
			id="main"
			class="flex flex-col gap-4"
			method="post"
			enctype="multipart/form-data"
		>
			<Fields {form} {errors} projectOptions={data.projectOptions} />

			<Button type="submit" form="main">
				{#if $delayed}
					<LoadingBtn name="Adding Testimonial" />
				{:else}
					<Plus /> Add Testimonial
				{/if}
			</Button>
		</form>
	</DialogComp>

	<DataTable {columns} data={data?.allPaymentMethods} search={true} fileName="Testimonial" />
{/key}
