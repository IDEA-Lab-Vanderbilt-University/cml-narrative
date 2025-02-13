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
	import script from '$lib/scripts/level4/index.js';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import SpotApplication from '$lib/components/sequences/tablet/tablet-tutorial/SpotApplication.svelte';
	import IncomingMessageModal from '$lib/components/modals/IncomingMessageModal.svelte';
	import TimeTravel from '$lib/components/activities/time-travel/TimeTravel.svelte';
	import TabletMenu from '$lib/components/tablet/TabletMenu.svelte';
	import { Assets } from '$lib/utils/Assets';
	import TextResponseModal from '$lib/components/activities/free-response/TextResponseModal.svelte';
	import ImageResponse from '$lib/components/activities/free-response/ImageResponse.svelte';
	import ImageResponseModal from '$lib/components/activities/free-response/ImageResponseModal.svelte';
	import RobotStepsModal from '$lib/components/modals/RobotStepsModal.svelte';

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
				updateLocalProgress(progress);
				
                // Next level
                goto('/level5?page=1');
			} else {
                if(line.id > 2 || line.id == 1) {
    				goto(`/level4?page=${line.id + 1}`);
                }
			}
		} else if (direction == NavigationDirection.backward) {
			if(line.id > 3) {
				goto(`/level4?page=${line.id - 1}`);
			}
		}
	};

    let content: HTMLDivElement | null;

</script>

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
        {#if lineNumber != 2 && lineNumber < 8}
            <DialogBox {line} on:dialogEvent={handleDialogEvent} />
        {/if}
	</div>

	<div slot="content" class="h-full w-full" bind:this={content}>
        {#if lineNumber != 2 && lineNumber < 8}
			<TabletButton on:click={() => { 
				if(lineNumber == 7) {
					handleNavigation(NavigationDirection.forward);
					return;
				}

				const event  = new CustomEvent('showTablet', {
					bubbles: true
				});
				
				content?.dispatchEvent(event);
			}}
			pulse={lineNumber == 7}
			/>
        {/if}

        {#if lineNumber == 2}
            <TimeTravel destinationPage="/level4?page=3" direction='backward' />
        {/if}

		{#if lineNumber == 8}
		<Tablet showMeter={false} showBottomButtons={false}>
			<TabletMenu apps={[
				{
					title: "Travel Logs",
					img: Assets.Tablet.travelLogIcon,
					color: "rgb(85,205,110)"
				},
				{
					title: "Profiles",
					img: Assets.Tablet.profileIcon,
					color: "rgb(185,90,210)"
				},
				{
					title: "Badges",
					img: Assets.Tablet.badgesIcon,
					color: "rgb(0,175,210)"
				},
				{
					title: "Robot Prototype",
					img: Assets.Tablet.robotPrototypeIcon,
					color: "rgb(200, 80, 50)"
				}
			]}

			onSelect={(selection) => {
				if(selection == "Robot Prototype") {
					goto('/level4?page=9');
				}
			}}
			/>
		</Tablet>
		{/if}

		{#if lineNumber == 9}
			<RobotStepsModal currentStep={0} onStepClick={() => goto('/level4?page=10')} />
		{/if}

		{#if lineNumber == 10}
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostepintro">
					<h2><img src="/img/icons/robodesign.png"/> Design</h2>
					<p>Your mission is to design an AI robot that can <strong>help your community.</strong></p>
					<p>Consider your interests and what your community might need, and describe this AI robot idea to our SPOT design engineers.</p>
					<button class="nextBtn" on:click={() => goto('/level4?page=11')}><img src="/img/misc/nextbutton.png" alt="Next" id="nextbutton" />
					</button>
				</div>
			</Tablet>
		{/if}

		{#if lineNumber == 11}
			<TextResponseModal id="robotdesign1" title="For the future, I will design an AI robot with special abilities to help others. It will be able to ______"  prompt="" placeholder="" 
			onSuccess={() => goto('/level4?page=12')} />
		{/if}

		{#if lineNumber == 12}
			<TextResponseModal id="robotdesign2" title="My robot would help the following people: _________"  prompt="" placeholder=""
			onSuccess={() => goto('/level4?page=13')} />
		{/if}

		{#if lineNumber == 13}
			<TextResponseModal id="robotdesign3" title="My robot is important and should be designed because _______"  prompt="" placeholder=""
			onSuccess={() => goto('/level4?page=14')} />
		{/if}

		{#if lineNumber == 14}
			<TextResponseModal id="robotdesign4" title="When designing my robot, I will minimize bias by ___________"  prompt="" placeholder=""
			onSuccess={() => goto('/level4?page=15')} />
		{/if}

		{#if lineNumber == 15}
			<TextResponseModal id="robotdesign5" title="My robot will be named _________"  prompt="" placeholder=""
			onSuccess={() => goto('/level4?page=16')} />
		{/if}

		{#if lineNumber == 16}
			
			<ImageResponseModal 
				prompt={"Draw a picture of your robot"} 
			/>
		{/if}
    </div>
</Scene>

<style>
	.robostepintro {
		width: 80%;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-evenly;
		height: 75vh;
	}

	.robostepintro h2 {
		font-size: 6vh;
		text-align: center;
		color: white;
		margin-top: 2vh;
	}

	.robostepintro p {
		font-size: 4vh;
		text-align: left;
		color: white;
		width: 70%;
		margin: 0 auto;
		font-family: 'Gemunu Libre';
	}

	.robostepintro img {
		height: 12vh;
		display: inline;
		position: relative;
		left: -6vh;
		margin-right: -6vh;
		top: -2vh;
	}


    #nextbutton {
        height: 10vh;
        transition: transform 0.2s;
		width: 30vh;
	}

    #nextbutton:hover {
        transform: scale(1.1);
    }

    #nextbutton:active {
        transform: scale(0.9);
    }

</style>