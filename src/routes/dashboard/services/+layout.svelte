<script>
	import { page } from '$app/state';
	import Button from '$lib/components/ui/button/button.svelte';
	// import DialogComp from "$lib/formComponents/DialogComp.svelte";
	// import AddCustomer from "$lib/forms/AddCustomer.svelte";
	import { Plus, Sheet } from '@lucide/svelte';
	let { children } = $props();
</script>

<div class="mb-6 flex flex-row flex-wrap items-center justify-start gap-2">
	<Button
		href="/dashboard/services"
		variant={page.url.pathname === '/dashboard/services' ? 'default' : 'outline'}
		class="h-11"><Sheet /> Services</Button
	>
	<Button
		href="/dashboard/services/add-service"
		variant={page.url.pathname === '/dashboard/services/add-service' ? 'default' : 'outline'}
		class="h-11"><Plus /> Add Services</Button
	>
</div>

{@render children?.()}
