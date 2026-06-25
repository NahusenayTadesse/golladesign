<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Save, Plus } from '@lucide/svelte';

	import { renderComponent } from '$lib/components/ui/data-table/index.js';
	import DataTable from '$lib/components/Table/data-table.svelte';
	import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
	import Edit from './editVideo.svelte';
	import type { AddVideo, EditVideo, DeleteFeature } from './schema';

	let {
		data,
		editForm,
		deleteForm,
		videos
	}: {
		data: SuperValidated<Infer<AddVideo>>;
		editForm: SuperValidated<Infer<EditVideo>>;
		deleteForm: SuperValidated<Infer<DeleteFeature>>;
		videos: any[];
	} = $props();
	const columns = [
		{
			accessorKey: 'index',
			header: '#',
			cell: (info) => info.row.index + 1,
			sortable: false
		},

		{
			accessorKey: 'videoUrl',
			header: 'Video',
			sortable: true,
			cell: ({ row }) => {
				return renderComponent(VideoViewer, {
					videoUrl: row.original.videoUrl
				});
			}
		},
		{
			accessorKey: 'url',
			header: ({ column }) =>
				renderComponent(DataTableSort, {
					name: 'URL',
					onclick: column.getToggleSortingHandler()
				}),
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return renderComponent(Edit, {
					id: row.original.id,
					videoUrl: row.original.videoUrl,
					action: '?/editVideo',
					data: editForm,
					icon: false
				});
			}
		},

		{
			accessorKey: '',
			header: 'Edit',
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return renderComponent(Edit, {
					id: row.original.id,
					videoUrl: row.original.videoUrl,
					action: '?/editVideo',
					data: editForm,
					icon: true
				});
			}
		},
		{
			accessorKey: '',
			header: 'Delete',
			sortable: true,
			cell: ({ row }) => {
				// You can pass whatever you need from `row.original` to the component
				return renderComponent(Delete, {
					id: row.original.id,
					action: '?/deleteVideo',
					data: deleteForm
				});
			}
		}
	];

	import LoadingBtn from '$lib/formComponents/LoadingBtn.svelte';
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';

	import InputComp from '$lib/formComponents/InputComp.svelte';

	const { form, errors, enhance, delayed, message } = superForm(data, {
		onUpdated({ form }) {
			if (form.message?.type === 'error') {
				toast.error(form.message.text);
			} else {
				toast.success(form.message.text);
			}
		}
	});
	import { toast } from 'svelte-sonner';
	import DialogComp from '$lib/formComponents/DialogComp.svelte';
	import BigText from '$lib/components/Table/bigText.svelte';
	import Delete from './deleteVideo.svelte';
	import VideoViewer from '$lib/components/Table/videoViewer.svelte';
	// $effect(() => {
	// 	if ($message) {
	// 		if ($message.type === 'error') {
	// 			toast.error($message.text);
	// 		} else {
	// 			toast.success($message.text);
	// 		}
	// 	}
	// });
</script>

{#key videos}
	<DialogComp title="Add New Video" variant="default" IconComp={Plus}>
		<div class="flex flex-col items-center justify-center gap-4 pt-4">
			<form
				method="post"
				action="?/addVideo"
				use:enhance
				class="flex w-full flex-col gap-3"
				enctype="multipart/form-data"
			>
				<InputComp
					{form}
					{errors}
					label="Video URL"
					type="url"
					name="videoUrl"
					placeholder="Enter Video URL"
					required={true}
				/>

				<Button type="submit" size="lg">
					{#if $delayed}
						<LoadingBtn name="Saving Feature" />
					{:else}
						<Save /> Save Changes
					{/if}
				</Button>
			</form>
		</div>
	</DialogComp>

	<DataTable {columns} data={videos} fileName="Videos" search={true} />
{/key}
