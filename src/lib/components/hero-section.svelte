<script lang="ts">
	import { SparklesIcon } from "@lucide/svelte";
</script>

<section class="relative overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20 px-4">
	<!-- Background decoration -->
	<div class="absolute inset-0 overflow-hidden">
		<div class="absolute -top-40 -right-40 size-80 rounded-full bg-primary/10 blur-3xl"></div>
		<div class="absolute -bottom-40 -left-40 size-80 rounded-full bg-primary/5 blur-3xl"></div>
	</div>

	<div class="relative mx-auto max-w-4xl text-center">
		<div class="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
			<SparklesIcon class="size-4" />
			<span>Ethiopia's Premier Event Company</span>
		</div>

		<h1 class="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
			Why Choose <span class="text-primary">Yebehir</span>
			?
		</h1>

		<p class="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">We create memorable experiences that strengthen brand visibility and forge lasting customer connections across Ethiopia.</p>
	</div>
</section>
