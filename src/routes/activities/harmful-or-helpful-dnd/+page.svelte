<script lang="ts">
	import { goto } from '$app/navigation';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import type { DragDropItem, DragStackItem } from '$lib/types/DragDropItem';
	import { accessTokenStore, dragItemsStore, requireLogin } from '$lib/utils/stores/store';
	import { onMount } from 'svelte';
	
	requireLogin();

	let helpfulElement: HTMLParagraphElement;
	let harmfulElement: HTMLParagraphElement;

	let currentDragObject: DragStackItem;

	let designatedContainer: null | string = null;

	let hurtful: DragDropItem[] = [];
	let helpful: DragDropItem[] = [];
	let bothHurtfulAndHelpful = [];

	const handleDrop = (e: { detail: any }) => {
		console.log('Drop', e.detail);
		console.log(currentDragObject);
		console.log(designatedContainer);

		let type: 'harmful' | 'helpful' | undefined;

		if (designatedContainer == 'harmful') {
			type = 'harmful';
		} else if (designatedContainer == 'helpful') {
			type = 'helpful';
		} else {
			type = undefined;
		}

		dragItemsStore.update((items) => {
			items[0].type = type;
			console.log('after drop: ', items);
			return items;
		});
	};

	onMount(() => {
		dragItemsStore.subscribe((value) => {
			currentDragObject = value[0];
		});
	});


	const handleDrag = (event: any) => {
		let drag: HTMLImageElement = currentDragObject.el
		drag.classList.add("opacity-10")
		event.currentTarget.classList.add("grabbing");
	};

	const handleContainerDragover = (event: string | null) => {
		// console.log(event);
		designatedContainer = event;
	};

</script>


<Tablet>
	<div class="flex h-full w-full flex-col items-center justify-center text-white">
		{#if currentDragObject == undefined}
			<h2 class="text-5xl">Loading...</h2>
		{:else}
			<div class="space-y-3 text-center">
				<h2 class="text-5xl">Is this technology helpful or harmful?</h2>
				<p class="text-3xl">Drag the technology into the appropriate box.</p>
			</div>
			<div class="mt-14 flex w-full items-center">
				<div
					id="helpful-bank"
					class="container flex h-full w-full   flex-col items-center justify-center rounded-sm p-2 text-center text-2xl text-white"
					on:drop={handleDrop}
					on:dragover={() => handleContainerDragover('helpful')}>
					<p class="mb-3 rounded-lg bg-teal-600 px-4 py-2 text-4xl" bind:this={helpfulElement}>
						Helpful
					</p>
					<div id="helpful-bank-container" class="flex items-start" />
				</div>
				<div id="yolo" class="container flex h-full w-1/2 flex-col items-center justify-center">
					<img
						src={currentDragObject.img}
						alt=""
						class="h-full"
						on:drag={handleDrag}
						id="draggable"
						on:dragend={handleDrop}
						bind:this={currentDragObject.el} />
					<p>{currentDragObject.title}</p>
				</div>
				<div
					id="harmful-bank"
					class="container flex h-full w-full  flex-col items-center justify-center rounded-sm p-2 text-center text-2xl text-white"
					on:dragover={() => handleContainerDragover('harmful')}
					on:drop={handleDrop}>
					<p class="mb-3 rounded-lg bg-teal-600 px-4 py-2 text-4xl" bind:this={harmfulElement}>
						Harmful
					</p>
				</div>
			</div>
		{/if}
	</div>
</Tablet>


<style>
	#helpful-bank p {
		user-select: none;
	}
	
	#harmful-bank p {
		user-select: none;
	}

	

</style>