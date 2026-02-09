<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import TextResponse from '$lib/components/activities/free-response/TextResponse.svelte';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';
	import DataService from '$lib/utils/DataService';
	import AudioPlayer from '$lib/components/audio/AudioPlayer.svelte';

	interface PromptItem {
		id: string;
		title?: string;
		prompt?: string;
		placeholder?: string;
		singleLine?: boolean;
	}

	let response: string = '';
	let multiResponses: Record<string, string> = {};
	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;
	let isMultiMode = false;
	let promptItems: PromptItem[] = [];
	let allResponsesFilled = false;
	let canRecord = false;
	let recordingItemId: string | null = null;
	let recognition: any;

    export let onSuccess: (result: string | Record<string, string>) => void;
    export let id: string | undefined = undefined;

    export let promptedTechnology: string | undefined = undefined;
    export let title: string | undefined = undefined;
    export let prompt: string | string[] | PromptItem[] | undefined = undefined;
    export let placeholder: string | undefined = undefined;
	export let prefill: string | Record<string, string> | undefined = undefined;
	export let audio: string | undefined = undefined;
	export let singleLine: boolean | boolean[] | undefined = undefined;

	// Determine mode and parse prompts
	$: {
		if (Array.isArray(prompt)) {
			isMultiMode = true;
			// Convert array to PromptItem objects
			promptItems = prompt.map((item, index) => {
				if (typeof item === 'string') {
					const isSingleLine = Array.isArray(singleLine) 
						? singleLine[index] ?? false 
						: singleLine ?? false;
					return {
						id: `prompt_${index}`,
						prompt: item,
						singleLine: isSingleLine,
					};
				}
				return item;
			});
			
			// Initialize multi responses
			if (typeof prefill === 'object' && prefill !== null) {
				multiResponses = { ...prefill };
			}
			promptItems.forEach((item) => {
				if (!(item.id in multiResponses)) {
					multiResponses[item.id] = '';
				}
			});
		} else {
			isMultiMode = false;
			response = (typeof prefill === 'string' ? prefill : '') || '';
		}
	}

	// Check if all responses are filled
	$: {
		if (isMultiMode) {
			allResponsesFilled = promptItems.every(
				(item) => multiResponses[item.id] && multiResponses[item.id].trim() !== ''
			);
		}
	}

	onMount(() => {
		if (browser) {
			// @ts-ignore
			if (window.SpeechRecognition || window.webkitSpeechRecognition) {
				canRecord = true;
			}
		}
	});

	const startRecording = (itemId: string) => {
		if (recordingItemId) {
			stopRecording();
		}

		// @ts-ignore
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		recognition = new SpeechRecognition();
		recognition.lang = 'en-US';
		recognition.continuous = true;
		recognition.interimResults = true;
		recognition.start();

		let finalTranscript = multiResponses[itemId] || '';
		recognition.onresult = (event: any) => {
			let interimTranscript = '';
			for (let i = event.resultIndex; i < event.results.length; i++) {
				let transcript = event.results[i][0].transcript;
				if (event.results[i].isFinal) {
					finalTranscript += ' ' + transcript;
				} else {
					interimTranscript += transcript;
				}
			}
			multiResponses[itemId] = finalTranscript;
		};

		recognition.onerror = (event: any) => {
			console.error('Speech recognition error:', event);
			recordingItemId = null;
		};

		recognition.onend = () => {
			console.log('Speech recognition ended.');
			recordingItemId = null;
		};

		recordingItemId = itemId;
	};

	const stopRecording = () => {
		if (recognition) {
			recognition.stop();
		}
		recordingItemId = null;
	};

	const toggleRecording = (itemId: string) => {
		if (recordingItemId === itemId) {
			stopRecording();
		} else {
			startRecording(itemId);
		}
	};

	function onFeedbackClose() {
		if (isSuccess) {
			if (isMultiMode) {
				onSuccess(multiResponses);
			} else {
				onSuccess(response);
			}
		}
		showFeedbackModal = false;
	}

	const handleSubmit = async () => {
		try {
			if (isMultiMode) {
				// Validate all responses are filled
				for (const item of promptItems) {
					if (!multiResponses[item.id] || multiResponses[item.id].trim() === '') {
						message = 'Please fill in all responses.';
						isSuccess = false;
						showFeedbackModal = true;
						return;
					}
				}

				// Submit all responses
				const submitPromises = promptItems.map((item) =>
					DataService.TravelLog.submitTravelLog({
						data: multiResponses[item.id],
						description: item.id,
						status: 'complete'
					})
				);

				await Promise.all(submitPromises);
				message = 'All responses recorded successfully!';
				isSuccess = true;
			} else {
				// Single response mode
				if (!response || response.trim() === '') {
					message = 'Please provide a response.';
					isSuccess = false;
					showFeedbackModal = true;
					return;
				}

				await DataService.TravelLog.submitTravelLog({
					data: response,
					description: id || 'textresponse',
					status: 'complete'
				});
				message = 'Response recorded successfully!';
				isSuccess = true;
			}
		} catch (error) {
			message = 'Response failed! Please try again.';
			isSuccess = false;
			console.error("Error submitting text response: ", error);
		}
		showFeedbackModal = true;
	};
