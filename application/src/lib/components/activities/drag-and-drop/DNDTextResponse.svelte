<!--
 /src/lib/components/activities/free-response/TextResponse.svelte
 TextResponse.svelte
 cml-narrative
 
 Created by Ian Thompson on July 19th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import DataService from '$lib/utils/DataService';
	import { createEventDispatcher } from 'svelte';
	import { harmfulHelpfulStore } from '$lib/utils/stores/store';
	// /**
	//  * The id attribute is used for when we save data to the backend.
	//  */
	// export let id: string;

	/**
	 * The prompted technology for which you want the user to respond to.
	 * For now, this is just AI and ML as responses.
	 */
	// export let promptedTechnology: string;
	export let harmfulProp: any;

	let dispatch = createEventDispatcher();
	let recognition: any;

	export let response: string = '';

	const speechToText = () => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		const recognition = new SpeechRecognition();
		recognition.lang = 'en-US';
		recognition.start();

		let finalTranscript = '';
		recognition.onresult = (event) => {
			let interimTranscript = '';
			for (let i = event.resultIndex; i < event.results.length; i++) {
				let transcript = event.results[i][0].transcript;
				if (event.results[i].isFinal) {
					finalTranscript += transcript;
				} else {
					interimTranscript += transcript;
				}
			}
			response = finalTranscript;
		};

		recognition.onerror = (event) => {
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

	const handleSubmit = async () => {
		console.log(response);
		// store command
		harmfulHelpfulStore.update((value) => {
			let currentReasoning = [
				{
					title: harmfulProp.title,
					id: harmfulProp.id,
					itemId: harmfulProp.itemId,
					type: harmfulProp.type,
					reasonText: response,
					reasonVideo: ''
				}
			];
			value.reasoning.push(currentReasoning);
			return value;
		});

		let demoObject: any = {};
		harmfulHelpfulStore.subscribe((value) => {
			demoObject = value;
		});
		console.log('demo: ', demoObject);
		response = '';
		dispatch('textDone');
	};
</script>

<div
	class="flex h-full w-full flex-col items-center justify-center rounded-md bg-gray-900 bg-opacity-50 p-5 font-mono text-white bg-blend-darken">
	<!-- <h1 class="text-4xl font-bold">What do you think {promptedTechnology} is?</h1> -->
	<h1 class="text-4xl font-bold">Why do you think {harmfulProp.title} is {harmfulProp.type}?</h1>
	<p class="mt-4 text-xl italic">In the box below, describe why your reasoning.</p>
	<textarea
		class="textarea-bordered textarea  mx-12 mt-9 h-1/2 w-full border-4 border-dashed border-white bg-transparent text-xl"
		placeholder={`I think ${harmfulProp.title} is ${harmfulProp.type} because...`}
		bind:value={response} />
	<button class="bg-lapiz-blue mt-9 rounded-md px-8 text-xl text-white" on:click={handleSubmit}
		>Next</button>
	<button class="bg-lapiz-blue mt-9 rounded-md px-8 text-xl text-white" on:click={speechToText}
		>Start Recording</button>
	<button class="mt-9 rounded-md bg-red-500 px-8 text-xl text-white" on:click={stopRecording}
		>Stop Recording</button>
</div>
