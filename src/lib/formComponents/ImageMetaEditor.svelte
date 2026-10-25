<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Save } from '@lucide/svelte';
	import { toast } from 'svelte-sonner';
	import LoadingBtn from './LoadingBtn.svelte';

	type Img = {
		id: number;
		url: string | null;
		altText: string | null;
		caption: string | null;
		sortOrder: number;
	};
	let { images, action = '?/imageMeta' }: { images: Img[]; action?: string } = $props();

	let saving = $state(false);
</script>

{#if images.length}
	<form
		method="post"
		{action}
		class="space-y-4"
		use:enhance={() => {
			saving = true;
			return async ({ result, update }) => {
				saving = false;
				if (result.type === 'success') toast.success('Image details saved');
				else toast.error('Could not save image details');
				await update({ reset: false });
			};
		}}
	>
		<input type="hidden" name="ids" value={images.map((i) => i.id).join(',')} />
		<p class="text-sm text-muted-foreground">
			Alt text describes the image for screen readers and Google. Lower order numbers show first.
		</p>
		<div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
			{#each images as row (row.id)}
				<div class="flex gap-3 rounded-xl border p-3">
					<img src="/files/{row.url}" alt="" class="size-20 shrink-0 rounded-lg object-cover" />
					<div class="flex min-w-0 flex-1 flex-col gap-2">
						<Input
							name="alt_{row.id}"
							value={row.altText ?? ''}
							placeholder="Alt text"
							aria-label="Alt text"
						/>
						<Input
							name="caption_{row.id}"
							value={row.caption ?? ''}
							placeholder="Caption"
							aria-label="Caption"
						/>
						<Input
							type="number"
							min="0"
							name="order_{row.id}"
							value={row.sortOrder}
							aria-label="Display order"
							class="w-24"
						/>
					</div>
				</div>
			{/each}
		</div>
		<Button type="submit">
			{#if saving}
				<LoadingBtn name="Saving" />
			{:else}
				<Save class="h-4 w-4" /> Save image details
			{/if}
		</Button>
	</form>
{/if}
