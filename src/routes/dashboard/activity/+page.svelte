<script lang="ts">
	import DataTable from '$lib/components/Table/data-table.svelte';

	let { data } = $props();

	type Row = (typeof data.entries)[number];
	const fmt = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', timeStyle: 'short' });

	const columns = [
		{
			accessorKey: 'createdAt',
			header: 'When',
			cell: ({ row }: { row: { original: Row } }) => fmt.format(new Date(row.original.createdAt))
		},
		{
			accessorKey: 'user',
			header: 'Who',
			cell: ({ row }: { row: { original: Row } }) => row.original.user ?? 'Deleted user'
		},
		{ accessorKey: 'action', header: 'Action' },
		{
			accessorKey: 'entity',
			header: 'What',
			cell: ({ row }: { row: { original: Row } }) =>
				row.original.entity + (row.original.entityId ? ` #${row.original.entityId}` : '')
		},
		{ accessorKey: 'summary', header: 'Details' }
	];
</script>

<svelte:head>
	<title>Activity Log</title>
</svelte:head>

<div class="space-y-4 p-4">
	<h1 class="text-2xl font-bold">Activity log</h1>
	<p class="text-sm text-muted-foreground">The latest 1,000 changes made in the dashboard.</p>
	<DataTable {columns} data={data.entries} search={true} fileName="Activity log" />
</div>
