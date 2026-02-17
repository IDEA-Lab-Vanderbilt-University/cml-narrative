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
	import { get } from 'svelte/store';
	import TraininatorMain from '$lib/components/activities/traininator/TraininatorMain.svelte';
	import Codinator from '$lib/components/activities/Codinator.svelte';
	import TextResponse from '$lib/components/activities/free-response/TextResponse.svelte';
	import SurveyOption from '$lib/components/activities/survey/SurveyOption.svelte';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';
	import AudioPlayer from '$lib/components/audio/AudioPlayer.svelte';
	import { Questions, QuestionsAudio } from '$lib/components/activities/survey/SurveyQuestions.js';
	import BadgeGetModal from '$lib/components/modals/BadgeGetModal.svelte';
	import { BadgesByName } from '$lib/utils/Assets/Badges';
	import Confetti from 'svelte-confetti';

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

	let robotProblem = '';
	let robotHelps = '';
	let robotCategories = '';
	let robotAction = '';
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
			robotProblem = logs1[logs1.length - 1].data;
		}

		let logs2 = await DataService.TravelLog.getTravelLogs('robotdesign2');
		if(logs2.length > 0) {
			robotHelps = logs2[logs2.length - 1].data;
		}

		let logs3 = await DataService.TravelLog.getTravelLogs('robotdesign3');
		if(logs3.length > 0) {
			robotCategories = logs3[logs3.length - 1].data;
		}

		let logs4 = await DataService.TravelLog.getTravelLogs('robotdesign4');
		if(logs4.length > 0) {
			robotAction = logs4[logs4.length - 1].data;
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



    // For the ImageResponseModal
	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;
	let submissionType = '';
	

    async function onFeedbackClose() {
        showFeedbackModal = false;
        if (doSubmit) {
            onSubmit();
        }
    }

    const onSubmit = () => {
        handleNavigation(NavigationDirection.forward);
    };

    // For post survey
	let questionIndex: number = 0;

    let questionsAndResponse = Questions.map((question) => {
        return {
            question: question,
            response: null
        };
    });

	/**
	 * Gets the next question from the questionsAndResponse object array
	 *
	 * We will check to make sure the current question has been answered before we
	 * allow the user to procede.
	 *
	 * TODO: change alert? How can we make the alert a little more appealing?
	 */
     const getNextQuestion = async () => {
		// Determine if the user has selected a response for the presented question
		if (questionsAndResponse[questionIndex].response != null) {
			// Check to see if user is at the last survey question
			if (questionIndex >= questionsAndResponse.length - 1) {
				console.log('User has finished survey; we can now proceed.');

				try {
					await DataService.TravelLog.submitTravelLog({
						description: 'level-5-post-survey',
						data: JSON.stringify(questionsAndResponse),
						status: 'complete'
					});

					message = "Survey responses were recorded successfully!";
					isSuccess = true;

				} catch (error) {
					message = "Survey responses submission failed!";
					isSuccess = false;
					console.error(error);
				}

		showFeedbackModal = true;
        nextButton.disabled = true;

			} else {
				// Advance to the next question
				questionIndex += 1;

				// Reset the SurveyOption elements
				resetButtons();
			}
		} else {
			// User has not selected a response
			alert('Please select an option first!');
		}
	};

	const resetButtons = () => {
		strongAgreeElement?.reset();
		agreeElement?.reset();
		neutralElement?.reset();
		disagreeElement?.reset();
		strongDisagreeElement?.reset();
	};

	var nextButton: HTMLButtonElement | void;

	var strongAgreeElement: SurveyOption | void;
	var agreeElement: SurveyOption | void;
	var neutralElement: SurveyOption | void;
	var disagreeElement: SurveyOption | void;
	var strongDisagreeElement: SurveyOption | void;

    /**
	 * This function is called when a SurveyOption is clicked. The proper survey response should be passed in
	 * as parameter. Then, that response is saved to the current questionsAndResponse object
	 *
	 * @param response survey response selection
	 */
	const handleSelection = (response: string) => {
		resetButtons();
		// @ts-ignore
		questionsAndResponse[questionIndex].response = response;
	};

	// Disable the next button until a response is selected or there are no more questions
	$: {
		if (nextButton != undefined) {
			nextButton.disabled = questionIndex >= questionsAndResponse.length || questionsAndResponse[questionIndex].response == null;
		}
	}

    let confetti = 0;

</script>

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
        {#if (lineNumber != 2 && lineNumber < 8) || (lineNumber >= 15 && lineNumber < 17) || lineNumber == 27 || lineNumber == 28 || lineNumber == 34}
            <DialogBox {line} on:dialogEvent={handleDialogEvent} />
        {/if}
	</div>

	<div slot="content" class="h-full w-full" bind:this={content}>
        {#if (lineNumber != 2 && lineNumber < 8) || (lineNumber >= 15 && lineNumber < 17) || lineNumber == 27 || lineNumber == 28 || lineNumber == 34}
			<TabletButton on:click={() => { 
				if(lineNumber == 16 || lineNumber == 28) {
					handleNavigation(NavigationDirection.forward);
					return;
				}

				const event  = new CustomEvent('showTablet', {
					bubbles: true
				});
				
				content?.dispatchEvent(event);
			}}
			pulse={lineNumber == 16 || lineNumber == 28}
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
								overrideStudentID="89fd991a-2567-477c-99a2-c4670f88a416"
								overrideHost="https://spotcommandapp.com/api"
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
				prompt={[{id: "robotdesign1", prompt: "Problem to Solve"}, 
					{id: "robotdesign2", prompt: "Who My Robot Helps"}]}
				onSuccess={(responses) => {					
					robotProblem = responses['robotdesign1'];
					robotHelps = responses['robotdesign2'];
					goto('/level4new?page=20');
				}}
			/>
		{/if}
		{#if lineNumber == 20}
			<TextResponseModal 
				prompt={[{id: "robotdesign3", prompt: "Image Categories"}, {id: "robotdesign4", prompt: "What My Robot Will Do"}]}
				onSuccess={(responses) => {
					robotCategories = responses['robotdesign3'];
					robotAction = responses['robotdesign4'];
					goto('/level4new?page=21');
				}}
			/>
		{/if}
		{#if lineNumber == 21}
			<TextResponseModal 
				prompt={[{id: "robotdesign5", prompt: "My Robot Will Be Named:", singleLine: true}]}
				onSuccess={(responses) => {
					robotName = responses['robotdesign5'];
					goto('/level4new?page=22');
				}}
			/>
		{/if}
		{#if lineNumber == 22}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostepintro">
					<h2><img src="/img/icons/robotrain.png" alt="Train"/> Train &amp; Test</h2>
					<p>
						You are about to enter the Traininator, where you will input data to train your robot to identify different classes. Then you will enter the Codeinator, where you will create instructions for your AI robot to achieve its goal.
					</p>
					<button class="nicebtn" on:click={() => {
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4new?page=23';
							return progress;
						});
						
						goto('/level4new?page=23');
					}}>
						Next
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 23}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="flex flex-col items-center justify-center h-full gap-4 text-white">
					<button on:click={() => goto('/level4new?page=25')}>Traininator</button>
					<button on:click={() => goto('/level4new?page=26')}>Codeinator</button>
					<button on:click={() => goto('/level4new?page=24')}>Robot Design</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 24}
			<TextResponseModal 
				prompt={[{id: "robotdesign1", prompt: "Problem to Solve"}, {id: "robotdesign2", prompt: "Who My Robot Helps"}, {id: "robotdesign3", prompt: "Image Categories"}, {id: "robotdesign4", prompt: "What My Robot Will Do"}, {id: "robotdesign5", prompt: "My Robot Will Be Named:"}]}
				singleLine={[false, false, false, false, true]}
				prefill={{
					robotdesign1: robotProblem,
					robotdesign2: robotHelps,
					robotdesign3: robotCategories,
					robotdesign4: robotAction,
					robotdesign5: robotName
				}}
				onSuccess={(responses) => {
					// Update robotProblem, robotHelps, robotCategories, robotAction, and robotName with the new responses so that if the user goes back to this page, they will see their updated responses
					robotProblem = responses['robotdesign1'];
					robotHelps = responses['robotdesign2'];
					robotCategories = responses['robotdesign3'];
					robotAction = responses['robotdesign4'];
					robotName = responses['robotdesign5'];
					goto('/level4new?page=23');
				}}
			/>
		{/if}
		{#if lineNumber == 25}
			<Tablet showMeter={false} showBottomButtons={false}>
				<TraininatorMain 
					onComplete={() => goto('/level4new?page=23')}
				/>
			</Tablet>
		{/if}
		{#if lineNumber == 26}
			<Tablet showMeter={false} showBottomButtons={false}>
				<Codinator 
					iframeStyle="height: 80vh;"
					buttonLabel="Finish"
					on:submitted={() => {
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4new?page=23';
							return progress;
						});
						goto('/level4new?page=23');
					}}
				/>
			</Tablet>
		{/if}
		{#if lineNumber == 29}
			<Tablet showMeter={false} showBottomButtons={false}>
				<TabletMenu apps={[
					{
						id: "travelLog",
						title: "Travel Logs",
						img: Assets.Tablet.travelLogIcon,
						color: "rgb(85,205,110)"
					},
				]}

				onSelect={(selection) => {
					goto('/level4new?page=30');
				}}
				/>
			</Tablet>
		{/if}
		{#if lineNumber == 30}
            <Tablet showMeter={false} showBottomButtons={false}>
                <div class="flex flex-col items-center justify-center h-full gap-4">
                    <p class="text-3xl text-center text-white p-4">
                        Mission Control needs to know a few more things before you get your final badge!
                    </p>
                    <button class="nicebtn" on:click={() => {
                        handleNavigation(NavigationDirection.forward);
                    }}>Continue</button>
                </div>
            </Tablet>
		{/if}
		{#if lineNumber == 31}
            <TextResponseModal id="algorithmsPost" promptedTechnology={"an Algorithm"} onSuccess={() => {
                handleNavigation(NavigationDirection.forward);
            }} />
        {/if}
		{#if lineNumber == 32}
			<Tablet>
				<AudioPlayer src={QuestionsAudio[questionIndex]} />

                {#if showFeedbackModal}
                    <FeedbackModal {message} {isSuccess} on:close={() => { goto('/level4new?page=33'); }} />
                {/if}
                <div
                    on:submit|preventDefault
                    class="ml-auto mr-auto flex h-full w-1/2 flex-col  items-center justify-center space-y-6  text-white" id="bod">
                    <div class="hud-red-blue-border w-full" id="question-box">
                        <p class="text-center text-3xl text-white" id="question">{questionsAndResponse[questionIndex].question}</p>
                    </div>
                    <div class="hud-red-blue-border flex w-3/4 flex-col space-y-4 p-4 text-3xl" id="options">
                        <SurveyOption emoji="😃" response="Strongly Agree" on:click={() => handleSelection('Strongly Agree')} bind:this={strongAgreeElement} />
                        <SurveyOption emoji="🙂" response="Agree" on:click={() => handleSelection('Agree')} bind:this={agreeElement} />
                        <SurveyOption emoji="😐" response="Neutral" on:click={() => handleSelection('Neutral')} bind:this={neutralElement} />
                        <SurveyOption emoji="🙁" response="Disagree" on:click={() => handleSelection('Disagree')} bind:this={disagreeElement} />
                        <SurveyOption emoji="☹️" response="Strongly Disagree" on:click={() => handleSelection('Strongly Disagree')} bind:this={strongDisagreeElement} />
                    </div>
                    <div class="flex w-full items-end justify-end">
                        <button
                            class="next-button rounded-xl bg-blue-300 px-4 py-2 text-3xl font-bold text-black"
                            on:click={getNextQuestion}
                            bind:this={nextButton}    
                        >Next</button>
                    </div>
                </div>
            </Tablet>
		{/if}
		{#if lineNumber == 33}
            <BadgeGetModal 
                badge={BadgesByName['Junior Agent']}
                handleClick={() => {
                    handleNavigation(NavigationDirection.forward);
                }}            
            />
		{/if}

        {#if lineNumber == 34}
        <div id="confettiholder">
            {#key confetti}
                <Confetti x={[-5, 5]} y={[-3, 0]} amount={150} colorRange={[40, 50]} duration={5000} />
            {/key}
        </div>
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