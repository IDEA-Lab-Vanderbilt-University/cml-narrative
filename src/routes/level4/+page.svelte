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
                // Next level
				target = '/level5?page=1';
			} else {
                if(line.id > 2 || line.id == 1) {
					target = `/level4?page=${line.id + 1}`;
				}
			}
		} else if (direction == NavigationDirection.backward) {
			if(line.id > 3 && line.id < 8) {
				target = `/level4?page=${line.id - 1}`;
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
				progress.last_visited = '/level4?page=16';
				return progress;
			});
			goto('/level4?page=16');
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
				progress.last_visited = '/level4?page=48';
				return progress;
			});
			goto('/level4?page=48');
		}
	}

	$: {
		if(lineNumber == 48 && modifyClasses['Not Modify'].includes('Training Data Set')) {
			// Skip to next page
			studentProgressStore.update((progress) => {
				progress.last_visited = '/level4?page=49';
				return progress;
			});
			goto('/level4?page=49');
		}
	}

	$: {
		if(lineNumber == 49 && modifyClasses['Not Modify'].includes('AI Algorithm')) {
			// Skip to next page
			studentProgressStore.update((progress) => {
				progress.last_visited = '/level4?page=50';
				return progress;
			});
			goto('/level4?page=50');
		}
	}

	$: {
		if(lineNumber == 50 && modifyClasses['Not Modify'].includes('Purpose of your AI Robot')) {
			// Skip to next page
			studentProgressStore.update((progress) => {
				progress.last_visited = '/level4?page=51';
				return progress;
			});
			goto('/level4?page=51');
		}
	}

