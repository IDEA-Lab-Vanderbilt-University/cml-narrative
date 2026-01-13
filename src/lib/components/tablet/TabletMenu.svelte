<script lang="ts">
	import { Assets } from "$lib/utils/Assets";
	import SpotApplication from "../sequences/tablet/tablet-tutorial/SpotApplication.svelte";

    export let onSelect: (selection: null | "profile" | "travelLog" | "badges" | "Robot Prototype" ) => void = () => {};

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

    const select = (app: string) => {
        if (app === "Travel Logs") {
            onSelect("travelLog");
        } else if (app === "Profiles") {
            onSelect("profile");
        } else if (app === "Badges") {
            onSelect("badges");
        } else if (app === "Robot Prototype") {
            onSelect("Robot Prototype");
        } else {
            onSelect(null);
        }
    };
    

</script>



<div class="flex justify-center" id="tablet-menu">
    {#each apps as app}
    <div>
        <SpotApplication
            color={app.color}
            title={app.title}
            img={app.img}
            on:click={() => select(app.title)}
            on:applicationContainerEvent={handleAppContainerEvent} />
    </div>
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
