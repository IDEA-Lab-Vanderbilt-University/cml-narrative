<svelte:options accessors />

<script lang="ts">
	import { onMount } from "svelte";
	import Tablet from "../tablet/Tablet.svelte";
	import ProfilesApp from "../tablet/profiles/ProfilesApp.svelte";

    export let hidden = true;


    let tabletDiv: HTMLDivElement | void;

    $: {
        if (hidden) {
            tabletDiv?.classList.add("hidden");
        } else {
            tabletDiv?.classList.remove("hidden");
        }
    }

    
</script>

<div bind:this={tabletDiv} class="h-full w-full hidden">
    <Tablet>
        <ProfilesApp handleClick={() => hidden = true} />
    </Tablet>
</div>
