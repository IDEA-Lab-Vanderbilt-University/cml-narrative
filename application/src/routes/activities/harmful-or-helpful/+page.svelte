<!--
 /src/routes/activities/harmful-or-helpful/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 16th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { goto } from '$app/navigation';
	import Bank from '$lib/components/activities/drag-and-drop/Bank.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import DataService from '$lib/utils/DataService';
	import { harmfulHelpfulStore } from '$lib/utils/stores/store';

	// import ConfirmationModal from "$lib/components/modals/activities/hurtful-harmful/ConfirmationModal.svelte";
	import { getContext, onMount } from 'svelte';
	// const { open } = getContext('simple-modal');

	let helpfulElement: HTMLParagraphElement;
	let harmfulElement: HTMLParagraphElement;

	let currentDragObject = {
		el: null,
		id: 1,
		title: 'iPhone',
		img: '/img/icons/mobile-app.png'
	};

	let itemIndex = 0;

	let items1 = [
		{ id: 1, itemId: 'iphone', title: 'iPhone', img: '/img/icons/mobile-app.png' },
		{ id: 2, itemId: 'social-media', title: 'Social Media', img: '/img/icons/social-media.png' },
		{ id: 3, itemId: 'internet', title: 'Internet', img: '/img/icons/wifi.png' },
		{ id: 4, itemId: 'hospital', title: 'Hospital', img: '/img/icons/hospital.png' }
	];

	let designatedContainer: null | string = null;

	let hurtful = [];
	let helpful = [];
	let bothHurtfulAndHelpful = [];

	$: {
		currentDragObject = items1[itemIndex];
		// console.log(items1);
	}

	const handleDrop = (e) => {
		console.log('Drop', e.detail);
		console.log(currentDragObject);
		console.log(designatedContainer);

		if (itemIndex < items1.length - 1) {
			if (designatedContainer == 'helpful') {
				// helpfulElement.classList.add('animate-pulse');
				helpful = [...helpful, currentDragObject];
				itemIndex += 1;
			}

			if (designatedContainer == 'harmful') {
				hurtful = [...hurtful, currentDragObject];
				itemIndex += 1;
			}
		}
	};

	onMount(() => {
		const draggables = document.querySelectorAll('.draggable');
		const containers = document.querySelectorAll('.container');

		// draggables.forEach((draggable) => {
		// 	draggable.addEventListener('dragstart', () => {
		// 		draggable.classList.add("dragging")
		// 		console.log("star");

		// 	})

		// 	draggable.addEventListener("dragend", () => {
		// 		draggable.classList.remove("dragging")
		// 	})
		// })

		// containers.forEach((contianer) => {
		// 	contianer.addEventListener("dragover", (e) => {
		// 		e.preventDefault()

		// 		const draggable = document.querySelector(".dragging")

		// 		contianer.appendChild(draggable)
		// 	})
		// })
	});

	const handleSubmit = async () => {
		try {
			// await DataService.Data.submitHelpfulOrHarmfulResponse({
			// 	harmful: hurtful,
			// 	helpful: helpful
			// });
			harmfulHelpfulStore.set({ harmful: hurtful, helpful: helpful, reasoning: [] });

			goto('harmful-or-helpful-reasoning');
		} catch (error) {
			console.error(error);
		}
	};

	const handleDrag = (event) => {
		// console.log(event);
		// console.log(event);
		// let drag: HTMLImageElement = currentDragObject.el
		// drag.classList.add("opacity-50")
	};

	const handleContainerDragover = (event) => {
		// console.log(event);
		designatedContainer = event;
	};
</script>

<Tablet>
	<!-- <div class="h-full w-full rounded-md text-white p-4">
		<div class="flex flex-col justify-around space-y-10">
			<div class="space-y-4 text-center font-mono">
				<p class="text-3xl font-bold">Is this technology helpful or harmful?</p>
				<p>Drag and drop each of the technologies into the proper bin.</p>
			</div>
			<div class="mt-4 h-1/4 border-2 border-dashed border-slate-200 bg-gray-50">
				<Bank items={items1} type="light" />
			</div>

			<div class="flex h-full space-x-3">
				<div
					class="h-full w-full rounded-sm border-2 bg-gray-50 p-2 text-center text-2xl text-black">
					<p>Harmful</p>
					<Bank items={hurtful} type="light" id="harmful" on:itemDropped={handleDrop} />
				</div>
				<div
					class=" h-full w-full rounded-sm border-2 bg-gray-50 p-2 text-center text-2xl text-black">
					<p>Helpful</p>
					<Bank items={helpful} type="light" id="helpful" on:itemDropped={handleDrop} />
				</div>
				<div
					class=" h-full w-full rounded-sm border-2 bg-gray-50 p-2 text-center text-2xl text-black">
					<p>Both Harmful and Helpful</p>
					<Bank
						items={bothHurtfulAndHelpful}
						type="light"
						id="harmfulAndHelpful"
						on:itemDropped={handleDrop} />
				</div>
			</div>
			<div class="flex items-center justify-center">
				<a
					href="/training?page=6"
					class="w-fit  rounded-md bg-lapiz-blue px-5 text-3xl text-white">Submit</a>
			</div>
		</div>
	</div> -->
	<div class="flex h-full w-full flex-col items-center justify-center text-white">
		{#if itemIndex >= items1.length - 1}
			<h2 class="text-5xl">Thanks for your response!</h2>
			<button class="mt-8 rounded-lg bg-blue-500 px-4 py-2 text-4xl" on:click={handleSubmit}
				>Next</button>
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
					<!-- <Bank items={helpful} type="light" id="helpful" on:itemDropped={handleDrop} /> -->
				</div>
				<div id="yolo" class="container flex h-full w-1/2 flex-col items-center justify-center">
					<!-- <Bank items={[items1[0]]} type="light" /> -->
					<!-- <div id={currentDragObject.id} class="draggable bg-orange-300 cursor-move h-28 w-28" on:drag={handleDrag} bind:this={currentDragObject.el}> -->
					<img
						src={items1[itemIndex].img}
						alt=""
						class="h-full"
						on:drag={handleDrag}
						id="draggable"
						on:dragend={handleDrop}
						bind:this={currentDragObject.el} />
					<!-- </div> -->
				</div>
				<div
					id=""
					class="container flex h-full w-full  flex-col items-center justify-center rounded-sm p-2 text-center text-2xl text-white"
					on:dragover={() => handleContainerDragover('harmful')}
					on:drop={handleDrop}>
					<p class="mb-3 rounded-lg bg-teal-600 px-4 py-2 text-4xl" bind:this={harmfulElement}>
						Harmful
					</p>
					<!-- <Bank items={hurtful} type="light" id="harmful" on:itemDropped={handleDrop} /> -->
				</div>
			</div>
		{/if}
	</div>
</Tablet>
