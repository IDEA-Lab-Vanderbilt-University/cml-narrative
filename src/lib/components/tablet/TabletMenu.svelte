<script lang="ts">
	import { Assets } from "$lib/utils/Assets";
	import SpotApplication from "../sequences/tablet/tablet-tutorial/SpotApplication.svelte";

    export let onSelect: (selection: null | string ) => void = () => {};

    let handleAppContainerEvent = (e: CustomEvent<{ event: string; id: string }>) => {
        console.log(e.detail);
    };

    export let apps = [
        {
            title: "Travel Logs",
            img: Assets.Tablet.travelLogIcon,
            color: "rgb(85,205,110)"
        },
        {
            title: "Profiles",
            img: Assets.Tablet.profileIcon,
            color: "rgb(185,90,210)"
        },
        {
            title: "Badges",
            img: Assets.Tablet.badgesIcon,
            color: "rgb(0,175,210)"
        }
    ];

</script>



<div class="flex justify-center" id="tablet-menu">
    {#each apps as app}
        <SpotApplication
            color={app.color}
            title={app.title}
            img={app.img}
            on:click={
                () => {
                    onSelect(app.title);
                }
            }
            on:applicationContainerEvent={handleAppContainerEvent} />
    {/each}
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
