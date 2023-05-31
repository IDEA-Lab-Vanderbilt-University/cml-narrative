<!--
 /src/routes/introduction/onboarding/create-profile/confirmation/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script lang="ts">
	import { tourManager } from "$lib/components/tour/TourManager";


	
    import type { UserData } from "$lib/types/UserData";
	import { agentData } from "$lib/utils/stores/store";
	import { onMount } from "svelte";


    let agentName: string

    agentData.subscribe(value => {
        agentName = value.agentName
    })



    onMount(() => {
        $tourManager = {
            showTour: true,
            attachTo: "#tablet-power-button",
            position: "top",
            tourMessage: "Click on the power button to close the tablet."
        }
    })

</script>

<div class="flex flex-col w-full h-full justify-center items-center space-y-10 bg-gray-50">
    <img src="/img/icons/profile.png" alt="" class="h-1/5">
    <h1 class="text-5xl text-lapiz-blue">Agent {agentName}</h1>
    <!-- <a href="/introduction/welcome?page=1" class="bg-lapiz-blue text-white text-3xl px-7 py-3 rounded-md shadow hover:shadow-lg">CONFIRM</a> -->
</div>