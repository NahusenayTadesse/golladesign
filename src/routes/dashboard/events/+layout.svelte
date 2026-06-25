<script>
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
	// import DialogComp from "$lib/formComponents/DialogComp.svelte";
	// import AddCustomer from "$lib/forms/AddCustomer.svelte";
	import { Plus, Sheet } from '@lucide/svelte';
	let { children } = $props();
</script>

<div class="mb-8 flex flex-row items-center justify-start gap-2">
	<Button
		href="/dashboard/events"
		variant={page.url.pathname === '/dashboard/events' ? 'default' : 'outline'}
		><Sheet /> Events</Button
	>
	<Button
		href="/dashboard/events/add-event"
		variant={page.url.pathname === '/dashboard/events/add-event' ? 'default' : 'outline'}
		><Plus /> Add Events</Button
	>
</div>

{@render children?.()}
