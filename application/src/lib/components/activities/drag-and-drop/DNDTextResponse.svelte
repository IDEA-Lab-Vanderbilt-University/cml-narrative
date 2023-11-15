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
	import { ModeValues } from '@zxing/library/esm/core/qrcode/decoder/Mode';
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

	export let response: string = '';

	const speechToText = () => {};

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
		>Voice</button>
</div>
