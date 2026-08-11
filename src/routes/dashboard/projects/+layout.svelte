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
		href="/dashboard/projects"
		variant={page.url.pathname === '/dashboard/projects' ? 'default' : 'outline'}
		class="h-11"><Sheet /> Projects</Button
	>

	<Button
		href="/dashboard/projects/category"
		variant={page.url.pathname === '/dashboard/projects/category' ? 'default' : 'outline'}
		class="h-11"><Sheet /> Categories</Button
	>
	<Button
		href="/dashboard/projects/add-project"
		variant={page.url.pathname === '/dashboard/projects/add-project' ? 'default' : 'outline'}
		class="h-11"><Plus /> Add New Project</Button
	>
</div>

{@render children?.()}
