<script lang="ts">
    import { EyeIcon, CompassIcon } from "@lucide/svelte";
</script>

<section class="py-24 px-6 bg-background relative overflow-hidden">
    <!-- Subtle architectural background grid lines -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary-rgb),0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary-rgb),0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
    
    <div class="mx-auto max-w-5xl relative z-10">
        <div class="grid md:grid-cols-2 gap-0 border border-primary/10 rounded-3xl overflow-hidden bg-card/30 backdrop-blur-sm">
            
            <!-- Vision Section -->
            <div class="group relative p-10 md:p-14 border-b md:border-b-0 md:border-r border-primary/10 transition-all duration-500 hover:bg-primary/[0.02]">
                <!-- Corner Blueprint Accents (Only visible on hover) -->
                <div class="absolute top-4 left-4 size-4 border-t border-l border-primary/0 transition-all duration-300 group-hover:border-primary/40 group-hover:scale-110"></div>
                <div class="absolute bottom-4 right-4 size-4 border-b border-r border-primary/0 transition-all duration-300 group-hover:border-primary/40 group-hover:scale-110"></div>
                
                <!-- Huge, elegant background number -->
                <div class="absolute right-8 top-6 text-8xl font-extrabold text-primary/[0.03] select-none transition-all duration-500 group-hover:text-primary/[0.06] group-hover:-translate-y-2">
                    01
                </div>

                <div class="flex flex-col h-full justify-between gap-12">
                    <div class="inline-flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-background text-primary shadow-sm transition-transform duration-500 group-hover:rotate-[360deg]">
                        <EyeIcon class="size-5" />
                    </div>

                    <div class="space-y-4">
                        <span class="text-xs font-semibold tracking-widest text-primary/60 uppercase">The Destination</span>
                        <h3 class="text-3xl font-light tracking-tight text-foreground">
                            Our <strong class="font-semibold text-primary">Vision</strong>
                        </h3>
                        <p class="text-base md:text-lg leading-relaxed text-muted-foreground font-light">
                            To become East Africa's benchmark for bespoke architecture and high-end interior systems, renowned for flawlessly blending aesthetic sophistication with practical lifestyle utility.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Mission Section -->
            <div class="group relative p-10 md:p-14 transition-all duration-500 hover:bg-primary/[0.02]">
                <!-- Corner Blueprint Accents -->
                <div class="absolute top-4 left-4 size-4 border-t border-l border-primary/0 transition-all duration-300 group-hover:border-primary/40 group-hover:scale-110"></div>
                <div class="absolute bottom-4 right-4 size-4 border-b border-r border-primary/0 transition-all duration-300 group-hover:border-primary/40 group-hover:scale-110"></div>
                
                <!-- Huge, elegant background number -->
                <div class="absolute right-8 top-6 text-8xl font-extrabold text-primary/[0.03] select-none transition-all duration-500 group-hover:text-primary/[0.06] group-hover:-translate-y-2">
                    02
                </div>

                <div class="flex flex-col h-full justify-between gap-12">
                    <div class="inline-flex size-12 items-center justify-center rounded-xl border border-primary/20 bg-background text-primary shadow-sm transition-transform duration-500 group-hover:rotate-[360deg]">
                        <CompassIcon class="size-5" />
                    </div>

                    <div class="space-y-4">
                        <span class="text-xs font-semibold tracking-widest text-primary/60 uppercase">The Journey</span>
                        <h3 class="text-3xl font-light tracking-tight text-foreground">
                            Our <strong class="font-semibold text-primary">Mission</strong>
                        </h3>
                        <p class="text-base md:text-lg leading-relaxed text-muted-foreground font-light">
                            To design and craft inspiring, enduring environments by integrating precision architectural blueprints, advanced structural surface finishes, and custom luxury furniture fabrication.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>