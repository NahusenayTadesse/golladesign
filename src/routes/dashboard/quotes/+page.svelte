<script>
	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
	import Statuses from '$lib/components/Table/statuses.svelte';

	import Read from './read.svelte';
	import Delete from './delete.svelte';
	import BigText from './bigText.svelte';

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
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Phone',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => renderComponent(Copy, { data: row.original.phone })
		},
		{
			accessorKey: 'email',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Email',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => renderComponent(Copy, { data: row.original.email })
		},
		{
			accessorKey: 'serviceType',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Service Type',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true
		},

		{
			accessorKey: 'eventDate',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Event Date',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return formatDate(new Date(row.original.eventDate));
			}
		},

		{
			accessorKey: 'budgetRange',
			header: 'Budget Range',
			sortable: true,
			cell: ({ row }) => {
				return 'ETB ' + Number(row.original.budgetRange).toFixed(2);
			}
		},

		{
			accessorKey: 'guestCount',
			header: 'Guest Count',
			sortable: true,
			cell: ({ row }) => {
				return row.original.guestCount + ' Guests';
			}
		},

		{
			accessorKey: 'eventLocation',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Event Location',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true
		},

		{
			accessorKey: 'description',
			header: 'Description',
			sortable: true,
			cell: ({ row }) => renderComponent(BigText, { text: row.original.description })
		},
		{
			accessorKey: 'isRead',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Read Status',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return row.original.isRead
					? renderComponent(Statuses, {
							status: 'Read'
						})
					: renderComponent(Read, {
							id: row.original.id,
							action: '?/read',
							data: data.readForm
						});
			}
		},

		{
			accessorKey: '',
			header: 'Reply',
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return renderComponent(Reply, {
					id: row.original.id,
					data: data.replyForm,
					name: row.original.name,
					email: row.original.email
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

	import Copy from '$lib/Copy.svelte';
	import { formatEthiopianDate as formatDate } from '$lib/global.svelte.js';
	import FilterMenu from '$lib/components/Table/FilterMenu.svelte';
	import Reply from './reply.svelte';

	let filteredList = $derived(data?.allQuotes);
</script>

<svelte:head>
	<title>Quotes</title>
</svelte:head>

<Reply data={data?.replyForm} />
<br />
<br />
{#key data?.allQuotes}
	<FilterMenu
		data={data?.allQuotes}
		bind:filteredList
		filterKeys={['serviceType', 'eventLocation', 'guestCount', 'isRead']}
	/>
	<DataTable {columns} data={filteredList} search={true} fileName="Quotes" />
{/key}
