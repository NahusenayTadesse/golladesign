<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import type { EmailSchema as schema } from './schema';

	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import { Send, Reply } from '@lucide/svelte';
	import Errors from '$lib/formComponents/Errors.svelte';

	let {
		data,
		name,
		email
	}: {
		data: SuperValidated<Infer<schema>>;
		name?: string | undefined;
		email?: string | undefined;
	} = $props();

	const { form, enhance, errors, delayed, message, allErrors } = superForm(data, {
		resetForm: false
	});
	import { toast } from 'svelte-sonner';
	import InputComp from '$lib/formComponents/InputComp.svelte';
	import DialogComp from '$lib/formComponents/DialogComp.svelte';
	import RichTextEditor from '$lib/formComponents/RichTextEditor.svelte';

	$effect(() => {
		if ($message) {
			if ($message.type === 'error') {
				toast.error($message.text);
			} else {
				toast.success($message.text);
			}
		}
	});

	$form.name = name ?? '';
	$form.email = email ?? '';
</script>

<DialogComp variant="default" title="Reply to Quote" IconComp={Reply}>
	<form
		method="post"
		id="reply"
		class="-mt-4 flex h-full flex-col items-start justify-start"
		action="?/reply"
		use:enhance
	>
		<Errors allErrors={$allErrors} />
		<InputComp {form} {errors} name="name" label="Name" type="text" placeholder="Enter your name" />
		<InputComp
			{form}
			{errors}
			name="email"
			label="Email"
			type="email"
			placeholder="Enter your email"
		/>

		<InputComp
			{form}
			{errors}
			name="subject"
			label="Subject"
			type="text"
			placeholder="Enter the subject"
		/>

		<InputComp
			{form}
			{errors}
			name="emailMessage"
			label="Message"
			type="hidden"
			placeholder="Enter the message"
		/>

		<RichTextEditor bind:value={$form.emailMessage} />

		<Button type="submit" class="mt-4 w-full" form="reply">
			{#if $delayed}
				<LoadingBtn name="Sending Email" />
			{:else}
				<Send /> Send Email
			{/if}
		</Button>
	</form>
</DialogComp>
