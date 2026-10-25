<script lang="ts">
	import InputComp from '$lib/formComponents/InputComp.svelte';

	let { form, errors, projectOptions = [], avatar = '' } = $props();

	const ratingItems = [5, 4, 3, 2, 1].map((n) => ({ value: n, name: '★'.repeat(n) }));
</script>

<InputComp {form} {errors} label="Client name" type="text" name="name" required={true} />
<div class="grid gap-4 sm:grid-cols-2">
	<InputComp {form} {errors} label="Position" type="text" name="position" />
	<InputComp {form} {errors} label="Company" type="text" name="clientCompany" />
</div>
<InputComp {form} {errors} label="Testimonial" type="textarea" name="testimonial" />
<div class="grid gap-4 sm:grid-cols-2">
	<InputComp {form} {errors} label="Rating" type="select" name="rating" items={ratingItems} />
	<InputComp
		{form}
		{errors}
		label="Related project"
		type="select"
		name="projectId"
		items={projectOptions}
	/>
</div>
<div class="grid gap-4 sm:grid-cols-3">
	<InputComp {form} {errors} label="Display order" type="number" name="sortOrder" min="0" />
	<InputComp
		{form}
		{errors}
		label=""
		type="checkboxSingle"
		name="isActive"
		placeholder="Show on site"
	/>
	<InputComp
		{form}
		{errors}
		label=""
		type="checkboxSingle"
		name="isFeatured"
		placeholder="Featured"
	/>
</div>
<details class="rounded-xl border p-3">
	<summary class="cursor-pointer text-sm font-semibold">Amharic translation (optional)</summary>
	<div class="mt-3">
		<InputComp {form} {errors} label="Testimonial (Amharic)" type="textarea" name="messageAm" />
	</div>
</details>
<InputComp
	{form}
	{errors}
	label="Photo or logo (optional)"
	type="file"
	name="avatar"
	image={avatar}
/>
