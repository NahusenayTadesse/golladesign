<script lang="ts">
	import { enhance } from '$app/forms';
	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
	import Statuses from '$lib/components/Table/statuses.svelte';
	import LeadManage from '$lib/components/LeadManage.svelte';
	import { quoteStatuses, toItems } from '$lib/enums';
	import { formatEthiopianDate } from '$lib/global.svelte';

	let { data } = $props();

	const statusItems = toItems(quoteStatuses);
	const total = $derived(Object.values(data.counts).reduce((a, b) => a + b, 0));

	type Row = (typeof data.quotes)[number];

	const columns = [
		{
			accessorKey: 'createdAt',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'Received',
					onclick: column.getToggleSortingHandler()
				}),
			cell: ({ row }: { row: { original: Row } }) =>
				formatEthiopianDate(new Date(row.original.createdAt))
		},
		{ accessorKey: 'name', header: 'Client' },
		{ accessorKey: 'phone', header: 'Phone' },
		{ accessorKey: 'service', header: 'Service' },
		{ accessorKey: 'budgetRange', header: 'Budget' },
		{ accessorKey: 'timeline', header: 'Timeline' },
		{
			accessorKey: 'status',
			header: 'Status',
			cell: ({ row }: { row: { original: Row } }) =>
				renderComponent(Statuses, { status: row.original.status })
		},
		{
			accessorKey: 'assignee',
			header: 'Assigned to',
			cell: ({ row }: { row: { original: Row } }) => row.original.assignee ?? '—'
		},
		{
			accessorKey: 'manage',
			header: '',
			cell: ({ row }: { row: { original: Row } }) =>
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
						['Service', row.original.service],
						['Location', row.original.location],
						['Plot / area', row.original.plotSize],
						['Budget', row.original.budgetRange],
						['Timeline', row.original.timeline],
						['Project', row.original.description]
					]
				})
		}
	];
</script>

<svelte:head>
	<title>Quote Requests</title>
</svelte:head>

<div class="space-y-6 p-4">
	<h1 class="text-2xl font-bold">Quote requests</h1>

	<nav aria-label="Filter by status" class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
		<a
			href="/dashboard/quotes"
			class="rounded-xl border p-4 transition-colors hover:bg-muted {data.status
				? ''
				: 'border-primary bg-muted'}"
		>
			<p class="text-xs text-muted-foreground uppercase">All</p>
			<p class="text-2xl font-bold">{total}</p>
		</a>
		{#each statusItems as s (s.value)}
			<a
				href="/dashboard/quotes?status={s.value}"
				class="rounded-xl border p-4 transition-colors hover:bg-muted {data.status === s.value
					? 'border-primary bg-muted'
					: ''}"
			>
				<p class="text-xs text-muted-foreground uppercase">{s.name}</p>
				<p class="text-2xl font-bold">{data.counts[s.value] ?? 0}</p>
			</a>
		{/each}
	</nav>

	{#key data.quotes}
		<DataTable {columns} data={data.quotes} search={true} fileName="Quote requests" />
	{/key}

	{#if !data.quotes.length}
		<p class="text-sm text-muted-foreground">
			No quote requests yet. They arrive from the public
			<a class="underline" href="/request-a-quote" target="_blank">Request a Quote</a> page.
		</p>
	{/if}
</div>
