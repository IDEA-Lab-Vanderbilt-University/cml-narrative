<script lang="ts">
	import { goto } from '$app/navigation';
	import Badge from '$lib/components/Badge.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { StudentProgress } from '$lib/types/UserData';
	import { Badges, type BadgeType } from '$lib/utils/Assets/Badges';
	import { studentProgressStore } from '$lib/utils/stores/store';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	/**
	 * Represents which profile to view in the container
	 */
	let index = 0;

	let badges = Badges;

	let nextButton: HTMLButtonElement | void;
	let previousButton: HTMLButtonElement | void;

    let studentProgress: StudentProgress = get(studentProgressStore);

	const handleNavigation = (direction: NavigationDirection) => {
		if (direction == NavigationDirection.forward && index != badges.length - 1) {
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

            if (index == badges.length - 1) {
                nextButton.disabled = true;
            } else {
                nextButton.disabled = false;
            }
        }
    }

    onMount(() => {
        updateButtons();
    });
</script>

<div class="h-full">
	<div class="h-3/4 w-full flex flex-col items-center justify-center">
        {#if (studentProgress.badge_count ?? 0) <= index}
		<div style="filter: grayscale(100%); opacity: 0.5;" class="flex items-center justify-center">
            <Badge name={badges[index].name} image={badges[index].image} />
		</div>
            <div class="text-center text-white text-3xl font-mokoto p-16">
                You have not earned this badge yet!
            </div>
        {:else}
            <Badge name={badges[index].name} image={badges[index].image} />
            <p class="text-center text-white text-2xl font-mokoto p-16 w-2/3">
                {badges[index].description}
            </p>
        {/if}
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