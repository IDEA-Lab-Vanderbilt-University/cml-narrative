<script lang="ts">
	import { Assets } from "$lib/utils/Assets";
	import SpotApplication from "../sequences/tablet/tablet-tutorial/SpotApplication.svelte";
    import { t } from "$lib/utils/stores/languageStore";

    export let onSelect: (selection: null | "profile" | "travelLog" | "badges" | "Robot Prototype" ) => void = () => {};

    let handleAppContainerEvent = (e: CustomEvent<{ event: string; id: string }>) => {
        console.log(e.detail);
    };

    type AppItem = { id: "travelLog" | "profile" | "badges"; title: string; img: string; color: string };
    let apps: AppItem[] = [];

    $: apps = [
        {
            id: "travelLog",
            title: $t("tablet.travelLogs"),
            img: Assets.Tablet.travelLogIcon,
            color: "rgb(85,205,110)"
        },
        {
            id: "profile",
            title: $t("tablet.profiles"),
            img: Assets.Tablet.profileIcon,
            color: "rgb(185,90,210)"
        },
        {
            id: "badges",
            title: $t("tablet.badges"),
            img: Assets.Tablet.badgesIcon,
            color: "rgb(0,175,210)"
        }
    ];

    const select = (appId: AppItem["id"]) => {
        if (appId === "travelLog") {
            onSelect("travelLog");
        } else if (appId === "profile") {
            onSelect("profile");
        } else if (appId === "badges") {
            onSelect("badges");
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
            on:click={() => select(app.id)}
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
