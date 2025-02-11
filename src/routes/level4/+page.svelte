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
        {#if ![2, 8, 9].includes(lineNumber)}
            <DialogBox {line} on:dialogEvent={handleDialogEvent} />
        {/if}
	</div>

	<div slot="content" class="h-full w-full" bind:this={content}>
        {#if ![2, 8, 9].includes(lineNumber)}
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
			<Tablet showMeter={false} showBottomButtons={false}>
				<div class="robostepsouter">
					<h2>Your Prototype</h2>
				</div>
				<div class="robostepsouter">
					<div class="robosteps">
						<div class="robostep selectedstep">
							<img src="/img/icons/robodesign.png"/>
							<p>Design</p>
						</div>
						<div class="robostep">
							<img src="/img/icons/roboplan.png"/>
							<p>Plan</p>
						</div>
						<div class="robostep">
							<img src="/img/icons/robotrain.png"/>
							<p>Test & Train</p>
						</div>
						<div class="robostep">
							<img src="/img/icons/roboprogram.png"/>
							<p>Program</p>
						</div>
						<div class="robostep">
							<img src="/img/icons/roboshowcase.png"/>
							<p>Showcase</p>
						</div>
					</div>
				</div>
			</Tablet>
		{/if}
    </div>
</Scene>

<style>
	.robostepsouter {
		background: linear-gradient(90deg, rgb(137, 200, 225), rgb(100, 159, 200));
		width: 80%;
		margin: 0 auto;
		margin-bottom: 1vh;
		border-radius: 5vh;
		padding: 1.5vh;
	}

	.robostepsouter h2 {
		text-align: center;
		font-size: 6vh;
		color: black;
		font-weight: bold;
	}

    .robosteps {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		height: 65vh;
		background-color: white;
		border-radius: 5vh;
	}

	.robostep {
		background-color: peachpuff;
		border-radius: 4vh;
		height: 9vh;
		width: 50%;
	}

	.robostep img {
		height: 11vh;
		position: relative;
		top: -1vh;
		left: -1vh;
		clear: none;
		float: left;
	}

	.robostep p {
		line-height: 9vh;
		position: relative;
		left: 2vh;
		font-size: 5vh;
		text-shadow: 0 0 1vh rgba(0, 0, 0, 0.4);
		user-select: none;
	}

	.robostep.selectedstep {
		background-color: rgb(4, 159, 4);
		cursor: pointer;
		transition: all 0.3s;
	}

	.robostep.selectedstep:hover {
		background-color: rgb(3, 103, 3);
		transform: scale(1.05);
	}

	.robostep.selectedstep:active {
		transform: scale(0.95);
	}

	.robostep.selectedstep p {
		color: white;
	}
</style>