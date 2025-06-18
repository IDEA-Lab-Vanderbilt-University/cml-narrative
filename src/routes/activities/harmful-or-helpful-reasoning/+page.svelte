<script lang="ts">
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import DNDResponse from '$lib/components/activities/drag-and-drop/DNDResponse.svelte';
	import { onMount } from 'svelte';
	import type { DragStackItem, HarmfulHelpfulItem } from '$lib/types/DragDropItem';
	import { accessTokenStore, dragItemsStore, harmfulHelpfulStore, requireLogin } from '$lib/utils/stores/store';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	let currentDragObject: DragStackItem;

	requireLogin();
	
	onMount(() => {
		dragItemsStore.subscribe((value) => {
			currentDragObject = value[0];
		});
	});

	const nextItem = () => {
		let actaulHOHItem: HarmfulHelpfulItem = {
			id: currentDragObject.id,
			itemId: currentDragObject.itemId,
			title: currentDragObject.title,
			type: currentDragObject.type,
			reasoning: currentDragObject.reasoning
		};

		harmfulHelpfulStore.update((value) => {
			value.push(actaulHOHItem);
			console.log('harmfulHelpfulStore: ', value);
			return value;
		});

		dragItemsStore.update((items) => items.slice(1));
	};

	const handleVideoSubmission = () => {
		console.log('video submitted');
		nextItem();
	};
</script>

<Tablet>
	<DNDResponse
		{currentDragObject}
		on:nextItem={nextItem}
		on:videosSubmitted={handleVideoSubmission} />
</Tablet>
