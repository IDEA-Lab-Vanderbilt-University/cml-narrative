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

	let trainingFaceFolder: HTMLElement | void;
	let addedFaces = 0;
	let addedNoFaces = 0;
</script>

<svelte:document />

<Scene background={line.background} audio={line.audio} bgPosition={line.id == 11 ? 'bottom' : 'center'}>
	<div class="w-full" slot="dialog">
		<CarTrainingDialogBox {line} on:dialogEvent={handleDialogEvent} showNext={lineNumber < script.lines.length && !([2, 5, 7, 11, 12].includes(lineNumber))} showBack={lineNumber > 1} />
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

		{#if line.id == 4}
			<img src="/img/misc/faces.png" alt="Faces" style="width: 70%;" />
		{/if}

		{#if line.id == 5}
			<div class="flex flex-col justify-center items-center">
				<div>
					{#each [0, 1, 2, 3] as i}
						{#each [0, 1, 2, 3] as j}
							<button 
								style="background: url('/img/misc/trainingfaces.png'); width: 10vw; height: 8vw; background-position: -{j * 10}vw -{i * 8}vw; background-size: 40vw 32vw; transition: transform 1.5s ease-out, opacity 1.5s ease-out;"
								on:click={(event) => {
									// Move to the folder icon
									let folderPos = trainingFaceFolder.getBoundingClientRect();
									let buttonPos = event.target.getBoundingClientRect();

									let x = folderPos.left - buttonPos.left;
									let y = folderPos.top - buttonPos.top;

									event.target.style.transform = `translate(${x}px, ${y}px) scale(0.5)`;
									event.target.style.opacity = '0';
									addedFaces++;
								}}
							>
							</button>
						{/each}
						<br/>
					{/each}
				</div>
				<img src="/img/misc/trainingfacesfolder.png" alt="Training data faces" style="height: 20vh;  width: fit-content;" bind:this={trainingFaceFolder} />
			</div>

			{#if addedFaces >= 3}
				<button class="nextButton" on:click={() => handleNavigation(NavigationDirection.forward)}>
					<img src="/img/misc/vroomnext.png" alt="Next" />
				</button>
			{/if}
		{/if}

		{#if line.id == 6}
			<div>
				<img src="/img/misc/facerecognized.png" alt="Face" style="width: 70%;" />
				<div class="recognizedText">HUMAN FACE RECOGNIZED</div>
			</div>
		{/if}

		{#if line.id == 7}
		<div class="flex flex-col justify-center items-center">
			<div>
				{#each [0, 1, 2, 3] as i}
					{#each [0, 1, 2, 3] as j}
						<button 
							style="background: url('/img/misc/trainingnofaces.png'); width: 10vw; height: 8vw; background-position: -{j * 10}vw -{i * 8}vw; background-size: 40vw 32vw; transition: transform 1.5s ease-out, opacity 1.5s ease-out;"
							on:click={(event) => {
								// Move to the folder icon
								let folderPos = trainingFaceFolder.getBoundingClientRect();
								let buttonPos = event.target.getBoundingClientRect();

								let x = folderPos.left - buttonPos.left;
								let y = folderPos.top - buttonPos.top;

								event.target.style.transform = `translate(${x}px, ${y}px) scale(0.5)`;
								event.target.style.opacity = '0';
								addedNoFaces++;
							}}
						>
						</button>
					{/each}
					<br/>
				{/each}
			</div>
			<img src="/img/misc/trainingnofacesfolder.png" alt="Training data faces" style="height: 20vh;  width: fit-content;" bind:this={trainingFaceFolder} />
		</div>

		{#if addedNoFaces >= 3}
			<button class="nextButton" on:click={() => handleNavigation(NavigationDirection.forward)}>
				<img src="/img/misc/vroomnext.png" alt="Next" />
			</button>
		{/if}
		{/if}

		{#if line.id == 8}
			<div>
				<img src="/img/misc/nofacerecognized.png" alt="No Face" style="width: 70%;" />
				<div class="notRecognizedText text-red">NO FACE RECOGNIZED</div>
			</div>
		{/if}

		{#if line.id == 9 || line.id == 10}
			<img src="/img/characters/level-2/dash/dash-trainingdata.png" alt="Training data" style="height:  70%;" />
		{/if}

		{#if line.id == 11}
			<img id="dashboard" src="/img/backgrounds/level2/car-training/dashboard.png" alt="Dashboard" />
			<button id="gpsglowing"
				on:click={() => handleNavigation(NavigationDirection.forward)}
			></button>
		{/if}		

		{#if line.id == 12}
			<img id="dashboard" src="/img/backgrounds/level2/car-training/dashboard.png" alt="Dashboard" />
			<div class="grayfilter"></div>
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

	.recognizedText {
		font-size: 2vw;
		color: white;
		width: 70%;
		text-align: center;
		animation: whiteinout 2s infinite ease-in-out;
		margin-top: 1vh;
	}

	.notRecognizedText {
		font-size: 2vw;
		color: red;
		width: 70%;
		text-align: center;
		animation: redinout 2s infinite ease-in-out;
		margin-top: 1vh;
	}

	#dashboard {
		position: absolute;
		bottom: -10vh;
		left: -40vw;
		width: 110vw;
		max-width: none;
	}

	#gpsglowing {
		position: absolute;
		width: 20vw;
		height: 15vw;
		left: calc(50% - 27vw);
		bottom: 0;
		z-index: 100;
		box-shadow: 0 0 1vw 0.5vw rgb(255, 150, 230);
		animation: gpsglow 2s infinite ease-in-out;
	}

	.grayfilter {
		position: fixed;
		left: 0;
		top: 0;
		width: 100vw;
		height: 100vh;
		background: rgba(0, 0, 0, 0.85);
	}


	@keyframes whiteinout {
		0% {
			color: white;
		}
		50% {
			color: rgba(255, 255, 255, 0.35);
		}
		100% {
			color: white;
		}
	}

	@keyframes redinout {
		0% {
			color: red;
		}
		50% {
			color: rgba(255, 0, 0, 0.35);
		}
		100% {
			color: red;
		}
	}

	@keyframes gpsglow {
		0% {
			background: none;
		}
		50% {
			background: rgba(255, 150, 230, 0.35);
		}
		100% {
			background: none;
		}
	}
</style>