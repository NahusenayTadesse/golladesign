<script lang="ts">
    import { CompassIcon } from "@lucide/svelte";
</script>

<section class="relative overflow-hidden bg-background py-24 px-4">
    <!-- Architectural Grid & Geometric Vector Art Base -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(circle_at_center,#000_60%,transparent_100%)] opacity-20"></div>
    
    <!-- Abstract Drafting Crosshairs in Background -->
    <div class="absolute inset-y-0 left-1/2 w-[1px] bg-border/40"></div>
    <div class="absolute inset-x-0 top-1/2 h-[1px] bg-border/40"></div>
    
    <!-- Accent Glow -->
    <div class="absolute -top-48 left-1/2 size-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"></div>

    <div class="relative mx-auto max-w-4xl text-center">
        <!-- Structural Badge -->
        <div class="mb-8 inline-flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-4 py-2 font-mono text-xs uppercase tracking-widest text-primary shadow-xs">
            <CompassIcon class="size-4" />
            <span>Structural Synthesis . 01 </span>
        </div>

        <div class="relative mb-8">
            <!-- Technical Drafting Crop Marks around Header -->
            <span class="absolute -top-4 -left-4 size-4 border-t-2 border-l-2 border-border/60"></span>
            <span class="absolute -top-4 -right-4 size-4 border-t-2 border-r-2 border-border/60"></span>
            <span class="absolute -bottom-4 -left-4 size-4 border-b-2 border-l-2 border-border/60"></span>
            <span class="absolute -bottom-4 -right-4 size-4 border-b-2 border-r-2 border-border/60"></span>

            <h1 class="p-4 text-4xl font-black tracking-tighter text-foreground uppercase sm:text-6xl lg:text-7xl">
                Why Choose <span class="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">Golla</span>?
            </h1>
        </div>

        <p class="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            We eliminate the gap between blueprint conceptualization and physical execution. By unifying spatial planning, premium material finishes, and in-house bespoke furniture manufacturing under a single technical vision, we build environments that look custom and perform perfectly.
        </p>

        <!-- Dynamic Architectural Scale / Technical Tagline -->
     
    </div>
</section>