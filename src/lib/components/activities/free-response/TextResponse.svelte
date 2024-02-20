<script lang="ts">
	import DataService from '$lib/utils/DataService';
	import { createEventDispatcher } from 'svelte';

	// /**
	//  * The id attribute is used for when we save data to the backend.
	//  */
	// export let id: string;

	/**
	 * The prompted technology for which you want the user to respond to.
	 * For now, this is just AI and ML as responses.
	 */

	let dispatch = createEventDispatcher();

	export let promptedTechnology: string;
	export let response: string = '';

	let isRecording = false;
	let recognition: any;

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
		console.log(5);

		dispatch('submitClicked');
	};
</script>

<div
	class="flex h-full w-full flex-col items-center justify-center rounded-md bg-gray-900 bg-opacity-50 p-5 font-mono text-white bg-blend-darken">
	<h1 class="text-4xl font-bold">What do you think {promptedTechnology} is?</h1>
	<p class="mt-4 text-xl italic">
		In the box below, describe what you think {promptedTechnology} is.
	</p>
	<textarea
		class="textarea textarea-bordered  mx-12 mt-9 h-1/2 w-full border-4 border-dashed border-white bg-transparent text-xl"
		placeholder={`I think ${promptedTechnology.toLowerCase()} is....`}
		bind:value={response} />
	<button
		class="mt-9 rounded-md px-8 text-xl text-white {isRecording
			? 'animate-pulse bg-red-500'
			: 'bg-lapiz-blue'}"
		on:click={toggleRecording}>
		{isRecording ? 'Stop Recording' : 'Start Recording'}
	</button>
	<button class="mt-9 rounded-md bg-lapiz-blue px-8 text-xl text-white" on:click={handleSubmit}
		>Next</button>
</div>
