<!--
 /src/routes/introduction/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 7th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { goto } from '$app/navigation';
	import AudioPlayer, { play } from '$lib/components/audio/AudioPlayer.svelte';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';

	/** @type {import('./$types').PageData} */
	export let data;

	let line: Line;

	let audios = ['a.m4a', 'b.m4a'];

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

	console.log('DATA: ', data);

	/**
	 * Handles an emitted dialogEvent as sent from a DialogControl component and progresses the script as such
	 * @param event can be destructured to obtain which way the dialog in a script should progress
	 */
	const handleDialogEvent = async (event) => {
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

	/**
	 * Determine the state of the DialogEvent that was emitted. Then, we will navigate
	 * the user to the appropriate url with appropriate querystring which represents
	 * which line in the script should be returned to the user.
	 */
	const handleNavigation = (direction: NavigationDirection) => {
		if (direction == NavigationDirection.forward) {
			if (line.id == 3) {
				goto('/introduction/invitation');
			} else if (line.id == 18) {
				goto('/introduction/onboarding');
			} else {
				goto(`/introduction?page=${line.id + 1}`);
			}
		} else if (direction == NavigationDirection.backward && line.id > 1) {
			goto(`/introduction?page=${line.id - 1}`);
		}
	};
</script>

<svelte:window on:keydown|preventDefault={handleKeydownEvent} />

<AudioPlayer src={`${line.audio}`} />

<Scene background={line.background}>
	<div class="w-full" slot="dialog">
		<div
			class=""
			on:click={() => {
				console.log('hsdhj');
				play();
			}}>
			<DialogBox {line} on:dialogEvent={handleDialogEvent} />
		</div>
	</div>
	<div slot="content" class="h-full w-full">
		{#if line.id == 18}
			<div class="flex w-full ">
				<a
					href="/introduction/onboarding"
					class="mx-4 my-4 ml-auto w-fit  rounded-full bg-green-500 px-6 py-7 shadow-md hover:shadow-lg">
					<img
						src="/img/icons/mobile-app.png"
						alt=""
						class="h-24 animate-pulse hover:animate-none" />
				</a>
			</div>
		{/if}
		<!-- <div class=" h-full">hello</div> -->
	</div>
</Scene>
