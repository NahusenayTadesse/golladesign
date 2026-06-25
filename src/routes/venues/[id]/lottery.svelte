<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { ArrowRight, Dices } from '@lucide/svelte';

	import type { Lottery } from './schema';

	let {
		data
	}: {
		data: SuperValidated<Infer<Lottery>>;
	} = $props();

	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';

	import InputComp from '$lib/formComponents/InputComp.svelte';
	import { toast } from 'svelte-sonner';
	const { form, errors, enhance, delayed } = superForm(data, {
		onUpdated({ form }) {
			if (form.message?.type === 'error') {
				toast.error(form.message.text);
			} else {
				toast.success(form.message.text);
			}
		}
	});

	import DialogComp from '$lib/formComponents/DialogComp.svelte';
</script>

<DialogComp title="Get a Free Venue Booking" variant="default" IconComp={Dices}>
	<div class="flex flex-col items-center justify-center gap-4 pt-4">
		<form method="post" action="?/add" use:enhance class="flex w-full flex-col gap-3">
			<InputComp
				{form}
				{errors}
				label="name"
				type="text"
				name="name"
				placeholder="Enter Your Full Name"
				required={true}
			/>

			<InputComp
				{form}
				{errors}
				label="phone"
				type="tel"
				name="phone"
				placeholder="Enter Your Phone Number"
				required={true}
			/>
			<InputComp
				{form}
				{errors}
				label="email"
				type="email"
				name="email"
				placeholder="Enter Your Email"
				required={true}
			/>
			<Button type="submit" size="lg">
				{#if $delayed}
					<LoadingBtn name="Submitting" />
				{:else}
					Submit to get a free a Venue Booking <ArrowRight />
				{/if}
			</Button>
		</form>
	</div>
</DialogComp>
