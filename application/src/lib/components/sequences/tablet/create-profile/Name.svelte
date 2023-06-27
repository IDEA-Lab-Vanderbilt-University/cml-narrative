<!--
 /src/lib/components/sequences/tablet/create-profile/Name.svelte
 Name.svelte
 cml-narrative
 
 Created by Ian Thompson on January 9th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import type { UserData } from "$lib/types/UserData";


  export let profileData: UserData = {}

</script>

<div class="flex flex-col w-full h-full justify-center items-center space-y-10">
    <h1 class="text-6xl text-white">What is your name?</h1>
    <div class="flex w-full justify-center space-x-7">
        <div class="form-controlw-full max-w-xs h-24">
            <input type="text" placeholder="First name" class="input input-bordered w-full h-full text-4xl" bind:value={profileData.name.first}/>
        </div>
        <div class="form-control w-full max-w-xs h-24">
            <input type="text" placeholder="Lastname" class="input input-bordered w-full h-full text-4xl" bind:value={profileData.name.last}/>
        </div>
    </div>
</div>