<script lang="ts">
	import { Dialog, DialogContent, DialogTrigger } from '$lib/components/ui/dialog';
	import { ImageIcon, FileTextIcon, ZoomInIcon, ZoomOutIcon, RotateCcwIcon } from '@lucide/svelte';

	interface Props {
		src: string;
		alt?: string;
		class?: string;
	}

	const { src, alt = 'File', class: className = '' }: Props = $props();

	let isOpen = $state(false);
	let hasError = $state(false);

	const isPdf = $derived(src.toLowerCase().endsWith('.pdf'));

	// Zoom/pan state
	let scale = $state(1);
	let translateX = $state(0);
	let translateY = $state(0);
	let isDragging = $state(false);
	let dragStart = $state({ x: 0, y: 0 });

	const MIN_SCALE = 1;
	const MAX_SCALE = 8;

	const handleError = () => {
		hasError = true;
	};

	const reset = () => {
		scale = 1;
		translateX = 0;
		translateY = 0;
	};

	const clampTranslate = (x: number, y: number) => {
		// Allow panning proportional to zoom level
		const maxX = (scale - 1) * 400;
		const maxY = (scale - 1) * 300;
		return {
			x: Math.max(-maxX, Math.min(maxX, x)),
			y: Math.max(-maxY, Math.min(maxY, y))
		};
	};

	const zoom = (delta: number, originX = 0, originY = 0) => {
		const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale * delta));

		// Zoom toward the cursor/pinch origin
		const scaleRatio = newScale / scale;
		const newX = originX + (translateX - originX) * scaleRatio;
		const newY = originY + (translateY - originY) * scaleRatio;

		scale = newScale;
		const clamped = clampTranslate(newX, newY);
		translateX = clamped.x;
		translateY = clamped.y;

		if (scale === MIN_SCALE) {
			translateX = 0;
			translateY = 0;
		}
	};

	const onWheel = (e: WheelEvent) => {
		e.preventDefault();
		const delta = e.deltaY < 0 ? 1.15 : 1 / 1.15;
		zoom(delta);
	};

	const onPointerDown = (e: PointerEvent) => {
		if (scale === 1) return;
		isDragging = true;
		dragStart = { x: e.clientX - translateX, y: e.clientY - translateY };
		(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
	};

	const onPointerMove = (e: PointerEvent) => {
		if (!isDragging) return;
		const newX = e.clientX - dragStart.x;
		const newY = e.clientY - dragStart.y;
		const clamped = clampTranslate(newX, newY);
		translateX = clamped.x;
		translateY = clamped.y;
	};

	const onPointerUp = () => {
		isDragging = false;
	};

	const onDblClick = (e: MouseEvent) => {
		if (scale > 1) {
			reset();
		} else {
			zoom(2.5);
		}
	};

	// Pinch-to-zoom
	let lastPinchDistance = $state(0);

	const onTouchStart = (e: TouchEvent) => {
		if (e.touches.length === 2) {
			const dx = e.touches[0].clientX - e.touches[1].clientX;
			const dy = e.touches[0].clientY - e.touches[1].clientY;
			lastPinchDistance = Math.hypot(dx, dy);
		}
	};

	const onTouchMove = (e: TouchEvent) => {
		if (e.touches.length === 2) {
			e.preventDefault();
			const dx = e.touches[0].clientX - e.touches[1].clientX;
			const dy = e.touches[0].clientY - e.touches[1].clientY;
			const distance = Math.hypot(dx, dy);
			if (lastPinchDistance > 0) {
				zoom(distance / lastPinchDistance);
			}
			lastPinchDistance = distance;
		}
	};

	// Reset on close
	$effect(() => {
		if (!isOpen) reset();
	});
</script>

<Dialog bind:open={isOpen}>
	<DialogTrigger>
		{#snippet child({ props })}
			<button
				{...props}
				class="group relative {className} size-12 overflow-hidden rounded-md border border-border bg-muted transition-all hover:ring-2 hover:ring-ring hover:ring-offset-2 hover:ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden"
			>
				{#if isPdf}
					<div class="flex size-full items-center justify-center">
						<FileTextIcon
							class="size-5 text-muted-foreground transition-transform group-hover:scale-110"
						/>
					</div>
				{:else if hasError}
					<div class="flex size-full items-center justify-center">
						<ImageIcon class="size-5 text-muted-foreground" />
					</div>
				{:else}
					<img
						src="/files/{src}"
						{alt}
						class="size-full object-cover transition-transform group-hover:scale-110"
						onerror={handleError}
					/>
				{/if}
			</button>
		{/snippet}
	</DialogTrigger>

	<DialogContent class="h-auto w-full p-2">
		{#if isPdf}
			<div class="relative h-[90vh] w-full overflow-hidden rounded-md bg-muted">
				<embed src="/files/{src}" type="application/pdf" class="size-full" />
			</div>
		{:else}
			<!-- Controls -->
			<div class="mb-1 flex items-center justify-end gap-1 pr-8">
				<button
					onclick={() => zoom(1.5)}
					class="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
					aria-label="Zoom in"
				>
					<ZoomInIcon class="size-4" />
				</button>
				<button
					onclick={() => zoom(1 / 1.5)}
					class="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
					aria-label="Zoom out"
				>
					<ZoomOutIcon class="size-4" />
				</button>
				<button
					onclick={reset}
					class="rounded p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
					aria-label="Reset"
				>
					<RotateCcwIcon class="size-4" />
				</button>
				<span class="ml-1 min-w-10 text-right text-xs text-muted-foreground">
					{Math.round(scale * 100)}%
				</span>
			</div>

			<!-- Image container -->
			<div
				class="relative aspect-video w-full overflow-hidden rounded-md bg-muted select-none"
				style="cursor: {isDragging ? 'grabbing' : scale > 1 ? 'grab' : 'zoom-in'}"
				onwheel={onWheel}
				onpointerdown={onPointerDown}
				onpointermove={onPointerMove}
				onpointerup={onPointerUp}
				onpointerleave={onPointerUp}
				ondblclick={onDblClick}
				ontouchstart={onTouchStart}
				ontouchmove={onTouchMove}
				role="img"
				aria-label={alt}
			>
				{#if hasError}
					<div class="flex size-full items-center justify-center">
						<div class="flex flex-col items-center gap-2 text-muted-foreground">
							<ImageIcon class="size-12" />
							<span class="text-sm">Failed to load image</span>
						</div>
					</div>
				{:else}
					<img
						src="/files/{src}"
						{alt}
						class="size-full object-contain"
						style="transform: translate({translateX}px, {translateY}px) scale({scale}); transform-origin: center; transition: {isDragging
							? 'none'
							: 'transform 0.1s ease-out'}"
						onerror={handleError}
						draggable="false"
					/>
				{/if}
			</div>
		{/if}

		{#if alt && alt !== 'File'}
			<p class="mt-2 text-center text-sm text-muted-foreground">{alt}</p>
		{/if}
	</DialogContent>
</Dialog>
