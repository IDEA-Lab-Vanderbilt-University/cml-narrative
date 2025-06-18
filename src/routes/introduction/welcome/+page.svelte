<!--
 /src/routes/introduction/welcome/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { goto } from '$app/navigation';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import { studentProgressStore } from '$lib/utils/stores/store.js';

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
	 * Determine the state of the DialogEvent that was emitted. Then, we will navigate
	 * the user to the appropriate url with appropriate querystring which represents
	 * which line in the script should be returned to the user.
	 */
	const handleNavigation = (direction: NavigationDirection) => {
		let target = '';
		
		if (direction == NavigationDirection.forward) {
			if (line.id == 1) {
				target = '/introduction/onboarding/tablet-tutorial?page=1';
			} else {
				target = `/introduction/welcome?page=${line.id + 1}`;
			}
		} else if (direction == NavigationDirection.backward && line.id > 1) {
			target = `/introduction/welcome?page=${line.id - 1}`;
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

<svelte:window/>

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
		<DialogBox {line} on:dialogEvent={handleDialogEvent} />
	</div>
	<div slot="content" class="h-full w-full">
		<!-- <div class=" h-full">hello</div> -->
	</div>
</Scene>
