<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Save, Plus } from '@lucide/svelte';

	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
	import type { DeleteFeature } from './schema';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';

	let {
		deleteForm,
		features
	}: {
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
			sortable: true
		},

		{
			accessorKey: 'phone',
			header: 'Phone',
			sortable: true,
			cell: ({ row }) => {
				return renderComponent(Copy, {
					data: row.original.phone
				});
			}
		},

		{
			accessorKey: 'email',
			header: 'Email',
			sortable: true,
			cell: ({ row }) => {
				return renderComponent(Copy, {
					data: row.original.email
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
					action: '?/deleteLottery',
					data: deleteForm
				});
			}
		}
	];

	import Delete from './delete.svelte';
	import Copy from '$lib/Copy.svelte';
</script>

{#key features}
	<DataTable {columns} data={features} fileName="Features" search={true} />
{/key}
