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

	export let showNext: boolean = true;
	export let showBack: boolean = false;

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
				if(showNext) forward();
				break;
			case 'ArrowLeft':
				if(showBack) back();
				break;
			default:
				break;
		}
	};

</script>

<svelte:window on:keydown|preventDefault={handleKeydownEvent} />

<div id="dialogueroot" class="flex flex-col items-center justify-end">
	<div class="davatar">
			<DialogBoxAvatar avatar={line.avatars[0]} speaker={line.speakers[0]} size={line.size} extraStyle={"height: 35vh; max-height:18vw; max-width: fit-content;"} avatarClass={""} />
	</div>

	<div class="nametag relative z-20 rounded px-3 text-3xl text-black">
		{line.speakers[0]}
	</div>

	{#if getLineDialog(line)}
		<div id="textbox" class="relative flex items-center justify-center rounded p-4 text-white">
			<p bind:this={dialogueParagraph} class="w-full h-full text-2xl">
				{getLineDialog(line)}
			</p>

			{#if showBack}
				<button class="backButton" on:click={back}>
					<img src="/img/misc/vroomnext.png" alt="Next" style="transform: scaleX(-1);" />
				</button>
			{/if}

			{#if showNext}
				<button class="nextButton" on:click={forward}>
					<img src="/img/misc/vroomnext.png" alt="Next" />
				</button>
			{/if}
		</div>
	{/if}

</div>

<style>
	.nextButton, .backButton {
        position: absolute;
        bottom: 0;
        margin: 1rem;
        transition: transform 0.2s ease-in-out;
    }

	.nextButton {
        right: 0;
	}

	.backButton {
		left: 0;
	}

    .nextButton img, .backButton img {
        height: 5vh;
    }


    .nextButton:hover {
        transform: scale(1.1) translateX(-1vw);
    }

    .nextButton:active {
        transform: scale(0.9) translateX(3vw);
    }

	.backButton:hover {
        transform: scale(1.1) translateX(1vw);
    }

	.backButton:active {
        transform: scale(0.9) translateX(-3vw);
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
		z-index: 10;
		position: relative;
		top: 3vh;
	}

	.nametag {
		width: fit-content;
		background-color: gray;
		position: relative;
		top: 2vh;
		padding: 0 3vw;
	}

	#textbox {
		min-height: 60vh;
		border: 1vh solid rgb(245, 221, 248);
		border-radius: 10px;
		z-index: 15;
		background-color: rgba(0, 0, 0, 0.5);
		padding-bottom: 15vh;
	}

</style>