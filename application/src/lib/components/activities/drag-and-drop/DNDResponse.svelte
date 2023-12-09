<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import DNDTextResponse from './DNDTextResponse.svelte';
	import type { HarmfulHelpfulItem } from '$lib/types/DragDropItem';
	import VideoModal from '$lib/components/modals/VideoModal.svelte';
	import DataService from '$lib/utils/DataService';
	// @ts-ignore
	const { open } = getContext('simple-modal');
	// export let href: string;
	export let harmfulProp: HarmfulHelpfulItem;

	let dispatch = createEventDispatcher();

	enum ResponseType {
		undefined,
		write,
		video
	}

	$: {
		// if ($drawResponse) {
		// 	// WE can assume that an image has been drawn and saved because the store is not populated. We can then handle it here.
		// 	dispatch('imageSubmitted', {
		// 		image: $drawResponse
		// 	});
		// 	// reset the draw response
		// 	drawResponse.set(null);
		// }
	}

	let responseTypeState: ResponseType = ResponseType.undefined;
	let response: string = '';

	const handleNext = () => {
		dispatch('nextItem');
	};

	const textSubmit = () => {
		responseTypeState = ResponseType.undefined;
		handleNext();
	};

	const onFinish = async (url: string) => {
		// await DataService.Data.uploadResponseImages('drawAlgorithm', video);
		dispatch('videosSubmitted', {
			id: harmfulProp.id,
			url: url
		});
	};

	const openCamera = () => {
		open(VideoModal, {
			onFinish,
			harmfulProp
		});
	};
</script>

{#if responseTypeState == ResponseType.undefined}
	<div class="flex h-full w-full flex-col items-center justify-center text-white">
		<h3 class="text-4xl">
			Write or explain how a {harmfulProp.title} is {harmfulProp.type} according to you?
		</h3>
		<p class="mt-2 text-2xl">(You can record yourself explaining too)</p>
		<div class="mt-7 flex space-x-4">
			<button class="btn-primary btn" on:click={() => (responseTypeState = ResponseType.write)}
				>Write</button>
			<button class="btn-secondary btn" on:click={openCamera}>Record</button>
		</div>
		<button class="btn btn-accent mt-4" on:click={handleNext}>Next</button>
	</div>
{:else if responseTypeState == ResponseType.write}
	<div class="mt-auto h-full w-full  items-center justify-center">
		<!-- 
            The Draw component is utlizes a React based library. As such, a special adapter is needed to 
            allow interface between a Svelte and React component. More can be read in the documentation of the 
            Draw component.
        --->

		<DNDTextResponse {harmfulProp} on:textDone={textSubmit} bind:response />
		<!-- <TextResponse {harmfulProp} on:textDone={textSubmit} bind:response /> -->
	</div>
{/if}
