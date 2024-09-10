<svelte:options accessors />

<script lang="ts">
	import { onMount } from "svelte";
	import Tablet from "../tablet/Tablet.svelte";
	import ProfilesApp from "../tablet/profiles/ProfilesApp.svelte";
	import { tabletModalActive } from "$lib/utils/stores/store";
	import TabletMenu from "../tablet/TabletMenu.svelte";

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

    let appMode = null as null | "profile" | "travelLog" | "badges";
    
</script>

<div bind:this={tabletDiv} class="h-full w-full hidden">
    <Tablet powerDown={() => hidden = true} >
        {#if appMode === "profile"}
            <ProfilesApp handleClick={() => appMode = null} />
        {:else}
            <TabletMenu onSelect={(selection) => appMode = selection} />
        {/if}
    </Tablet>
</div>

<style>
    @media (max-height: 640px) {
        .right-size {
            display: none;
        }
    }    
</style>