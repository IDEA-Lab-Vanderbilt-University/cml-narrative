<!--
 /src/routes/introduction/onboarding/bot-buddy/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 14th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { goto } from '$app/navigation';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import type { UserProgress } from '$lib/types/UserData.js';
	import DataService from '$lib/utils/DataService/index.js';
	import { userDataStore } from '$lib/utils/stores/store.js';

	import { fade } from 'svelte/transition';

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
				handleNavigation(NavigationDirection.forward);
				break;
			case 'ArrowLeft':
				handleNavigation(NavigationDirection.backward);
			default:
				break;
		}
	};

	const getUpdatedProgress = ():UserProgress => {
		return {
			level: 0,
			levelLabel: 'level-zero',
			subLevel: 1,
			subLevelLabel: '/training?page=1',
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
			if (line.id == 23) {
				let progress = getUpdatedProgress();
				await DataService.Data.updateUserProgress(progress);
				updateLocalProgress(progress)
				goto('/training?page=1');
			} else {
				goto(`/introduction/bot-buddy?page=${line.id + 1}`);
			}
		} else if (direction == NavigationDirection.backward && line.id > 1) {
			goto(`/introduction/bot-buddy?page=${line.id - 1}`);
		}
	};
</script>

<svelte:window on:keydown={handleKeydownEvent} />

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
		<DialogBox {line} on:dialogEvent={handleDialogEvent} />
	</div>
	<div slot="content" class="h-full w-full">
		{#if line.id == 15}
			<div class="h-full w-full">
				<img src="/img/svg/explosion.svg" alt="" class="h-full w-full" in:fade />
			</div>
		{/if}
	</div>
</Scene>
