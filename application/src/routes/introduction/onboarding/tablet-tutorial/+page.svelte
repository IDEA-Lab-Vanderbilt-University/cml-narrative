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
	import Introduction from "$lib/components/sequences/tablet/tablet-tutorial/Introduction.svelte";
	import SpotApplication from "$lib/components/sequences/tablet/tablet-tutorial/SpotApplication.svelte";
	import MegaJoulesMeter from "$lib/components/tablet/MegaJoulesMeter.svelte";
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
            if (line.id == 9){
                goto("/introduction/bot-buddy?page=1")
            } else {
                goto(`/introduction/onboarding/tablet-tutorial?page=${line.id + 1}`)

            }

        } else if (direction == NavigationDirection.backward && line.id > 1) {
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
            {#if line.id == 1}
                <Introduction />
            {:else if line.id == 2}
                <SpotApplication title="Travel Log" img="/img/icons/journal.png" />
            {:else if line.id == 3}
                <SpotApplication title="Profile" img="/img/icons/profile.png" />
            {:else if line.id == 4}
                <SpotApplication title="Badges" img="/img/icons/award.png" />
            {:else if line.id == 5}
                <SpotApplication title="Settings" img="/img/icons/settings.png" />
            {:else if line.id == 6 || line.id == 7 || line.id == 8}
                <div class="flex justify-center items-center h-full">
                    <MegaJoulesMeter amount={5}/>
                </div>
            {:else if line.id == 9}
                <Introduction />
            {/if}

        </div>
        <button class={`px-2 `} on:click={() => handleNavigation(NavigationDirection.forward)}>
            <p class="bg-lapiz-blue text-white text-3xl w-fit p-8 rounded-full hover:opacity-80 transition-all ease-in-out duration-200">➜</p>
        </button>
    </div>
    <div class="absolute inset-0 flex justify-center items-end z-10 h-fit mt-auto  shadow-md bg-jet">
        <!-- TODO: Improve layout of TabletDialogBox -->
        <TabletDialogBox line={line}/>
    </div>  

</div>
