<script lang="ts">
	import { goto } from '$app/navigation';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import type { StudentProgress } from '$lib/types/UserData.js';
	import DataService from '$lib/utils/DataService/index.js';
	import { studentDataStore, studentProgressStore } from '$lib/utils/stores/store.js';
	import { createEventDispatcher } from 'svelte';
	import script from '$lib/scripts/level5/index.js';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import SpotApplication from '$lib/components/sequences/tablet/tablet-tutorial/SpotApplication.svelte';
	import IncomingMessageModal from '$lib/components/modals/IncomingMessageModal.svelte';
	import ReadMessageModal from '$lib/components/modals/ReadMessageModal.svelte';
	import TextResponseModal from '$lib/components/activities/free-response/TextResponseModal.svelte';
	import BadgeGetModal from '$lib/components/modals/BadgeGetModal.svelte';
	import MegaJoulesGetModal from '$lib/components/modals/MegaJoulesGetModal.svelte';
	import { Assets } from '$lib/utils/Assets';
	import ImageResponseModal from '$lib/components/activities/free-response/ImageResponseModal.svelte';
	import { Questions } from '$lib/components/activities/survey/SurveyQuestions.js';
	import SurveyOption from '$lib/components/activities/survey/SurveyOption.svelte';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';

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
				target = '/level5/page=1';
			} else {
				target = `/level5?page=${line.id + 1}`;
			}

		} else if (direction == NavigationDirection.backward) {
			if(line.id > 1) {
				target = `/level5?page=${line.id - 1}`;
			} else {
				target = '/level5?page=1';
			}
		}

		if (target) {

            // Reset state variables
            message = '';
            isSuccess = false;
            showFeedbackModal = false;
            submissionType = '';
            doSubmit = false;
            questionIndex = 0;

			studentProgressStore.update((data) => {
				data.last_visited = target;
				return data;
			});
			goto(target);
		}
	};

    let content: HTMLDivElement | null;


    // For the ImageResponseModal
	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;
	let submissionType = '';
	let doSubmit = false;

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

	// Disable the next button until a response is selected
	$: {
		if (nextButton != undefined) {
			nextButton.disabled = questionsAndResponse[questionIndex].response == null;
		}
	}
</script>



<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
        {#if lineNumber < 3 || lineNumber > 10}
			<DialogBox {line} on:dialogEvent={handleDialogEvent} />
		{/if}
	</div>


	<div slot="content" class="h-full w-full" bind:this={content}>
        {#if lineNumber < 3 || lineNumber > 10}
        	<TabletButton on:click={() => { 
                if (lineNumber == 2) {
                    handleNavigation(NavigationDirection.forward);
                    return;
                }

                const event  = new CustomEvent('showTablet', {
                    bubbles: true
                });
                
                content?.dispatchEvent(event);
            }}
            pulse={lineNumber == 2}
            />
        {/if}
        {#if lineNumber == 3}
            <Tablet showMeter={false} showBottomButtons={false}>
                    <SpotApplication title="Travel Logs"
                    img={Assets.Tablet.travelLogIcon}
                    color="rgb(85,205,110)"
                    on:click={() => {
                        handleNavigation(NavigationDirection.forward);
                    }}
                    />
            </Tablet>
        {/if}
        {#if lineNumber == 4}
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
        {#if lineNumber == 5}
            <TextResponseModal id="machineLearningPost" promptedTechnology={"Machine Learning"} onSuccess={() => {
                handleNavigation(NavigationDirection.forward);
            }} />
        {/if}
        {#if lineNumber == 6}
        
            <ImageResponseModal
                promptedTechnology="Machine Learning"
                message={message} 
                isSuccess={isSuccess} 
                showFeedbackModal={showFeedbackModal} 
                handleImageSubmission={async (event) => {
                    doSubmit = event.detail.doSubmit;
                    let success = await DataService.TravelLog.handleImageSubmission(event, "draw-machine-learning-Post");

                    if (success) {
                        message = 'Great job! Your image has been submitted successfully.';
                        isSuccess = true;
                    } else {
                        message = 'There was an error submitting your image. Please try again.';
                        isSuccess = false;
                    }
                    showFeedbackModal = true;
                }}
                onSubmit={onSubmit} 
                onFeedbackClose={onFeedbackClose}
            />
        {/if}

        {#if lineNumber == 7}
            <TextResponseModal id="algorithmsPost" promptedTechnology={"an Algorithm"} onSuccess={() => {
                handleNavigation(NavigationDirection.forward);
            }} />
        {/if}

        {#if lineNumber == 8}
            <ImageResponseModal
                promptedTechnology="an Algorithm"
                message={message} 
                isSuccess={isSuccess} 
                showFeedbackModal={showFeedbackModal} 
                handleImageSubmission={async (event) => {
                    doSubmit = event.detail.doSubmit;
                    let success = await DataService.TravelLog.handleImageSubmission(event, "draw-an-algorithm-Post");

                    if (success) {
                        message = 'Great job! Your image has been submitted successfully.';
                        isSuccess = true;
                    } else {
                        message = 'There was an error submitting your image. Please try again.';
                        isSuccess = false;
                    }
                    showFeedbackModal = true;
                }}
                onSubmit={onSubmit} 
                onFeedbackClose={onFeedbackClose}
            />
        {/if}

        {#if lineNumber == 9}

            <Tablet>
                {#if showFeedbackModal}
                    <FeedbackModal {message} {isSuccess} on:close={() => { handleNavigation(NavigationDirection.forward); }} />
                {/if}
                <div
                    on:submit|preventDefault
                    class="ml-auto mr-auto flex h-full w-1/2 flex-col  items-center justify-center space-y-6  text-white">
                    <div class="hud-red-blue-border w-full">
                        <p class="text-center text-3xl text-white">{questionsAndResponse[questionIndex].question}</p>
                    </div>
                    <div class="hud-red-blue-border flex w-3/4 flex-col space-y-4 p-4 text-3xl">
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
                            bind:this={nextButton}>Next</button>
                    </div>
                </div>
            </Tablet>
        {/if}

        {#if lineNumber == 10}
            <BadgeGetModal 
                badgeImage="/img/misc/badge5.png" 
                badgeName="Junior Agent"
                handleClick={() => {
                    handleNavigation(NavigationDirection.forward);
                }}            
            />
        {/if}
    </div>
</Scene>


<style>
    .nicebtn {
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
    
    .nicebtn:not(:disabled):hover {
		transform: scale(1.05);
	}

    .nicebtn:not(:disabled):active {
		transform: scale(0.95);
	}
	
    .nicebtn:disabled {
		filter: grayscale(1);
		cursor: not-allowed;
	}

	.next-button {
		transition: all 0.2s ease-in-out;
	}

	.next-button:hover {
		transform: scale(1.1);
	}

	.next-button:active {
		transform: scale(1.2);
	}

	.next-button:disabled {
		cursor: not-allowed;
		filter: grayscale(0.5) brightness(0.5);
	}

	.next-button:disabled:hover {
		transform: none;
	}
</style>
