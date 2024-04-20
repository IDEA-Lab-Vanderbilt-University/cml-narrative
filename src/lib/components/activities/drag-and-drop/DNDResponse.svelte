<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import DNDTextResponse from './DNDTextResponse.svelte';
	import type { DragStackItem } from '$lib/types/DragDropItem';
	import VideoModal from '$lib/components/modals/VideoModal.svelte';
	// @ts-ignore
	const { open } = getContext('simple-modal');

	enum ResponseType {
		undefined,
		write,
		video
	}

	export let currentDragObject: DragStackItem;

	let dispatch = createEventDispatcher();
	let responseTypeState: ResponseType = ResponseType.undefined;
	let response: string = '';

	const handleNext = () => {
		dispatch('nextItem');
	};

	const textSubmit = () => {
		responseTypeState = ResponseType.undefined;
		handleNext();
	};

	const onFinish = async () => {
		dispatch('videosSubmitted');
	};

	const openCamera = () => {
		open(VideoModal, {
			onFinish,
			currentDragObject
		});
	};
</script>

{#if responseTypeState == ResponseType.undefined}
	{#if currentDragObject == undefined}
		<h2 class="text-5xl">Loading...</h2>
	{:else}
		<div class="flex h-full w-full flex-col items-center justify-center text-white">
			<h3 class="text-4xl">
				Write or explain how a {currentDragObject.title} is {currentDragObject.type} according to you?
			</h3>
			<p class="mt-2 text-2xl">(You can record yourself explaining too)</p>
			<div class="mt-7 flex space-x-4">
				<div class="flex flex-col items-center">
					<p>write your thoughts</p>
					<button class="btn btn-primary px-10 m-2" on:click={() => (responseTypeState = ResponseType.write)}>
						<svg
							class="mb-1 inline-block h-8 w-8 fill-white"
						 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
					</button>
				</div>
				<div class="flex flex-col items-center">
					<p>record yourself</p>
					<button class="btn btn-secondary px-10 m-2" on:click={openCamera}>
						<svg 
							class="mb-1 inline-block h-8 w-8 fill-white"
						xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 128C0 92.7 28.7 64 64 64H320c35.3 0 64 28.7 64 64V384c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128zM559.1 99.8c10.4 5.6 16.9 16.4 16.9 28.2V384c0 11.8-6.5 22.6-16.9 28.2s-23 5-32.9-1.6l-96-64L416 337.1V320 192 174.9l14.2-9.5 96-64c9.8-6.5 22.4-7.2 32.9-1.6z"/></svg>
				</div>
			</div>
			<!-- <button class="btn btn-accent mt-4" on:click={handleNext}>Next</button> -->
		</div>
	{/if}
{:else if responseTypeState == ResponseType.write}
	{#if currentDragObject == undefined}
		<h2 class="text-5xl">Loading...</h2>
	{:else}
		<div class="mt-auto h-full w-full  items-center justify-center">
			<DNDTextResponse {currentDragObject} on:textDone={textSubmit} bind:response />
		</div>
	{/if}
{/if}
