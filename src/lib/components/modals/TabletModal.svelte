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
            tabletDiv?.classList.remove("lg:block");
            tabletDiv?.classList.remove("right-size");
            tabletModalActive.set(false);
        } else {
            tabletDiv?.classList.remove("hidden");
            tabletDiv?.classList.add("lg:block");
            tabletDiv?.classList.add("right-size");
            tabletModalActive.set(true);
        }
    }

    
</script>

<div bind:this={tabletDiv} class="h-full w-full hidden">
    <Tablet powerDown={() => hidden = true} >
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