<script lang="ts">
	import DataService from '$lib/utils/DataService';
	import ImageResponseModal from '$lib/components/activities/free-response/ImageResponseModal.svelte';
	import { requireLogin, studentProgressStore } from '$lib/utils/stores/store';
	import { goto } from '$app/navigation';
	
	requireLogin();

	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;
	let submissionType = ''
	let doSubmit = false;

	async function onFeedbackClose() {
		showFeedbackModal = false;
		if(doSubmit) {
			onSubmit();
		}
	}

	const onSubmit = () => {
		studentProgressStore.update((progress) => {
			progress.last_visited = '/introduction/training?page=9';
			return progress;
		});
		
		goto('/introduction/training?page=9');
	}
</script>

<ImageResponseModal 
	promptedTechnology="Machine Learning"
	message={message} 
	isSuccess={isSuccess} 
	showFeedbackModal={showFeedbackModal} 
	handleImageSubmission={async (event) => {
		doSubmit = event.detail.doSubmit;
		let success = await DataService.TravelLog.handleImageSubmission(event, "draw-machine-learning");

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