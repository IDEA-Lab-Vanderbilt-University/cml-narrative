<script lang="ts">
	import { goto } from '$app/navigation';
	import PizzaDialogBox from '$lib/components/activities/pizza-time/PizzaDialogBox.svelte';
	import PizzaDisplay from '$lib/components/activities/pizza-time/PizzaDisplay.svelte';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import DefinitionModal from '$lib/components/modals/DefinitionModal.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
	import script from '$lib/scripts/introduction/script.js';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import type { UserProgress } from '$lib/types/UserData.js';
	import DataService from '$lib/utils/DataService/index.js';
	import { userDataStore } from '$lib/utils/stores/store.js';
	import { createEventDispatcher } from 'svelte';

	export let data;

	let line: Line;

	$: line = data.line;

	/**
	 * Handles an emitted dialogEvent as sent from a DialogControl component and progresses the script as such
	 * @param event can be destructured to obtain which way the dialog in a script should progress
	 */
	const handleDialogEvent = async (event: any) => {
		var state: NavigationDirection = event.detail.state;

		handleNavigation(state);
	};

	const getUpdatedProgress = ():UserProgress => {
		return {
			level: 0,
			levelLabel: 'level-one',
			subLevel: 0,
			subLevelLabel: '/level1?page=1',
			lastUpdated: new Date()
		};
	}

	const updateLocalProgress = (progress: UserProgress) => {
		userDataStore.update((data) => {
			data.progress = progress;
			return data;
		})
	}

	/**
	 * Determine the state of the DialogEvent that was emitted. Then, we will navigate
	 * the user to the appropriate url with appropriate querystring which represents
	 * which line in the script should be returned to the user.
	 */
	const handleNavigation = async (direction: NavigationDirection) => {
		if (direction == NavigationDirection.forward) {
			if (line.id == 14) {
				let progress = getUpdatedProgress();
				await DataService.Data.updateUserProgress(progress);
				updateLocalProgress(progress)
				
                // Next level
                goto('/level1/outro?page=1');
			} else {
				goto(`/level1/pizza-algorithm?page=${line.id + 1}`);
			}
		} else if (direction == NavigationDirection.backward && line.id > 1) {
			goto(`/level1/pizza-algorithm?page=${line.id - 1}`);
		}
	};

	let content: HTMLElement | void;
</script>

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" id="dialogue" slot="dialog">
        <PizzaDialogBox {line} on:dialogEvent={handleDialogEvent} />
	</div>
	<div slot="content"  id="content"  bind:this={content}>
		{#if line.id == 9}
			<DefinitionModal title="Algorithm" definition="An algorithm is a set of step-by-step instruction for solving a problem or completing a task" on:click={() => { handleDialogEvent({detail: { state: NavigationDirection.forward}})}} />
		{/if}

        <div id="tabletButtonContainer">
            <TabletButton on:click={() => { 
                const event  = new CustomEvent('showTablet', {
                    bubbles: true
                });
                
                content?.dispatchEvent(event);
            }} />
        </div>


        <div id="navButtons">
            <button id="nextButton" disabled on:click={() => handleNavigation(NavigationDirection.forward)}>
                <img src="/img/misc/pizzasend.png" alt="Send" />
            </button>
        </div>
	</div>
</Scene>

<style>

	#content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		position: absolute;
		right: 0;
		width: 70vw;
    }
    
	#navButtons {
		position: absolute;
		bottom: 0;
		width: 100%;
		max-height: 10vh;
	}

    #nextButton {
		transition: all 0.3s;
        position: absolute;
        right: 0;
	}

    #nextButton:hover {
		transform: scale(1.05);
		filter: brightness(1.1);
	}

    #nextButton:active {
		transform: scale(0.9);
		filter: brightness(0.9);
	}

    #nextButton img {
		max-height: 10vh;
	}

    #tabletButtonContainer {
        position: absolute;
        top: 0;
        right: 0;
    }
</style>