<script lang="ts">
	import { enhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { Save } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Textarea } from '$lib/components/ui/textarea';
	import { SETTING_FIELDS } from '$lib/settings';

	let { data } = $props();

	const groups = [...new Set(SETTING_FIELDS.map((f) => f.group))];
	let saving = $state(false);
</script>

<svelte:head>
	<title>Site Settings</title>
</svelte:head>

<form
	method="post"
	class="max-w-3xl space-y-6 p-4"
	use:enhance={() => {
		saving = true;
		return async ({ result, update }) => {
			saving = false;
			if (result.type === 'success')
				toast.success('Settings saved. The site updates within a minute.');
			else if (result.type === 'failure')
				toast.error(String(result.data?.error ?? 'Could not save'));
			await update({ reset: false });
		};
	}}
>
	<div>
		<h1 class="text-2xl font-bold">Site settings</h1>
		<p class="text-sm text-muted-foreground">
			Contact details and links shown across the website. Clear a field to go back to the default.
		</p>
	</div>

	{#each groups as group (group)}
		<fieldset class="space-y-4 rounded-xl border p-4">
			<legend class="px-2 font-semibold">{group}</legend>
			{#each SETTING_FIELDS.filter((f) => f.group === group) as field (field.key)}
				<div class="space-y-2">
					<Label for={field.key}>{field.label}</Label>
					{#if field.key === 'hours'}
						<Textarea id={field.key} name={field.key} rows={3} value={data.settings[field.key]} />
						<p class="text-xs text-muted-foreground">
							One line per day, e.g. "Saturday: 8:30 AM – 12:00 PM".
						</p>
					{:else}
						<Input
							id={field.key}
							name={field.key}
							value={data.settings[field.key]}
							type={field.key === 'email' ? 'email' : 'text'}
						/>
					{/if}
				</div>
			{/each}
		</fieldset>
	{/each}

	<Button type="submit" disabled={saving}><Save class="h-4 w-4" /> Save settings</Button>
</form>
