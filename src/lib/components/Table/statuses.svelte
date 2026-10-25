<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { BadgeCheck, Loader, OctagonMinus } from '@lucide/svelte';

	/* ---------- public prop ---------- */
	interface Props {
		status: string;
	}
	let { status }: Props = $props();

	/* ---------- lookup tables ---------- */
	const statusMeta = {
		/* confirmed / paid */
		confirmed: { icon: BadgeCheck, colour: 'bg-green-400' },
		paid: { icon: BadgeCheck, colour: 'bg-green-400' },

		complete: { icon: BadgeCheck, colour: 'bg-green-400' },
		incomplete: { icon: OctagonMinus, colour: 'bg-red-500' },

		/* cancelled / unpaid */
		cancelled: { icon: OctagonMinus, colour: 'bg-red-500' },
		unpaid: { icon: OctagonMinus, colour: 'bg-red-500' },
		dead: { icon: OctagonMinus, colour: 'bg-red-500' },

		/* pending */
		pending: { icon: Loader, colour: 'bg-yellow-500' },
		delivered: { icon: BadgeCheck, colour: 'bg-green-400' },
		read: { icon: BadgeCheck, colour: 'bg-green-400' },

		/* active */
		active: { icon: BadgeCheck, colour: 'bg-green-400' },
		contracted: { icon: BadgeCheck, colour: 'bg-green-400' },
		inactive: { icon: OctagonMinus, colour: 'bg-red-500' },

		yes: { icon: BadgeCheck, colour: 'bg-green-400' },
		no: { icon: OctagonMinus, colour: 'bg-red-500' },

		unremovable: { icon: BadgeCheck, colour: 'bg-green-400' },
		removable: { icon: OctagonMinus, colour: 'bg-red-500' },

		/* content publishing */
		published: { icon: BadgeCheck, colour: 'bg-green-600' },
		draft: { icon: Loader, colour: 'bg-yellow-600' },
		archived: { icon: OctagonMinus, colour: 'bg-gray-600' },

		/* leads */
		new: { icon: Loader, colour: 'bg-blue-600' },
		contacted: { icon: Loader, colour: 'bg-yellow-600' },
		in_progress: { icon: Loader, colour: 'bg-yellow-600' },
		proposal_sent: { icon: Loader, colour: 'bg-purple-600' },
		replied: { icon: BadgeCheck, colour: 'bg-green-600' },
		won: { icon: BadgeCheck, colour: 'bg-green-600' },
		closed: { icon: OctagonMinus, colour: 'bg-gray-600' },
		lost: { icon: OctagonMinus, colour: 'bg-red-600' },

		/* fallback */
		unknown: { icon: Loader, colour: 'bg-gray-500' }
	} as const;

	/* ---------- derived ---------- */
	const key = $derived(String(status).trim().toLowerCase() as keyof typeof statusMeta);
	const meta = $derived(statusMeta[key] ?? statusMeta.unknown);
	const Icon = $derived(meta.icon);
</script>

<Badge variant="secondary" class="{meta.colour} text-white capitalize">
	<Icon />
	{String(status).replace(/_/g, ' ')}
</Badge>
