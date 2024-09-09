<svelte:options accessors />

<script lang="ts">
	import { onMount } from "svelte";
	import Tablet from "../tablet/Tablet.svelte";
	import ProfilesApp from "../tablet/profiles/ProfilesApp.svelte";
	import { tabletModalActive } from "$lib/utils/stores/store";

    export let hidden = true;


    let tabletDiv: HTMLDivElement | void;

    $: {
        if (hidden) {
            tabletDiv?.classList.add("hidden");
            tabletModalActive.set(false);
        } else {
            tabletDiv?.classList.remove("hidden");
            tabletModalActive.set(true);
        }
    }

    
</script>

<div bind:this={tabletDiv} class="h-full w-full hidden lg:block right-size">
    <Tablet>
        <ProfilesApp handleClick={() => hidden = true} />
    </Tablet>
</div>

<style>
    @media (max-height: 640px) {
        .right-size {
            display: none;
        }
    }    
</style>