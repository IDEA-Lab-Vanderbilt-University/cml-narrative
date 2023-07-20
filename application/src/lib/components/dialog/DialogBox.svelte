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

	export let line: Line;

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

	let flip: boolean = false;

	$: {
		console.log(line);

		flip = line.id % 3 == 0;
	}
</script>

<div class="flex w-full flex-col px-4">
	<div class="relative z-20 flex w-full items-end justify-between align-bottom">
		{#if flip}
			<div class="mr-14 -scale-x-100 self-end">
				<img src={line.avatar} alt="" />
			</div>
			<div class=" bg-peach relative -bottom-4 z-20 h-fit w-fit rounded px-3 text-4xl text-black">
				{line.speaker}
			</div>
		{:else}
			<div class=" bg-peach relative -bottom-4 z-20 h-fit w-fit rounded px-3 text-3xl text-black">
				{line.speaker}
			</div>
			<div class="mr-14 self-end">
				<img src={line.avatar} alt="" />
			</div>
		{/if}
	</div>

	<div class="bg-jet relative flex h-36 w-full items-center justify-center rounded p-4 text-white">
		<div class="grid grid-cols-5 items-center justify-center gap-8 align-middle text-3xl">
			<button class="mr-6 rotate-180" on:click={back}>
				<img src="/img/svg/dialog-arrow.svg" alt="" class="h-14 w-14" />
				<!-- <p class="bg-peach w-fit p-4 rounded-full hover:opacity-80 transition-all ease-in-out duration-200">➜</p> -->
			</button>
			<p class="col-span-3 mt-auto w-full text-2xl leading-relaxed  ">
				{line.dialog}
			</p>
			<button class="" on:click={forward}>
				<img src="/img/svg/dialog-arrow.svg" alt="" class="h-14 w-14" />
				<!-- <p class="bg-peach w-fit p-4 rounded-full hover:opacity-80 transition-all ease-in-out duration-200">➜</p> -->
			</button>
		</div>
	</div>
</div>
