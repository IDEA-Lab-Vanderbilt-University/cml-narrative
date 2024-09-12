<script lang="ts">
	import { Assets } from "$lib/utils/Assets";
	import SpotApplication from "../sequences/tablet/tablet-tutorial/SpotApplication.svelte";



    export let onSelect: (selection: null | "profile" | "travelLog" | "badges") => void;
    let handleAppContainerEvent = (e: CustomEvent<{ event: string; id: string }>) => {
         
    };

</script>



<div class="flex justify-center" id="tablet-menu">
    <SpotApplication
        color="rgb(85,205,110)"
        title="Travel Log"
        img={Assets.Tablet.travelLogIcon}
        on:applicationContainerEvent={handleAppContainerEvent} />
    <SpotApplication
        color="rgb(185,90,210)"
        title="Profile"
        img={Assets.Tablet.profileIcon}
        on:applicationContainerEvent={handleAppContainerEvent} />
    <SpotApplication
        color="rgb(0,175,210)"
        title="Badges"
        img={Assets.Tablet.badgesIcon}
        on:applicationContainerEvent={handleAppContainerEvent} />
</div>

<style>
    #tablet-menu {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

</style>
