<script lang="ts">
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import TextResponse from '$lib/components/activities/free-response/TextResponse.svelte';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';
	import DataService from '$lib/utils/DataService';
	import AudioPlayer from '$lib/components/audio/AudioPlayer.svelte';

	let response: string = '';
	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;

    export let onSuccess: (result: string) => void;
    export let id: string;

    export let promptedTechnology: string | undefined = undefined;
    export let title: string | undefined = undefined;
    export let prompt: string | undefined = undefined;
    export let placeholder: string | undefined = undefined;
	export let prefill: string | undefined = undefined;
	export let audio: string | undefined = undefined;

	$: response = prefill || '';

	function onFeedbackClose() {
		if (isSuccess) {
			onSuccess(response);
		}
		showFeedbackModal = false;
	}

	const handleSubmit = async () => {
		try {
			await DataService.TravelLog.submitTravelLog({
				data: response,
				description: id,
				status: 'complete'
			});
			message = 'Response recorded successfully!';
			isSuccess = true;
		} catch (error) {
			message = 'Response failed! Please try again.';
			isSuccess = false;
			console.error("Error submitting " + id + " text response: ", error);
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
	<TextResponse promptedTechnology={promptedTechnology} prompt={prompt} placeholder={placeholder} title={title} on:submitClicked={handleSubmit} bind:response />
</Tablet>
