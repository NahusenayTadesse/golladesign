<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button, type ButtonVariant } from '$lib/components/ui/button/index.js';
	import { Trash } from '@lucide/svelte';
	import type { Snippet } from 'svelte';
	import type { Component } from 'svelte';
	import type { IconProps } from '@lucide/svelte';

	let {
		title,
		children,
		variant,
		IconComp,

		class: className = ''
	}: {
		title: string;
		children: Snippet;
		variant: ButtonVariant;
		IconComp?: Component<IconProps>;
		class?: string;
	} = $props();
</script>

<Dialog.Root>
	<Dialog.Trigger class="w-auto border-0">
		{#snippet child({ props })}
			<Button size="lg" class="border-0" {variant} {...props}>
				{#if variant === 'destructive'}
					<Trash />
				{/if}
				{#if IconComp}
					<IconComp />
				{/if}
				{title}
			</Button>
		{/snippet}
	</Dialog.Trigger>
	<!-- Full width on phones, capped on larger screens. The old `w-lg!` forced a
	     512px box regardless of the viewport. -->
	<Dialog.Content class="w-full sm:max-w-lg! {className}">
		<Dialog.Header>
			<Dialog.Title>{title}</Dialog.Title>
		</Dialog.Header>
		<!-- Vertical scrolling is handled by Dialog.Content itself, so the body
		     only needs to guard against wide fields. The previous `max-h-96`
		     clipped anything below ~384px with no way to scroll to it. -->
		<div class="w-full min-w-0 overflow-x-auto px-1">
			{@render children()}
		</div>
	</Dialog.Content>
</Dialog.Root>
