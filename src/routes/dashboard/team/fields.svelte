<script lang="ts">
	import InputComp from '$lib/formComponents/InputComp.svelte';

	let { form, errors, avatar = '' } = $props();
</script>

<InputComp {form} {errors} label="Name" type="text" name="name" required={true} />
<InputComp {form} {errors} label="Position" type="text" name="position" />
<InputComp
	{form}
	{errors}
	label="Description"
	type="textarea"
	name="testimonial"
	placeholder="Add description about the team member"
/>
<div class="grid gap-4 sm:grid-cols-2">
	<InputComp {form} {errors} label="Display order" type="number" name="sortOrder" min="0" />
	<InputComp
		{form}
		{errors}
		label=""
		type="checkboxSingle"
		name="isActive"
		placeholder="Show on site"
	/>
</div>
<details class="rounded-xl border p-3">
	<summary class="cursor-pointer text-sm font-semibold">Amharic translation (optional)</summary>
	<div class="mt-3 space-y-3">
		<InputComp {form} {errors} label="Position (Amharic)" type="text" name="positionAm" />
		<InputComp {form} {errors} label="Description (Amharic)" type="textarea" name="messageAm" />
	</div>
</details>
<InputComp {form} {errors} label="Photo" type="file" name="avatar" image={avatar} />