</script>

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
        {#if (lineNumber != 2 && lineNumber < 8) || lineNumber == 51}
            <DialogBox {line} on:dialogEvent={handleDialogEvent} />
        {/if}
	</div>

	<div slot="content" class="h-full w-full" bind:this={content}>
        {#if lineNumber != 2 && lineNumber < 8}
			<TabletButton on:click={() => { 
				if(lineNumber == 7) {
					handleNavigation(NavigationDirection.forward);
					return;
				}

				const event  = new CustomEvent('showTablet', {
					bubbles: true
				});
				
				content?.dispatchEvent(event);
			}}
			pulse={lineNumber == 7}
			/>
        {/if}

        {#if lineNumber == 2}
            <TimeTravel destinationPage="/level4?page=3" direction='backward' />
        {/if}

		{#if lineNumber == 8}
		<Tablet showMeter={false} showBottomButtons={false}>
			<TabletMenu apps={[
				{
					title: "Travel Logs",
					img: Assets.Tablet.travelLogIcon,
					color: "rgb(85,205,110)"
				},
				{
					title: "Profiles",
					img: Assets.Tablet.profileIcon,
					color: "rgb(185,90,210)"
				},
				{
					title: "Badges",
					img: Assets.Tablet.badgesIcon,
					color: "rgb(0,175,210)"
				},
				{
					title: "Robot Prototype",
					img: Assets.Tablet.robotPrototypeIcon,
					color: "rgb(200, 80, 50)"
				}
			]}

			onSelect={(selection) => {
				if(selection == "Robot Prototype") {
					goto('/level4?page=9');
				}
			}}
			/>
		</Tablet>
		{/if}

		{#if lineNumber == 9}
			<RobotStepsModal currentStep={0} onStepClick={() => goto('/level4?page=10')} />
		{/if}

		{#if lineNumber == 10}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostepintro">
					<h2><img src="/img/icons/robodesign.png" alt="Design"/> Design</h2>
					<p>Your mission is to design an AI robot that can <strong>help your community.</strong></p>
					<p>Consider your interests and what your community might need, and describe this AI robot idea to our SPOT design engineers.</p>
					<button class="nextBtn" on:click={() => goto('/level4?page=11')}><img src="/img/misc/nextbutton.png" alt="Next" id="nextbutton" />
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 11}
			<TextResponseModal 
				id="robotdesign1" 
				title="For the future, I will design an AI robot with special abilities to help others. It will be able to ______"  
				prompt="" 
				placeholder=""
				onSuccess={(response) => { robotAbilities = response; goto('/level4?page=12'); }} 
				prefill={robotAbilities}
				/>
		{/if}

		{#if lineNumber == 12}
			<TextResponseModal 
				id="robotdesign2" 
				title="My robot would help the following people: _________"  
				prompt="" 
				placeholder=""
				onSuccess={(response) => { robotHelp = response; goto('/level4?page=13'); }} 
				prefill={robotHelp}
				/>
		{/if}

		{#if lineNumber == 13}
			<TextResponseModal 
				id="robotdesign3" 
				title="My robot is important and should be designed because _______"  
				prompt="" 
				placeholder=""
				onSuccess={(response) => { robotImportance = response; goto('/level4?page=14'); }}
				prefill={robotImportance}
				/>
		{/if}

		{#if lineNumber == 14}
			<TextResponseModal 
				id="robotdesign4" 
				title="When designing my robot, I will minimize bias by ___________"  
				prompt="" 
				placeholder=""
				onSuccess={(response) => { robotBias = response; goto('/level4?page=15'); }} 
				prefill={robotBias}
				/>
		{/if}

		{#if lineNumber == 15}
			<TextResponseModal 
				id="robotdesign5" 
				title="My robot will be named _________"  
				prompt="" 
				placeholder=""
				onSuccess={(response) => { robotName = response; goto('/level4?page=17'); }}
				prefill={robotName}
				/>
		{/if}

		{#if lineNumber == 16}
			
			<ImageResponseModal 
				prompt={"Draw a picture of your robot"} 
				handleImageSubmission={async (event) => {
					doSubmit = event.detail.doSubmit;
					let success = await DataService.TravelLog.handleImageSubmission(event, "draw-my-robot");

					if (success) {
						imageResponseModalMessage = 'Great job! Your image has been submitted successfully.';
						imageResponseModalIsSuccess = true;
					} else {
						imageResponseModalMessage = 'There was an error submitting your image. Please try again.';
						imageResponseModalIsSuccess = false;
					}
					imageResponseModalShowFeedbackModal = true;
				}}
				showFeedbackModal={imageResponseModalShowFeedbackModal}
				isSuccess={imageResponseModalIsSuccess}
				message={imageResponseModalMessage}
				onFeedbackClose={() => {
					imageResponseModalShowFeedbackModal = false;
					if(doSubmit) {
						drawingSubmitted = true;
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4?page=17';
							return progress;
						});
						
						goto('/level4?page=18');
					}
				}}
				onSubmit={() => {
					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=17';
						return progress;
					});
					
					goto('/level4?page=18');
				}}
			/>
		{/if}

		{#if lineNumber == 17}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostependsummary">
					<p>
						For the future, I will design an AI robot with special abilities. It will be able to {robotAbilities}! 
						My robot would help the following people: {robotHelp}.
						My robot is important and should be designed because {robotImportance}.
						When designing my robot, I will minimize bias by {robotBias}. 
					</p>
					<p>
						My robot will be named {robotName}.
					</p>
				</div>
				<div class="robostepsummarybuttons">
					<button class="nextBtn" on:click={() => goto('/level4?page=11')}>
						Edit
					</button>
					<button class="nextBtn" on:click={() => {
						// Submit the robot design
						DataService.TravelLog.createPendingTravelLog({
							data: JSON.stringify({ 
							response:
`For the future, I will design an AI robot with special abilities. It will be able to ${robotAbilities}! 
My robot would help the following people: ${robotHelp}.
My robot is important and should be designed because ${robotImportance}.
When designing my robot, I will minimize bias by ${robotBias}. 

My robot will be named ${robotName}.`,
							}),
							description: 'robotdesignFinal',
							status: 'pending'
						});

						goto('/level4?page=18');
					}}>
						Submit
					</button>

				</div>
			</Tablet>
		{/if}

		{#if lineNumber == 18}
			<WaitForTeacherModal
				description="robotdesignFinal"
				task="robot design" 
				sponge={drawingSubmitted? "" : "Meanwhile, start drawing a design for your robot!" }
				spongeButtonText={drawingSubmitted? "" : "Draw my robot"}
				onSpongeButtonClicked={() => {
					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=16';
						return progress;
					});
					
					goto('/level4?page=16');
				}}
				onSuccess={() => {
					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=20';
						return progress;
					});
					
					goto('/level4?page=20');
				}}

				onRejected={(reason) => {
					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=19';
						return progress;
					});

					rejectionComment = reason;

					goto('/level4?page=19');
				}}
			/>
		{/if}
		{#if lineNumber == 19}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostependsummary">
					<p>
						Oh no! Your robot design needs more work!
					</p>
					<p>
						Agent {teacherAgent} said: {rejectionComment}
					</p>
					<p>
						Keep this in mind as you work on your new robot design!
					</p>
					<button class="nextBtn" on:click={() => {
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4?page=11';
							return progress;
						});

						goto('/level4?page=11');
					}}>
						Edit
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 20}
			<SecretCodeModal
				onSuccess={() => {
					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=21';
						return progress;
					});
					
					goto('/level4?page=21');
				}}
			/>
		{/if}
		{#if lineNumber == 21}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostependsummary">
					<p>
						Congratulations, your prototype idea has been approved!
					</p>
					<p>
						It's time to decide on the data you will use to train your AI robot.
					</p>
					<button class="nicebtn" on:click={() => {
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4?page=22';
							return progress;
						});
						
						goto('/level4?page=22');
					}}>
