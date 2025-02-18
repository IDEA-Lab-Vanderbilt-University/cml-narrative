<script lang="ts">
	import { goto } from '$app/navigation';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import type { StudentProgress } from '$lib/types/UserData.js';
	import DataService from '$lib/utils/DataService/index.js';
	import { userDataStore } from '$lib/utils/stores/store.js';
	import { createEventDispatcher } from 'svelte';
	import script from '$lib/scripts/level3/outro/index.js';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import SpotApplication from '$lib/components/sequences/tablet/tablet-tutorial/SpotApplication.svelte';
	import IncomingMessageModal from '$lib/components/modals/IncomingMessageModal.svelte';
	import ReadMessageModal from '$lib/components/modals/ReadMessageModal.svelte';
	import TextResponseModal from '$lib/components/activities/free-response/TextResponseModal.svelte';
	import BadgeGetModal from '$lib/components/modals/BadgeGetModal.svelte';
	import MegaJoulesGetModal from '$lib/components/modals/MegaJoulesGetModal.svelte';

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

	const getUpdatedProgress = (): StudentProgress => {
		return {
			id: null,
			badge_count: 3,
			megajoules: 10,
			student_id: null,
			last_visited: '/level3/outro?page=' + line.id,
			updated_at: new Date(),
		};
	}

	const updateLocalProgress = (progress: StudentProgress) => {
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
				updateLocalProgress(progress);
				
                // Next level
                goto('/level4?page=1');
			} else {
				goto(`/level3/outro?page=${line.id + 1}`);
			}
		} else if (direction == NavigationDirection.backward) {
			if(line.id > 1) {
				goto(`/level3/outro?page=${line.id - 1}`);
			} else {
				goto('/level3/outro?page=1');
			}
		}
	};

    let content: HTMLDivElement | null;

</script>

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
		<DialogBox {line} on:dialogEvent={handleDialogEvent} />
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
					<div class="border-white border-2 p-4 w-7/12">
						<p class="text-3xl">
							Congratulations on completing the third part of your mission!
						</p>

						<p class="text-3xl">
							Recent reports from your Bot Buddy and your Travel Log helped us learn that:
						</p>

						<p class="text-3xl">
							Technology designers create training datasets.  BIASED TRAINING DATASETS can over or under-represent certain groups of people, like kids or groups that have been historically ignored or left out in the past
						</p>

						<p class="text-3xl">
							Biased training datasets can prevent some groups of people from using certain technologies.  This could make life more difficult for them!
						</p>

						<p class="text-3xl">
							Bias can be reduced when training datasets represent MORE and DIFFERENT groups of people.
						</p>

						<p class="text-3xl">
							You have earned the Bias Buster Badge! Your megajoules meter is now full and can transport you back home.
						</p>

						<p class="text-3xl">
							You have one more mission to complete once you get back to SPOT Mission Control.  We look forward to seeing you and safe travels!
						</p>
					</div>
			</ReadMessageModal>
		{/if}

		{#if line.id == 17}
			<BadgeGetModal badgeName={"Bias Buster"} badgeImage={"/img/misc/badge3.png"} handleClick={() => handleNavigation(NavigationDirection.forward)} />
		{/if}

		{#if line.id == 18}
			<MegaJoulesGetModal amount={10} handleClick={() => handleNavigation(NavigationDirection.forward)} />
		{/if}
		
    </div>
</Scene>

<style>
    
</style>