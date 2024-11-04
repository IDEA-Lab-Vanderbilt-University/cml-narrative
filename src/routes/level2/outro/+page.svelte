<script lang="ts">
	import { goto } from '$app/navigation';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import type { UserData, UserProgress } from '$lib/types/UserData.js';
	import DataService from '$lib/utils/DataService/index.js';
	import { userDataStore } from '$lib/utils/stores/store.js';
	import { createEventDispatcher } from 'svelte';
	import script from '$lib/scripts/level2/outro/index.js';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import SpotApplication from '$lib/components/sequences/tablet/tablet-tutorial/SpotApplication.svelte';
	import TextResponseModal from '$lib/components/activities/free-response/TextResponseModal.svelte';
	import BadgeGetModal from '$lib/components/modals/BadgeGetModal.svelte';
	import MegaJoulesGetModal from '$lib/components/modals/MegaJoulesGetModal.svelte';

	export let data;

	let line: Line;

	$: line = data.line;


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
			if (lineNumber >= script.lines.length) {
				let progress = getUpdatedProgress();
				await DataService.Data.updateUserProgress(progress);
				updateLocalProgress(progress)
				
                // Next level
                goto('/level3?page=1');
			} else {
				goto(`/level2/outro?page=${line.id + 1}`);
			}
		} else if (direction == NavigationDirection.backward && line.id > 1) {
			goto(`/level2/outro?page=${line.id - 1}`);
		}
	};

    let lineNumber = 1;
    $: lineNumber = line.id;

</script>

{#if ![3, 4, 5, 8, 9].includes(line.id)}
<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
		<DialogBox {line} on:dialogEvent={handleDialogEvent} />
	</div>
	<div slot="content" class="h-full w-full">
        {#if lineNumber == 1}
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
        {#if lineNumber == 2}
            <Tablet showMeter={false}>
                <div class="flex flex-col items-center justify-center space-y-6 text-white" id="mailscreen2">
                    <h1 class="text-3xl w-10/12">Hello Agent {agent.agentName},</h1>
                    <div class="border-white border-2 p-2 w-10/12">
                        <p class="text-2xl">
                            Your Bot Buddy’s system has informed us that you have
completed your second mission. Mission Control needs to know a few more things. We have
included our questions in this message.
                        </p>

                    </div>
                    <div class="w-10/12">
                        <h1 class="text-3xl mailfrom" style="float: right;">{line.speakers[0]}</h1>
                    </div>
                    <button on:click={() => handleNavigation(NavigationDirection.forward)}>
                        <img src="/img/misc/nextbutton.png" alt="Next" id="nextbutton" />
                    </button>
                </div>
            </Tablet>
        {/if}
        {#if line.id == 6}
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
        {#if line.id == 7}
            <Tablet showMeter={false}>
                <div class="flex flex-col items-center justify-center space-y-6 text-white" id="mailscreen2">
                    <h1 class="text-3xl w-10/12">Hello Agent {agent.agentName},</h1>
                    <div class="border-white border-2 p-2 w-10/12">
                        <p class="text-2xl">
                            Agent, congratulations on completing the next part of your mission! I was super excited to learn more about the self-driving cars. You know how much I love technology and gadgets!!
                        </p>
                        <br/>
                        <p class="text-2xl">
                            Reports from your Bot Buddy and your Travel Log helped us learn that:
                        </p>
                        <ul class="text-2xl">
                            <li>The self-driving cars are trained using an algorithm designed by people at the car factory</li>
                            <li>The self-driving cars are trained with multiple images of faces called TRAINING DATA</li>
                            <li>The self-driving cars are then tested using a different set of face images called TESTING DATA.</li>
                        </ul>
                        <br/>
                        <p class="text-2xl">
                            You have earned the Machine Learning Master Badge and generated some more megajoules for
                            your journey back!
                        </p>

                    </div>
                    <div class="w-10/12">
                        <h1 class="text-3xl mailfrom" style="float: right;">{line.speakers[0]}</h1>
                    </div>
                    <button on:click={() => handleNavigation(NavigationDirection.forward)}>
                        <img src="/img/misc/nextbutton.png" alt="Next" id="nextbutton" />
                    </button>
                </div>
            </Tablet>
        {/if}
    </div>
</Scene>
{/if}

{#if line.id == 3}
    <TextResponseModal id="carTrainingSet" title={"What did you find out about training data sets?"} onSuccess={() => handleNavigation(NavigationDirection.forward)} prompt="" placeholder="" />
{/if}

{#if line.id == 4}
    <TextResponseModal id="carTestSet" title={"What did you find out about test data sets?"} onSuccess={() => handleNavigation(NavigationDirection.forward)} prompt="" placeholder="" />
{/if}

{#if line.id == 5}
    <TextResponseModal id="carTestTrainDifference" title={"Why should the training and test data sets be different?"} onSuccess={() => handleNavigation(NavigationDirection.forward)} prompt="" placeholder="" />
{/if}

{#if lineNumber == 8}
    <BadgeGetModal badgeName="Machine Learning Master"  badgeImage="/img/misc/badge3.png" handleClick={() => handleNavigation(NavigationDirection.forward)} />
{/if}

{#if lineNumber == 9}
    <MegaJoulesGetModal amount={10} handleClick={() => handleNavigation(NavigationDirection.forward)} />
{/if}


<style>

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