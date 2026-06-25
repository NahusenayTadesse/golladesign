<script>
	import { ExternalLink } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	let { href } = $props();
</script>

<Button {href} target="_blank">
	<ExternalLink />
	View on Site
</Button>