</script>

<Tablet showMeter={false} showBottomButtons={false}>
	{#if audio}
		<AudioPlayer src={audio} />
	{/if}
	{#if showFeedbackModal}
		<FeedbackModal {message} {isSuccess} on:close={onFeedbackClose} />
	{/if}
	
	{#if isMultiMode}
		<div class="multi-response-container">
			{#each promptItems as item (item.id)}
				<div class="response-column">
					{#if item.title}
						<h2 class="response-title">{item.title}</h2>
					{/if}
					{#if item.prompt}
						<p class="response-prompt">{item.prompt}</p>
					{/if}
					{#if item.singleLine}
						<input
							type="text"
							class="response-input"
							placeholder={item.placeholder || 'Enter your response...'}
							bind:value={multiResponses[item.id]} />
					{:else}
						<textarea
							class="response-textarea"
							placeholder={item.placeholder || 'Enter your response...'}
							bind:value={multiResponses[item.id]} />
					{/if}
					{#if recordingItemId === item.id}
						<p class="recording-indicator">Recording...</p>
					{/if}
					{#if canRecord}
						<button
							class="record-button {recordingItemId === item.id ? 'recording' : ''}"
							on:click={() => toggleRecording(item.id)}>
							{#if recordingItemId === item.id}
								<svg
									class="record-icon"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 640 512"
									><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
										d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 21.2-5.1 41.1-14.2 58.7L416 300.8V96c0-53-43-96-96-96s-96 43-96 96v54.3L38.8 5.1zm362.5 407l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128v-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6v40c0 89.1 66.2 162.7 152 174.4V464H248c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H344V430.4c20.4-2.8 39.7-9.1 57.3-18.2z" /></svg>
								<span>Stop Recording</span>
							{:else}
								<svg
									class="record-icon"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 384 512"
									><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
										d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z" /></svg>
								<span>Start Recording</span>
							{/if}
						</button>
					{/if}
				</div>
			{/each}
			<button class="submit-button" on:click={handleSubmit} disabled={!allResponsesFilled}>Submit</button>
		</div>
	{:else}
		<TextResponse 
			promptedTechnology={promptedTechnology} 
			prompt={typeof prompt === 'string' ? prompt : undefined} 
			placeholder={placeholder} 
			title={title} 
			on:submitClicked={handleSubmit} 
			bind:response />
	{/if}
</Tablet>

<style>
	.multi-response-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		padding: 2rem;
		gap: 1rem;
	}

	.response-column {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1rem;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 0.5rem;
		overflow: hidden;
	}

	.response-title {
		font-size: 1.5rem;
		font-weight: bold;
		color: white;
		margin: 0;
	}

	.response-prompt {
		font-size: 2rem;
		color: white;
		margin: 0;
	}

	.response-textarea {
		flex: 1;
		border: 2px dashed white;
		border-radius: 0.375rem;
		background-color: transparent;
		color: white;
		padding: 0.75rem;
		font-size: 1rem;
		resize: none;
		font-family: inherit;
	}

	.response-textarea::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.response-textarea:focus {
		outline: none;
		border-color: #49c5ff;
		box-shadow: 0 0 10px rgba(73, 197, 255, 0.5);
	}

	.response-input {
		border: 2px dashed white;
		border-radius: 0.375rem;
		background-color: transparent;
		color: white;
		padding: 0.75rem;
		font-size: 1.25rem;
		font-family: inherit;
		width: 100%;
	}

	.response-input::placeholder {
		color: rgba(255, 255, 255, 0.5);
	}

	.response-input:focus {
		outline: none;
		border-color: #49c5ff;
		box-shadow: 0 0 10px rgba(73, 197, 255, 0.5);
	}

	.submit-button {
		padding: 0.75rem 2rem;
		background-color: #49c5ff;
		color: #111;
		border: none;
		border-radius: 0.375rem;
		font-size: 1.125rem;
		font-weight: 600;
		cursor: pointer;
		transition: transform 0.2s, background-color 0.2s;
	}

	.submit-button:hover:not(:disabled) {
		transform: scale(1.05);
		background-color: #2fa8d0;
	}

	.submit-button:active:not(:disabled) {
		transform: scale(0.95);
	}

	.submit-button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		background-color: #888;
	}

	.recording-indicator {
		font-size: 0.875rem;
		font-style: italic;
		color: white;
		margin: 0.25rem 0;
	}

	.record-button {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background-color: #49c5ff;
		color: white;
		border: none;
		border-radius: 0.375rem;
		font-size: 0.875rem;
		cursor: pointer;
		transition: transform 0.2s, background-color 0.2s;
	}

	.record-button.recording {
		background-color: #ef4444;
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	.record-button:hover {
		transform: scale(1.05);
	}

	.record-button:active {
		transform: scale(0.95);
	}

	.record-icon {
		width: 1rem;
		height: 1rem;
		fill: white;
	}

	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.7;
		}
	}
</style>
