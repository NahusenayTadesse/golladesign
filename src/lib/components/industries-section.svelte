<script lang="ts">
    import { Badge } from "$lib/components/ui/badge";
    import { 
        Building2Icon, 
        HomeIcon, 
        HotelIcon, 
        StoreIcon, 
        HammerIcon, 
        FileTextIcon,
        CompassIcon
    } from "@lucide/svelte";

    const sectors = [
        { 
            id: "01",
            icon: Building2Icon, 
            name: "Corporate Headquarters", 
            tag: "Workspace Planning", 
            scale: "SCALE 1:100",
            coordinates: "X: 142.08 // Y: 902.14",
            specs: "Modular acoustic partitions, high-density utility integration, custom executive boardroom interfaces."
        },
        { 
            id: "02",
            icon: HomeIcon, 
            name: "Luxury Residential", 
            tag: "Bespoke Living", 
            scale: "SCALE 1:20",
            coordinates: "X: 304.55 // Y: 112.80",
            specs: "Architectural millwork, structural fireplace assemblies, custom concealed door systems."
        },
        { 
            id: "03",
            icon: HotelIcon, 
            name: "Hospitality & Lounges", 
            tag: "Atmosphere Design", 
            scale: "SCALE 1:50",
            coordinates: "X: 890.12 // Y: 445.67",
            specs: "Sensory lighting integration, high-traffic custom furniture, spatial flow analysis."
        },
        { 
            id: "04",
            icon: StoreIcon, 
            name: "Premium Retail & Showrooms", 
            tag: "Spatial Branding", 
            scale: "SCALE 1:30",
            coordinates: "X: 521.19 // Y: 713.88",
            specs: "Focal product staging structures, modular display systems, integrated perimeter illumination."
        },
        { 
            id: "05",
            icon: HammerIcon, 
            name: "Property Developers", 
            tag: "Execution Coordination", 
            scale: "SCALE 1:200",
            coordinates: "X: 771.04 // Y: 290.15",
            specs: "Multi-unit design systematization, fabrication logistics scheduling, core assembly drafting."
        },
        { 
            id: "06",
            icon: FileTextIcon, 
            name: "Design & Architectural Firms", 
            tag: "Technical Partnership", 
            scale: "SCALE 1:10",
            coordinates: "X: 954.22 // Y: 808.91",
            specs: "Detailed joinery design consults, raw substrate calculation, seamless direct CNC integration."
        },
    ];

    let activeIndex = 0;
</script>

