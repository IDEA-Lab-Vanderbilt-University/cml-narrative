<script lang="ts">
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import DNDResponse from '$lib/components/activities/drag-and-drop/DNDResponse.svelte';
	import { goto } from '$app/navigation';
	import { harmfulHelpfulStore } from '$lib/utils/stores/store';
	import DataService from '$lib/utils/DataService';
	import type { HarmfulHelpfulItem, HarmfulHelpfulStoreItem } from '$lib/types/DragDropItem';

	const nextItem = () => {
		if (currentItemIndex < harmfulProps.length - 1) {
			currentItemIndex += 1;
		} else {
			handleTotalHarmFulHelpfulSubimission();
			goto('/training?page=5');
		}
	};

	const handleTotalHarmFulHelpfulSubimission = async () => {};

	// const handleSubmit = async () => {
	// 	try {
	// 		goto('/training?page=5');
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };

	const handleVideoSubmission = async (event: any) => {
		try {
			console.log(event.detail);
			// fetch s3 url from the media endpoint
			// you get url, item id, itemId, from the event.detail
			// some store logic if there isn't
			console.log('video submssion started!');
			nextItem();
		} catch (error) {
			console.error(error);
		}
	};

	const generateHarmfulProps = (harmfulHelpfulObject: HarmfulHelpfulStoreItem) => {
		let result: HarmfulHelpfulItem[] = [];

		harmfulHelpfulObject.harmful.forEach((item) => {
			result.push({
				id: item.id,
				itemId: item.itemId,
				title: item.title,
				type: 'harmful'
			});
		});

		harmfulHelpfulObject.helpful.forEach((item, id) => {
			result.push({
				id: item.id, // Continue the index from the end of the harmful array
				itemId: item.itemId,
				title: item.title,
				type: 'helpful'
			});
		});

		result.sort((a, b) => a.id - b.id);

		return result;
	};

	let harmfulHelpfulObject: HarmfulHelpfulStoreItem = {
		harmful: [],
		helpful: [],
		reasoning: []
	};
	harmfulHelpfulStore.subscribe((value) => {
		harmfulHelpfulObject = value;
	});

	console.log('harmfulobject: ', harmfulHelpfulObject);

	let harmfulProps = generateHarmfulProps(harmfulHelpfulObject);
	console.log(harmfulProps);

	let currentItemIndex = 0;
</script>

<Tablet>
	<DNDResponse
		harmfulProp={harmfulProps[currentItemIndex]}
		on:nextItem={nextItem}
		on:videosSubmitted={handleVideoSubmission} />
</Tablet>
