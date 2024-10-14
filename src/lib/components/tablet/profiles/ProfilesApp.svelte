<!--
 /src/routes/introduction/onboarding/create-profile/agent-spark-profile/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { goto } from '$app/navigation';
	import ProfileContainer from '$lib/components/tablet/profiles/ProfileContainer.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import { Assets } from '$lib/utils/Assets';
	import { onMount } from 'svelte';

	/**
	 * Represents which profile to view in the container
	 */
	let index = 0;

	let profileExamples: {name: string, rank: string, favoriteBadge: string, img: string, interests: string[]}[] = [
		{
			name: 'Agent Gear',
			rank: 'Senior Agent',
			favoriteBadge: 'Robot Wrangler',
			img: Assets.Characters.AgentGear.talking,
			interests: ['Ride motorcycles', 'Eat empanadas', 'Watch race car tournaments']
		},
		{
			name: 'Agent Spark',
			rank: 'Junior Agent',
			favoriteBadge: 'Scratch Code Champion',
			img: Assets.Characters.AgentSpark.talking,
			interests: [
				'Build computers and learn how they work',
				'Read sci-fi books',
				'Play video games'
			]
		},
		{
			name: 'Agent Fern',
			rank: 'Senior Agent',
			favoriteBadge: 'Algorithm Ace',
			img: Assets.Characters.AgentFern.smile,
			interests: ['Water my plants', 'Travel to new places', 'Play piano']
		},
		{
			name: 'Captain Storm',
			rank: 'Captain',
			favoriteBadge: 'Machine Learning Master',
			img: Assets.Characters.CaptainStorm.yeah,
			interests: [
				"Watch thunderstorms (when it's safe of course!)",
				'Play volleyball',
				'Build robots'
			]
		}
	];

	let nextButton: HTMLButtonElement | void;
	let previousButton: HTMLButtonElement | void;

	const handleNavigation = (direction: NavigationDirection) => {
		if (direction == NavigationDirection.forward && index != profileExamples.length - 1) {
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

            if (index == profileExamples.length - 1) {
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
	<div class="h-5/6">
		<ProfileContainer profile={profileExamples[index]} />
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
	#navbuttons button {
		width: 200px;
		font-size: 1.5rem;
	}
</style>