<script lang="ts">
	import { goto } from '$app/navigation';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import DataService from '$lib/utils/DataService/index.js';
	import { accessTokenStore, settingsStore, studentDataStore, studentProgressStore } from '$lib/utils/stores/store.js';
	import { audioPlaybackFinished } from '$lib/utils/stores/audioStore';
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
	import ChatbotWidget from '$lib/components/chatbot/ChatbotWidget.svelte';
	import TextResponse from '$lib/components/activities/free-response/TextResponse.svelte';
	import SurveyOption from '$lib/components/activities/survey/SurveyOption.svelte';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';
	import AudioPlayer from '$lib/components/audio/AudioPlayer.svelte';
	import { Questions, QuestionsAudio, QuestionsByLanguage } from '$lib/components/activities/survey/SurveyQuestions.js';
	import BadgeGetModal from '$lib/components/modals/BadgeGetModal.svelte';
	import { BadgesByName } from '$lib/utils/Assets/Badges';
	import Confetti from 'svelte-confetti';

	export let data;

	let line: Line;
	$: line = data.line;

	let lineNumber = 1;
	$: lineNumber = line.id;

	// Tutorial step for Agent Nova's Codinator walkthrough (page 14)
	let tutorialStep = 1;
	let robotIsConnected = false;
	let hasTriedTraininatorInLevel4New = false;
	let hasTriedCodeinatorInLevel4New = false;
	let hasCompletedTrainAndCodeinatorInLevel4New = false;
	let surveyReadyToAdvance = false;
	type SurveyLanguage = 'en' | 'es';
	let surveyLanguage: SurveyLanguage = 'en';
	$: surveyLanguage = $settingsStore?.language === 'es' ? 'es' : 'en';
	const chatbotAssistantId = import.meta.env.VITE_CHATBOT_ASSISTANT_ID || 'astp/e1d56033-f967-4d44-b479-32b76ef4d5f4';
	$: if (lineNumber !== 14) {
		tutorialStep = 1;
		robotIsConnected = false;
	}
	$: if (lineNumber === 14 && typeof window !== 'undefined') {
		const tutorialStepRaw = new URLSearchParams(window.location.search).get('tutorialStep');
		const tutorialStepParam = Number(tutorialStepRaw);
		if (tutorialStepRaw !== null && Number.isInteger(tutorialStepParam) && tutorialStepParam >= 1 && tutorialStepParam <= 7 && tutorialStep !== tutorialStepParam) {
			tutorialStep = tutorialStepParam;
			robotIsConnected = tutorialStepParam >= 2;
		} else if (tutorialStepRaw === null && tutorialStep <= 7) {
			tutorialStep = 7;
		}
	}
	$: hasTriedTraininatorInLevel4New = Boolean($studentProgressStore?.level4new_traininator_tried);
	$: hasTriedCodeinatorInLevel4New = Boolean($studentProgressStore?.level4new_codeinator_tried);
	$: hasCompletedTrainAndCodeinatorInLevel4New = hasTriedTraininatorInLevel4New && hasTriedCodeinatorInLevel4New;

	$: if (lineNumber == 25 && !$studentProgressStore?.level4new_traininator_tried) {
		studentProgressStore.update((progress) => {
			progress.level4new_traininator_tried = true;
			return progress;
		});
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
		if (line.id === 32 && direction === NavigationDirection.forward && !surveyReadyToAdvance) {
			return;
		}

		let target = '';
		if (direction == NavigationDirection.forward) {
			if (line.id == script.lines.length) {
                // No next level
				// target = '/level5?page=1';
			} else {
				if (line.id === 13) {
					target = '/level4new?page=14&tutorialStep=1';
				} else if(line.id > 2 || line.id == 1) {
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

	const setTutorialStep = (step: number) => {
		tutorialStep = step;
		if (typeof window !== 'undefined' && lineNumber === 14) {
			const params = new URLSearchParams(window.location.search);
			params.set('page', '14');
			if (step >= 1 && step <= 7) {
				params.set('tutorialStep', String(step));
			} else {
				params.delete('tutorialStep');
			}
			history.replaceState(null, '', `${window.location.pathname}?${params.toString()}`);
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
		if (typeof window !== 'undefined') {
			const params = new URLSearchParams(window.location.search);
			const tutorialStepRaw = params.get('tutorialStep');
			const tutorialStepParam = Number(tutorialStepRaw);
			if (line.id === 14 && tutorialStepRaw !== null && Number.isInteger(tutorialStepParam) && tutorialStepParam >= 1 && tutorialStepParam <= 7) {
				setTutorialStep(tutorialStepParam);
				robotIsConnected = tutorialStepParam >= 2;
			} else if (line.id === 14 && tutorialStepRaw === null) {
				setTutorialStep(7);
			}
		}

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

	const surveyOptions = [
		{ emoji: '😃', value: 'Strongly Agree', label: { en: 'Strongly Agree', es: 'Totalmente de acuerdo' } },
		{ emoji: '🙂', value: 'Agree', label: { en: 'Agree', es: 'De acuerdo' } },
		{ emoji: '😐', value: 'Neutral', label: { en: 'Neutral', es: 'Neutral' } },
		{ emoji: '🙁', value: 'Disagree', label: { en: 'Disagree', es: 'En desacuerdo' } },
		{ emoji: '☹️', value: 'Strongly Disagree', label: { en: 'Strongly Disagree', es: 'Totalmente en desacuerdo' } }
	];

	const surveyUiText = {
		en: {
			next: 'Next',
			selectFirst: 'Please select an option first!',
			submitted: 'Survey responses were recorded successfully!',
			submitFailed: 'Survey responses submission failed!'
		},
		es: {
			next: 'Siguiente',
			selectFirst: '¡Primero selecciona una opción!',
			submitted: '¡Las respuestas de la encuesta se guardaron correctamente!',
			submitFailed: '¡Error al enviar las respuestas de la encuesta!'
		}
	} as const;

	const getSurveyQuestions = () => QuestionsByLanguage[surveyLanguage] || Questions;
	const getSurveyQuestionAudio = (index: number) => {
		const basePath = QuestionsAudio[index] || '';

		if ((surveyLanguage === 'en' || surveyLanguage === 'es') && basePath.startsWith('/survey/')) {
			return basePath.replace('/survey/', '/level4new/survey/');
		}

		return basePath;
	};

	let questionsAndResponse = getSurveyQuestions().map((question) => {
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
				surveyReadyToAdvance = false;

				try {
					await DataService.TravelLog.submitTravelLog({
						description: 'level-5-post-survey',
						data: JSON.stringify(questionsAndResponse),
						status: 'complete'
					});

					message = surveyUiText[surveyLanguage].submitted;
					isSuccess = true;
					surveyReadyToAdvance = true;

				} catch (error) {
					message = surveyUiText[surveyLanguage].submitFailed;
					isSuccess = false;
					surveyReadyToAdvance = false;
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
			alert(surveyUiText[surveyLanguage].selectFirst);
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

	const handleSurveyFeedbackClose = () => {
		showFeedbackModal = false;
		if (surveyReadyToAdvance) {
			goto('/level4new?page=33');
		}
	};

	// Disable the next button until a response is selected or there are no more questions
	$: {
		if (nextButton != undefined) {
			nextButton.disabled = questionIndex >= questionsAndResponse.length || questionsAndResponse[questionIndex].response == null;
		}
	}

    let confetti = 0;
	let page3Confetti = 0;
	let previousLineNumber = -1;

	$: {
		if (lineNumber !== previousLineNumber) {
			if (lineNumber === 3) {
				page3Confetti += 1;
			}

			if (lineNumber === 32) {
				questionIndex = 0;
				surveyReadyToAdvance = false;
				questionsAndResponse = getSurveyQuestions().map((question) => {
					return {
						question: question,
						response: null
					};
				});
				showFeedbackModal = false;
				message = '';
				isSuccess = false;
				resetButtons();
			}

			previousLineNumber = lineNumber;
		}
	}

</script>

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
        {#if (lineNumber != 2 && lineNumber < 8) || (lineNumber >= 15 && lineNumber < 17) || lineNumber == 27 || lineNumber == 28 || lineNumber == 34}
            <DialogBox {line} on:dialogEvent={handleDialogEvent} />
        {/if}
	</div>

	<div slot="content" class="h-full w-full" bind:this={content}>
		{#if lineNumber == 3 || lineNumber == 4}
			<div class="welcome-back-banner" aria-hidden="true">
				<div class="welcome-back-flags">
					<span class="welcome-back-flag">W</span>
					<span class="welcome-back-flag">E</span>
					<span class="welcome-back-flag">L</span>
					<span class="welcome-back-flag">C</span>
					<span class="welcome-back-flag">O</span>
					<span class="welcome-back-flag">M</span>
					<span class="welcome-back-flag">E</span>
					<span class="welcome-back-gap"></span>
					<span class="welcome-back-flag">B</span>
					<span class="welcome-back-flag">A</span>
					<span class="welcome-back-flag">C</span>
					<span class="welcome-back-flag">K</span>
				</div>
			</div>
		{/if}

		{#if lineNumber == 34}
			<div class="welcome-back-banner congrats-banner" aria-hidden="true">
				<div class="welcome-back-flags congrats-flags">
					<span class="welcome-back-flag">C</span>
					<span class="welcome-back-flag">O</span>
					<span class="welcome-back-flag">N</span>
					<span class="welcome-back-flag">G</span>
					<span class="welcome-back-flag">R</span>
					<span class="welcome-back-flag">A</span>
					<span class="welcome-back-flag">T</span>
					<span class="welcome-back-flag">U</span>
					<span class="welcome-back-flag">L</span>
					<span class="welcome-back-flag">A</span>
					<span class="welcome-back-flag">T</span>
					<span class="welcome-back-flag">I</span>
					<span class="welcome-back-flag">O</span>
					<span class="welcome-back-flag">N</span>
					<span class="welcome-back-flag">S</span>
				</div>
			</div>
		{/if}

		{#if lineNumber == 3}
			<div id="page3-confettiholder">
				{#key page3Confetti}
					<div class="page3-confetti-emitter page3-confetti-top-left">
						<Confetti x={[-5, 5]} y={[-3, 0]} amount={150} colorRange={[40, 50]} duration={5000} />
					</div>
					<div class="page3-confetti-emitter page3-confetti-top-right">
						<Confetti x={[-5, 5]} y={[-3, 0]} amount={150} colorRange={[40, 50]} duration={5000} />
					</div>
					<div class="page3-confetti-emitter page3-confetti-mid-left">
						<Confetti x={[-5, 5]} y={[-3, 0]} amount={150} colorRange={[40, 50]} duration={5000} />
					</div>
					<div class="page3-confetti-emitter page3-confetti-mid-right">
						<Confetti x={[-5, 5]} y={[-3, 0]} amount={150} colorRange={[40, 50]} duration={5000} />
					</div>
					<div class="page3-confetti-emitter page3-confetti-bottom-left">
						<Confetti x={[-5, 5]} y={[-3, 0]} amount={150} colorRange={[40, 50]} duration={5000} />
					</div>
					<div class="page3-confetti-emitter page3-confetti-bottom-right">
						<Confetti x={[-5, 5]} y={[-3, 0]} amount={150} colorRange={[40, 50]} duration={5000} />
					</div>
				{/key}
			</div>
		{/if}

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
						glowConnectButton={tutorialStep === 1}
						showRobotConnectHint={tutorialStep === 1}
						showFlagHint={tutorialStep === 4}
						robotConnectHintText={$settingsStore?.language === 'es' ? 'Toca aquí para conectar' : 'Click here to connect'}
						on:robotconnected={() => { robotIsConnected = true; }}
					/>
					{#if tutorialStep >= 1 && tutorialStep <= 7}
						<div class="tutorial-dialog-banner tutorial-dialog-banner-full">
							<button class="tutorial-arrow left" aria-label={$settingsStore?.language === 'es' ? 'Paso anterior' : 'Previous step'} on:click={() => setTutorialStep(Math.max(1, tutorialStep - 1))} disabled={tutorialStep === 1}>
								<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
									<defs>
										<linearGradient id="arrowLeftGradient" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
											<stop offset="0%" stop-color="#fff9c4"/>
											<stop offset="60%" stop-color="#ffe066"/>
											<stop offset="100%" stop-color="#ffd600"/>
										</linearGradient>
										<filter id="arrowLeftShadow" x="0" y="0" width="56" height="56" filterUnits="userSpaceOnUse">
											<feGaussianBlur stdDeviation="4" result="blur"/>
										</filter>
									</defs>
									<ellipse cx="26" cy="28" rx="13" ry="18" fill="#fff" fill-opacity="0.18" filter="url(#arrowLeftShadow)"/>
									<polygon points="38,10 18,28 38,46" fill="url(#arrowLeftGradient)" stroke="#bfa600" stroke-width="3"/>
								</svg>
							</button>
							<span class="tutorial-dialog-step">{$settingsStore?.language === 'es' ? 'Paso' : 'Step'} {tutorialStep}</span>
							<span class="tutorial-dialog-message">{$settingsStore?.language === 'es'
								? tutorialStep === 1
									? "¡Ahora, inténtalo tú mismo! Toca 'Conectar robot' para activarlo!"
									: tutorialStep === 2
										? '¿Tu robot tiene una carita sonriente 🙂? Entonces, ¡ya está conectado!'
										: tutorialStep === 3
											? '¡Haz clic en el bloque de cámara en el modelo de Raven para que funcione!'
											: tutorialStep === 4
												? 'Toca la bandera verde para ver el código en acción'
												: tutorialStep === 5
													? '¡Intenta cambiar la canción cuando la predicción del modelo sea feliz!'
													: tutorialStep === 6
														? '¿Ves cómo el robot muestra un corazón ❤️? ¡Intenta cambiarlo por otra cosa!'
														: tutorialStep === 7
															? '¡Intenta cambiar el código tú mismo y mira qué pasa!'
													: ''
								: tutorialStep === 1
									? "Now, try it out yourself! Tap 'Connect Robot' to wake it up!"
									: tutorialStep === 2
										? 'Does your robot have a smiley face 🙂? then, you are connected!'
										: tutorialStep === 3
											? "Click on the camera block in Raven's model to make it work!"
											: tutorialStep === 4
												? 'Click the green flag to see the code in action'
												: tutorialStep === 5
													? 'Try changing the song when the model prediction is happy!'
													: tutorialStep === 6
														? 'See how the robot displays a heart ❤️? Try changing it to something else!'
														: tutorialStep === 7
															? 'Try changing the code up yourself and see what happens!'
													: ''}</span>
							{#if tutorialStep !== 1 || robotIsConnected}
								<button class="tutorial-arrow right" aria-label={$settingsStore?.language === 'es' ? 'Siguiente paso' : 'Next step'} on:click={() => { if (tutorialStep < 7) { setTutorialStep(tutorialStep + 1); } else { setTutorialStep(8); } }}>
									<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
										<defs>
											<linearGradient id="arrowRightGradient" x1="0" y1="0" x2="0" y2="1" gradientUnits="objectBoundingBox">
												<stop offset="0%" stop-color="#fff9c4"/>
												<stop offset="60%" stop-color="#ffe066"/>
												<stop offset="100%" stop-color="#ffd600"/>
											</linearGradient>
											<filter id="arrowRightShadow" x="0" y="0" width="56" height="56" filterUnits="userSpaceOnUse">
												<feGaussianBlur stdDeviation="4" result="blur"/>
											</filter>
										</defs>
										<ellipse cx="30" cy="28" rx="13" ry="18" fill="#fff" fill-opacity="0.18" filter="url(#arrowRightShadow)"/>
										<polygon points="18,10 38,28 18,46" fill="url(#arrowRightGradient)" stroke="#bfa600" stroke-width="3"/>
									</svg>
								</button>
							{/if}
							{#if tutorialStep >= 1 && tutorialStep <= 7}
								<AudioPlayer src={`/level4new/tutorial/step_${tutorialStep}.mp3`} />
							{/if}
						</div>

					{/if}
				{/if}
<style>
.tutorial-dialog-banner {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1000;
	background: #363636;
	border-radius: 1.2rem;
	box-shadow: 0 -2px 24px rgba(0,0,0,0.22);
	padding: 2.2rem 0 1.7rem 0;
	display: flex;
	align-items: center;
	justify-content: center;
	pointer-events: none;
	margin: 0 1.5vw 1.5vw 1.5vw;
	max-width: calc(100vw - 3vw);
}
.tutorial-arrow {
	background: none;
	border: none;
	outline: none;
	padding: 0 2.2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 3.5rem;
	cursor: pointer;
	pointer-events: auto;
	transition: filter 0.18s;
}
.tutorial-arrow[disabled] {
	opacity: 0.45;
	cursor: not-allowed;
	filter: grayscale(1);
}
.tutorial-arrow.left {
	margin-right: 1.2rem;
}
.tutorial-arrow.right {
	margin-left: 1.2rem;
}
.tutorial-dialog-banner-full {
	width: 100vw;
	min-width: unset;
	max-width: unset;
	border-radius: 0;
}
.tutorial-dialog-step {
	position: absolute;
	left: 2.5rem;
	top: -0.8rem;
	background: #ffe066;
	color: #222;
	font-weight: 800;
	font-size: 1.45rem;
	padding: 0.32rem 2.1rem;
	border-radius: 1.35rem;
	box-shadow: 0 2px 12px rgba(0,0,0,0.13);
	letter-spacing: 0.03em;
	pointer-events: auto;
}
.tutorial-dialog-message {
	color: #fff;
	font-size: 1.65rem;
	font-weight: 600;
	margin-left: 0;
	margin-right: 0;
	width: 100%;
	text-align: center;
	pointer-events: auto;
}
</style>

					</div>
				</div>

				{#if lineNumber !== 14 || tutorialStep > 6}
					<button class="nextBtn float-right relative z-10" on:click={() => handleNavigation(NavigationDirection.forward)}><img src="/img/misc/nextbutton.png" alt="Next" id="nextbutton" />
					</button>
				{/if}
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
					<button class="nextBtn page18-next" on:click={() => goto('/level4new?page=19')} disabled={!$audioPlaybackFinished}><img src="/img/misc/nextbutton.png" alt="Next" id="nextbutton" />
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
			<ChatbotWidget assistantId={chatbotAssistantId} preserveSpeechPunctuation={true} className="design-notes-chatbot" />
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
			<ChatbotWidget assistantId={chatbotAssistantId} preserveSpeechPunctuation={true} className="design-notes-chatbot" />
		{/if}
		{#if lineNumber == 21}
			<TextResponseModal 
				prompt={[{id: "robotdesign5", prompt: "My Robot Will Be Named:", singleLine: true}]}
				onSuccess={(responses) => {
					robotName = responses['robotdesign5'];
					goto('/level4new?page=22');
				}}
			/>
			<ChatbotWidget assistantId={chatbotAssistantId} preserveSpeechPunctuation={true} className="design-notes-chatbot" />
		{/if}
		{#if lineNumber == 22}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostepintro">
					<h2><img src="/img/icons/robotrain.png" alt="Train"/> Train &amp; Test</h2>
					<p>
						{typeof line.dialog === 'function' ? line.dialog() : line.dialog}
					</p>
					<button class="nextBtn" on:click={() => {
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4new?page=23';
							return progress;
						});
						
						goto('/level4new?page=23');
					}}>
						<img src="/img/misc/nextbutton.png" alt="Next" id="nextbutton" />
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 23}
			<Tablet showMeter={false}>
				<div class="train-test-hub">
					<div class="train-test-hub-top">
						<div class="train-test-hub-card">
							<button class="train-test-hub-icon-button" on:click={() => goto('/level4new?page=25')}>
								<img src="/img/tablet/traininatoricon.svg" alt="Traininator" class="train-test-hub-card-logo" />
							</button>
							<div class="train-test-hub-card-copy">
								<h3>TRAININATOR</h3>
								<p>{$settingsStore?.language === 'es' ? 'Ingresa datos de entrenamiento para entrenar tu modelo de aprendizaje automático para identificar diferentes clases.' : 'Input training data to train your machine learning model to identify different classes.'}</p>
							</div>
						</div>

						<div class={`train-test-hub-card ${hasTriedTraininatorInLevel4New ? '' : 'train-test-hub-card-disabled'}`}>
							<button
								class="train-test-hub-icon-button"
								disabled={!hasTriedTraininatorInLevel4New}
								on:click={() => goto('/level4new?page=26')}
							>
								<img src="/img/tablet/codeinatoricon.svg" alt="Codeinator" class="train-test-hub-card-logo" />
							</button>
							<div class="train-test-hub-card-copy">
								<h3>CODEINATOR</h3>
								<p>{$settingsStore?.language === 'es' ? 'Programa tu robot para responder a las diferentes clases' : 'Program your robot to respond to the different classes'}</p>
							</div>
						</div>
					</div>

					<div class="train-test-hub-notes">
						<button class="train-test-hub-icon-button" on:click={() => goto('/level4new?page=24')}>
							<img src="/img/tablet/designnotesicon.svg" alt="Design Notes" class="train-test-hub-card-logo" />
						</button>
						<div class="train-test-hub-card-copy">
							<h3>DESIGN NOTES</h3>
							<p>{$settingsStore?.language === 'es' ? 'Ver tus notas de diseño' : 'View your design notes'}</p>
						</div>
					</div>

					<button class="nextBtn page23-done-next" disabled={!hasCompletedTrainAndCodeinatorInLevel4New} on:click={() => {
						studentProgressStore.update((progress) => {
							progress.last_visited = '/level4new?page=27';
							return progress;
						});

						goto('/level4new?page=27');
					}}>
						<img src="/img/misc/nextbutton.png" alt="I’m Done" id="nextbutton" />
					</button>
				</div>
			</Tablet>
		{/if}
		{#if lineNumber == 24}
			{#if logsLoaded}
				<TextResponseModal 
					prompt={[{id: "robotdesign1", prompt: "Problem to Solve"}, {id: "robotdesign2", prompt: "Who My Robot Helps"}, {id: "robotdesign3", prompt: "Image Categories"}, {id: "robotdesign4", prompt: "What My Robot Will Do"}, {id: "robotdesign5", prompt: "My Robot Will Be Named:", singleLine: true}]}
					requireAllResponses={false}
					prefill={{
						robotdesign1: robotProblem,
						robotdesign2: robotHelps,
						robotdesign3: robotCategories,
						robotdesign4: robotAction,
						robotdesign5: robotName
					}}
					onSuccess={(responses) => {
						robotProblem = responses['robotdesign1'];
						robotHelps = responses['robotdesign2'];
						robotCategories = responses['robotdesign3'];
						robotAction = responses['robotdesign4'];
						robotName = responses['robotdesign5'];
						goto('/level4new?page=23');
					}}
				/>
				<ChatbotWidget assistantId={chatbotAssistantId} className="design-notes-chatbot" preserveSpeechPunctuation={true} />
			{/if}
		{/if}
		{#if lineNumber == 25}
			<Tablet showMeter={false} showBottomButtons={false}>
				<TabletButton on:click={() => { 
					const event  = new CustomEvent('showTablet', {
						bubbles: true
					});
					content?.dispatchEvent(event);
				}} />
				<TraininatorMain 
					onComplete={() => {
						studentProgressStore.update((progress) => {
							progress.level4new_traininator_tried = true;
							progress.last_visited = '/level4new?page=23';
							return progress;
						});

						goto('/level4new?page=23');
					}}
				/>
			</Tablet>
		{/if}
		{#if lineNumber == 26}
			<Tablet showMeter={false} showBottomButtons={false}>
				<Codinator 
					iframeStyle="height: 80vh;"
					buttonLabel="Finish"
					allowFinishWithoutSubmission={false}
					requireSuccessfulBuild={true}
					unlockAfterMs={180000}
					on:submitted={() => {
						studentProgressStore.update((progress) => {
								progress.level4new_codeinator_tried = true;
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
                        {$settingsStore?.language === 'es'
                            ? '¡El Control de Misión necesita saber algunas cosas más antes de que obtengas tu insignia final!'
                            : 'Mission Control needs to know a few more things before you get your final badge!'}
                    </p>
					<button class="nextBtn" on:click={() => {
                        handleNavigation(NavigationDirection.forward);
					}}><img src="/img/misc/nextbutton.png" alt="Next" id="nextbutton" />
					</button>
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
				<AudioPlayer src={getSurveyQuestionAudio(questionIndex)} />

                {#if showFeedbackModal}
					<FeedbackModal {message} {isSuccess} on:close={handleSurveyFeedbackClose} />
                {/if}
                <div
                    on:submit|preventDefault
                    class="ml-auto mr-auto flex h-full w-1/2 flex-col  items-center justify-center space-y-6  text-white" id="bod">
                    <div class="hud-red-blue-border w-full" id="question-box">
                        <p class="text-center text-3xl text-white" id="question">{questionsAndResponse[questionIndex].question}</p>
                    </div>
                    <div class="hud-red-blue-border flex w-3/4 flex-col space-y-4 p-4 text-3xl" id="options">
						<SurveyOption emoji={surveyOptions[0].emoji} response={surveyOptions[0].label[surveyLanguage]} on:click={() => handleSelection(surveyOptions[0].value)} bind:this={strongAgreeElement} />
						<SurveyOption emoji={surveyOptions[1].emoji} response={surveyOptions[1].label[surveyLanguage]} on:click={() => handleSelection(surveyOptions[1].value)} bind:this={agreeElement} />
						<SurveyOption emoji={surveyOptions[2].emoji} response={surveyOptions[2].label[surveyLanguage]} on:click={() => handleSelection(surveyOptions[2].value)} bind:this={neutralElement} />
						<SurveyOption emoji={surveyOptions[3].emoji} response={surveyOptions[3].label[surveyLanguage]} on:click={() => handleSelection(surveyOptions[3].value)} bind:this={disagreeElement} />
						<SurveyOption emoji={surveyOptions[4].emoji} response={surveyOptions[4].label[surveyLanguage]} on:click={() => handleSelection(surveyOptions[4].value)} bind:this={strongDisagreeElement} />
                    </div>
                    <div class="flex w-full items-end justify-end">
                        <button
                            class="next-button rounded-xl bg-blue-300 px-4 py-2 text-3xl font-bold text-black"
                            on:click={getNextQuestion}
                            bind:this={nextButton}    
						>{surveyUiText[surveyLanguage].next}</button>
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
		<div id="page3-confettiholder">
            {#key confetti}
				<div class="page3-confetti-emitter page3-confetti-top-left">
					<Confetti x={[-5, 5]} y={[-3, 0]} amount={150} colorRange={[40, 50]} duration={5000} />
				</div>
				<div class="page3-confetti-emitter page3-confetti-top-right">
					<Confetti x={[-5, 5]} y={[-3, 0]} amount={150} colorRange={[40, 50]} duration={5000} />
				</div>
				<div class="page3-confetti-emitter page3-confetti-mid-left">
					<Confetti x={[-5, 5]} y={[-3, 0]} amount={150} colorRange={[40, 50]} duration={5000} />
				</div>
				<div class="page3-confetti-emitter page3-confetti-mid-right">
					<Confetti x={[-5, 5]} y={[-3, 0]} amount={150} colorRange={[40, 50]} duration={5000} />
				</div>
				<div class="page3-confetti-emitter page3-confetti-bottom-left">
					<Confetti x={[-5, 5]} y={[-3, 0]} amount={150} colorRange={[40, 50]} duration={5000} />
				</div>
				<div class="page3-confetti-emitter page3-confetti-bottom-right">
					<Confetti x={[-5, 5]} y={[-3, 0]} amount={150} colorRange={[40, 50]} duration={5000} />
				</div>
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

	.train-test-hub {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 4vh;
		color: white;
		font-family: 'Gemunu Libre';
		position: relative;
	}

	.train-test-hub-top {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		gap: 10vw;
		width: 100%;
		transform: translateY(-3.5vh);
	}

	.train-test-hub-card {
		background: transparent;
		border: none;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		width: 26vw;
		min-height: 24vh;
		padding: 1vh 1vw;
		gap: 0.8vh;
	}

	.train-test-hub-card-copy {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
		width: 100%;
		max-width: 24vw;
	}

	.train-test-hub-icon-button {
		background: transparent;
		border: none;
		padding: 0;
		cursor: pointer;
		transition: transform 0.2s;
	}

	.train-test-hub-icon-button:disabled {
		cursor: not-allowed;
	}

	.train-test-hub-icon-button:hover {
		animation: traininator-bounce 0.5s ease;
		transform: scale(1.03);
	}

	.train-test-hub-icon-button:disabled:hover,
	.train-test-hub-icon-button:disabled:active {
		animation: none;
		transform: none;
	}

	.train-test-hub-icon-button:active {
		transform: scale(0.98);
	}

	@keyframes traininator-bounce {
		0% { transform: scale(1); }
		50% { transform: scale(1.08); }
		100% { transform: scale(1.03); }
	}

	.train-test-hub-card-disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.train-test-hub-card-disabled:hover,
	.train-test-hub-card-disabled:active {
		transform: none;
	}

	.train-test-hub-card h3,
	.train-test-hub-notes h3 {
		font-family: 'Mokoto';
		font-size: 2.4vh;
		margin: 0 0 1.5vh 0;
		letter-spacing: 0.08em;
	}

	.train-test-hub-card-logo {
		width: 18vh;
		height: 18vh;
		object-fit: contain;
		margin-bottom: 0.6vh;
	}

	.train-test-hub-card p,
	.train-test-hub-notes p {
		font-size: 4vh;
		line-height: 1.15;
		text-align: center;
		margin: 0;
	}

	.train-test-hub-notes {
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		transform: translateY(-2.5vh);
	}

	.page23-done-next {
		position: absolute;
		right: 19vw;
		bottom: 2.4vh;
		z-index: 20;
	}

	.page18-next:disabled {
		cursor: not-allowed;
	}

	.page18-next:disabled #nextbutton {
		filter: grayscale(1);
		opacity: 0.5;
	}

	.page23-done-next:disabled {
		cursor: not-allowed;
	}

	.page23-done-next:disabled #nextbutton {
		filter: grayscale(1);
		opacity: 0.5;
	}

	.traininator-exit-btn {
		position: absolute;
		right: 3.2vw;
		bottom: 2.8vh;
		z-index: 30;
		height: 7vh;
		padding: 1vh 2vw;
		border: 2px solid #289dd3;
		border-radius: 3.5vh;
		background: radial-gradient(farthest-corner at bottom right, #49c5ff 75%, #fff 100%);
		background-color: #49c5ff;
		color: #111;
		font-family: 'Gemunu Libre';
		font-weight: 700;
		font-size: 1.5rem;
		cursor: pointer;
		transition: 0.3s;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}

	.traininator-exit-btn:hover {
		transform: scale(1.05);
	}

	.traininator-exit-btn:active {
		transform: scale(0.95);
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

	.welcome-back-banner {
		position: absolute;
		top: 1.2vh;
		left: 50%;
		transform: translateX(-50%);
		z-index: 20;
		pointer-events: none;
	}

	.welcome-back-flags {
		display: flex;
		align-items: flex-start;
		gap: clamp(0.42rem, 1.15vw, 1.1rem);
		padding: 0.35rem 1rem;
	}

	.welcome-back-flag {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: clamp(3.6rem, 5.3vw, 5.4rem);
		height: clamp(4.4rem, 6.4vw, 6.3rem);
		font-size: clamp(2.15rem, 3.3vw, 3.3rem);
		font-weight: 800;
		color: #0f172a;
		line-height: 1;
		clip-path: polygon(0 0, 100% 0, 100% 84%, 50% 100%, 0 84%);
		box-shadow: 0 0.3vh 0.6vh rgba(0, 0, 0, 0.2);
	}

	.welcome-back-flag:nth-child(odd) {
		transform: rotate(-4deg);
	}

	.welcome-back-flag:nth-child(even) {
		transform: rotate(4deg);
	}

	.welcome-back-flag:nth-child(4n + 1) {
		background-color: #49c5ff;
	}

	.welcome-back-flag:nth-child(4n + 2) {
		background-color: #f6d365;
	}

	.welcome-back-flag:nth-child(4n + 3) {
		background-color: #fda085;
	}

	.welcome-back-flag:nth-child(4n + 4) {
		background-color: #a1ffce;
	}

	.welcome-back-gap {
		display: block;
		width: clamp(1.2rem, 3.1vw, 2.4rem);
	}

	.congrats-banner {
		top: 0.3vh;
		transform: translateX(calc(-50% - 6vw));
	}

	.congrats-flags {
		gap: clamp(0.36rem, 1vw, 1rem);
		padding: 0.55rem 1.45rem;
	}

	.congrats-flags .welcome-back-flag {
		width: clamp(3.2rem, 4.9vw, 5rem);
		height: clamp(4rem, 6.1vw, 6rem);
		font-size: clamp(2rem, 3.1vw, 3.2rem);
	}

	#page3-confettiholder {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 14;
		pointer-events: none;
	}

	.page3-confetti-emitter {
		position: absolute;
	}

	.page3-confetti-top-left {
		top: 15%;
		left: 20%;
	}

	.page3-confetti-top-right {
		top: 15%;
		left: 80%;
	}

	.page3-confetti-mid-left {
		top: 50%;
		left: 20%;
	}

	.page3-confetti-mid-right {
		top: 50%;
		left: 80%;
	}

	.page3-confetti-bottom-left {
		top: 85%;
		left: 20%;
	}

	.page3-confetti-bottom-right {
		top: 85%;
		left: 80%;
	}

</style>