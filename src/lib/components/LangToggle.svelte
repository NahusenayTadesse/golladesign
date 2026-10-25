<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import type { Lang } from '$lib/i18n';

	const lang: Lang = $derived(page.data.lang ?? 'en');
	const next: Lang = $derived(lang === 'en' ? 'am' : 'en');

	async function toggle() {
		document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
		await invalidateAll();
	}
</script>

<Button
	variant="ghost"
	size="sm"
	onclick={toggle}
	title={next === 'am' ? 'Switch to Amharic' : 'Switch to English'}
	class="h-10 min-w-10 px-2 text-xs font-bold tracking-wide"
>
	<span class="sr-only">Language:</span>
	<span lang={next}>{next === 'am' ? 'አማ' : 'EN'}</span>
</Button>
