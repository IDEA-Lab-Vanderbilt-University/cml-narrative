<!--
 /src/lib/components/sequences/tablet/create-profile/AgentName.svelte
 AgentName.svelte
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script lang="ts">
	
    import type { UserData } from "$lib/types/UserData";
    
    export let profileData: UserData = {}

</script>

<div class="flex flex-col w-full h-full justify-center items-center space-y-10">
    <h1 class="text-5xl text-lapiz-blue">Choose an Agent name</h1>
    <div class="flex w-full justify-center space-x-7">
        <div class="form-control w-full max-w-xs">
            <label class="label text-center">
              <span class="label-text text-2xl">Agent</span>
            </label>
            <input type="text" placeholder="Pineapple" class="input input-bordered w-full" bind:value={profileData.agentName}/>
        </div>
    </div>
    <a href="/introduction/onboarding/create-profile/confirmation" class="bg-lapiz-blue text-white text-3xl px-7 py-3 rounded-md shadow hover:shadow-lg">SUBMIT</a>

</div>