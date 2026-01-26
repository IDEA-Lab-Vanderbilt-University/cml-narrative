<script lang="ts">
	import { goto } from '$app/navigation';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import DataService from '$lib/utils/DataService/index.js';
	import { accessTokenStore, studentDataStore, studentProgressStore } from '$lib/utils/stores/store.js';
	import { onMount } from 'svelte';
	import script from '$lib/scripts/level4/index.js';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import TimeTravel from '$lib/components/activities/time-travel/TimeTravel.svelte';
	import TabletMenu from '$lib/components/tablet/TabletMenu.svelte';
	import { Assets } from '$lib/utils/Assets';
	import TextResponseModal from '$lib/components/activities/free-response/TextResponseModal.svelte';
	import ImageResponseModal from '$lib/components/activities/free-response/ImageResponseModal.svelte';
	import RobotStepsModal from '$lib/components/modals/RobotStepsModal.svelte';
	import { get } from 'svelte/store';
	import WaitForTeacherModal from '$lib/components/modals/WaitForTeacherModal.svelte';
	import SecretCodeModal from '$lib/components/modals/SecretCodeModal.svelte';
	import TraininatorMain from '$lib/components/activities/traininator/TraininatorMain.svelte';
	import Codinator from '$lib/components/activities/Codinator.svelte';

	export let data;

	let line: Line;
	$: line = data.line;

    let lineNumber = 1;
    $: lineNumber = line.id;

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
			if (line.id == script.lines.length) {
                // No next level
				// target = '/level5?page=1';
			} else {
                if(line.id > 2 || line.id == 1) {
					target = `/level4new?page=${line.id + 1}`;
				}
			}
		} else if (direction == NavigationDirection.backward) {
			if(line.id > 3 && line.id < 8) {
				target = `/level4new?page=${line.id - 1}`;
			}
		}

		if (target) {
			studentProgressStore.update((data) => {
				data.last_visited = target;
				return data;
			});
			goto(target);
		}
	};

    let content: HTMLDivElement | null;

	let robotAbilities = '';
	let robotHelp = '';
	let robotImportance = '';
	let robotBias = '';
	let robotName = '';
	let rejectionComment = '';
	let teacherAgent = '';

	let doSubmit = false;
	let imageResponseModalShowFeedbackModal = false;
	let imageResponseModalIsSuccess = false;
	let imageResponseModalMessage = '';

	onMount(async () => {
		// Load the travel logs for the robot design if they exist
		let logs1 = await DataService.TravelLog.getTravelLogs('robotdesign1');
		if(logs1.length > 0) {
			robotAbilities = logs1[logs1.length - 1].data;
		}

		let logs2 = await DataService.TravelLog.getTravelLogs('robotdesign2');
		if(logs2.length > 0) {
			robotHelp = logs2[logs2.length - 1].data;
		}

		let logs3 = await DataService.TravelLog.getTravelLogs('robotdesign3');
		if(logs3.length > 0) {
			robotImportance = logs3[logs3.length - 1].data;
		}

		let logs4 = await DataService.TravelLog.getTravelLogs('robotdesign4');
		if(logs4.length > 0) {
			robotBias = logs4[logs4.length - 1].data;
		}

		let logs5 = await DataService.TravelLog.getTravelLogs('robotdesign5');
		if(logs5.length > 0) {
			robotName = logs5[logs5.length - 1].data;
		}	
		
		let student = get(studentDataStore);
		if(student && student.teacher_id) {
			const teacher = await DataService.Teacher.getTeacher(student.teacher_id);
			if(teacher && teacher.agent_name) {
				teacherAgent = teacher.agent_name;
			}
		}

		// Load the travel logs for the training data examples if they exist
		let logs6 = await DataService.TravelLog.getTravelLogs('trainingdataexamples');
		if(logs6.length > 0) {
			try{
				let examples = JSON.parse(logs6[logs6.length - 1].data).response;

				if (!Array.isArray(examples) || examples.length < 6) {
					throw new Error('Invalid training data examples format');
				}

				example1 = examples[0];
				example2 = examples[1];
				example3 = examples[2];
				example4 = examples[3];
				example5 = examples[4];
				example6 = examples[5];
			} catch (error) {
				console.error('Error parsing training data examples:', error);
			}
		}

		let logs7 = await DataService.TravelLog.getTravelLogs('trainingdataexampleclasses');
		if(logs7.length > 0) {
			try{
				let classes = JSON.parse(logs7[logs7.length - 1].data).response;

				if (!Array.isArray(classes) || classes.length < 2) {
					throw new Error('Invalid training data example classes format');
				}

				console.log('Example classes:', classes);
				exampleClasses = classes;
				
			} catch (error) {
				console.error('Error parsing training data example classes:', error);
			}
		}

		let logs8 = await DataService.TravelLog.getTravelLogs('trainingdataexampleclassnames');
		if(logs8.length > 0) {
			try{
				let classNames = JSON.parse(logs8[logs8.length - 1].data).response;

				if (!Array.isArray(classNames) || classNames.length < 2) {
					throw new Error('Invalid training data example class names format');
				}

				classNamesFromTravelLog = classNames.map((name) => name.name);
				console.log('Example class names:', classNamesFromTravelLog);
			} catch (error) {
				console.error('Error parsing training data example class names:', error);
			}
		}

		let logs9 = await DataService.TravelLog.getTravelLogs('robotdesignmodify');
		if(logs9.length > 0) {
			try{
				let modify = JSON.parse(logs9[logs9.length - 1].data).response;

				if (!Object.keys(modify).length || !modify.Modify || !modify['Not Modify']) {
					throw new Error('Invalid design modify format');
				}

				modifyClasses = modify;

				console.log('Modify classes:', modifyClasses);
				
			} catch (error) {
				console.error('Error parsing design modify:', error);
			}
		}

		logsLoaded = true;

		if(lineNumber == 51 || lineNumber == 52){
			// Create a robotshowcase travel log if it doesn't exist
			let logs = await DataService.TravelLog.getTravelLogs('robotshowcase');

			// Create a new travel log if there are no existing pending logs
			logs = logs.filter((log) => {
				return log.status == 'pending';
			});


			if(logs.length == 0) {
				await DataService.TravelLog.createPendingTravelLog({
					data: JSON.stringify({ 
						response: 'robotshowcase'
					}),
					description: 'robotshowcase',
					status: 'pending'
				});
			}
		}
	});

	let logsLoaded = false;

	let examplesValid = false;
	let example1 = '';
	let example2 = '';
	let example3 = '';
	let example4 = '';
	let example5 = '';
	let example6 = '';
	$: examplesValid = example1.trim().length > 0 && example2.trim().length > 0 && example3.trim().length > 0 && example4.trim().length > 0 && example5.trim().length > 0 && example6.trim().length > 0;
	
	let exampleClassCount = 2;
	let exampleClassesValid = false;

	let exampleClasses = [];
	let exampleClassNamesValid = false;
	let classNamesFromTravelLog: string[] = [];

	const validateExampleClassNames = () => {
		exampleClassNamesValid = true;

		const classNameInputs = document.querySelectorAll('.classnameinput');
		for (let i = 0; i < classNameInputs.length; i++) {
			const classNameInput = classNameInputs[i] as HTMLInputElement;
			if (classNameInput.value.trim() === '') {
				exampleClassNamesValid = false;
				break;
			}
		}

		return exampleClassNamesValid;
	};

	const validateExampleClasses = () => {
		exampleClassesValid = true;

		// Examples must all be out of the initial "Unsorted" class
		const unsortedClass = document.getElementById('classColumn0');
		if (unsortedClass) {
			const examples = unsortedClass.querySelectorAll('.draggableExample');
			if (examples.length > 0) {
				exampleClassesValid = false;
				return false;
			}
		}

		// Check if examples are not all in the same class
		const classColumns = document.querySelectorAll('.classColumn');
		for (let i = 0; i < classColumns.length; i++) {
			const classColumn = classColumns[i];
			const examples = classColumn.querySelectorAll('.draggableExample');
			if (examples.length > 5) {
				exampleClassesValid = false;
				return false;
			}
		}

		return exampleClassesValid;
	};

	const dragExample = (event: DragEvent) => {
		const target = event.target as HTMLElement;
		if (target && target.classList.contains('draggableExample')) {
			target.classList.add('dragging');
		}
	};

	const dragEndExample = (event: DragEvent) => {
		const target = event.target as HTMLElement;
		if (target && target.classList.contains('draggableExample')) {
			target.classList.remove('dragging');
		}
	};

	const dropExample = (event: DragEvent) => {
		event.preventDefault();
		const target = event.target as HTMLElement;
		if (target && target.classList.contains('classColumn')) {
			const draggedElement = document.querySelector('.dragging') as HTMLElement;
			if (draggedElement) {
				target.appendChild(draggedElement);
				draggedElement.classList.remove('dragging');
			}
		}
		validateExampleClasses();
	};

	let drawingSubmitted = false;
	$: {
		if(lineNumber == 18) {
			// Check if drawing was already submitted
			DataService.TravelLog.getTravelLogs('draw-my-robot').then((travelLogs) => {
				if (travelLogs.length > 0) {
					drawingSubmitted = true;
				}
			});
		}
	}

	$: {
		if(lineNumber == 20 && !drawingSubmitted) {
			// Send back to the drawing page
			studentProgressStore.update((progress) => {
				progress.last_visited = '/level4new?page=16';
				return progress;
			});
			goto('/level4new?page=16');
		}
	}

	let modifyClasses: Record<string, string[]> = {
		'Modify': ["Training Data Classes","Training Data Set","Purpose of your AI Robot", "AI Algorithm"],
		'Not Modify': []
	};

	$: {
		if(lineNumber == 47 && modifyClasses['Not Modify'].includes('Training Data Classes')) {
			// Skip to next page
			studentProgressStore.update((progress) => {
				progress.last_visited = '/level4new?page=48';
				return progress;
			});
			goto('/level4new?page=48');
		}
	}

	$: {
		if(lineNumber == 48 && modifyClasses['Not Modify'].includes('Training Data Set')) {
			// Skip to next page
			studentProgressStore.update((progress) => {
				progress.last_visited = '/level4new?page=49';
				return progress;
			});
			goto('/level4new?page=49');
		}
	}

	$: {
		if(lineNumber == 49 && modifyClasses['Not Modify'].includes('AI Algorithm')) {
			// Skip to next page
			studentProgressStore.update((progress) => {
				progress.last_visited = '/level4new?page=50';
				return progress;
			});
			goto('/level4new?page=50');
		}
	}

	$: {
		if(lineNumber == 50 && modifyClasses['Not Modify'].includes('Purpose of your AI Robot')) {
			// Skip to next page
			studentProgressStore.update((progress) => {
				progress.last_visited = '/level4new?page=51';
				return progress;
			});
			goto('/level4new?page=51');
		}
	}

