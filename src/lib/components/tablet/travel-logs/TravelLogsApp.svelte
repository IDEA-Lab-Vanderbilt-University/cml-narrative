<script lang="ts">
	import { goto } from '$app/navigation';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { StudentProgress, TravelLog } from '$lib/types/UserData';
	import { Assets } from '$lib/utils/Assets';
	import DataService from '$lib/utils/DataService';
	import { accessTokenStore, studentProgressStore } from '$lib/utils/stores/store';
	import { data } from '@tensorflow/tfjs';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	/**
	 * Represents which profile to view in the container
	 */
	let index = 0;

	let logs: TravelLog[] = [ {
        data: "Loading...",
        description: "Loading...",
        status: "complete",
    }];

	let nextButton: HTMLButtonElement | void;
	let previousButton: HTMLButtonElement | void;

    let studentProgress: StudentProgress = get(studentProgressStore);

	const handleNavigation = (direction: NavigationDirection) => {
		if (direction == NavigationDirection.forward && index != logs.length - 1) {
			index += 1;
		} else if (direction == NavigationDirection.backward && index != 0) {
			index -= 1;
		}

		// Update button enabled/disabled state
		updateButtons();
	};

    export let handleClick: () => void;

    function updateButtons() {
        if (previousButton && nextButton) {
            if (index == 0) {
                previousButton.disabled = true;
            } else {
                previousButton.disabled = false;
            }

			if (index == logs.length - 1) {
				nextButton.disabled = true;
			} else {
				nextButton.disabled = false;
			}
        }
    };
    
	onMount(async () => {
        try {
            logs = await DataService.TravelLog.getTravelLogs('travel-logs', get(accessTokenStore));
            console.log("Travel logs:", logs);
        } catch (error) {
            console.error("Error fetching travel logs:", error);
        }

        if (logs.length == 0) {
            // Default travel log to show something visually
            logs = [{
                data: "No travel logs available.",
                description: "No travel logs available.",
                status: "complete",
            }];
        }

        updateButtons();
	});
</script>

<div class="h-full">
	<div class="h-3/4 w-full flex flex-col items-center justify-center font-mokoto text-2xl text-white">
        {logs[index].data}
	</div>
	<div class="flex w-full flex-col items-center justify-center space-y-2">
		<div class="flex items-center justify-center space-x-6" id="navbuttons">
			<button
                disabled
				class="btn-primary btn"
				id="previous"
				on:click={() => handleNavigation(NavigationDirection.backward)}
				bind:this={previousButton} >Previous</button>
			<button class="btn-primary btn" disabled on:click={() => handleNavigation(NavigationDirection.forward)}
				id="next" bind:this={nextButton}>
				Next
			</button>
		</div>
		<button on:click={handleClick} class="btn-secondary btn">Go back</button>
	</div>
</div>

<style>
	button {
		width: 200px;
		font-size: 1.25rem;
		height: 2rem;
		min-height: fit-content;
	}
</style>