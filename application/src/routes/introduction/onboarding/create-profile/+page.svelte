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
	import AgentName from "$lib/components/sequences/tablet/create-profile/AgentName.svelte";
	import ChooseAnAvatar from "$lib/components/sequences/tablet/create-profile/ChooseAnAvatar.svelte";
	import Interest from "$lib/components/sequences/tablet/create-profile/Interest.svelte";
	import Name from "$lib/components/sequences/tablet/create-profile/Name.svelte";
	import ClickToViewProfileBanner from "$lib/components/tablet/ClickToViewProfileBanner.svelte";
	import TabletNavigationController from "$lib/components/tablet/TabletNavigationController.svelte";
	import { NavigationDirection } from "$lib/types/Enums";
	import type { UserData } from "$lib/types/UserData";
	import { agentData } from "$lib/utils/stores/store";

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

    const numberOfPageSequences = 7
    
    let profileData: UserData = {
        name: {
            first: "",
            last: ""
        },
        age: undefined,
        interests: []
    }

    $: {
        /**
         * page is reactive and dependent on what is being returned from the "server." Here,
         * we are telling Svelte to keep its eye on when the page value changes so we can
         * react to it.
        */
        page = data.page

        // Any time profile data is changed, the store is immediatly updated
        agentData.set(profileData)
                
    }



    /**
     * Progress the user through the profile creation sequence
     * @param direction NavigationDirection enum representing the direction of navigation
     */
    const handleNavigation = (direction: NavigationDirection) => {
        console.log(profileData);

        // Set the agentData store, which will allow us to access this profile data across the application
        agentData.set(profileData)

        
        if (direction == NavigationDirection.backward && page > 1) {
            goto(baseNavigationURL + (page - 1))
        } else if (direction == NavigationDirection.forward && page < numberOfPageSequences) {
            goto(baseNavigationURL + (page + 1))
        }
    }

</script>


<div class="bg-gray-50 rounded-md w-full h-full relative z-0">
    <div class="w-full h-full bg-gray-50 rounded-md flex">
        <button class={`rotate-180 px-2 ${page <= 1 ? "opacity-0" : ""}`} on:click={() => handleNavigation(NavigationDirection.backward)}>
            <p class="bg-lapiz-blue text-white text-3xl w-fit p-8 rounded-full hover:opacity-80 transition-all ease-in-out duration-200">➜</p>
        </button>
        <div class="w-full h-full">
            {#if page == 1}
                <Name bind:profileData/>
            {:else if page == 2}
                <Age bind:profileData/>
            {:else if page == 3}
                <Interest bind:profileData prompt="What do you like to do?" index={0}/>
            {:else if page == 4}
                <Interest bind:profileData prompt="Can you think of anything else?" index={1}/>
            {:else if page == 5}
                <Interest bind:profileData prompt="One more thing you enjoy" index={2}/>
            {:else if page == 6}
                <ChooseAnAvatar bind:profileData/>
            {:else if page == 7} 
                <AgentName bind:profileData/>
            {/if}
        </div>
        <button class={`px-2 ${page >= numberOfPageSequences ? "opacity-0" : ""}`} on:click={() => handleNavigation(NavigationDirection.forward)}>
            <p class="bg-lapiz-blue text-white text-3xl w-fit p-8 rounded-full hover:opacity-80 transition-all ease-in-out duration-200">➜</p>
        </button>
    </div>
    {#if page == 3 || page == 4 || page == 5}
        <div class="absolute inset-0 flex justify-center items-end z-10 bg-white h-fit mt-auto mb-9  shadow-md">
            <ClickToViewProfileBanner />
        </div>  
    {/if}

</div>
