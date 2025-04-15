<svelte:options accessors />

<script lang="ts">
	import { onMount } from "svelte";
	import Tablet from "../tablet/Tablet.svelte";
	import ProfilesApp from "../tablet/profiles/ProfilesApp.svelte";
	import { tabletModalActive } from "$lib/utils/stores/store";
	import TabletMenu from "../tablet/TabletMenu.svelte";
	import BadgesApp from "../tablet/badges/BadgesApp.svelte";
	import TravelLogsApp from "../tablet/travel-logs/TravelLogsApp.svelte";

    export let hidden = true;


    let tabletDiv: HTMLDivElement | void;

    $: {
        if (hidden) {
            tabletDiv?.classList.add("hidden");
            tabletDiv?.classList.remove("lg:block");
            tabletDiv?.classList.remove("right-size");
            tabletModalActive.set(false);
            appMode = null;
        } else {
            tabletDiv?.classList.remove("hidden");
            tabletDiv?.classList.add("lg:block");
            tabletDiv?.classList.add("right-size");
            tabletModalActive.set(true);
            appMode = null;
        }
    }

    let appMode: null | "profile" | "travelLog" | "badges" = null;
    
</script>

<div bind:this={tabletDiv} class="h-full w-full hidden">
    <Tablet powerDown={() => {
        const event  = new CustomEvent('hideTablet', {
            bubbles: true
        });
        
        tabletDiv?.dispatchEvent(event);
    }} 
    
    showBottomButtons={true} 
    showMeter={true}>
        {#if appMode === "profile"}
            <ProfilesApp handleClick={() => appMode = null} />
        {:else if appMode === "travelLog"}
            <TravelLogsApp handleClick={() => appMode = null} />
        {:else if appMode === "badges"}
            <BadgesApp handleClick={() => appMode = null} />
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