<script lang="ts">
	import { goto } from '$app/navigation';
	import type { HarmfulHelpfulItem } from '$lib/types/DragDropItem';
	import type { UserProgress } from '$lib/types/UserData';
	import DataService from '$lib/utils/DataService';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';
	import { dragItemsStore, harmfulHelpfulStore, userDataStore } from '$lib/utils/stores/store';
	import HarmfulHelpfulDnd from '../harmful-or-helpful-dnd/+page.svelte';
	import HarmfulHelpfulReasoning from '../harmful-or-helpful-reasoning/+page.svelte';
	import Tablet from '$lib/components/tablet/Tablet.svelte';

	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;

	const getUpdatedProgress = (): UserProgress => {
		return {
			level: 0,
			levelLabel: 'level-zero',
			subLevel: 1,
			subLevelLabel: '/training?page=5',
			lastUpdated: new Date()
		};
	};

	const onFeedbackClose = () => {
		showFeedbackModal = false;
		if(!isSuccess) {
			goto("/training?page=1");
		} else {
			goto('/training?page=5');
		}
	};

	const updateLocalProgress = (progress: UserProgress) => {
		userDataStore.update((data) => {
			data.progress = progress;
			return data;
		});
	};

	const handleSubmit = async () => {
		// this is the final submit till now we going to update the store values.
		try {
			console.log('everything is done');
			// let see what's in the final store
			let allData: HarmfulHelpfulItem[] = []; // Initialize with an empty array
			harmfulHelpfulStore.subscribe((value) => {
				allData = value;
			});

			console.log('the final data ', allData);
			await DataService.Data.submitHelpfulOrHarmfulResponse(allData);

			message = 'Your responses were recorded successfully!';
			isSuccess = true;

			let progress = getUpdatedProgress();
			await DataService.Data.updateUserProgress(progress);
			updateLocalProgress(progress);

		} catch (err) {
			message = 'Your responses not recorded successfully!';
			isSuccess = false;
			console.error("Error in submitting harmful or helpful responses", err);
		}
		showFeedbackModal = true;
	};

	$: {
		if ($dragItemsStore.length === 0) {
			handleSubmit();
		}
	}
</script>

{#if showFeedbackModal}
	<Tablet>
		<FeedbackModal {message} {isSuccess} on:close={onFeedbackClose} />
	</Tablet>
{/if}
{#if $dragItemsStore[0] && $dragItemsStore[0].type == undefined}
	<HarmfulHelpfulDnd />
{:else if $dragItemsStore[0] && $dragItemsStore[0].type != undefined}
	<HarmfulHelpfulReasoning />
{/if}
