<!--
 /src/lib/components/dialog/SlimDialogBox.svelte
 SlimDialogBox.svelte
 cml-narrative
 
 Created by Ian Thompson on January 16th 2023
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

	import { createEventDispatcher } from 'svelte';
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
</script>

<div class="flex w-full flex-col">
	<div class="relative z-20 flex w-full items-end justify-between align-bottom">
		<div class=" bg-peach relative -bottom-4 z-20 h-fit w-fit rounded px-3 text-4xl text-black">
			{speaker}
		</div>
		<div class="mr-14 self-end">
			<img src={avatar} alt="" />
		</div>
	</div>

	<div class="bg-jet relative w-full rounded text-white ">
		<div class="grid grid-cols-5 items-center gap-4 align-middle text-3xl">
			<button class="mr-6 rotate-180" on:click={back}>
				<p
					class="bg-peach w-fit rounded-full p-4 transition-all duration-200 ease-in-out hover:opacity-80">
					➜
				</p>
			</button>
			<p class="col-span-3 h-36 w-full text-2xl leading-relaxed ">
				{dialog}
			</p>
			<button class="" on:click={forward}>
				<p
					class="bg-peach w-fit rounded-full p-4 transition-all duration-200 ease-in-out hover:opacity-80">
					➜
				</p>
			</button>
		</div>
	</div>
</div>
