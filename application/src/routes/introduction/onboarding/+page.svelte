<!--
 /src/routes/introduction/onboarding/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 7th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->



<script lang="ts">
	import Scene from "$lib/components/scene/Scene.svelte";
	import Tablet from "$lib/components/tablet/Tablet.svelte";


</script>

<div class="flex flex-col w-full h-full justify-center items-center text-white bg-gray-100 space-y-8">
    <h1 class="text-6xl text-jet">Welcome, new SPOT Agent!</h1>
    <a href="/introduction/onboarding/create-profile?page=1" class=" bg-sky-900 text-2xl px-6 py-5 rounded-full  font-mokoto shadow-md hover:shadow-lg hover:opacity-75 transition ease-in-out duration-200">Create Agent Profile</a>
</div>