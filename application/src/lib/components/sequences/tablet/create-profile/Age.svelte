<!--
 /src/lib/components/sequences/tablet/create-profile/Age.svelte
 Age.svelte
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
    <h1 class="text-5xl text-lapiz-blue">How old are you?</h1>
    <div class="flex w-full justify-center space-x-7">
        <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text text-2xl">Age:</span>
            </label>
            <input type="number" placeholder="9" class="input input-bordered w-full" bind:value={profileData.age}/>
        </div>
    </div>
</div>