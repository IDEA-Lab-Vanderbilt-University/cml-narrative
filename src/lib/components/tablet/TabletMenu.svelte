<script lang="ts">
	import { Assets } from "$lib/utils/Assets";
	import SpotApplication from "../sequences/tablet/tablet-tutorial/SpotApplication.svelte";



    export let onSelect: (selection: null | "profile" | "travelLog" | "badges") => void;
    let handleAppContainerEvent = (e: CustomEvent<{ event: string; id: string }>) => {
         
    };

</script>



<div class="flex justify-center" id="tablet-menu">
    <SpotApplication
        title="Travel Log"
        img={Assets.Tablet.travelLog}
        on:applicationContainerEvent={handleAppContainerEvent} />
    <SpotApplication
        title="Profile"
        img={Assets.Tablet.profile}
        on:applicationContainerEvent={handleAppContainerEvent} />
    <SpotApplication
        title="Badges"
        img={Assets.Tablet.badges}
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
