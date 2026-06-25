<script lang="ts">
	interface Props {
		videoUrl: string;
	}

	let { videoUrl }: Props = $props();

	let videoId = $derived.by(() => {
		const regex =
			/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
		const match = videoUrl?.match(regex);
		return match ? match[1] : null;
	});
</script>

<div
	class="relative aspect-video w-full max-w-80 min-w-20 overflow-hidden rounded-lg border bg-muted"
>
	<iframe
		src="https://www.youtube.com/embed/{videoId}"
		title="YouTube video player"
		frameborder="0"
		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
		allowfullscreen
		class="absolute inset-0 h-full w-full"
	></iframe>
</div>
