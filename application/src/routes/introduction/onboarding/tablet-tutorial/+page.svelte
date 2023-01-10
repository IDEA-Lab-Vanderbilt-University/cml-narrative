<!--
 /src/routes/introduction/onboarding/tablet-tutorial/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script lang="ts">
	import { goto } from "$app/navigation";
	import TabletDialogBox from "$lib/components/dialog/TabletDialogBox.svelte";
	import { NavigationDirection } from "$lib/types/Enums";
	import type { Line } from "$lib/types/Script";

    /** @type {import('./$types').PageData} */
    export let data;

    let line: Line

    $: {
        line = data.line
    }

    /**
     * Check the keycode that has been emitted from a Keydown Event on the Window to determine how we should navigate the user 
     * through the scene.
     * 
     * Event keys were found by using the following site below:
     * 
     * https://www.toptal.com/developers/keycode
     * 
     * @param event Keyboard Event emitted from  the Window 
     * 
     */
    const handleKeydownEvent = (event: KeyboardEvent) => {
        switch (event.key) {
            case "ArrowRight":
            case " ":
                handleNavigation(NavigationDirection.forward)
                break;
            case "ArrowLeft":
                handleNavigation(NavigationDirection.backward)
            default:
                break;
        }
    }

    /**
     * Determine the state of the DialogEvent that was emitted. Then, we will navigate
     * the user to the appropriate url with appropriate querystring which represents
     * which line in the script should be returned to the user.
    */
    const handleNavigation = (direction: NavigationDirection) => {
        if (direction == NavigationDirection.forward) {
            if (false){
                goto("/introduction/onboarding")
            } else {
                goto(`/introduction/onboarding/tablet-tutorial?page=${line.id + 1}`)

            }

        } else if (direction == NavigationDirection.backward) {
            goto(`/introduction/onboarding/tablet-tutorial?page=${line.id - 1}`)

        }
    }

</script>

<svelte:window on:keydown|preventDefault={handleKeydownEvent} />

<div class="bg-gray-50 rounded-md w-full h-full relative z-0">
    <div class="w-full h-full bg-gray-50 rounded-md flex">
        <button class={`rotate-180 px-2 `} on:click={() => handleNavigation(NavigationDirection.backward)}>
            <p class="bg-lapiz-blue text-white text-3xl w-fit p-8 rounded-full hover:opacity-80 transition-all ease-in-out duration-200">➜</p>
        </button>
        <div class="w-full h-full">
            <slot />

        </div>
        <button class={`px-2 `} on:click={() => handleNavigation(NavigationDirection.forward)}>
            <p class="bg-lapiz-blue text-white text-3xl w-fit p-8 rounded-full hover:opacity-80 transition-all ease-in-out duration-200">➜</p>
        </button>
    </div>
    <div class="absolute inset-0 flex justify-center items-end z-10 h-fit mt-auto  shadow-md bg-jet">
        <TabletDialogBox line={line}/>
    </div>  

</div>
