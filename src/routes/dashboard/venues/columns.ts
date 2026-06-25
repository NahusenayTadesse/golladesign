import { renderComponent } from '$lib/components/ui/data-table/index.js';
import DataTableLinks from '$lib/components/Table/data-table-links.svelte';
import DataTableActions from './data-table-actions.svelte';
import DataTableSort from '$lib/components/Table/data-table-sort.svelte';
import ImageViewer from '$lib/components/Table/image-viewer.svelte';
import PriceList from './priceList.svelte';
import { formatEthiopianDate } from '$lib/global.svelte';
import BigText from '$lib/components/Table/bigText.svelte';
import Statuses from '$lib/components/Table/statuses.svelte';

export const columns = [
	{
		accessorKey: 'index',
		header: '#',
		cell: (info) => info.row.index + 1,
		sortable: false
	},

	{
		accessorKey: 'featuredImage',
		header: 'Featured Image',
		sortable: true,
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(ImageViewer, {
				src: row.original.featuredImage,
				alt: row.original.name
			});
		}
	},

	{
		accessorKey: 'name',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Name',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(DataTableLinks, {
				id: row.original.id,
				name: row.original.name,
				link: '/dashboard/venues/single'
			});
		}
	},

	{
		accessorKey: 'capacity',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Capacity',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true
	},

	{
		accessorKey: 'features',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Number of Features',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true,
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return row.original.features + ' features';
		}
	},

	{
		accessorKey: 'location',
		header: ({ column }) =>
			renderComponent(DataTableSort, {
				name: 'Location',
				onclick: column.getToggleSortingHandler()
			}),
		sortable: true
	},

	{
		accessorKey: 'bookingPolicy',
		header: 'Booking Policy',

		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(BigText, {
				text: row.original.bookingPolicy
			});
		}
	},

	{
		accessorKey: 'description',
		header: 'Description',

		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(BigText, {
				text: row.original.description
			});
		}
	},
	{
		accessorKey: 'enableLottery',
		header: 'Lottery',

		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(Statuses, {
				status: row.original.enableLottery ? 'Yes' : 'No'
			});
		}
	}
];
