<!--
 /src/routes/activities/harmful-or-helpful/what-do-you-think-an-algorithim-is/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 16th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import TextResponse from '$lib/components/activities/free-response/TextResponse.svelte';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';
	import DataService from '$lib/utils/DataService';
	import { goto } from '$app/navigation';

	let response: string = '';
	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;

	function onFeedbackClose() {
		if (isSuccess) {
			goto('/activities/draw-an-algorithm');
		}
		showFeedbackModal = false;
	}

	const handleSubmit = async () => {
		try {
			await DataService.Data.submitFreeResponse('algorithm', response);
			message = 'Response recorded successfully!';
			isSuccess = true;
		} catch (error) {
			message = 'Response failed! Please try again.';
			isSuccess = false;
			console.error("Error submitting algorithm text response: ", error);
		}
		showFeedbackModal = true;
	};
</script>

<Tablet>
	{#if showFeedbackModal}
		<FeedbackModal {message} {isSuccess} on:close={onFeedbackClose} />
	{/if}
	<TextResponse promptedTechnology="an Algorithm" on:submitClicked={handleSubmit} bind:response />
</Tablet>
