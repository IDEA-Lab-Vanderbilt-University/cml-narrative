<!--
 /src/lib/components/tour/TourStep.svelte
 TourStep.svelte
 cml-narrative
 
 Created by Ian Thompson on May 30th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { onMount } from "svelte";
    import { tourManager } from "./TourManager";
    import { createPopper } from "@popperjs/core";
    import { fade } from 'svelte/transition';


    /** Determines wether the popover should be shown */
    let popoverShow = false;
    /** Determines if the TourStep component has mounted */
    let hasMounted = false

    /** Reference to the popover element */
    let popoverRef: HTMLElement;

    /**
     * $tourManager is a store that holds reactive data. This will be used to determine whether or not to 
     * show the popover and what to show within the popover. 
     * 
     * $: alerts Svelte to react when the value changes. We know that tourManager will change when we ask it to
     * show or hide the popover. When it changes, we call the managePopover method to actually show the popover
    */
    $: $tourManager, managePopover()


    const managePopover = () => {
        if (hasMounted) {
            popoverShow = $tourManager.showTour

            if (popoverShow) {
                console.log("placement: ", $tourManager);
                
                // Here, we are creating a reference to the desired element to attach the popover to
                let reference = document.querySelector($tourManager.attachTo)
                const arrow = document.querySelector("#arrow")

                // Finally, we are showing the popover.
                createPopper(reference ,popoverRef, {
                    placement: $tourManager.position,
                    modifiers: [
                        {
                            name: "offset",
                            options: {
                                offset: [10,20]
                            }
                        }, 
                        {
                            name: "arrow",
                            options: {
                                element: arrow
                            }
                        }
                    ]
                })
            }
        }
    }

    onMount(() => {
        // The component has now been mounted to the DOM
        hasMounted = true
    })
</script>



<div id="popover" bind:this={popoverRef} class="{popoverShow ? 'block':'hidden'}" >
    <div data-popper-arrow id="arrow"></div>
    {#if popoverShow}
        <div class="bg-teal-900 border-2 border-blue-700 text-white text-lg  mr-3 px-2 py-3 z-50 font-mono leading-normal max-w-xs text-left no-underline break-words rounded-lg bg-blend-darken bg-opacity-70" in:fade out:fade>
            {$tourManager.tourMessage}
        </div>
    {/if}
</div>



<slot />