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
		href="/dashboard/venues"
		variant={page.url.pathname === '/dashboard/venues' ? 'default' : 'outline'}
		><Sheet /> Venues</Button
	>
	<Button
		href="/dashboard/venues/add-venue"
		variant={page.url.pathname === '/dashboard/venues/add-venue' ? 'default' : 'outline'}
		><Plus /> Add Venue</Button
	>
</div>

{@render children?.()}