<section class="relative overflow-hidden py-24 px-6 bg-background">
    <!-- Architectural grid layout -->
    <div class="absolute inset-0 bg-[linear-gradient(to_right,rgba(var(--primary-rgb),0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(var(--primary-rgb),0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>

    <div class="relative z-10 mx-auto max-w-6xl">
        <!-- Technical Header -->
        <div class="mb-16 border-b border-primary/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div class="space-y-4 max-w-2xl">
                <div class="flex items-center gap-2">
                    <Badge variant="outline" class="border-primary/30 bg-primary/5 px-3 py-0.5 font-mono text-[10px] tracking-widest text-primary uppercase">
                        [ SECTOR MATRIX 02 ]
                    </Badge>
                </div>
                <h2 class="text-4xl font-extralight tracking-tight text-foreground uppercase sm:text-5xl">
                    Ecosystems We <span class="font-bold text-primary">Shape</span>
                </h2>
                <p class="text-base text-muted-foreground font-light">
                    We adapt our structural layout methodologies and custom millwork workflows to targets requiring uncompromising, tailor-made spatial quality.
                </p>
            </div>
            
            <div class="font-mono text-xs text-muted-foreground/50 text-right hidden md:block">
                <span>ADDIS ABABA // EST. 2018</span><br />
                <span>LAT: 9.0300° N // LON: 38.7400° E</span>
            </div>
        </div>

        <!-- Interactive Split Board -->
        <div class="grid lg:grid-cols-12 gap-8 items-start">
            
            <!-- Left: Dynamic Viewport Panel (Interactive CAD Box) -->
            <div class="lg:col-span-5 border border-primary/15 rounded-2xl bg-card/20 backdrop-blur-md p-8 relative overflow-hidden sticky top-8">
                <!-- Outer Plotter Corner Crosshairs -->
                <div class="absolute top-2 left-2 font-mono text-[8px] text-primary/30">+ 0,0</div>
                <div class="absolute bottom-2 right-2 font-mono text-[8px] text-primary/30">+ 1000,1000</div>
                
                <!-- Dynamic Content Container -->
                <div class="space-y-8 min-h-[340px] flex flex-col justify-between">
                    <div>
                        <!-- Rotating Compass HUD element -->
                        <div class="flex items-center justify-between mb-8">
                            <div class="flex items-center gap-2">
                                <span class="size-2 rounded-full bg-primary animate-ping"></span>
                                <span class="font-mono text-xs uppercase tracking-wider text-primary">Live Viewport</span>
                            </div>
                            <CompassIcon class="size-5 text-primary/40 animate-spin" style="animation-duration: 20s" />
                        </div>

                        <!-- Active Technical Specs -->
                        <div class="space-y-3">
                            <span class="font-mono text-xs text-primary/60">{sectors[activeIndex].scale} // {sectors[activeIndex].coordinates}</span>
                            <h3 class="text-3xl font-extralight text-foreground tracking-tight">
                                {sectors[activeIndex].name}
                            </h3>
                            <div class="h-[1px] w-full bg-gradient-to-r from-primary/30 to-transparent my-4"></div>
                            <p class="text-sm leading-relaxed text-muted-foreground font-light">
                                {sectors[activeIndex].specs}
                            </p>
                        </div>
                    </div>

                    <!-- Bottom Specs Footer -->
                    <div class="font-mono text-[10px] text-muted-foreground/40 border-t border-primary/5 pt-4 flex justify-between">
                        <span>DWG REF: SEC-{sectors[activeIndex].id}</span>
                        <span>STATUS: ACTIVE_SPEC</span>
                    </div>
                </div>
            </div>

            <!-- Right: Architectural Interactive List -->
            <div class="lg:col-span-7 flex flex-col">
                {#each sectors as sector, index}
                    <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                    <div 
                        class="group relative py-8 px-4 md:px-8 border-b border-primary/10 flex items-center justify-between cursor-pointer transition-all duration-300 {activeIndex === index ? 'bg-primary/[0.02]' : 'hover:bg-primary/[0.01]'}"
                        on:mouseover={() => activeIndex = index}
                    >
                        <!-- Active Dimension line (Visual Slide Line) -->
                        <div class="absolute left-0 top-0 bottom-0 w-[3px] bg-primary transition-all duration-300 scale-y-0 origin-center {activeIndex === index ? 'scale-y-100' : ''}"></div>

                        <div class="flex items-center gap-6">
                            <!-- Number Indicator inside architectural brackets -->
                            <span class="font-mono text-sm transition-all duration-300 {activeIndex === index ? 'text-primary font-bold' : 'text-muted-foreground/40'}">
                                [{sector.id}]
                            </span>

                            <div class="space-y-1">
                                <h4 class="text-lg md:text-xl font-medium tracking-tight text-foreground transition-all duration-300 group-hover:text-primary">
                                    {sector.name}
                                </h4>
                                <p class="text-xs font-mono text-muted-foreground/60 tracking-wider">
                                    // {sector.tag}
                                </p>
                            </div>
                        </div>

                        <!-- Technical Icon Outer Shell -->
                        <div class="flex items-center gap-4">
                            <div class="size-10 rounded-lg border flex items-center justify-center transition-all duration-300 
                                {activeIndex === index 
                                    ? 'border-primary/40 bg-primary/10 text-primary scale-110' 
                                    : 'border-border bg-background text-muted-foreground group-hover:border-primary/20 group-hover:text-primary'
                                }"
                            >
                                <svelte:component this={sector.icon} class="size-4" />
                            </div>
                        </div>
                    </div>
                {/each}
            </div>

        </div>
    </div>
</section>