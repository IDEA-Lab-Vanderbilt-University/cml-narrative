<script lang="ts">
	import DialogBoxAvatar from '$lib/components/dialog/DialogBoxAvatar.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	/**
	 * TODO: Add check to determine if there is a next or previous line in the script and
	 * conditionally show arrows
	 */
	import type { Line } from '$lib/types/Script';
	import { defaultSettings, type Settings } from '$lib/types/Settings';
	import { settingsStore, tabletModalActive } from '$lib/utils/stores/store';
	import { getLineDialog } from '$lib/utils/getLineDialog';
	import typewriter from '$lib/utils/typewriter';

	import { createEventDispatcher } from 'svelte';
	
	const dispatch = createEventDispatcher();

	export let line: Line;

	let settings: Settings = defaultSettings;
	
	settingsStore.subscribe(value => {
		settings = value;
	});

	let dialogueParagraph: HTMLParagraphElement;

	var currentTypewriter: NodeJS.Timer;
	var isTyping: boolean = true;
	var tabletUp: boolean = false;
	var navigationLocked: boolean = false;

	$:{ 
		if(dialogueParagraph != undefined) {
			
			if (currentTypewriter != undefined) {
				clearInterval(currentTypewriter);
			}

			const dialogText = getLineDialog(line);
			if(dialogText && dialogText.length > 0) {
				isTyping = true;
				currentTypewriter = typewriter(dialogueParagraph, dialogText, Number.parseInt((settings.textPeriod ?? defaultSettings.textPeriod).toString()), 0, () => {
					isTyping = false;
				});
			} else {
				isTyping = false;
			}
		}
	}

	tabletModalActive.subscribe(value => {
		tabletUp = value;
	});

	$:{ 
		if(isTyping || tabletUp) {
			navigationLocked = true;
		} else {
			navigationLocked = false;
		}
	}

	const back = () => {
		if (navigationLocked) return;

		dispatch('dialogEvent', {
			state: NavigationDirection.backward
		});
	};

	/** Dispatch the forward dialogEvent */
	const forward = () => {
		if (navigationLocked) return;

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

<div id="dialogueroot" class="bg-jet">
	{#if getLineDialog(line)}
		<div id="textbox" class="relative flex items-center justify-center rounded p-4 text-white">
			<p bind:this={dialogueParagraph} class="w-full h-full {settings.fontSize ?? defaultSettings.fontSize}">
				{getLineDialog(line)}
			</p>
		</div>
	{/if}
	
	<div class="davatar">
			<DialogBoxAvatar avatar={line.avatars[0]} speaker={line.speakers[0]} size={line.size} extraStyle={"width: 20vw; max-width:20vw; max-height: fit-content;"} avatarClass={""} />
	</div>
	

	<div class="nametag relative z-20 rounded px-3 text-3xl text-black">
		{line.speakers[0]}
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

	

	.center {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	#dialogueroot {
		width: 30vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
	}

	.davatar {
		position: absolute;
		left: 50%;
		bottom: -5%;
		transform: translateX(-50%);
		z-index: 10;
	}

	.nametag {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		background-color: gray;
	}

	#textbox {
		margin: 3vw;
		border: 1px solid white;
		border-radius: 10px;
		z-index: 15;
		background-color: rgba(0, 0, 0, 0.5);
	}


</style>