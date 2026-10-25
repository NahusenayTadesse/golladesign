<script lang="ts">
	import { EyeIcon, CompassIcon } from '@lucide/svelte';
</script>

<section class="relative overflow-hidden bg-background px-6 py-24">
	<!-- Subtle architectural background grid lines -->
	<div
		class="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary-rgb),0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary-rgb),0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"
	></div>

	<div class="relative z-10 mx-auto max-w-5xl">
		<div
			class="grid gap-0 overflow-hidden rounded-3xl border border-primary/10 bg-card/30 backdrop-blur-sm md:grid-cols-2"
		>
			<!-- Vision Section -->
			<div
				class="group relative border-b border-primary/10 p-10 transition-all duration-500 hover:bg-primary/[0.02] md:border-r md:border-b-0 md:p-14"
			>
				<!-- Corner Blueprint Accents (Only visible on hover) -->
				<div
					class="absolute top-4 left-4 size-4 border-t border-l border-primary/0 transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40"
				></div>
				<div
					class="absolute right-4 bottom-4 size-4 border-r border-b border-primary/0 transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40"
				></div>

				<!-- Huge, elegant background number -->
				<div
					aria-hidden="true"
					data-n="01"
					class="absolute top-6 right-8 text-8xl font-extrabold text-primary/[0.03] transition-all duration-500 select-none group-hover:-translate-y-2 group-hover:text-primary/[0.06] before:content-[attr(data-n)]"
				></div>

				<div class="flex h-full flex-col justify-between gap-12">
					<div
						class="inline-flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-background text-primary shadow-sm transition-transform duration-500 group-hover:rotate-[360deg]"
					>
						<EyeIcon class="size-5" />
					</div>

					<div class="space-y-4">
						<span class="text-xs font-semibold tracking-widest text-primary uppercase"
							>The Destination</span
						>
						<h3 class="text-3xl font-light tracking-tight text-foreground">
							Our <strong class="font-semibold text-primary">Vision</strong>
						</h3>
						<p class="text-base leading-relaxed font-light text-muted-foreground md:text-lg">
							To become East Africa's benchmark for bespoke architecture and high-end interior
							systems, renowned for flawlessly blending aesthetic sophistication with practical
							lifestyle utility.
						</p>
					</div>
				</div>
			</div>

			<!-- Mission Section -->
			<div class="group relative p-10 transition-all duration-500 hover:bg-primary/[0.02] md:p-14">
				<!-- Corner Blueprint Accents -->
				<div
					class="absolute top-4 left-4 size-4 border-t border-l border-primary/0 transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40"
				></div>
				<div
					class="absolute right-4 bottom-4 size-4 border-r border-b border-primary/0 transition-all duration-300 group-hover:scale-110 group-hover:border-primary/40"
				></div>

				<!-- Huge, elegant background number -->
				<div
					aria-hidden="true"
					data-n="02"
					class="absolute top-6 right-8 text-8xl font-extrabold text-primary/[0.03] transition-all duration-500 select-none group-hover:-translate-y-2 group-hover:text-primary/[0.06] before:content-[attr(data-n)]"
				></div>

				<div class="flex h-full flex-col justify-between gap-12">
					<div
						class="inline-flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-background text-primary shadow-sm transition-transform duration-500 group-hover:rotate-[360deg]"
					>
						<CompassIcon class="size-5" />
					</div>

					<div class="space-y-4">
						<span class="text-xs font-semibold tracking-widest text-primary uppercase"
							>The Journey</span
						>
						<h3 class="text-3xl font-light tracking-tight text-foreground">
							Our <strong class="font-semibold text-primary">Mission</strong>
						</h3>
						<p class="text-base leading-relaxed font-light text-muted-foreground md:text-lg">
							To design and craft inspiring, enduring environments by integrating precision
							architectural blueprints, advanced structural surface finishes, and custom luxury
							furniture fabrication.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