Next
					</button>
				</div>
			</Tablet>
		{/if}

		{#if lineNumber == 22}
			<RobotStepsModal currentStep={1} onStepClick={() => 
			{
				studentProgressStore.update((progress) => {
					progress.last_visited = '/level4?page=23';
					return progress;
				});

				// Skip the "does this help your community" question
				goto('/level4?page=24');
			}} />
		{/if}

		{#if lineNumber == 23}
			<Tablet showMeter={false} showBottomButtons={false}>

				<div class="robostepintro">
					<h2><img src="/img/icons/roboplan.png" alt="Plan"/> Plan</h2>
					<p>In your design notes, you said your robot prototype will be able to {robotAbilities}.</p>
					<p>Does this help to solve a problem in your community?</p>

					<div>
						<button class="nicebtn" on:click={() => {
							studentProgressStore.update((progress) => {
								progress.last_visited = '/level4?page=24';
								return progress;
							});
							
							goto('/level4?page=24');
						}}>
							Yes
						</button>
					</div>

				</div>
			</Tablet>
		{/if}

		{#if lineNumber == 24}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostependsummary">
					<p>
						It's time to decide on the data you will use to train your AI robot.
					</p>
					<p>
						Give at least 6 examples of the images you will be using as training data for your robot:
					</p>

					<div class="examples">
						<div class="examplescolumn">
							<input type="text" placeholder="" id="example1" name="example1" class="codeinput text-3xl text-center" bind:value={example1} />
							<input type="text" placeholder="" id="example2" name="example2" class="codeinput text-3xl text-center" bind:value={example2} />
							<input type="text" placeholder="" id="example3" name="example3" class="codeinput text-3xl text-center" bind:value={example3} />
						</div>
						<div class="examplescolumn">
							<input type="text" placeholder="" id="example4" name="example4" class="codeinput text-3xl text-center" bind:value={example4} />
							<input type="text" placeholder="" id="example5" name="example5" class="codeinput text-3xl text-center" bind:value={example5} />
							<input type="text" placeholder="" id="example6" name="example6" class="codeinput text-3xl text-center" bind:value={example6} />
						</div>
					</div>
					<button class="nicebtn" 
						disabled={!examplesValid}
						on:click={async () => {
						// Submit the training data examples
						await DataService.TravelLog.submitTravelLog({
							data: JSON.stringify({ 
								response: [
									example1,
									example2,
									example3,
									example4,
									example5,
									example6
								]
							}),
							description: 'trainingdataexamples',
							status: 'completed'
						});
						
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4?page=25';
							return progress;
						});
						
						goto('/level4?page=25');
					}}>
						Submit
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 25}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostependsummary">
					<p>
						Take your <strong>training data</strong> examples and divide them up into <strong>classes</strong> or categories. Think about the “face” and “no face” classes you encountered during your travels.
					</p>
					<div class="examples">
						<div class="classColumn" id="classColumn0" on:dragover={(e) => e.preventDefault()} on:drop={dropExample} role="button" tabindex="-1">
							<div class="classColumnTitle">
								Unsorted
							</div>
							<div class="draggableExample" on:drag={dragExample} on:dragend={dragEndExample} draggable="true" role="button" tabindex="-1">
								{example1}
							</div>
							<div class="draggableExample" on:drag={dragExample} on:dragend={dragEndExample} draggable="true" role="button" tabindex="-1">
								{example2}
							</div>
							<div class="draggableExample" on:drag={dragExample} on:dragend={dragEndExample} draggable="true" role="button" tabindex="-1">
								{example3}
							</div>
							<div class="draggableExample" on:drag={dragExample} on:dragend={dragEndExample} draggable="true" role="button" tabindex="-1">
								{example4}
							</div>
							<div class="draggableExample" on:drag={dragExample} on:dragend={dragEndExample} draggable="true" role="button" tabindex="-1">
								{example5}
							</div>
							<div class="draggableExample" on:drag={dragExample} on:dragend={dragEndExample} draggable="true" role="button" tabindex="-1">
								{example6}
							</div>
						</div>
						<div class="classColumn" id="classColumn1" on:dragover={(e) => e.preventDefault()} on:drop={dropExample} role="button" tabindex="-1">
							<div class="classColumnTitle">
								Class 1
							</div>
						</div>
						<div class="classColumn" id="classColumn2" on:dragover={(e) => e.preventDefault()} on:drop={dropExample} role="button" tabindex="-1">
							<div class="classColumnTitle">
								Class 2
							</div>
						</div>
						{#if exampleClassCount < 4}
							<div id="addClassColumn">
								<button class="addClassBtn" on:click={() => {
									// Add a new class column
									const newClassColumn = document.createElement('div');
									newClassColumn.classList.add('classColumn');
									newClassColumn.innerHTML = `
										<div class="classColumnTitle" id="classColumn${exampleClassCount + 1}">
											Class ${exampleClassCount + 1}
										</div>
									`;
									newClassColumn.ondragover = (e) => e.preventDefault();
									newClassColumn.ondrop = dropExample;
									document.querySelector('.examples')?.appendChild(newClassColumn);
									
									// Keep div with button at the end
									const addClassColumn = document.getElementById('addClassColumn');
									if (addClassColumn) {
										addClassColumn.parentNode?.appendChild(addClassColumn);
									}

									// Increment the class count
									exampleClassCount++;
								}}>
									Add Class
								</button>
							</div>
						{/if}
					</div>
					<div>
						<button class="nicebtn" 
							disabled={!exampleClassesValid}
							on:click={async () => {

							// Submit the training data classes
							const classes = [];
							const classColumns = document.querySelectorAll('.classColumn');

							for (let i = 0; i < classColumns.length; i++) {
								const classColumn = classColumns[i];
								const examples = classColumn.querySelectorAll('.draggableExample');
								
								if(examples.length > 0) {
									const exampleTexts = Array.from(examples).map((example) => example.textContent);
									classes.push(exampleTexts);
								}
							}

							await DataService.TravelLog.submitTravelLog({
								data: JSON.stringify({ 
									response: classes
								}),
								description: 'trainingdataexampleclasses',
								status: 'completed'
							});

							// Update the example classes
							exampleClasses = classes.map((exampleClass) => Array.from(exampleClass));

							studentProgressStore.update((progress) => {
								progress.last_visited = '/level4?page=26';
								return progress;
							});
							
							goto('/level4?page=26');
						}}>
							Submit
						</button>
					</div>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 26}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostependsummary">
					<p>
						Name the classes for the training data examples you suggested:
					</p>

					<div>
						<div class="namingClasses">
							{#each exampleClasses as exampleClass, index}
								<div class="namingClass">
									Class {index + 1} contains:
									{#each exampleClass as example, index}
											{example}{#if index < exampleClass.length - 1}, {/if}&nbsp;
									{/each}
									<br/>
									What should we call it? <input type="text" placeholder="Name for Class {index + 1}" id="exampleClassName{index}" name="exampleClassName{index}" class="classnameinput" on:keyup={validateExampleClassNames} />
								</div>
							{/each}
						</div>
					</div>

					<div>
						<button class="nicebtn" 
							disabled={!exampleClassNamesValid}
							on:click={async () => {
							// Submit the training data class names and contents
							const classes = [];
							let teacherVersion = "";

							for (let i = 0; i < exampleClasses.length; i++) {
								const classNameInput = document.getElementById(`exampleClassName${i}`);
								if (!classNameInput || !(classNameInput instanceof HTMLInputElement)) {
									continue;
								}

								const className = classNameInput.value.trim();
								const examples = exampleClasses[i];

								if (className && examples.length > 0) {
									classes.push({ name: className, examples });
									teacherVersion += `Class ${className} contains: ${examples.join(', ')}\n`;
								}
							}
							
							await DataService.TravelLog.submitTravelLog({
								data: JSON.stringify({ 
									response: classes
								}),
								description: 'trainingdataexampleclassnames',
								status: 'completed'
							});

							classNamesFromTravelLog = classes.map((classItem) => classItem.name);

							// Submit the teacher version of the training data
							await DataService.TravelLog.createPendingTravelLog({
								data: JSON.stringify({ 
									response: teacherVersion
								}),
								description: 'trainingdatafinal',
								status: 'pending'
							});

							studentProgressStore.update((progress) => {
								progress.last_visited = '/level4?page=27';
								return progress;
							});

							goto('/level4?page=27');
						}}>
							Submit
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 27}
			<WaitForTeacherModal description="trainingdatafinal" task="work" sponge="Meanwhile, you can start finding training data!" 
				onSuccess={() => {
					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=29';
						return progress;
					});
					goto('/level4?page=29');
				}} onRejected={(reason) => {
					rejectionComment = reason;
					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=24';
						return progress;
					});
					goto('/level4?page=28');
				}} 
			/>
		{/if}
		{#if lineNumber == 28}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostependsummary">
					<p>
						Oh no! Your training data plan needs more work!
					</p>
					<p>
						Agent {teacherAgent} said: {rejectionComment}
					</p>
					<p>
						Keep this in mind as you work on your new plan!
					</p>
					<button class="nextBtn" on:click={() => {
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4?page=24';
							return progress;
						});

						// Reset the training data classes, but not the examples
						exampleClassCount = 2;
						exampleClasses = [];
						exampleClassNamesValid = false;
						exampleClassesValid = false;

						goto('/level4?page=24');
					}}>
						Edit
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 29}
			<SecretCodeModal onSuccess={() => {
					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=30';
						return progress;
					});
					
					goto('/level4?page=30');
				}}
			/>
		{/if}
		{#if lineNumber == 30}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostependsummary">
					<p>
						Congratulations, your training data classes have been approved!
					</p>
					<p>
						You may now proceed to TRAIN and TEST your AI robot.
					</p>
					<button class="nicebtn" on:click={() => {
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4?page=31';
							return progress;
						});
						
						goto('/level4?page=31');
					}}>
						Next
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 31}
			<RobotStepsModal currentStep={2} onStepClick={() =>
			{
				studentProgressStore.update((progress) => {
					progress.last_visited = '/level4?page=32';
					return progress;
				});
				goto('/level4?page=32');
			}} />
		{/if}
		{#if lineNumber == 32}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostepintro">
					<h2><img src="/img/icons/robotrain.png" alt="Train"/> Train &amp; Test</h2>
					<p>
						You are about to enter the Traininator, where you will input data to train your robot to identify different classes.
					</p>
					<button class="nicebtn" on:click={() => {
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4?page=33';
							return progress;
						});
						
						goto('/level4?page=33');
					}}>
						Next
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 33}
		<Tablet showMeter={false} showBottomButtons={false}>
		{#if logsLoaded}
				<TraininatorMain onComplete={() => {
					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=34';
						return progress;
					});
					goto('/level4?page=34');
				}}
				
				prefillModelName={robotName}
				prefillClassNames={classNamesFromTravelLog}
				/>
			{/if}
		</Tablet>
		{/if}
		{#if lineNumber == 34}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostependsummary">
					<p>
						Congratulations, your Machine Learning Model is ready to use!
					</p>
					<p>
						You may now proceed to PROGRAM your AI robot.
					</p>
					<button class="nicebtn" on:click={() => {
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4?page=35';
							return progress;
						});
						
						goto('/level4?page=35');
					}}>
						Next
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 35}
			<RobotStepsModal currentStep={3} onStepClick={() =>
			{
				studentProgressStore.update((progress) => {
					progress.last_visited = '/level4?page=36';
					return progress;
				});
				goto('/level4?page=36');
			}} />
		{/if}
		{#if lineNumber == 36}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostepintro">
					<h2><img src="/img/icons/roboprogram.png" alt="Program"/> Program</h2>
					<p>
						You are about to enter the Codinator, where you will create instructions for your AI robot to achieve its goal.
					</p>
					<button class="nicebtn" on:click={() => {
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4?page=37';
							return progress;
						});
						
						goto('/level4?page=37');
					}}>
						Next
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 37}
			<Tablet showMeter={false} showBottomButtons={false}>
				<Codinator
					description="robotcode"
					status="pending"
					on:submitted={() => {
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4?page=38';
							return progress;
						});
						goto('/level4?page=38');
					}}
				/>
			</Tablet>
		{/if}
		{#if lineNumber == 38}
			<WaitForTeacherModal description="robotcode" task="robot code"
				onSuccess={() => {
					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=40';
						return progress;
					});
					
					goto('/level4?page=40');
				}} onRejected={(reason) => {
					rejectionComment = reason;
					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=39';
						return progress;
					});
					goto('/level4?page=39');
				}}
			/>
		{/if}
		{#if lineNumber == 39}
			<Tablet showMeter={false} showBottomButtons={false}>

				<div class="robostependsummary">
					<p>
						Oh no! Your robot code needs more work!
					</p>
					<p>
						Agent {teacherAgent} said: {rejectionComment}
					</p>
					<p>
						Keep this in mind as you work on your new robot code!
					</p>
					<button class="nextBtn" on:click={() => {
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4?page=37';
							return progress;
						});

						goto('/level4?page=37');
					}}>
						Edit
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 40}
			<SecretCodeModal onSuccess={() => {
				studentProgressStore.update((progress) => {
					progress.last_visited = '/level4?page=41';
					return progress;
				});
				
				goto('/level4?page=41');
			}}
			/>
		{/if}
		{#if lineNumber == 41}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostependsummary">
					<p>
						Congratulations, your algorithm has been approved!
					</p>
					<button class="nicebtn" on:click={() => {
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4?page=42';
							return progress;
						});
						
						goto('/level4?page=42');
					}}>
						Next
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 42}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostependsummary" style="padding: 1vh;">
					<p>
						Now, TEST your prototype with another agent.
						Hit Next when complete
					</p>

					<Codinator
						description="robotcodetested"
						status="complete"
						buttonLabel="Next"
						iframeStyle="height: 65vh;"
						on:submitted={() => {
							studentProgressStore.update((progress) => {
								progress.last_visited = '/level4?page=43';
								return progress;
							});
							goto('/level4?page=43');
						}}
					/>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 43}
			<TextResponseModal 
				id="robottestfeedback" 
				title="What suggestions did the other agent give you about your  AI robot prototype?"  
				prompt="" 
				placeholder=""
				onSuccess={(response) => { 
					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=44';
						return progress;
					});
					
					goto('/level4?page=44');
				}}
			/>
		{/if}
		{#if lineNumber == 44}
			<TextResponseModal
				id="robottestbias"
				title="In your design notes, you said you will minimize bias by {robotBias}."
				prompt="Tell our SPOT engineers how you minimized bias in the design of your AI robot prototype."
				placeholder=""
				onSuccess={(response) => {
					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=45';
						return progress;
					});
					
					goto('/level4?page=45');
				}}
			/>
		{/if}
		{#if lineNumber == 45}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostependsummary">
					<p>
						Now that you know what works or doesn't work about your robot, let our SPOT designers know how to make it even better!
					</p>
					<button class="nicebtn" on:click={() => {
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4?page=46';
							return progress;
						});
						
						goto('/level4?page=46');
					}}>
						Next
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 46}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostependsummary" on:visibilitychange={validateExampleClasses}>
					<p>
						Drag and drop these items on the left into the “modify” or “not modify” bin to inform our engineers of what part of your design you would modify
					</p>
					<div class="examples">
						<div class="classColumn" id="classColumn0" on:dragover={(e) => e.preventDefault()} on:drop={dropExample} role="button" tabindex="-1">
							<div class="classColumnTitle">
								Unsorted
							</div>
							<div class="draggableExample" on:drag={dragExample} on:dragend={dragEndExample} draggable="true" role="button" tabindex="-1">
								Training Data Classes 
							</div>
							<div class="draggableExample" on:drag={dragExample} on:dragend={dragEndExample} draggable="true" role="button" tabindex="-1">
								Training Data Set 
							</div>
							<div class="draggableExample" on:drag={dragExample} on:dragend={dragEndExample} draggable="true" role="button" tabindex="-1">
								AI Algorithm
							</div>
							<div class="draggableExample" on:drag={dragExample} on:dragend={dragEndExample} draggable="true" role="button" tabindex="-1">
								Purpose of your AI Robot
							</div>
						</div>
						<div class="classColumn" id="classColumn1" on:dragover={(e) => e.preventDefault()} on:drop={dropExample} role="button" tabindex="-1">
							<div class="classColumnTitle">
								Modify
							</div>
						</div>
						<div class="classColumn" id="classColumn2" on:dragover={(e) => e.preventDefault()} on:drop={dropExample} role="button" tabindex="-1">
							<div class="classColumnTitle">
								Not Modify
							</div>
						</div>
					</div>
					<button class="nicebtn" 
						disabled={!exampleClassesValid}
						on:click={async () => {

						// Submit the training data classes
						const classes = {};
						const classColumns = document.querySelectorAll('.classColumn');
						for (let i = 0; i < classColumns.length; i++) {
							const classColumn = classColumns[i];
							const examples = classColumn.querySelectorAll('.draggableExample');
							
							if(examples.length > 0) {
								const exampleTexts = Array.from(examples).map((example) => example.textContent);
								const col = classColumn?.querySelector('.classColumnTitle')?.textContent;

								if(col) {
									classes[col] = exampleTexts;
								}
							}
						}
						await DataService.TravelLog.submitTravelLog({
							data: JSON.stringify({ 
								response: classes
							}),
							description: 'robotdesignmodify',
							status: 'complete'
						});

						modifyClasses = classes;

						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4?page=47';
							return progress;
						});
						
						goto('/level4?page=47');
					}}>
						Next
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 47}
			<TextResponseModal
				id="robotdesignmodifytrainingclasses"
				title="Why and how would you modify your training data classes?"
				prompt=""
				placeholder=""
				onSuccess={(response) => {
					// Submit the response
					DataService.TravelLog.submitTravelLog({
						data: JSON.stringify({ 
							response: response
						}),
						description: 'robotdesignmodifytrainingclasses',
						status: 'complete'
					});

					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=48';
						return progress;
					});
					
					goto('/level4?page=48');
				}}
			/>
		{/if}
		{#if lineNumber == 48}
			<TextResponseModal
				id="robotdesignmodifytrainingdata"
				title="Why and how would you modify your training data set?"
				prompt=""
				placeholder=""
				onSuccess={(response) => {
					// Submit the response
					DataService.TravelLog.submitTravelLog({
						data: JSON.stringify({ 
							response: response
						}),
						description: 'robotdesignmodifytrainingdata',
						status: 'complete'
					});

					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=49';
						return progress;
					});
					
					goto('/level4?page=49');
				}}
			/>
		{/if}
		{#if lineNumber == 49}
			<TextResponseModal
				id="robotdesignmodifyalgorithm"
				title="Why and how would you modify your AI algorithm?"
				prompt=""
				placeholder=""
				onSuccess={(response) => {
					// Submit the response
					DataService.TravelLog.submitTravelLog({
						data: JSON.stringify({ 
							response: response
						}),
						description: 'robotdesignmodifyalgorithm',
						status: 'complete'
					});

					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=50';
						return progress;
					});
					
					goto('/level4?page=50');
				}}
			/>	
		{/if}
		{#if lineNumber == 50}
			<TextResponseModal
				id="robotdesignmodifypurpose"
				title="Why and how would you modify the purpose of your AI robot?"
				prompt=""
				placeholder=""
				onSuccess={(response) => {
					// Submit the response
					DataService.TravelLog.submitTravelLog({
						data: JSON.stringify({ 
							response: response
						}),
						description: 'robotdesignmodifypurpose',
						status: 'complete'
					});

					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=51';
						return progress;
					});
					
					goto('/level4?page=51');
				}}
			/>
		{/if}
		{#if lineNumber == 51}
			<TabletButton on:click={() => { 
				const event  = new CustomEvent('showTablet', {
					bubbles: true
				});
				
				content?.dispatchEvent(event);
			}} />
		{/if}
		{#if lineNumber == 52}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostependsummary" style="padding: 1vh;">
					<p>
						You are now ready to demonstrate your AI robot! Hit Next when you are finished showing off your robot.
					</p>
					<Codinator
						description="robotshowcase"
						status="pending"
						buttonLabel="Next"
						iframeStyle="height: 65vh;"
						confirmBefore={true}
						confirmMessage={"Are you sure you're done demonstrating your robot?"}
						on:submitted={() => {
							studentProgressStore.update((progress) => {
								progress.last_visited = '/level4?page=53';
								return progress;
							});
							goto('/level4?page=53');
						}}
					/>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 53}
			<WaitForTeacherModal description="robotshowcase" task="robot demonstration"
				onSuccess={() => {
					studentProgressStore.update((progress) => {
						progress.last_visited = '/level5?page=1';
						return progress;
					});
					
					goto('/level5?page=1');
				}} onRejected={(reason) => {
					rejectionComment = reason;
					studentProgressStore.update((progress) => {
						progress.last_visited = '/level4?page=53';
						return progress;
					});
					goto('/level4?page=52');
				}}
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

</style>