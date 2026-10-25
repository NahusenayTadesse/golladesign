<script lang="ts">
	import InputComp from './InputComp.svelte';
	import RichTextEditor from './RichTextEditor.svelte';

	type Field = { name: string; label: string; type?: 'text' | 'textarea' | 'rich' };
	// `name` is the English field; the Amharic one is `${name}Am`.
	let { form, errors, fields }: { form: any; errors: any; fields: Field[] } = $props();
</script>

<details class="w-full rounded-xl border p-4">
	<summary class="cursor-pointer text-sm font-semibold">Amharic translation (optional)</summary>
	<div class="mt-4 space-y-4">
		<p class="text-xs text-muted-foreground">
			Shown when a visitor switches the site to Amharic. Empty fields fall back to English.
		</p>
		{#each fields as field (field.name)}
			{#if field.type === 'rich'}
				<div class="space-y-2">
					<p class="text-sm font-medium">{field.label} (Amharic)</p>
					<RichTextEditor bind:value={$form[`${field.name}Am`]} />
				</div>
			{:else}
				<InputComp
					{form}
					{errors}
					label="{field.label} (Amharic)"
					type={field.type ?? 'text'}
					name="{field.name}Am"
					rows={4}
				/>
			{/if}
		{/each}
	</div>
</details>
