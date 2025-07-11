<script lang="ts">
	import { goto } from '$app/navigation';
	import SurveyOption from '$lib/components/activities/survey/SurveyOption.svelte';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';
	import type { StudentProgress } from '$lib/types/UserData';
	import DataService from '$lib/utils/DataService';
	import { studentProgressStore } from '$lib/utils/stores/store';
	import { Questions } from '$lib/components/activities/survey/SurveyQuestions';

	/**
	 * Track the current question that is displaying
	 */
	let questionIndex: number = 0;

	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;

	/**
	 * Array containing objects which hold the questions and the responses to the questions.
	 *
	 * When we display each question, radio options will be listed below for the user to respond
	 * to the question with. To track this, we take advantage of a Svelte function called "group binding."
	 * We will "bind" the selection the user makes to the response value of the questionsAndResponse object at
	 * the specific index which question is currently displayed.
	 *
	 * When the next button is selected, we will check to ensure that the current question has been responded to,
	 * and if it is not, then we will prompt the user to make a selection.
	 *
	 * The user's response is directly saved into this object, which, theoretically, we can then stringify
	 * and post to the database whenever we are ready.
	 */
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
						description: 'level-0-post-survey',
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

	const onFeedbackClose = () => {
		showFeedbackModal = false;
		if (isSuccess) {
			studentProgressStore.update((progress: StudentProgress) => {
				progress.last_visited = '/introduction/training?page=10';
				return progress;
			});
			goto('/introduction/training?page=10');
		}
	};

	// Disable the next button until a response is selected
	$: {
		if (nextButton != undefined) {
			nextButton.disabled = questionIndex >= questionsAndResponse.length || questionsAndResponse[questionIndex].response == null;
		}
	}
</script>

<Tablet showBottomButtons={false} showMeter={false} >
	{#if showFeedbackModal}
		<FeedbackModal {message} {isSuccess} on:close={onFeedbackClose} />
	{/if}
	<div
		on:submit|preventDefault
		class="ml-auto mr-auto flex h-full w-3/4 flex-col  items-center justify-center space-y-6  text-white" id="bod">
		<div class="hud-red-blue-border w-3/4" id="question-box">
			<p id="question" class="text-center text-3xl text-white">{questionsAndResponse[questionIndex].question}</p>
		</div>
		<div id="options" class="hud-red-blue-border flex w-2/3 flex-col space-y-4 p-3 text-3xl">
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


<style>
	.next-button {
		transition: all 0.2s ease-in-out;
		position: fixed;
		bottom: 20px;
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

	@media (max-width: 800px) {
		#options {
			width: 100%;
			font-size: 1.5rem;
			margin: 0;
		}

		#question {
			font-size: 1.5rem;
			width: 100%;
		}

		#question-box {
			width: 100%;
			font-size: 1.5rem;
		}

		#bod {
			width: 100%;
		}
	}

</style>