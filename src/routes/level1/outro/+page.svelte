<script lang="ts">
	import { goto } from '$app/navigation';
	import PizzaDisplay from '$lib/components/activities/pizza-time/PizzaDisplay.svelte';
	import type { PizzaConfig } from '$lib/components/activities/pizza-time/pizzatypes.js';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import DefinitionModal from '$lib/components/modals/DefinitionModal.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
	import script from '$lib/scripts/introduction/script.js';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import type { UserProgress } from '$lib/types/UserData.js';
	import DataService from '$lib/utils/DataService/index.js';
	import { pizzaConfigStore, userDataStore } from '$lib/utils/stores/store.js';
	import { createEventDispatcher } from 'svelte';

	export let data;

	let line: Line;

	$: line = data.line;

    let userPizzaConfig: PizzaConfig | undefined;
    let userPizza: PizzaDisplay | void;

    pizzaConfigStore.subscribe((value) => {
        userPizzaConfig = value;
    });

    $: {
        if(lineNumber == 3 && userPizza && userPizzaConfig) {
            // Use user pizza config
            userPizza.setPizzaConfig(userPizzaConfig);
        }
    }

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
			if (line.id == script.lines.length) {
				let progress = getUpdatedProgress();
				await DataService.Data.updateUserProgress(progress);
				updateLocalProgress(progress)
				
                // Next level
                goto('/level2?page=1');
			} else {
				goto(`/level1/outro?page=${line.id + 1}`);
			}
		} else if (direction == NavigationDirection.backward && line.id > 1) {
			goto(`/level1/outro?page=${line.id - 1}`);
		}
	};

	let content: HTMLElement | void;

    let lineNumber = 1;
    $: lineNumber = line.id;
</script>

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
		<DialogBox {line} on:dialogEvent={handleDialogEvent} />
	</div>
	<div slot="content" class="h-full w-full"  bind:this={content}>
        {#if lineNumber == 2 || lineNumber == 3}
			<TabletButton on:click={() => { 
                const event  = new CustomEvent('showTablet', {
                    bubbles: true
				});
				
				content?.dispatchEvent(event);
			}} />
        {/if}

        {#if lineNumber == 2}
        <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center pizzabox">
            <PizzaDisplay crust="thick" sauce="marinara" cheese veggies={['bolts']} finishingTouches={['jalapeno']}/>
        </div>
        {/if}
        {#if lineNumber == 3}
            <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center pizzabox">
                <PizzaDisplay bind:this={userPizza} />
            </div>
        {/if}
        {#if lineNumber == 4}
            <Tablet>
                <div class="flex flex-col items-center justify-center space-y-6 text-white" id="mailscreen">
                    <h1 class="text-5xl">Incoming message 
                        from Mission Control!</h1>
                    <img src="/img/misc/mail.png" alt="letter" id="mailicon" />
                    <button on:click={() => handleNavigation(NavigationDirection.forward)}>
                        <img src="/img/misc/readbutton.png" alt="Read" id="readbutton" />
                    </button>
                </div>
            </Tablet>
        {/if}
        {#if lineNumber == 5}
            <Tablet>
                <div class="flex flex-col items-center justify-center space-y-6 text-white" id="mailscreen">
                    <h1 class="text-5xl">Hello Agent,</h1>
                    <div class="border-white border-2 p-4 w-7/12">
                        <p class="text-3xl">
                            {line.dialog}
                        </p>
                    </div>
                    <h1 class="text-5xl">{line.speakers[0]}</h1>
                    <button on:click={() => handleNavigation(NavigationDirection.forward)}>
                        <img src="/img/misc/nextbutton.png" alt="Next" id="nextbutton" />
                    </button>
                </div>

            </Tablet>
        {/if}
	</div>
</Scene>


<style>
    .pizzabox {
        background: url('/img/misc/pizzabox.png') no-repeat center center;
        background-size: 70vh auto;
        background-position-y: -5vh;
    }

    #mailicon {
        height: 20vh;
        animation: shake 1.5s infinite ease-in-out;
    }

    @keyframes shake {
        0% { transform: rotate(0deg); }
        10% { transform: rotate(5deg); }
        15% { transform: rotate(0deg); }
        20% { transform: rotate(-5deg); }
        25% { transform: rotate(0deg); }
    }

    #readbutton, #nextbutton {
        height: 10vh;
        transition: transform 0.2s;
    }

    #readbutton:hover, #nextbutton:hover {
        transform: scale(1.1);
    }

    #readbutton:active, #nextbutton:active {
        transform: scale(0.9);
    }

    #mailscreen {
        justify-items: center;
        align-items: center;
        height: 100%;
        gap: 4vh;
    }

    #nextbutton {
        height: 7vh;
        position: relative;
        left: 40vh;
    }
 
</style>