<script lang="ts">
	import { goto } from '$app/navigation';
	import type { HarmfulHelpfulItem } from '$lib/types/DragDropItem';
	import type { UserProgress } from '$lib/types/UserData';
	import DataService from '$lib/utils/DataService';
	import { dragItemsStore, harmfulHelpfulStore, userDataStore } from '$lib/utils/stores/store';
	import HarmfulHelpfulDnd from '../harmful-or-helpful-dnd/+page.svelte';
	import HarmfulHelpfulReasoning from '../harmful-or-helpful-reasoning/+page.svelte';

	const getUpdatedProgress = (): UserProgress => {
		return {
			level: 0,
			levelLabel: 'level-zero',
			subLevel: 1,
			subLevelLabel: '/training?page=5',
			lastUpdated: new Date()
		};
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

			let progress = getUpdatedProgress();
			await DataService.Data.updateUserProgress(progress);
			updateLocalProgress(progress);

			goto('/training?page=5');
		} catch (err) {
			console.log(err);
		}
	};
</script>

{#if $dragItemsStore.length === 0}
	{handleSubmit()}
{:else if $dragItemsStore[0].type == undefined}
	<HarmfulHelpfulDnd />
{:else if $dragItemsStore[0].type != undefined}
	<HarmfulHelpfulReasoning />
{/if}
