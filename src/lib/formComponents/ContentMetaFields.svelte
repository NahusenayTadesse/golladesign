<script lang="ts">
	import InputComp from './InputComp.svelte';
	import { publishStatuses, toItems } from '$lib/enums';

	// Publishing, ordering and SEO fields shared by blogs, projects and services.
	let { form, errors, ogImage = '' } = $props();

	const statusItems = toItems(publishStatuses);
</script>

<fieldset class="grid w-full gap-4 rounded-xl border p-4 sm:grid-cols-3">
	<legend class="px-2 text-sm font-semibold">Publishing</legend>
	<InputComp {form} {errors} label="Status" type="select" name="status" items={statusItems} />
	<InputComp
		{form}
		{errors}
		label="Display order (lower first)"
		type="number"
		name="sortOrder"
		min="0"
	/>
	<div class="flex items-end pb-2">
		<InputComp
			{form}
			{errors}
			label=""
			type="checkboxSingle"
			name="isFeatured"
			placeholder="Featured"
		/>
	</div>
</fieldset>

<details class="w-full rounded-xl border p-4">
	<summary class="cursor-pointer text-sm font-semibold">SEO & sharing (optional)</summary>
	<div class="mt-4 space-y-4">
		<p class="text-xs text-muted-foreground">
			Leave blank to use the title, excerpt and featured image.
		</p>
		<InputComp {form} {errors} label="Meta title" type="text" name="metaTitle" />
		<InputComp
			{form}
			{errors}
			label="Meta description (about 155 characters)"
			type="textarea"
			name="metaDescription"
			rows={3}
		/>
		<InputComp
			{form}
			{errors}
			label="Share image (shown on social media)"
			type="file"
			name="ogImageFile"
			image={ogImage}
		/>
	</div>
</details>
