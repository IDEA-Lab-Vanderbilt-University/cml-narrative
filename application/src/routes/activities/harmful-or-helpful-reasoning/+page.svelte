<script lang="ts">
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import DNDResponse from '$lib/components/activities/drag-and-drop/DNDResponse.svelte';
	import { goto } from '$app/navigation';
	import { harmfulHelpfulStore } from '$lib/utils/stores/store';

	const nextItem = () => {
		if (currentItemIndex < harmfulProps.length - 1) {
			currentItemIndex += 1;
		} else {
			goto('/training?page=5');
		}
	};

	const handleSubmit = async () => {
		try {
			goto('/training?page=5');
		} catch (error) {
			console.error(error);
		}
	};

	const generateHarmfulProps = (harmfulHelpfulObject: any) => {
		let result = [];

		harmfulHelpfulObject.harmful.forEach((item, id) => {
			result.push({
				id: id,
				title: item.title,
				type: 'harmful'
			});
		});

		harmfulHelpfulObject.helpful.forEach((item, id) => {
			result.push({
				id: id + harmfulHelpfulObject.harmful.length, // Continue the index from the end of the harmful array
				title: item.title,
				type: 'helpful'
			});
		});

		return result;
	};

	let harmfulHelpfulObject: any = {};
	harmfulHelpfulStore.subscribe((value) => {
		harmfulHelpfulObject = value;
	});

	let harmfulProps = generateHarmfulProps(harmfulHelpfulObject);
	console.log(harmfulProps);

	let currentItemIndex = 0;
</script>

<Tablet>
	<DNDResponse harmfulProp={harmfulProps[currentItemIndex]} on:nextItem={nextItem} />
</Tablet>
