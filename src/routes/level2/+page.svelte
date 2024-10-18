<script lang="ts">
	import { goto } from '$app/navigation';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import type { UserProgress } from '$lib/types/UserData.js';
	import DataService from '$lib/utils/DataService/index.js';
	import { userDataStore } from '$lib/utils/stores/store.js';
	import { createEventDispatcher } from 'svelte';
	import script from '$lib/scripts/level2/index.js';

	export let data;

	let line: Line;

	$: line = data.line;

	/**
	 * Handles an emitted dialogEvent as sent from a DialogControl component and progresses the script as such
	 * @param event can be destructured to obtain which way the dialog in a script should progress
	 */
	const handleDialogEvent = async (event: any) => {
		var state: NavigationDirection = event.detail.state;

		handleNavigation(state);
	};

	const getUpdatedProgress = ():UserProgress => {
		return {
			level: 0,
			levelLabel: 'level-one',
			subLevel: 0,
			subLevelLabel: '/level1?page=1',
			lastUpdated: new Date()
		};
	}

	const updateLocalProgress = (progress: UserProgress) => {
		userDataStore.update((data) => {
			data.progress = progress;
			return data;
		})
	}

	/**
	 * Determine the state of the DialogEvent that was emitted. Then, we will navigate
	 * the user to the appropriate url with appropriate querystring which represents
	 * which line in the script should be returned to the user.
	 */
	const handleNavigation = async (direction: NavigationDirection) => {
		if (direction == NavigationDirection.forward) {
			if (line.id == script.lines.length) {
				let progress = getUpdatedProgress();
				await DataService.Data.updateUserProgress(progress);
				updateLocalProgress(progress)
				
                // Next level
                goto('/level2/car-training?page=1');
			} else {
				goto(`/level2?page=${line.id + 1}`);
			}
		} else if (direction == NavigationDirection.backward) {
			if(line.id > 1) {
				goto(`/level2?page=${line.id - 1}`);
			} else {
				goto('/level1/outro?page=14');
			}
		}
	};

	let content: HTMLElement | void;
</script>

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
		<DialogBox {line} on:dialogEvent={handleDialogEvent} />
	</div>
	<div slot="content" class="h-full w-full"  bind:this={content}>
		<TabletButton on:click={() => { 
			const event  = new CustomEvent('showTablet', {
				bubbles: true
			});
			
			content?.dispatchEvent(event);
		}} />

		{#if line.id == 2}
		<div id="spinring">
			{line.dialog}
		</div>
		{/if}

		{#if line.id == 17 || line.id == 20}
		<div id="carscanner">
			<img src="/img/misc/scanprompt.png" alt={line.dialog}>
		</div>
		{/if}

		{#if line.id == 18 || line.id == 19 || line.id == 21}
		<div id="carscanner">
			<img src="/img/misc/scanfailed.png" alt={line.dialog}>
		</div>
		{/if}
	</div>
</Scene>

<style>
	#spinring::before {
		content: '';
		background: url('/img/misc/spinring.png');
		width: 70vh;
		height: 70vh;
		animation: spin 2s linear infinite;
		background-size: contain;
		position: absolute;
		left: calc(50% - 35vh);
		top: calc(50% - 35vh);
		z-index: -1;
	}

	#spinring {
		width: 45vh;
		text-align: center;
		vertical-align: middle;
		font-size: 4vh;
		color: mediumspringgreen;
		text-transform: uppercase;
		position: absolute;
		left: calc(50% - 22.5vh);
		top: calc(50% - 22.5vh);
	}

	#carscanner {
		width: 45vh;
		text-align: center;
		vertical-align: middle;
		font-size: 4vh;
		color: yellow;
		text-transform: uppercase;
		position: absolute;
		left: calc(50% - 22.5vh);
		top: calc(50% - 22.5vh);
	}

	@keyframes spin {
		0% { transform: rotate(0deg); }
		25% { transform: rotate(90deg); }
		75% { transform: rotate(-270deg); }
		100% { transform: rotate(0deg); }
	}

</style>