<script lang="ts">
	import { goto } from '$app/navigation';
	import PizzaDisplay from '$lib/components/activities/pizza-time/PizzaDisplay.svelte';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import DefinitionModal from '$lib/components/modals/DefinitionModal.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
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
	const handleNavigation = async (direction: NavigationDirection) => {
		let target = '';

		if (direction == NavigationDirection.forward) {
			if (line.id == 14) {
                // Next level
				target = '/level1/pizza-time?page=1';
			} else {
				target = `/level1?page=${line.id + 1}`;
			}
		} else if (direction == NavigationDirection.backward && line.id > 1) {
			target = `/level1?page=${line.id - 1}`;
		}

		if (target) {
			studentProgressStore.update((data) => {
				data.last_visited = target;
				return data;
			});
			goto(target);
		}
	};

	let content: HTMLElement | void;
</script>

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
		<DialogBox {line} on:dialogEvent={handleDialogEvent} />
	</div>
	<div slot="content" class="h-full w-full"  bind:this={content}>
		{#if line.id == 9}
			<DefinitionModal title="Algorithm" definition="An algorithm is a set of step-by-step instructions for solving a problem or completing a task" on:click={() => { handleDialogEvent({detail: { state: NavigationDirection.forward}})}} />
		{/if}

		{#if line.id != 8 && line.id != 9}
			<TabletButton on:click={() => { 
				const event  = new CustomEvent('showTablet', {
					bubbles: true
				});
				
				content?.dispatchEvent(event);
			}} />
		{/if}

		{#if line.id == 8}
			<TabletButton pulse on:click={() => { 
				handleNavigation(NavigationDirection.forward);
			}} />
		{/if}
	</div>
</Scene>
