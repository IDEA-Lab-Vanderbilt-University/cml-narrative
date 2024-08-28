<script lang="ts">
	import { NavigationDirection } from '$lib/types/Enums';
	/**
	 * TODO: Add check to determine if there is a next or previous line in the script and
	 * conditionally show arrows
	 */
	import type { Line } from '$lib/types/Script';
	import { defaultSettings, type Settings } from '$lib/types/Settings';
	import { settingsStore } from '$lib/utils/stores/store';
	import typewriter from '$lib/utils/typewriter';

	import { createEventDispatcher } from 'svelte';
	import DialogBoxAvatar from './DialogBoxAvatar.svelte';
	const dispatch = createEventDispatcher();

	export let line: Line;

	let settings: Settings = defaultSettings;
	
	settingsStore.subscribe(value => {
		settings = value;
	});

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
				currentTypewriter = typewriter(dialogueParagraph, line.dialog, settings.textPeriod ?? defaultSettings.textPeriod, 0, () => {
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
						<DialogBoxAvatar avatar={avatar} speaker={line.speakers[i]} avatarClass=".relative .-bottom-9 .z-20" />
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
			<DialogBoxAvatar avatar={line.avatars[0]} speaker={line.speakers[0]}/>
		{:else if line.pos == 'left'}
			<DialogBoxAvatar avatar={line.avatars[0]} speaker={line.speakers[0]}/>
			<div class=" bg-peach relative -bottom-4 z-20 h-fit w-fit rounded px-3 text-3xl text-black">
				{line.speakers[0]}
			</div>
		{/if}
	</div>

	<div id="textbox" class="bg-jet relative flex w-full items-center justify-center rounded p-4 text-white">
		<div class="w-full grid grid-cols-5 items-center justify-center gap-8 align-middle">
			<button class="mr-6 rotate-180 backbutton" on:click={back}>
				<img src="/img/svg/dialog-arrow.svg" alt="Go Back" class="h-14 w-14" draggable="false" />
			</button>
			<p bind:this={dialogueParagraph} class="col-span-3 mt-auto w-full h-full leading-relaxed {settings.fontSize ?? defaultSettings.fontSize}">
				{line.dialog}
			</p>
			<button class="forwardbutton" on:click={forward}>
				<img src="/img/svg/dialog-arrow.svg" alt="Go Forward" class="h-14 w-14" draggable="false"  />
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

	#textbox {
		height: fit-content;
  		min-height: 9rem;
	}
</style>