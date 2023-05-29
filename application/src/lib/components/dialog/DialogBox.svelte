<!--
 /src/lib/components/DialogBox.svelte
 DialogBox.svelte
 cml-narrative
 
 Created by Ian Thompson on September 7th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->


<script lang="ts">
	import { NavigationDirection } from '$lib/types/Enums';
	/**
	 * TODO: Add check to determine if there is a next or previous line in the script and 
	 * conditionally show arrows
	*/
	import type { Line } from '$lib/types/Script';

	// import DialogControl from '$lib/components/DialogControl.svelte';
	
	import { createEventDispatcher, onMount } from 'svelte';
	const dispatch = createEventDispatcher();
	
	/** The text of what the speaker should be saying */
	export let dialog = '';
	/** Who is saying the text in the dialog box */
	export let speaker = '';
	/** The path to the img file of the avatar speaking */
	export let avatar = '';

	export let line: Line

	/** Dispatch the back dialogEvent */
	const back = () => {
		dispatch('dialogEvent', {
			state: NavigationDirection.backward
		});
	};

	/** Dispatch the forward dialogEvent */
	const forward = () => {
		dispatch('dialogEvent', {
			state: NavigationDirection.forward
		});
	};


	let flip: boolean = false

	$: {
		console.log(line);
		
		flip = (line.id % 3 == 0)
	}

</script>



<div class="flex flex-col px-4 w-full">
	<div class="flex justify-between align-bottom items-end z-20 relative w-full">
		{#if flip}
			<div class="self-end mr-14 -scale-x-100">
				<img src={line.avatar} alt="">
			</div>
			<div class=" bg-peach w-fit h-fit z-20 rounded text-4xl px-3 text-black relative -bottom-4">
				{line.speaker}
			</div>
		{:else}
			<div class=" bg-peach w-fit h-fit z-20 rounded text-4xl px-3 text-black relative -bottom-4">
				{line.speaker}
			</div>
			<div class="self-end mr-14">
				<img src={line.avatar} alt="">
			</div>
		{/if}

	</div>

	<div class="w-full text-white p-4 rounded relative bg-jet h-36 flex items-center justify-center">
		<div class="grid grid-cols-5 text-3xl gap-8 items-center align-middle justify-center">
			<button class="rotate-180 mr-6" on:click={back}>
				<img src="/img/svg/dialog-arrow.svg" alt="" class="h-14 w-14">
				<!-- <p class="bg-peach w-fit p-4 rounded-full hover:opacity-80 transition-all ease-in-out duration-200">➜</p> -->
			</button>
			<p class="col-span-3 text-3xl leading-relaxed mt-auto w-full  ">
				{line.dialog}
			</p>
			<button class="" on:click={forward}>
				<img src="/img/svg/dialog-arrow.svg" alt="" class="h-14 w-14">
				<!-- <p class="bg-peach w-fit p-4 rounded-full hover:opacity-80 transition-all ease-in-out duration-200">➜</p> -->
			</button>
		</div>
	</div>
</div>

