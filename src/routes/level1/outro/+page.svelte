<script lang="ts">
	import { goto } from '$app/navigation';
	import TextResponseModal from '$lib/components/activities/free-response/TextResponseModal.svelte';
	import PizzaDisplay from '$lib/components/activities/pizza-time/PizzaDisplay.svelte';
	import type { PizzaConfig } from '$lib/components/activities/pizza-time/pizzatypes.js';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import BadgeGetModal from '$lib/components/modals/BadgeGetModal.svelte';
	import IncomingMessageModal from '$lib/components/modals/IncomingMessageModal.svelte';
	import MegaJoulesGetModal from '$lib/components/modals/MegaJoulesGetModal.svelte';
	import ReadMessageModal from '$lib/components/modals/ReadMessageModal.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
	import { script } from '$lib/scripts/level1/outro/index.js';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import type { Student, StudentProgress } from '$lib/types/UserData.js';
	import { BadgesByName } from '$lib/utils/Assets/Badges.js';
	import DataService from '$lib/utils/DataService/index.js';
	import { pizzaConfigStore, studentDataStore, studentProgressStore } from '$lib/utils/stores/store.js';
	import { createEventDispatcher, onMount } from 'svelte';
	import { get } from 'svelte/store';

    let agent: Student = {};

    studentDataStore.subscribe((value) => {
        agent = value;
    });

	export let data;

	let line: Line;

	$: line = data.line;

    let userPizzaConfig = get(pizzaConfigStore);
    let userPizza: PizzaDisplay | void;

    onMount(async () => {
        if(userPizzaConfig == null) {
            const pizzaLog = await DataService.TravelLog.getTravelLogs("pizza-time");



            if(pizzaLog.length == 0) {
                // Default pizza config to show something visually
                userPizzaConfig = {
                    crust: "thick",
                    sauce: "marinara",
                    cheese: true,
                    veggies: [],
                    meats: [],
                    finishingTouches: []
                };
                return;
            }
            userPizzaConfig = JSON.parse(pizzaLog[0].data);
        }
    });

    $: {
        if(lineNumber == 3 && userPizza && userPizzaConfig) {
            // Use user pizza config
            userPizza.setPizzaConfig(userPizzaConfig);
        }
    }

    $: {
        if(lineNumber == 11){
            studentProgressStore.update((data) => {
                data.badge_count = 2;
                return data;
            });
        }

        if(lineNumber == 12){
            studentProgressStore.update((data) => {
                data.megajoules = 10;
                return data;
            });
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

	/**
	 * Determine the state of the DialogEvent that was emitted. Then, we will navigate
	 * the user to the appropriate url with appropriate querystring which represents
	 * which line in the script should be returned to the user.
	 */
	const handleNavigation = async (direction: NavigationDirection) => {
        let target = '';
		if (direction == NavigationDirection.forward) {
			if (lineNumber >= script.lines.length) {
				// Next level
                target = '/level2?page=1';
			} else {
                target = `/level1/outro?page=${line.id + 1}`;
			}
		} else if (direction == NavigationDirection.backward && line.id > 1 && lineNumber < 6) {
            target = `/level1/outro?page=${line.id - 1}`;
		}

        if (target) {
            studentProgressStore.update((data) => {
                data.last_visited = target;
                return data;
            });
            goto(target);
        }
	};

	let content: HTMLElement | void;

    let lineNumber = 1;
    $: lineNumber = line.id;
</script>

{#if lineNumber != 6 && lineNumber != 7 && lineNumber != 8}
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
            <IncomingMessageModal from="Mission Control" onNext={() => handleNavigation(NavigationDirection.forward)} />
        {/if}
        {#if lineNumber == 9}
            <IncomingMessageModal from="Captain Storm" onNext={() => handleNavigation(NavigationDirection.forward)} />
        {/if}
        {#if lineNumber == 5}
            <ReadMessageModal from={line.speakers[0]} onNext={() => handleNavigation(NavigationDirection.forward)}>
                    <div class="border-white border-2 p-4 w-7/12">
                        <p class="text-3xl">
                            {line.dialog}
                        </p>
                    </div>
            </ReadMessageModal>
        {/if}
        {#if lineNumber == 10}
            <ReadMessageModal from={line.speakers[0]} onNext={() => handleNavigation(NavigationDirection.forward)} ps={[
                'PS. All the agents were happy to learn there is still pizza in the future!',
                'PPS. Agent Gear wants to hear more about future robots!'
            ]}>
                <div class="border-white border-2 p-2 w-10/12">
                    <p class="text-2xl">
                        I just read your travel log, and I wanted to thank you for the great work on algorithms! You and Bot Buddy have helped us understand that: 
                    </p>
                    <br/>
                    <ul class="text-2xl">
                        <li>Computer algorithms are instructions based on people's opinions</li>
                        <li>We get different results with different algorithms</li>
                        <li>This means some results may not benefit everyone</li>
                    </ul>
                    <br/>
                    <p class="text-2xl">
                        You have earned the Algorithm All Stars Badge and generated some 
megajoules! I sent them right to your SPOT Tablet.
                    </p>

                </div>
            </ReadMessageModal>

        {/if}

        {#if lineNumber == 11}
            <BadgeGetModal badge={BadgesByName['Algorithm All Stars']} handleClick={() => handleNavigation(NavigationDirection.forward)} />
        {/if}

        {#if lineNumber == 12}
            <MegaJoulesGetModal amount={10} handleClick={() => handleNavigation(NavigationDirection.forward)} />
        {/if}
	</div>
</Scene>
{/if}

{#if lineNumber == 6}
    <TextResponseModal id="botBuddyPizza" title={"How was Bot Buddy's pizza algorithm different from yours?"} onSuccess={() => handleNavigation(NavigationDirection.forward)} prompt="" placeholder="" />
{/if}

{#if lineNumber == 7}
    <TextResponseModal id="botBuddyPizzaOpinion" title={"How do you think your opinions affected your pizza algorithm?"} onSuccess={() => handleNavigation(NavigationDirection.forward)} prompt="" placeholder="" />
{/if}

{#if lineNumber == 8}
    <TextResponseModal id="wrongPizzaOpinion" title={"If you got Bot Buddy's pizza by accident, how would you feel?"} onSuccess={() => handleNavigation(NavigationDirection.forward)} prompt="" placeholder="" />
{/if}
<style>
    .pizzabox {
        background: url('/img/misc/pizzabox.png') no-repeat center center;
        background-size: 70vh auto;
        background-position-y: -5vh;
    }
</style>