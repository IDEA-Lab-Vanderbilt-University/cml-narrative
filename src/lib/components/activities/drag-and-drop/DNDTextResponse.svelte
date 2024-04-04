<script lang="ts">
	import DataService from '$lib/utils/DataService';
	import { createEventDispatcher } from 'svelte';
	import { dragItemsStore, harmfulHelpfulStore } from '$lib/utils/stores/store';
	import type { DragStackItem, Reasoning } from '$lib/types/DragDropItem';

	export let currentDragObject: DragStackItem;
	export let response: string = '';

	let dispatch = createEventDispatcher();
	let isRecording = false;
	let recognition: any;

	const beforeSubmit = () => {
		if (response === '') {
			alert('Please provide a response');
			return;
		} else {
			handleSubmit();
		}
	};

	const speechToText = () => {
		// @ts-ignore
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		recognition = new SpeechRecognition();
		recognition.lang = 'en-US';
		recognition.continuous = true;
		recognition.start();

		let finalTranscript = response;
		recognition.onresult = (event: any) => {
			let interimTranscript = '';
			for (let i = event.resultIndex; i < event.results.length; i++) {
				let transcript = event.results[i][0].transcript;
				if (event.results[i].isFinal) {
					finalTranscript += ' ' + transcript;
				} else {
					interimTranscript += transcript;
				}
			}
			response = finalTranscript;
		};

		recognition.onerror = (event: any) => {
			console.error(event);
		};

		recognition.onend = () => {
			console.log('Speech recognition ended.');
		};
	};

	const stopRecording = () => {
		if (recognition) {
			recognition.stop();
		}
	};

	function toggleRecording() {
		isRecording = !isRecording;
		isRecording ? speechToText() : stopRecording();
	}

	const handleSubmit = async () => {
		console.log(response);
		// store command
		// harmfulHelpfulStore.update((value) => {
		// 	value.reasoning.push({
		// 		id: currentDragObject.id,
		// 		type: currentDragObject.type,
		// 		reasonText: response,
		// 		reasonVideo: ''
		// 	});
		// 	return value;
		// });

		let data: Reasoning = { reasonText: response, reasonVideo: '' };
		dragItemsStore.update((items) => {
			items[0].reasoning = data;
			// console.log('handlesubmit lo ', items);
			return items;
		});

		// update the harmfulHelpfulStore

		response = '';
		dispatch('textDone');
	};
</script>

<div
	class="flex h-full w-full flex-col items-center justify-center rounded-md bg-gray-900 bg-opacity-50 p-5 font-mono text-white bg-blend-darken">
	<!-- <h1 class="text-4xl font-bold">What do you think {promptedTechnology} is?</h1> -->
	<h1 class="text-4xl font-bold">
		Why do you think {currentDragObject.title} is {currentDragObject.type}?
	</h1>
	<p class="mt-4 text-xl italic">In the box below, describe why your reasoning.</p>
	<textarea
		class="textarea textarea-bordered  mx-12 mt-9 h-1/2 w-full border-4 border-dashed border-white bg-transparent text-xl"
		placeholder={`I think ${currentDragObject.title} is ${currentDragObject.type} because...`}
		bind:value={response} />
	{#if isRecording}
		<p class="mt-9 text-xl italic">Recording...</p>
	{/if}

	<button
		class="mt-9 rounded-md px-8 text-xl text-white {isRecording
			? 'animate-pulse bg-red-500'
			: 'bg-lapiz-blue'}"
		on:click={toggleRecording}>
		{isRecording ? 'Stop Recording' : 'Start Recording'}
	</button>
	<button class="mt-9 rounded-md bg-lapiz-blue px-8 text-xl text-white" on:click={beforeSubmit}
		>Next</button>
</div>
