<!--
 /src/lib/components/sequences/tablet/create-profile/ChooseAnAvatar.svelte
 ChooseAnAvatar.svelte
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
    <h1 class="text-5xl text-lapiz-blue">Choose an avatar</h1>
    <img src="/img/icons/profile.png" alt="" class="h-1/5">

</div>