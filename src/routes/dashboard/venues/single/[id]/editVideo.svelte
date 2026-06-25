<script lang="ts">
	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import { SquarePen, Plus, Save } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Edit } from './schema';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import Errors from '$lib/formComponents/Errors.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	type Item = {
		value: number;
		name: string;
	};

	let {
		data,
		action = '?/editVideo',
		id,
		videoUrl,
		icon = false
	}: {
		data: SuperValidated<Infer<Edit>>;
		action: string;
		id: number;
		videoUrl: string;
		icon: boolean;
	} = $props();

	const { form, errors, enhance, delayed, message, allErrors } = superForm(data, {
		resetForm: false
	});

	let open = $state(false);

	$form.id = id;
	$form.videoUrl = videoUrl;

	import { toast } from 'svelte-sonner';
	import InputComp from '$lib/formComponents/InputComp.svelte';
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

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger class="{buttonVariants({ variant: 'ghost' })} justify-self-start p-0!">
			<Dialog.Root bind:open>
				<Dialog.Trigger class="flex w-auto flex-row items-center justify-center gap-2 border-0">
					{#if icon}
						<SquarePen /> Edit
					{:else}
						{videoUrl.slice(0, 20)}...
					{/if}
				</Dialog.Trigger>
				<Dialog.Content class="w-full ">
					<Dialog.Header>
						<Dialog.Title class="text-center text-4xl">Edit Video</Dialog.Title>
					</Dialog.Header>
					<form {action} use:enhance method="post" id="edit" class="flex w-full flex-col gap-4 p-4">
						<Errors allErrors={$allErrors} />
						<input type="hidden" name="id" value={$form.id} />
						<InputComp
							{form}
							{errors}
							label="Video URL"
							type="url"
							name="videoUrl"
							placeholder="Enter Video URL"
							required={true}
						/>

						<Button type="submit" class="mt-4" form="edit">
							{#if $delayed}
								<LoadingBtn name="Saving Changes" />
							{:else}
								<Save class="h-4 w-4" />

								Save Changes
							{/if}
						</Button>
					</form>
				</Dialog.Content>
			</Dialog.Root>
		</Tooltip.Trigger>
		<Tooltip.Content>
			<p>Edit {videoUrl}</p>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
