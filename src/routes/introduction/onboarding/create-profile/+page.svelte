<script lang="ts">
	import { goto } from '$app/navigation';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';
	import ProfileEditor from '$lib/components/sequences/tablet/create-profile/ProfileEditor.svelte';
	import type { Student } from '$lib/types/UserData';
	import DataService from '$lib/utils/DataService';
	import { onDestroy, onMount } from 'svelte';
	import {  studentDataStore, studentProgressStore } from '$lib/utils/stores/store';
	import { get } from 'svelte/store';

	const startPage: number = 3;
	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;

	let profileData: Student = get(studentDataStore);

	// Initialize profile data if needed
	if(profileData.interests == undefined || profileData.interests.length == 0) {
		profileData.interests = ['','',''];
	}

	studentDataStore.subscribe((value) => {
		profileData = value;

		if(profileData.interests == undefined || profileData.interests.length == 0) {
			profileData.interests = ['','',''];
		}
	});

	let mounted = false;

	onMount(() => {
		mounted = true;
	});
	onDestroy(() => {
		mounted = false;
	});

	const handleSubmit = async (event: CustomEvent) => {
		const { profileData: submittedData } = event.detail;
		
		try {
			console.log('profileData before signup: ', submittedData);

			await DataService.Student.updateStudent(submittedData);
			
			// Also send a travel log entry for the profile update
			await DataService.TravelLog.submitTravelLog({
				data: JSON.stringify(submittedData),
				description: 'profile_updated',
				status: 'complete'
			});

			message = 'Agent created successfully!';
			isSuccess = true;

			console.log('profileData after signup: ', submittedData);
		} catch (error) {
			message = 'Agent creation failed!';
			isSuccess = false;
			console.error(error);
		}
		showFeedbackModal = true;
	};

	const handleStepChanged = (event: CustomEvent) => {
		const { step, direction } = event.detail;
		console.log(`Step changed to ${step}, direction: ${direction}`);
		// You can add additional logic here for step changes
	};

	async function onFeedbackClose() {
		if (isSuccess) {
			studentProgressStore.update((data) => {
				data.last_visited = '/introduction/bot-buddy?page=1';
				return data;
			});
			goto('/introduction/bot-buddy?page=1');
		}
		showFeedbackModal = false;
	}
</script>

<div class="relative z-0 h-full w-full rounded-md">
	{#if showFeedbackModal}
		<FeedbackModal {message} {isSuccess} on:close={onFeedbackClose} />
	{/if}

	<ProfileEditor 
		bind:profileData 
		{startPage}
		on:submit={handleSubmit}
		on:stepChanged={handleStepChanged}
	/>
</div>
