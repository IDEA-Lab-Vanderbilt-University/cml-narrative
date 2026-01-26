<script lang="ts">
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
	}

	let response: string = '';
	let multiResponses: Record<string, string> = {};
	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;
	let isMultiMode = false;
	let promptItems: PromptItem[] = [];
	let allResponsesFilled = false;

    export let onSuccess: (result: string | Record<string, string>) => void;
    export let id: string | undefined = undefined;

    export let promptedTechnology: string | undefined = undefined;
    export let title: string | undefined = undefined;
    export let prompt: string | string[] | PromptItem[] | undefined = undefined;
    export let placeholder: string | undefined = undefined;
	export let prefill: string | Record<string, string> | undefined = undefined;
	export let audio: string | undefined = undefined;

	// Determine mode and parse prompts
	$: {
		if (Array.isArray(prompt)) {
			isMultiMode = true;
			// Convert array to PromptItem objects
			promptItems = prompt.map((item, index) => {
				if (typeof item === 'string') {
					return {
						id: `prompt_${index}`,
						prompt: item,
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
					<textarea
						class="response-textarea"
						placeholder={item.placeholder || 'Enter your response...'}
						bind:value={multiResponses[item.id]} />
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
</style>
