<script lang="ts">
	import { goto } from '$app/navigation';
	import TextResponseModal from '$lib/components/activities/free-response/TextResponseModal.svelte';
	import PizzaDisplay from '$lib/components/activities/pizza-time/PizzaDisplay.svelte';
	import type { PizzaConfig } from '$lib/components/activities/pizza-time/pizzatypes.js';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import BadgeGetModal from '$lib/components/modals/BadgeGetModal.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
	import script from '$lib/scripts/introduction/script.js';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import type { UserData, UserProgress } from '$lib/types/UserData.js';
	import DataService from '$lib/utils/DataService/index.js';
	import { pizzaConfigStore, userDataStore } from '$lib/utils/stores/store.js';
	import { createEventDispatcher } from 'svelte';

    let agent: UserData = {
        name: {
            first: '',
            last: ''
        },
        age: 0,
        interests: [],
        avatarImg: '',
        agentName: '',
        email: '',
        password: '',
        progress: {
            level: 0,
            levelLabel: '',
            subLevel: 0,
            subLevelLabel: '',
            lastUpdated: undefined
        }
    };

    userDataStore.subscribe((value) => {
        agent = value;
    });

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
			if (lineNumber == script.lines.length) {
				let progress = getUpdatedProgress();
				await DataService.Data.updateUserProgress(progress);
				updateLocalProgress(progress)
				
                // Next level
                goto('/level2?page=1');
			} else {
				goto(`/level1/outro?page=${line.id + 1}`);
			}
		} else if (direction == NavigationDirection.backward && line.id > 1 && lineNumber < 6) {
			goto(`/level1/outro?page=${line.id - 1}`);
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
        {#if lineNumber == 4 || lineNumber == 9}
            <Tablet showMeter={false}>
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
            <Tablet showMeter={false}>
                <div class="flex flex-col items-center justify-center space-y-6 text-white" id="mailscreen2">
                    <h1 class="text-5xl">Hello Agent,</h1>
                    <div class="border-white border-2 p-4 w-7/12">
                        <p class="text-3xl">
                            {line.dialog}
                        </p>
                    </div>
                    <h1 class="text-5xl mailfrom">{line.speakers[0]}</h1>
                    <button on:click={() => handleNavigation(NavigationDirection.forward)}>
                        <img src="/img/misc/nextbutton.png" alt="Next" id="nextbutton" />
                    </button>
                </div>

            </Tablet>
        {/if}
        {#if lineNumber == 10}
            <Tablet showMeter={false}>
                <div class="flex flex-col items-center justify-center space-y-6 text-white" id="mailscreen2">
                    <h1 class="text-3xl w-10/12">Hello Agent {agent.agentName},</h1>
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
                    <div class="w-10/12">
                        <div class="ps">
                            <strong>PS. All the agents were happy to learn there is still pizza in the future!<br/>
                                PPS. Agent Gear wants to hear more about future robots!</strong>
                            </div>
                        <h1 class="text-3xl mailfrom" style="float: right;">{line.speakers[0]}</h1>
                    </div>
                    <button on:click={() => handleNavigation(NavigationDirection.forward)}>
                        <img src="/img/misc/nextbutton.png" alt="Next" id="nextbutton" />
                    </button>
                </div>
            </Tablet>

        {/if}

        {#if lineNumber == 11}
            <BadgeGetModal badgeName="Algorithm All Stars"  badgeImage="/img/misc/badge2.png" handleClick={() => handleNavigation(NavigationDirection.forward)} />
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

    #mailscreen, #mailscreen2 {
        justify-items: center;
        align-items: center;
        height: 100%;
        gap: 1vh;
    }

    #nextbutton {
        height: 7vh;
        position: relative;
        left: 40vh;
    }
 
    #mailscreen2 {
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    }

    #mailscreen2 ul li {
        list-style-type: disc;
        margin-left: 2vw;
    }

    .ps {
        float: left;
    }
</style>