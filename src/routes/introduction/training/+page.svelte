<!--
 /src/routes/training/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 16th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import ProjectorView from '$lib/components/scene/ProjectorView.svelte';
	import { fade, fly } from 'svelte/transition';

	import { goto } from '$app/navigation';
	import Scene from '$lib/components/scene/Scene.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import Technology from '$lib/components/sequences/training/Technology.svelte';
	import Training2 from '$lib/components/sequences/training/Training2.svelte';
	import TrainingText from '$lib/components/sequences/training/TrainingText.svelte';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import BadgeGetModal from '$lib/components/modals/BadgeGetModal.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
	import { studentProgressStore } from '$lib/utils/stores/store.js';
	import { BadgesByName } from '$lib/utils/Assets/Badges';

	export let data;

	let line: Line;

	
	/**
	 * We declared the line variable above. This variable is "reactive" and will change on
	 * each goto() call (implemented in handleDialogEvent()) as script data is returned
	 * from the "server".
	 *
	 * Because the page doesn't "reload" like normal, (due to the way SvelteKit handles
	 * navigation and hydrates data on the page), when line data is changed, Svelte doesn't
	 * know the data has changed to update the DOM. We tell Svelte using the $: syntax that
	 * line is a reactive element and will change in the future.
	 *
	 * This solution was inspired by the following thread on StackOverflow:
	 * https://stackoverflow.com/questions/74221733/sveltekit-call-load-function-in-page-server-when-params-change
	 */
	$: line = data.line;
	$: lineNumber = data.lineNumber;
	
	let shouldDarken: boolean = lineNumber > 4 && lineNumber < 7;

	$: {
		if (lineNumber > 4 && lineNumber < 7) {
			shouldDarken = true;
		} else {
			shouldDarken = false;
		}
	}

	console.log('DATA: ', data);

	/**
	 * Handles an emitted dialogEvent as sent from a DialogControl component and progresses the script as such
	 * @param event can be destructured to obtain which way the dialog in a script should progress
	 */
	const handleDialogEvent = async (event: any) => {
		var state: NavigationDirection = event.detail.state;

		handleNavigation(state);
	};

	/**
	 * Determine the state of the DialogEvent that was emitted. Then, we will navigate
	 * the user to the appropriate url with appropriate querystring which represents
	 * which line in the script should be returned to the user.
	 */
	const handleNavigation = (direction: NavigationDirection) => {
		let target = '';
		if (direction == NavigationDirection.forward) {
			if (lineNumber == 8) {
				target = '/activities/what-do-you-think-an-algorithm-is';
			} else if (lineNumber == 11) {
				target = '/activities/what-do-you-think-machine-learning-is';
			} else if (lineNumber == 12) {
				target = '/introduction/training/post-survey';
			} else if (lineNumber == 15) {
				target = '/introduction/training/outro?page=1';
			} else {
				target = `/introduction/training?page=${lineNumber + 1}`;
			}
		} else if (direction == NavigationDirection.backward) {
			if (lineNumber == 1) {
				target = '/introduction/bot-buddy?page=23';
			} else {
				if(lineNumber == 9 || lineNumber == 12 || lineNumber == 13) {
					return;
				}
				target = `/introduction/training?page=${lineNumber - 1}`;
			}
		}

		if (target) {
			studentProgressStore.update((data) => {
				data.last_visited = target;
				return data;
			});
			goto(target);
		}
	};
</script>

<Scene background="/img/backgrounds/Spark_Lab.jpg" darken={shouldDarken} audio={line.audio}>
	<div class={`h-full w-full ${shouldDarken ? 'brightness-40' : ''}`} slot="content">
		{#if lineNumber == 12}
			<TabletButton pulse on:click={() => {goto("/introduction/training/post-survey")}} />
		{/if}
		{#if lineNumber < 12}
			<ProjectorView>
				{#if lineNumber == 1 || lineNumber == 2}
					<Technology />
				{:else if lineNumber == 3}
					<Training2 />
				{:else if lineNumber >= 4 && lineNumber <= 9}
					<TrainingText>
						<p class="text-center text-5xl font-bold">Algorithms</p>
					</TrainingText>
				{:else if lineNumber == 10 || lineNumber == 11}
					<TrainingText>
						<p class="text-center text-5xl font-bold">Machine Learning</p>
					</TrainingText>
				{/if}
			</ProjectorView>
		{:else if lineNumber == 15}
			<BadgeGetModal handleClick={handleNavigation.bind(null, NavigationDirection.forward)} badge={BadgesByName['Agent-In-Training']} />
		{:else}
			<div class="" />
		{/if}
	</div>
	<div class="w-full" slot="dialog">
		{#if lineNumber != 15}
			<DialogBox {line} on:dialogEvent={handleDialogEvent} />
		{/if}
	</div>
</Scene>

<style>
	.centered {
		text-align: center;
	}
</style>