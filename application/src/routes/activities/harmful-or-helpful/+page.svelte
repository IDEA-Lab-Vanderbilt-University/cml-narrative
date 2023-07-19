<!--
 /src/routes/activities/harmful-or-helpful/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 16th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import Bank from '$lib/components/activities/drag-and-drop/Bank.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import Tablet from '$lib/components/tablet/Tablet.svelte';

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

	let items1 = [
		{ id: 1, title: 'iPhone', img: '/img/icons/mobile-app.png' },
		{ id: 2, title: 'Social Media', img: '/img/icons/social-media.png' },
		{ id: 3, title: 'Internet', img: '/img/icons/wifi.png' }
	];

	let designatedContainer: null | string = null;

	let hurtful = [];
	let helpful = [];
	let bothHurtfulAndHelpful = [];

	$: {
		console.log(items1);
	}

	const handleDrop = (e) => {
		console.log('Drop', e.detail);
		console.log(currentDragObject);
		console.log(designatedContainer);

		if (designatedContainer == 'helpful') {
			helpfulElement.classList.add('animate-pulse');
		}

		// let containerToDrop = document.getElementById(designatedContainer)
		// containerToDrop?.appendChild(currentDragObject.el)
		// if (
		// 	e.detail.id == 'harmful' ||
		// 	e.detail.id == 'helpful' ||
		// 	e.detail.id == 'harmfulAndHelpful'
		// ) {
		// 	// if
		// 	// open(ConfirmationModal, {detail: e.detail})
		// }
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

	const handleDrag = (event) => {
		// console.log(event);
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
				<p class="mb-3 text-4xl" bind:this={helpfulElement}>Helpful</p>
				<div id="helpful-bank-container" class="flex items-start" />
				<!-- <Bank items={helpful} type="light" id="helpful" on:itemDropped={handleDrop} /> -->
			</div>
			<div id="yolo" class="container flex h-full w-1/2 flex-col items-center justify-center">
				<!-- <Bank items={[items1[0]]} type="light" /> -->
				<!-- <div id={currentDragObject.id} class="draggable bg-orange-300 cursor-move h-28 w-28" on:drag={handleDrag} bind:this={currentDragObject.el}> -->
				<img
					src={items1[0].img}
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
				class="container flex h-full w-full  flex-col items-center justify-center rounded-sm p-2 text-center text-2xl text-white">
				<p class="mb-3 text-4xl" bind:this={harmfulElement}>Harmful</p>
				<!-- <Bank items={hurtful} type="light" id="harmful" on:itemDropped={handleDrop} /> -->
			</div>
		</div>
	</div>
</Tablet>
