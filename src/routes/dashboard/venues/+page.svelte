<script lang="ts">
	import { columns } from './columns';

	let { data } = $props();

	import DataTable from '$lib/components/Table/data-table.svelte';

	import { Frown, Plus } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import FilterMenu from '$lib/components/Table/FilterMenu.svelte';

	let filteredList = $derived(data?.eventList);
</script>

<svelte:head>
	<title>Venues List</title>
</svelte:head>

{#if data.eventList.length === 0}
	<div class="flex h-96 w-full flex-col items-center justify-center lg:w-5xl">
		<p class="justify-self-cente mt-4 flex flex-row gap-4 text-center text-4xl">
			<Frown class="h-12 w-16  animate-bounce" />
			Venue List is Empty
		</p>
		<Button href="/dashboard/venues/add-venue"><Plus />Add New Venue</Button>
	</div>
{:else}
	<h2 class="my-4 text-2xl">No of Venues: {data.eventList?.length}</h2>

	<div class="mt-8 mb-4 p-0 pt-4 lg:w-full lg:p-0">
		<FilterMenu
			bind:filteredList
			data={data?.eventList}
			filterKeys={['client', 'eventType', 'location']}
		/>
		<DataTable data={filteredList} {columns} fileName="Portfolio List List" />
	</div>
{/if}
