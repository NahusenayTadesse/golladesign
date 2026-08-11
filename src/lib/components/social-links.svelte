<script lang="ts">
	import {
		IconBrandInstagram,
		IconBrandLinkedin,
		IconBrandTiktok,
		IconBrandFacebook,
		IconBrandWhatsapp
	} from '@tabler/icons-svelte';
	import { socialLinks } from '$lib/site';

	const icons = {
		facebook: IconBrandFacebook,
		instagram: IconBrandInstagram,
		tiktok: IconBrandTiktok,
		linkedin: IconBrandLinkedin,
		whatsapp: IconBrandWhatsapp
	};

	let { layout = 'row', class: className = '' }: { layout?: 'row' | 'grid'; class?: string } =
		$props();
</script>

<div class={[layout === 'grid' ? 'grid grid-cols-2 gap-3' : 'flex flex-wrap gap-2.5', className]}>
	{#each socialLinks as social (social.name)}
		{@const Icon = icons[social.icon]}
		<a
			href={social.url}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={social.name}
			title={social.name}
			class={[
				'flex items-center justify-center rounded-xl border border-border/60 bg-background text-muted-foreground transition-all',
				'hover:border-primary hover:bg-secondary hover:text-primary active:scale-95 active:bg-secondary',
				layout === 'grid' ? 'flex-col gap-2 p-4' : 'size-11'
			]}
		>
			<Icon class="size-5" />
			{#if layout === 'grid'}
				<span class="text-xs font-semibold">{social.name}</span>
			{/if}
		</a>
	{/each}
</div>
