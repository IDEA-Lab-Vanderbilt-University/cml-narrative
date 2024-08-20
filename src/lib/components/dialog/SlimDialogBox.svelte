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
	import typewriter from '$lib/utils/typewriter';

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	export let line: Line;

	let dialogueParagraph: HTMLParagraphElement;

	var currentTypewriter: NodeJS.Timer;
	var lockNavigation: boolean = true;

	$:{ 
		if(dialogueParagraph != undefined) {
			if (currentTypewriter != undefined) {
				clearInterval(currentTypewriter);
			}

			if(line != undefined && line.dialog != undefined && line.dialog.length > 0) {
				lockNavigation = true;
				currentTypewriter = typewriter(dialogueParagraph, line.dialog, 10, 0, () => {
					lockNavigation = false;
				});
			} else {
				lockNavigation = false;
			}
		}
	}

	const back = () => {
		if (lockNavigation) return;

		dispatch('dialogEvent', {
			state: NavigationDirection.backward
		});
	};

	/** Dispatch the forward dialogEvent */
	const forward = () => {
		if (lockNavigation) return;

		dispatch('dialogEvent', {
			state: NavigationDirection.forward
		});
	};

	/**
	 * Check the keycode that has been emitted from a Keydown Event on the Window to determine how we should navigate the user
	 * through the scene.
	 *
	 * Event keys were found by using the following site below:
	 *
	 * https://www.toptal.com/developers/keycode
	 *
	 * @param event Keyboard Event emitted from  the Window
	 *
	 */
	 const handleKeydownEvent = (event: KeyboardEvent) => {
		switch (event.key) {
			case 'ArrowRight':
			case ' ':
				forward();
				break;
			case 'ArrowLeft':
				back();
			default:
				break;
		}
	};
</script>

<svelte:window on:keydown|preventDefault={handleKeydownEvent} />

<div class="flex w-full flex-col px-4">
	<div class="relative z-20 flex w-full items-end justify-between align-bottom">
		{#if line.avatars.length > 1}
			<div class="flex w-full items-end justify-between align-bottom">
				{#each line.avatars as avatar, i}
					<div class="mr-14 self-end">
						<img class="relative -bottom-9 z-20 " src={avatar} alt="" />
						{#if line.speakers[i]}
							<div
								class="bg-peach relative -bottom-4 -right-5 z-20 h-fit w-fit rounded px-3 text-3xl text-black">
								{line.speakers[i]}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{:else if line.pos == 'right'}
			<div class=" bg-peach relative -bottom-4 z-20 h-fit w-fit rounded px-3 text-3xl text-black">
				{line.speakers[0]}
			</div>
			<div class="mr-14 self-end">
				<img src={line.avatars[0]} alt="" />
			</div>
		{:else if line.pos == 'left'}
			<div class="mr-14 self-end">
				<img src={line.avatars[0]} alt="" />
			</div>
			<div class=" bg-peach relative -bottom-4 z-20 h-fit w-fit rounded px-3 text-3xl text-black">
				{line.speakers[0]}
			</div>
		{/if}
	</div>

	<div class="bg-jet relative flex h-36 w-full items-center justify-center rounded p-4 text-white">
		<div class="w-full grid grid-cols-5 items-center justify-center gap-8 align-middle text-3xl">
			<button class="mr-6 rotate-180 backbutton" on:click={back}>
				<img src="/img/svg/dialog-arrow.svg" alt="" class="h-14 w-14" />
			</button>
			<p class="col-span-3 mt-auto w-full h-full text-2xl leading-relaxed" bind:this={dialogueParagraph}>
				{line.dialog}
			</p>
			<button class="forwardbutton" on:click={forward}>
				<img src="/img/svg/dialog-arrow.svg" alt="" class="h-14 w-14" />
			</button>
		</div>
	</div>
</div>


<style>
	
	.backbutton {
		transition: transform 0.2s;
	}

	.backbutton:hover {
		transform: scale(-1.1) translateX(15px);
	}

	.backbutton:active {
		transform: scale(-1.2) translateX(25px);
	}

	.forwardbutton {
		transition: transform 0.2s;
	}

	.forwardbutton:hover {
		transform: scale(1.1) translateX(15px);
	}

	.forwardbutton:active {
		transform: scale(1.2) translateX(25px);
	}

</style>