<!--
 /src/routes/tablet/agent-onboarding/[slug]/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on October 22nd 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->


<script lang="ts">
	import CreateProfile from "$lib/scenes/onboarding/CreateProfile.svelte";
import Welcome from "$lib/scenes/onboarding/Welcome.svelte";

    /** @type {import('./$types').PageData} */
    export let data;

    let page = data.index

    console.log(page);
    
</script>

<!-- <Welcome /> -->
<!-- {#if page == "welcome"}
    <Welcome />
{:else if page == "create-profile"}
    <CreateProfile />
{/if} -->
