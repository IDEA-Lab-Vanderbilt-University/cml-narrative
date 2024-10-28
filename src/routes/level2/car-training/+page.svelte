<script lang="ts">
	import { goto } from '$app/navigation';
	import CarTrainingDialogBox from '$lib/components/activities/car-training/CarTrainingDialogBox.svelte';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
	import { script } from '$lib/scripts/level1/outro/index.js';
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
                goto('/level2/outro?page=1');
			} else {
				goto(`/level2/car-training?page=${line.id + 1}`);
			}
		} else if (direction == NavigationDirection.backward && line.id > 1) {
			goto(`/level2/car-training?page=${line.id - 1}`);
		}
	};

	let content: HTMLElement | void;

    let lineNumber = 1;
    $: lineNumber = line.id;

	let choiceOptions = [
		'Stop when people cross the street',
		'Recognize human faces',
		'Open doors for humans',
		'Honk at birds',
		'Recognize street signs',
		'Open doors for all animals',
	];

	let choiceCorrect = [
		true,
		true,
		true,
		false,
		true,
		false,
	];

	let choicesCorrect = false;

	let validateChoices = () => {
		choicesCorrect = false;

		let options = document.querySelectorAll(".option");
		
		for(let i = 1; i < options.length; i++) {
			let option = options[i];
			let yes = option.querySelector(".positive button");
			let no = option.querySelector(".negative button");

			if (choiceCorrect[i - 1] && yes.style.backgroundColor == 'green') {
				continue;
			} else if (!choiceCorrect[i - 1] && no.style.backgroundColor == 'green') {
				continue;
			} else {
				console.log("Choice " + i + " is incorrect");
				return;
			}
		}

		console.log("All choices correct");

		choicesCorrect = true;
	}

</script>

<svelte:document />

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
		<CarTrainingDialogBox {line} on:dialogEvent={handleDialogEvent} showNext={lineNumber < script.lines.length && lineNumber != 2} showBack={lineNumber > 1} />
	</div>
	<div slot="content" class="content"  bind:this={content}>
		{#if line.id == 1}
			<img src="/img/misc/vroomlogo.png" alt="Vroom" style="width: 70%;" />
		{/if}

		{#if line.id == 2}
			<div class="options">
				<div class="option">
					<div style="text-align: center; width: 2vw; font-size: 1.5vw;">
						Yes 
					</div>
					<div style="text-align: center; width: 2vw; font-size: 1.5vw;">
						No 
					</div>
					<div style="text-align: center; font-size: 1vw;">
						Which of these do we need to<br/> train our cars to be able to do?
					</div>
				</div>
				{#each choiceOptions as option, i}
					<div class="option flex flex-row w-full">
						<div class="positive">
							<button class="radio" on:click={(e) => {
								if (choiceCorrect[i]) {
									e.target.style.backgroundColor = 'green';
									document.getElementById("choice" + i + "_no").style.backgroundColor = '';
								} else {
									e.target.style.backgroundColor = 'red';
									document.getElementById("choice" + i + "_no").style.backgroundColor = '';
								}

								validateChoices();
							}}
							id={"choice" + i + "_yes"}>
							</button>
						</div>
						<div class="negative">
							<button class="radio" on:click={(e) => {
								if (!choiceCorrect[i]) {
									e.target.style.backgroundColor = 'green';
									document.getElementById("choice" + i + "_yes").style.backgroundColor = '';
								} else {
									e.target.style.backgroundColor = 'red';
									document.getElementById("choice" + i + "_yes").style.backgroundColor = '';
								}

								validateChoices();
							}}
							id={"choice" + i + "_no"} >
							</button>
						</div>
						<label for={"choice" + i}>{option}</label>
					</div>
				{/each}
			</div>

			{#if choicesCorrect}
				<button class="nextButton" on:click={() => handleNavigation(NavigationDirection.forward)}>
					<img src="/img/misc/vroomnext.png" alt="Next" />
				</button>
			{/if}
		{/if}
	</div>
</Scene>


<style>
	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		width: 65vw;
		position: absolute;
		top: 0;
		right: 0;
	}

	.options {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: start;
		gap: 1vh;
		background-color: white;
		padding: 1vh;
		border: 0.2vw solid rgb(255, 150, 230);
	}

	.option {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: start;
		gap: 1vw;
		width: 100%;
	}

	.option label {
		font-size: 1.5vw;
		color:  rgb(189, 75, 207);
		border-bottom: 0.25vw solid black;
	}

	.option input[type="radio"] {
		display: none;
	}

	.option input[type="radio"] + span {
		width: 1.5vw;
		height: 1.5vw;
		border-radius: 50%;
		border: 1px solid black;
		display: inline-block;
		position: relative;
		left: 25%;
	}

	.option input[type="radio"]:checked + span {
		background-color: black;
	}

	.nextButton {
		transition: all 0.2s ease-in-out;
		position: absolute;
		bottom: 0;
		right: 0;
		margin: 1rem;
		height: 10vh;
	}

	.nextButton img {
		height: 10vh;
	}

	.nextButton:hover {
		transform: scale(1.1) translateX(-1vw);
	}

	.nextButton:active {
		transform: scale(0.9) translateX(3vw);
	}

</style>