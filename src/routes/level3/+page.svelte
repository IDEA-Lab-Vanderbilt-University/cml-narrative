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
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import SpotApplication from '$lib/components/sequences/tablet/tablet-tutorial/SpotApplication.svelte';

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
                goto('/level3/outro?page=1');
			} else {
				goto(`/level3?page=${line.id + 1}`);
			}
		} else if (direction == NavigationDirection.backward) {
			if(line.id > 1) {
				goto(`/level3?page=${line.id - 1}`);
			} else {
				goto('/level2/outro?page=9');
			}
		}
	};

    let content: HTMLDivElement | null;

    let signMessages = [
        'HELP THE KIDS!',
        'I\'M ALWAYS LATE BUT IT\'S NOT MY FAULT',
        'Fix the cars!',
        'We want cars that work!',
        'Make cars work for kids!',
        'Accesible transport for kids',
        'No more missed birthday parties!',
        'HELP THE KIDS!',
    ];

    let signColors = [
        '#eee',
        '#fdfdfd',
        '#e9e8d7',
        '#fdfdfd',
        '#e9e8d7',
        '#eee',
        '#fdfdfd',
        '#e9e8d7',
    ];

    let signAngles = [
        'rotate(-10deg)',
        'rotate(5deg)',
        'rotate(-1deg)',
        'rotate(-5deg)',
        'rotate(1deg)',
        'rotate(-4deg)',
        'rotate(4deg)',
        'rotate(8deg)',
    ];

    let signAnimationDurations = [
        10,
        12,
        8,
        9,
        11,
        7,
        13,
        10,
    ];

    let signAnimationDelays = [
        -2,
        -1,
        -5,
        -4,
        -5,
        -6,
        -7,
        -8,
    ];
</script>

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
		<DialogBox {line} on:dialogEvent={handleDialogEvent} />
	</div>

	<div slot="content" class="h-full w-full" bind:this={content}>
		<TabletButton on:click={() => { 
            const event  = new CustomEvent('showTablet', {
                bubbles: true
            });
            
            content?.dispatchEvent(event);
		}}
		/>
        <div class="signs">
            {#each signMessages as sign, i}
                <div class="signOuter" style="animation-duration: {signAnimationDurations[i]}s; animation-delay: {signAnimationDelays[i]}s">
                    <div class="sign" style="transform: {signAngles[i]}">
                        <div class="signtext" style="background-color: {signColors[i]}">
                            {sign}
                        </div>
                    </div>            
                </div>
            {/each}
        </div>
    </div>
</Scene>

<style>
.signs {
    display: flex;
    justify-content: space-between;
    align-items: end;
    position: absolute;
    bottom: 10vh;
    width: 100%;
}

.signOuter {
    animation: sign infinite;
}

.signtext {
    color: black;
    font-size: 1.75vw;
    max-width: 15vw;
    min-height: 8vw;
    padding: 1.5vw;
    text-align: center;
}

.sign::after {
    display: block;
    content: '';
    width: 10%;
    height: 8vh;
    background-color: #56370e;
    position:relative;
    left: 45%;
}

@keyframes sign {
    0% {
        transform: rotate(-5deg);
    }
    50% {
        transform: rotate(5deg) translateY(2vw);
    }
    100% {
        transform: rotate(-5deg);
    }
}

</style>