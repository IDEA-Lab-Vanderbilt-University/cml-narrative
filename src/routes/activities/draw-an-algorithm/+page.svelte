<script lang="ts">
	import DataService from '$lib/utils/DataService';
	import { goto } from '$app/navigation';
	import type { StudentProgress } from '$lib/types/UserData';
	import { requireLogin, studentProgressStore } from '$lib/utils/stores/store';
	import ImageResponseModal from '$lib/components/activities/free-response/ImageResponseModal.svelte';

	requireLogin();

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
		studentProgressStore.update((progress: StudentProgress) => {
			progress.last_visited = '/training?page=9';
			return progress;
		});

		goto('/training?page=9');
	};
</script>

<ImageResponseModal
	promptedTechnology="an Algorithm"
	message={message} 
	isSuccess={isSuccess} 
	showFeedbackModal={showFeedbackModal} 
	handleImageSubmission={async (event) => {
		doSubmit = event.detail.doSubmit;
		let success = await DataService.TravelLog.handleImageSubmission(event, "draw-an-algorithm");

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