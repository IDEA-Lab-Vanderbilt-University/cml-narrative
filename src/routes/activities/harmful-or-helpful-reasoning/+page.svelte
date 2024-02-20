<script lang="ts">
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import DNDResponse from '$lib/components/activities/drag-and-drop/DNDResponse.svelte';
	import { onMount } from 'svelte';
	import type { DragStackItem, HarmfulHelpfulItem } from '$lib/types/DragDropItem';
	import { dragItemsStore, harmfulHelpfulStore } from '$lib/utils/stores/store';
	let currentDragObject: DragStackItem;

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
