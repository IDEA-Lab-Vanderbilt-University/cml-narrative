<script lang="ts">
	import { goto } from '$app/navigation';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import type { StudentProgress } from '$lib/types/UserData.js';
	import DataService from '$lib/utils/DataService/index.js';
	import { studentDataStore, studentProgressStore } from '$lib/utils/stores/store.js';
	import { createEventDispatcher } from 'svelte';
	import script from '$lib/scripts/level3/outro/index.js';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import SpotApplication from '$lib/components/sequences/tablet/tablet-tutorial/SpotApplication.svelte';
	import IncomingMessageModal from '$lib/components/modals/IncomingMessageModal.svelte';
	import ReadMessageModal from '$lib/components/modals/ReadMessageModal.svelte';
	import TextResponseModal from '$lib/components/activities/free-response/TextResponseModal.svelte';
	import BadgeGetModal from '$lib/components/modals/BadgeGetModal.svelte';
	import MegaJoulesGetModal from '$lib/components/modals/MegaJoulesGetModal.svelte';
	import { BadgesByName } from '$lib/utils/Assets/Badges.js';

	export let data;

	let line: Line;
	$: line = data.line;

    let lineNumber = 1;
    $: lineNumber = line.id;

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
			if (line.id == script.lines.length) {
                // Next level
				target = '/level4?page=1';
			} else {
				target = `/level3/outro?page=${line.id + 1}`;
			}

		} else if (direction == NavigationDirection.backward) {
			if(line.id > 1) {
				target = `/level3/outro?page=${line.id - 1}`;
			} else {
				target = '/level3?page=1';
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

	$: {
		if (line.id == 18){
			studentProgressStore.update((data) => {
				data.megajoules = 100;
				return data;
			});
		}
	}

    let content: HTMLDivElement | null;

</script>

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">

        {#if ![12, 13, 14].includes(line.id)}
			<DialogBox {line} on:dialogEvent={handleDialogEvent} />
		{/if}
	</div>

	<div slot="content" class="h-full w-full" bind:this={content}>
        {#if ![10, 11, 12, 13, 14, 15, 16, 17, 18].includes(line.id)}
        	<TabletButton on:click={() => { 
                const event  = new CustomEvent('showTablet', {
                    bubbles: true
                });
                
                content?.dispatchEvent(event);
            }}
            />
        {/if}
    
        {#if line.id == 10}
            <IncomingMessageModal from="Mission Control" onNext={() => handleNavigation(NavigationDirection.forward)} />
        {/if}

		{#if line.id == 11}
			<ReadMessageModal from={line.speakers[0]} onNext={() => handleNavigation(NavigationDirection.forward)}>
					<div class="border-white border-2 p-4 w-7/12">
						<p class="text-3xl">
							{line.dialog}
						</p>
					</div>
			</ReadMessageModal>
		{/if}

		{#if line.id == 12}
			<TextResponseModal id="biasGroups" title={"Why might machine learning technologies work for some groups of people and not other groups of people?"} onSuccess={() => handleNavigation(NavigationDirection.forward)} prompt="" placeholder="" />
		{/if}

		{#if line.id == 13}
			<TextResponseModal id="biasEffects" title={"How could you or others be negatively effected when technology designers use biased training datasets?"} onSuccess={() => handleNavigation(NavigationDirection.forward)} prompt="" placeholder="" />
		{/if}

		{#if line.id == 14}
			<TextResponseModal id="biasMitigation" title={"How can bias in a training dataset be reduced?"} onSuccess={() => handleNavigation(NavigationDirection.forward)} prompt="" placeholder="" />
		{/if}

		{#if line.id == 15}
			<IncomingMessageModal from="Mission Control" onNext={() => handleNavigation(NavigationDirection.forward)} />
		{/if}

		{#if line.id == 16}
			<ReadMessageModal from={line.speakers[0]} onNext={() => handleNavigation(NavigationDirection.forward)}>
					<div class="border-white border-2 p-2 w-10/12">
						<p class="text-2xl">
							Great job finishing Part 3 of your mission! Thanks to your Bot Buddy and Travel Log, we learned something important:
<ul class="text-2xl">
    <li>Technology creators build training datasets. Biased training datasets can include too much or too little information about certain groups—like kids or people who’ve been left out in the past.</li>
    <li>When that happens, some people might not be able to use certain technologies. That can make things harder for them.</li>
    <li>We can reduce bias by making sure training datasets include more types of people from different groups.</li>
</ul>

<p class="text-2xl">
You’ve earned the Bias Buster Badge! Your megajoules meter is full and ready to bring you home. 
</p>
<p class="text-2xl">
Once you're back at SPOT Mission Control, one last mission awaits. Safe travels—we can’t wait to see you!
	
						</p>
					</div>
			</ReadMessageModal>
		{/if}

		{#if line.id == 17}
			<BadgeGetModal badge={BadgesByName['Bias Buster']} handleClick={() => handleNavigation(NavigationDirection.forward)} />
		{/if}

		{#if line.id == 18}
			<MegaJoulesGetModal amount={80} handleClick={() => handleNavigation(NavigationDirection.forward)} />
		{/if}
		
    </div>
</Scene>

<style>
    
</style>