<!--
 /src/lib/components/DialogBox.svelte
 DialogBox.svelte
 cml-narrative
 
 Created by Ian Thompson on September 7th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->


<script lang="ts">
	import type { Line } from '$lib/types/Script';

	// import DialogControl from '$lib/components/DialogControl.svelte';
	
	import { createEventDispatcher } from 'svelte';
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
			state: 'back'
		});
	};

	/** Dispatch the forward dialogEvent */
	const forward = () => {
		dispatch('dialogEvent', {
			state: 'forward'
		});
	};

</script>



<div class="flex flex-col px-4 w-full">
	<div class="flex justify-between align-bottom items-end z-20 relative w-full">
		<div class=" bg-peach w-fit h-fit z-20 rounded text-4xl px-3 text-black relative -bottom-4">
			{speaker}
		</div>
		<div class="self-end mr-14">
			<img src={avatar} alt="">
		</div>
	</div>

	<div class="w-full text-white p-4 rounded relative bg-jet ">
		<div class="grid grid-cols-5 text-3xl">
			<button class="rotate-180" on:click={back}>➜</button>
			<p class="col-span-3 text-3xl leading-relaxed w-full h-36 ">
				{dialog}
			</p>
			<button class="" on:click={forward}>➜</button>
		</div>
	</div>
</div>

