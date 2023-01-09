<!--
 /src/routes/introduction/onboarding/create-profile/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 9th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->


<script lang="ts">
	import { goto } from "$app/navigation";
	import Age from "$lib/components/sequences/tablet/create-profile/Age.svelte";
	import Name from "$lib/components/sequences/tablet/create-profile/Name.svelte";
	import TabletNavigationController from "$lib/components/tablet/TabletNavigationController.svelte";
	import { NavigationDirection } from "$lib/types/Enums";

    /** @type {import('./$types').PageData} */
    export let data;

    /**
     * Current page number which represents the position in the create-profile sequence. This 
     * will get set from the response from +page.ts as a querystring 
     */ 
    let page: number;

    /**
     * Base URL for which we will use for navigation within the create-profile sequence
     */
    let baseNavigationURL = "/introduction/onboarding/create-profile?page="

    const numberOfPageSequences = 2
    
    let profileData = {
        name: {
            first: "",
            last: ""
        }, 
        age: 0,
        
    }

    $: {
        /**
         * page is reactive and dependednt on what is being returned from the "server." Here,
         * we are telling Svelte to keep its eye on when the page value changes so we can
         * react to it.
        */
        page = data.page
    }

    /**
     * Progress the user through the profile creation sequence
     * @param direction NavigationDirection enum representing the direction of navigation
     */
    const handleNavigation = (direction: NavigationDirection) => {
        if (direction == NavigationDirection.backward) {
            goto(baseNavigationURL + (page - 1))
        } else if (direction == NavigationDirection.forward) {
            goto(baseNavigationURL + (page + 1))
        }
    }

</script>

<div class="w-full h-full bg-gray-50 rounded-md flex">
    <button class={`rotate-180 px-2 ${page <= 1 ? "opacity-0" : ""}`} on:click={() => handleNavigation(NavigationDirection.backward)}>
        <p class="bg-gray-300 w-fit p-8 rounded-full hover:opacity-80 transition-all ease-in-out duration-200">➜</p>
    </button>
    <div class="w-full h-full">
        {#if page == 1}
            <Name />
        {:else if page == 2}
            <Age />
        {/if}
    </div>
    <button class={`px-2 ${page >= numberOfPageSequences ? "opacity-0" : ""}`} on:click={() => handleNavigation(NavigationDirection.forward)}>
        <p class="bg-gray-300 w-fit p-8 rounded-full hover:opacity-80 transition-all ease-in-out duration-200">➜</p>
    </button>
</div>
