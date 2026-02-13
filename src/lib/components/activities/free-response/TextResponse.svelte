<script lang="ts">
	import { browser } from '$app/environment';
	import AudioPlayer from '$lib/components/audio/AudioPlayer.svelte';
	import DataService from '$lib/utils/DataService';
	import { createEventDispatcher, onMount } from 'svelte';

	// /**
	//  * The id attribute is used for when we save data to the backend.
	//  */
	// export let id: string;

	/**
	 * The prompted technology for which you want the user to respond to.
	 * For now, this is just AI and ML as responses.
	 */

	let dispatch = createEventDispatcher();

	export let promptedTechnology: string | undefined = undefined;
	export let response: string = '';

	let isRecording = false;
	let recognition: any;

	const beforeSubmit = () => {
		if (response.trim() === '') {
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
		recognition.interimResults = true;
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

	export let title: string | undefined = undefined;
	export let prompt: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;

	let canRecord = false;

	onMount(() => {
		if (browser) {
			if (window.SpeechRecognition || window.webkitSpeechRecognition) {
				canRecord = true;
			}
		}
	});

	$: {
		if (title == undefined && promptedTechnology != undefined) {
			title = `What do you think ${promptedTechnology} is?`;
		}
	}

	$: {
		if (prompt == undefined && promptedTechnology != undefined) {
			prompt = `In the box below, describe what you think ${promptedTechnology} is.`;
		}
	}

	$: {
		if (placeholder == undefined && promptedTechnology != undefined) {
			placeholder = `I think ${promptedTechnology.toLowerCase()} is....`;
		}
	}

	let audio = '';

	if (promptedTechnology) {
		if (promptedTechnology.toLowerCase() == 'an algorithm') {
			audio = '/level0/L0-S93.mp3';
		} else if (promptedTechnology.toLowerCase() == 'machine learning') {
			audio = '/level0/L0-S98.mp3';
		}
	}

</script>

<div
	class="flex h-full w-full flex-col items-center justify-center rounded-md bg-gray-900 bg-opacity-50 p-5 font-mono text-white bg-blend-darken">

	{#if audio}
		<AudioPlayer src={audio} />
	{/if}

	<h1 class="font-bold {(title?.length ?? 0) < 100 ? 'text-4xl' : 'text-2xl'}">{title}</h1>
	<p class="mt-4 text-xl italic">
		{prompt}
	</p>
	<textarea
		class="textarea textarea-bordered  mx-12 mt-9 h-1/2 w-full border-4 border-dashed border-white bg-transparent text-xl"
		placeholder={placeholder}
		bind:value={response}
		on:keydown|stopPropagation
		on:keypress|stopPropagation
		on:keyup|stopPropagation
		/>
	{#if isRecording}
		<p class="mt-9 text-xl italic">Recording...</p>
	{/if}
	{#if canRecord}
		<button
			class="mt-9 rounded-md px-8 text-xl text-white {isRecording
				? 'animate-pulse bg-red-500'
				: 'bg-lapiz-blue'}"
			on:click={toggleRecording}>
			{#if isRecording}
				<svg
					class="my-2 mr-2 inline-block h-6 w-6 fill-white"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 640 512"
					><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
						d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L472.1 344.7c15.2-26 23.9-56.3 23.9-88.7V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 21.2-5.1 41.1-14.2 58.7L416 300.8V96c0-53-43-96-96-96s-96 43-96 96v54.3L38.8 5.1zm362.5 407l-43.1-33.9C346.1 382 333.3 384 320 384c-70.7 0-128-57.3-128-128v-8.7L144.7 210c-.5 1.9-.7 3.9-.7 6v40c0 89.1 66.2 162.7 152 174.4V464H248c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H344V430.4c20.4-2.8 39.7-9.1 57.3-18.2z" /></svg>
				<span class="inline-block">Stop Recording</span>
			{:else}
				<svg
					class="my-2 mr-2 inline-block h-6 w-6 fill-white"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 384 512"
					><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
						d="M192 0C139 0 96 43 96 96V256c0 53 43 96 96 96s96-43 96-96V96c0-53-43-96-96-96zM64 216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 89.1 66.2 162.7 152 174.4V464H120c-13.3 0-24 10.7-24 24s10.7 24 24 24h72 72c13.3 0 24-10.7 24-24s-10.7-24-24-24H216V430.4c85.8-11.7 152-85.3 152-174.4V216c0-13.3-10.7-24-24-24s-24 10.7-24 24v40c0 70.7-57.3 128-128 128s-128-57.3-128-128V216z" /></svg>
				<span class="inline-block">Start Recording</span>
			{/if}
			<!-- {isRecording ? 'Stop Recording' : 'Start Recording'} -->
		</button>
	{/if}
	<button class="mt-9 rounded-md bg-lapiz-blue px-8 text-xl text-white" on:click={beforeSubmit}
		>Next</button>
</div>
