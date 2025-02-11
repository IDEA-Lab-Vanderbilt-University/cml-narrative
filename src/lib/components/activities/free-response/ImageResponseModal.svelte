
<script lang="ts">
	import FeedbackModal from "$lib/components/modals/FeedbackModal.svelte";
	import Tablet from "$lib/components/tablet/Tablet.svelte";
	import ImageResponse from "./ImageResponse.svelte";

    export let promptedTechnology = '';
    export let message = '';
    export let isSuccess = false;
    export let showFeedbackModal = false;
    export let handleImageSubmission: (event: CustomEvent<any>) => void | Promise<void> = () => {};
    export let onSubmit = () => {};
    export let onFeedbackClose = () => {};
    export let prompt = '';

    if (promptedTechnology !== '') {
        prompt = 'Draw a picture of what you think ' + promptedTechnology + ' is.';
    }
</script>

<Tablet showMeter={false}>
	{#if showFeedbackModal}
		<FeedbackModal {message} {isSuccess} on:close={onFeedbackClose} />
	{/if}
	<ImageResponse
		prompt={prompt}
		on:imageSubmitted={handleImageSubmission}
		on:submitClicked={onSubmit} />
</Tablet>