</script>

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
        {#if (lineNumber != 2 && lineNumber < 8) || (lineNumber >= 15 && lineNumber < 17)}
            <DialogBox {line} on:dialogEvent={handleDialogEvent} />
        {/if}
	</div>

	<div slot="content" class="h-full w-full" bind:this={content}>
        {#if (lineNumber != 2 && lineNumber < 8) || (lineNumber >= 15 && lineNumber < 17)}
			<TabletButton on:click={() => { 
				if(lineNumber == 16) {
					handleNavigation(NavigationDirection.forward);
					return;
				}

				const event  = new CustomEvent('showTablet', {
					bubbles: true
				});
				
				content?.dispatchEvent(event);
			}}
			pulse={lineNumber == 16}
			/>
        {/if}

        {#if lineNumber == 2}
            <TimeTravel destinationPage="/level4new?page=3" direction='backward' />
        {/if}

		{#if lineNumber >= 8 && lineNumber < 15}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="agent-example">
					<div class="agent-example-header">
						{#if lineNumber == 8 || lineNumber == 9}
							Agent Nova
						{:else if lineNumber <= 11}
							Agent Spork
						{:else}
							Agent Raven
						{/if}
					</div>
					<div class="agent-example-body">
						<p>
							{line.dialog()}
						</p>

						{#if lineNumber == 8}
							<img src="/img/level4new/allfoods.png" alt="All Foods Example" class="agent-nova-image" />
						{/if}

						{#if lineNumber == 9}
						<div class="flex flex-row">
							<div class="flex flex-col text-center">
								<p>Healthy Foods</p>
								<img src="/img/level4new/healthyfoods.png" alt="Healthy Foods Example" class="agent-nova-image mr-4" />
							</div>
							<div class="flex flex-col text-center">
								<p>Unhealthy Foods</p>
								<img src="/img/level4new/unhealthyfoods.png" alt="Unhealthy Foods Example" class="agent-nova-image" />
							</div>
						</div>
						{/if}

						{#if lineNumber == 10}
							<img src="/img/level4new/objects.png" alt="Objects" class="agent-nova-image" />
						{/if}

						{#if lineNumber == 11}
						<div class="flex flex-row">
							<div class="flex flex-col text-center">
								<p>Safe Objects</p>
								<img src="/img/level4new/safeobjects.png" alt="Safe Objects Example" class="agent-nova-image mr-4" />
							</div>
							<div class="flex flex-col text-center">
								<p>Sharp Objects</p>
								<img src="/img/level4new/dangerousobjects.png" alt="Dangerous Objects Example" class="agent-nova-image" />
							</div>
						</div>
						{/if}

						{#if lineNumber == 12}
							<img src="/img/level4new/emotions.png" alt="Emotions Example" class="agent-nova-image" />
						{/if}

						{#if lineNumber == 13}
							<div class="flex flex-row">
								<div class="flex flex-col text-center">
									<p>Positive Emotions</p>
									<img src="/img/level4new/positiveemotions.png" alt="Positive Emotions Example" class="agent-nova-image mr-4" />
								</div>
								<div class="flex flex-col text-center">
									<p>Negative Emotions</p>
									<img src="/img/level4new/negativeemotions.png" alt="Negative Emotions Example" class="agent-nova-image" />
								</div>
							</div>
						{/if}

						{#if lineNumber == 14}
							<Codinator 
								iframeStyle="height: 60vh;"
								buttonLabel=""
							/>
						{/if}

					</div>
				</div>

				<button class="nextBtn float-right relative z-10" on:click={() => handleNavigation(NavigationDirection.forward)}><img src="/img/misc/nextbutton.png" alt="Next" id="nextbutton" />
				</button>
			</Tablet>
		{/if}

		{#if lineNumber == 17}
		<Tablet showMeter={false} showBottomButtons={false}>
			<TabletMenu apps={[
				{
					id: "travelLog",
					title: "Travel Logs",
					img: Assets.Tablet.travelLogIcon,
					color: "rgb(85,205,110)"
				},
				{
					id: "profile",
					title: "Profiles",
					img: Assets.Tablet.profileIcon,
					color: "rgb(185,90,210)"
				},
				{
					id: "badges",
					title: "Badges",
					img: Assets.Tablet.badgesIcon,
					color: "rgb(0,175,210)"
				},
				{
					id: "robotprototype",
					title: "Robot Prototype",
					img: Assets.Tablet.robotPrototypeIcon,
					color: "rgb(200, 80, 50)"
				}
			]}

			onSelect={(selection) => {
				console.log(selection);
				if(selection == "robotprototype") {
					goto('/level4new?page=18');
				}
			}}
			/>
		</Tablet>
		{/if}
		{#if lineNumber == 18}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostepintro">
					<h2><img src="/img/icons/robodesign.png" alt="Design"/> Design</h2>
					<p>{line.dialog()}</p>
					<button class="nextBtn" on:click={() => goto('/level4new?page=19')}><img src="/img/misc/nextbutton.png" alt="Next" id="nextbutton" />
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 19}
			<TextResponseModal 
				prompt={line.dialog()}
				on:submit={() => goto('/level4new?page=20')}
			/>
		{/if}
    </div>
</Scene>

<style>
	.robostepintro, .robostependsummary {
		width: 80%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		height: 75vh;
	}

	.robostependsummary {
		height: auto;
		padding: 5vh 0;
		gap: 5vh;
	}

	.robostepintro h2 {
		font-size: 6vh;
		text-align: center;
		color: white;
		margin-top: 2vh;
	}

	.robostepintro p {
		font-size: 4vh;
		text-align: left;
		color: white;
		width: 70%;
		margin: 0 auto;
		font-family: 'Gemunu Libre';
	}

	.robostependsummary p {
		font-size: 3vh;
		text-align: left;
		color: white;
		font-family: 'Gemunu Libre';
	}

	.robostepintro img {
		height: 12vh;
		display: inline;
		position: relative;
		left: -6vh;
		margin-right: -6vh;
		top: -2vh;
	}


    #nextbutton {
        height: 10vh;
        transition: transform 0.2s;
		width: 30vh;
	}

    #nextbutton:hover {
        transform: scale(1.1);
    }

    #nextbutton:active {
        transform: scale(0.9);
    }

	.robostepsummarybuttons {
		display: flex;
		justify-content: space-evenly;
		width: 100%;
	}

	.robostepsummarybuttons button, .robostependsummary button, .nicebtn {
		background: radial-gradient(farthest-corner at bottom right, #49c5ff 75%, #fff 100%);
		background-color: #49c5ff;
		color: #111;
		border: none;
		border: 2px solid #289dd3;
		height: 7vh;
		border-radius: 3.5vh;
		padding: 1vh 2vw;
		font-size: 1.5rem;
		cursor: pointer;
		transition: 0.3s;
		display: block;
	}
	.robostepsummarybuttons button:not(:disabled):hover, .robostependsummary button:not(:disabled):hover, .nicebtn:not(:disabled):hover {
		transform: scale(1.05);
	}

	.robostepsummarybuttons button:not(:disabled):active, .robostependsummary button:not(:disabled):active, .nicebtn:not(:disabled):active {
		transform: scale(0.95);
	}
	
	.robostepsummarybuttons button:disabled, .robostependsummary button:disabled, .nicebtn:disabled {
		filter: grayscale(1);
		cursor: not-allowed;
	}

	.examples {
		display: flex;
		gap: 5vh;
	}

	.examplescolumn {
		display: flex;
		flex-direction: column;
		gap: 2vh;
	}

	.examples input {
		width: 40vh;
		height: 7vh;
		font-size: 3vh;
		text-align: center;
		border: 2px solid white;
		color: black;
		border-radius: 25px;
	}

	:global(.classColumn){
		display: flex;
		flex-direction: column;
		gap: 1vh;
		border: 2px dashed white;
		padding: 1vh;
		border-radius: 25px;
		min-height: 45vh;
	}

	.draggableExample {
		width: 25vh;
		height: 5vh;
		font-size: 2.25vh;
		line-height: 4.5vh;
		text-align: center;
		border: 2px solid white;
		color: black;
		border-radius: 25px;
		background-color: white;
		user-select: none;
	}

	:global(.classColumnTitle) {
		font-size: 3vh;
		text-align: center;
		color: white;
		padding: 1vh;
		border-radius: 25px;
		user-select: none;
	}

	.namingClasses {
		display: flex;
		flex-direction: column;
		gap: 3vh;
	}

	.namingClass {
		color: white;
		font-size: 3vh;
	}

	.classnameinput {
		width: 40vh;
		height: 5vh;
		font-size: 3vh;
		text-align: center;
		border: 2px solid white;
		color: black;
		border-radius: 25px;
	}

	.agent-example {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1vh;
		height: 70vh;
	}

	.agent-example-header {
		color:#222;
		width: 70%;
		padding-top: 2vh;
		padding-bottom: 2vh;
		text-align: center;
		font-size: 5vh;
		background: linear-gradient(90deg, #49c5ff 0%, #7dcbf0 25%, #49c5ff 40%, #29aae5 100%);
		border-radius: 10px;
	}

	.agent-example-body {
		background-color: white;
		border: 1vh solid #289dd3;
		border-radius: 10px;
		padding: 2vh;
		width: 70%;
		height: auto;
		font-size: 3vh;
		color: #111;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.agent-example-body img {
		max-height: 50vh;
		width: auto;
	}

</style>