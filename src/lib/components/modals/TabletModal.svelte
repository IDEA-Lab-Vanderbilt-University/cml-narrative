<svelte:options accessors />

<script lang="ts">
	import { onMount } from "svelte";
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
	import Tablet from "../tablet/Tablet.svelte";
	import ProfilesApp from "../tablet/profiles/ProfilesApp.svelte";
	import { showLanguageChoice, tabletModalActive } from "$lib/utils/stores/store";
	import TabletMenu from "../tablet/TabletMenu.svelte";
	import BadgesApp from "../tablet/badges/BadgesApp.svelte";
	import TravelLogsApp from "../tablet/travel-logs/TravelLogsApp.svelte";
	import LanguageMenu from "../LanguageMenu.svelte";

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
    $: normalizedPathname = $page.url.pathname.replace(/\/+$/, '') || '/';
    $: currentPage = $page.url.searchParams.get('page');
    $: returnPage = $page.url.searchParams.get('returnPage');
    $: isLevel4NewFinalTabletFlow = normalizedPathname === '/level4new'
        && (
            currentPage === '35'
            || ((currentPage === '24' || currentPage === '25' || currentPage === '26') && returnPage === '35')
        );

    const openLevel4NewFinalCodeinator = () => {
        const returnPage = '35';
        const event  = new CustomEvent('hideTablet', {
            bubbles: true
        });

        tabletDiv?.dispatchEvent(event);
        goto(`/level4new?page=26&returnPage=${returnPage}`);
    };

    const openLevel4NewFinalTraininator = () => {
        const returnPage = '35';
        const event  = new CustomEvent('hideTablet', {
            bubbles: true
        });

        tabletDiv?.dispatchEvent(event);
        goto(`/level4new?page=25&returnPage=${returnPage}`);
    };

    const openLevel4NewFinalDesignNotes = () => {
        const returnPage = '35';
        const event  = new CustomEvent('hideTablet', {
            bubbles: true
        });

        tabletDiv?.dispatchEvent(event);
        goto(`/level4new?page=24&returnPage=${returnPage}`);
    };
    
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
            <TabletMenu
                includeCodeinator={isLevel4NewFinalTabletFlow}
                includeTraininator={isLevel4NewFinalTabletFlow}
                includeDesignNotes={isLevel4NewFinalTabletFlow}
                onSelect={(selection) => {
                    if (selection === 'codeinator' && isLevel4NewFinalTabletFlow) {
                        openLevel4NewFinalCodeinator();
                        return;
                    }

                    if (selection === 'traininator' && isLevel4NewFinalTabletFlow) {
                        openLevel4NewFinalTraininator();
                        return;
                    }

                    if (selection === 'designnotes' && isLevel4NewFinalTabletFlow) {
                        openLevel4NewFinalDesignNotes();
                        return;
                    }

                    appMode = selection;
                }}
            />
        {/if}

			{#if showLanguageChoice}
			<div class="absolute bottom-4 left-4" >
				<LanguageMenu />
			</div>
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