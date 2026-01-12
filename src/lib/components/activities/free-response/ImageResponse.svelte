<script lang="ts">

	import { createEventDispatcher, getContext } from 'svelte';
	import CameraModal from '$lib/components/modals/CameraModal.svelte';
	import DrawingArea from '../draw/DrawingArea.svelte';
	// @ts-ignore
	const { open } = getContext('simple-modal');

	export let prompt: string;

	let dispatch = createEventDispatcher();

	enum ResponseType {
		undefined,
		draw,
		camera
	}


	let responseTypeState: ResponseType = ResponseType.undefined;

	const onFinish = async (images: HTMLImageElement[]) => {
		console.log('images ', images);
		// await DataService.Data.uploadResponseImages('drawAlgorithm', images);
		dispatch('imageSubmitted', {
			images: images,
			doSubmit: true
		});
	};

	const handleDrawingSubmit = (img: HTMLImageElement) => {
		dispatch('imageSubmitted', {
			images: [img],
			doSubmit: true
		});
	};

	const openCamera = () => {
		open(CameraModal, {
			onFinish
		});
	};
</script>

{#if responseTypeState == ResponseType.undefined}
	<div class="flex h-full w-full flex-col items-center justify-center text-white">
		<h3 class="text-4xl">{prompt}</h3>
		<p class="mt-2 text-2xl">(You can draw on a piece of paper and take a picture too)</p>
		<div class="mt-7 flex space-x-4">
				<div class="flex flex-col items-center">
					<p>draw a picture</p>
					<button class="btn btn-primary px-10 m-2" on:click={() => (responseTypeState = ResponseType.draw)}>
						<svg 
							class="mb-1 inline-block h-8 w-8 fill-white"
						xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"/></svg>
					</button>
				</div>
				<div class="flex flex-col items-center">
					<p>use camera</p>
					<button class="btn btn-secondary px-10 m-2" on:click={openCamera}>
						<svg 
							class="mb-1 inline-block h-8 w-8 fill-white"
						xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M149.1 64.8L138.7 96H64C28.7 96 0 124.7 0 160V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H373.3L362.9 64.8C356.4 45.2 338.1 32 317.4 32H194.6c-20.7 0-39 13.2-45.5 32.8zM256 192a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
					</button>
				</div>
		</div>
		<!-- <button class="btn btn-accent mt-4" on:click={submitClicked}>Next</button> -->
	</div>
{:else if responseTypeState == ResponseType.draw}
	<div class="mt-auto h-full w-full  items-center justify-center">
		<DrawingArea onSubmit={handleDrawingSubmit} onBack={() => (responseTypeState = ResponseType.undefined)} />
	</div>
{/if}
