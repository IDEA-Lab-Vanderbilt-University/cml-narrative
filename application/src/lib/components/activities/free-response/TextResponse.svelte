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

	// /**
	//  * The id attribute is used for when we save data to the backend.
	//  */
	// export let id: string;

	/**
	 * The prompted technology for which you want the user to respond to.
	 * For now, this is just AI and ML as responses.
	 */
	export let promptedTechnology: string;

	let dispatch = createEventDispatcher();

	export let response: string = '';

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
		class="textarea-bordered textarea  mx-12 mt-9 h-1/2 w-full border-4 border-dashed border-white bg-transparent text-xl"
		placeholder={`I think ${promptedTechnology.toLowerCase()} is....`}
		bind:value={response} />
	<button
		href="/activities/draw-an-algorithm"
		class="bg-lapiz-blue mt-9 rounded-md px-8 text-xl text-white"
		on:click={handleSubmit}>Next</button>
</div>
