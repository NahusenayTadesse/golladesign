<script>
	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
	import Statuses from '$lib/components/Table/statuses.svelte';

	import Read from './read.svelte';
	import Delete from './delete.svelte';
	import BigText from './bigText.svelte';
	import LeadManage from '$lib/components/LeadManage.svelte';
	import { contactStatuses, toItems } from '$lib/enums';

	const statusItems = toItems(contactStatuses);

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
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }) => renderComponent(Statuses, { status: row.original.status })
		},
		{
			accessorKey: 'assignee',
			header: 'Assigned to',
			cell: ({ row }) => row.original.assignee ?? '—'
		},
		{
			accessorKey: 'manage',
			header: 'Manage',
			cell: ({ row }) =>
				renderComponent(LeadManage, {
					id: row.original.id,
					status: row.original.status,
					assignedTo: row.original.assignedTo,
					notes: row.original.notes,
					statusItems,
					userItems: data.users,
					details: [
						['Name', row.original.name],
						['Email', row.original.email],
						['Phone', row.original.phone],
						['Subject', row.original.subject],
						['Message', row.original.message]
					]
				})
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
			accessorKey: 'subject',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Subject',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true
		},

		{
			accessorKey: 'message',
			header: 'Message',
			sortable: true,
			cell: ({ row }) => renderComponent(BigText, { text: row.original.message })
		},

		{
			accessorKey: 'createdAt',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Submitted At',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return formatDate(row.original.submittedAt);
			}
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

	let filteredList = $derived(data?.allPaymentMethods);
</script>

<svelte:head>
	<title>Messages</title>
</svelte:head>
{#key data?.allPaymentMethods}
	<FilterMenu data={data?.allPaymentMethods} bind:filteredList filterKeys={['subject', 'isRead']} />
	<DataTable {columns} data={filteredList} search={true} fileName="Messages" />
{/key}
