<script lang="ts">
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { SquarePen, Save } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { EditPaymentMethod as schema } from './schema';

	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import { untrack } from 'svelte';
	import Errors from '$lib/formComponents/Errors.svelte';

	type Row = {
		id: number;
		name: string;
		position: string | null;
		clientCompany: string | null;
		testimonial: string;
		messageAm: string | null;
		avatar: string | null;
		rating: number | null;
		projectId: number | null;
		isActive: number;
		isFeatured: boolean;
		sortOrder: number;
	};

	let {
		data,
		action = '?/edit',
		row,
		projectOptions = [],
		icon = false
	}: {
		data: SuperValidated<Infer<schema>>;
		action: string;
		row: Row;
		projectOptions?: { value: string; name: string }[];
		icon: boolean;
	} = $props();

	const { form, errors, enhance, delayed, message, allErrors } = superForm(data, {
		resetForm: false
	});

	let open = $state(false);

	// Prefill once; the list remounts these dialogs whenever the data changes.
	const initial = untrack(() => row);
	$form.id = initial.id;
	$form.name = initial.name;
	$form.position = initial.position ?? undefined;
	$form.clientCompany = initial.clientCompany ?? undefined;
	$form.testimonial = initial.testimonial;
	$form.messageAm = initial.messageAm ?? undefined;
	$form.rating = initial.rating ?? undefined;
	$form.projectId = initial.projectId ? String(initial.projectId) : undefined;
	$form.isActive = initial.isActive === 1;
	$form.isFeatured = initial.isFeatured;
	$form.sortOrder = initial.sortOrder;

	import { toast } from 'svelte-sonner';
	import Fields from './fields.svelte';
	import ScrollArea from '$lib/components/ui/scroll-area/scroll-area.svelte';
	import DialogComp from '$lib/formComponents/DialogComp.svelte';
	$effect(() => {
		if ($message) {
			if ($message.type === 'error') {
				toast.error($message.text);
			} else {
				toast.success($message.text);
				open = false;
			}
		}
	});
</script>

<DialogComp
	variant="ghost"
	title={icon ? 'Edit' : row.name}
	IconComp={icon ? SquarePen : undefined}
>
	<form
		{action}
		use:enhance
		method="post"
		id="edit"
		class="flex w-full flex-col gap-4 p-4"
		enctype="multipart/form-data"
	>
		<Errors allErrors={$allErrors} />
		<input type="hidden" name="id" value={$form.id} />
		<Fields {form} {errors} {projectOptions} avatar={row.avatar ?? ''} />

		<Button type="submit" class="mt-4" form="edit">
			{#if $delayed}
				<LoadingBtn name="Saving Avatar" />
			{:else}
				<Save class="h-4 w-4" />

				Save Changes
			{/if}
		</Button>
	</form>
</DialogComp>
