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
	import type { Student } from '$lib/types/UserData';
	import { Assets } from '$lib/utils/Assets';
	import { studentDataStore } from '$lib/utils/stores/store';
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';

	/**
	 * Represents which profile to view in the container
	 */
	let index = 0;

	let studentAgent: Student = get(studentDataStore);

	let profileExamples: {name: string, rank: string, favoriteBadge: string, img: string, interests: string[], canEdit: boolean}[] = [
		{
			name: 'Agent Gear',
			rank: 'Senior Agent',
			favoriteBadge: 'Robot Wrangler',
			img: Assets.Characters.AgentGear.talking,
			interests: ['Ride motorcycles', 'Eat empanadas', 'Watch race car tournaments'],
			canEdit: false
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
			],
			canEdit: false
		},
		{
			name: 'Agent Fern',
			rank: 'Senior Agent',
			favoriteBadge: 'Algorithm Ace',
			img: Assets.Characters.AgentFern.smile,
			interests: ['Water my plants', 'Travel to new places', 'Play piano'],
			canEdit: false
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
			],
			canEdit: false
		},
	];

	if (studentAgent.agent_name && studentAgent.agent_name != '') {
		profileExamples.push({
			name: "Agent " + studentAgent.agent_name,
			rank: (studentAgent.progress?.badge_count ?? 0) > 4 ? "Junior Agent" : "Agent in Training",
			favoriteBadge: '',
			img: studentAgent.avatar ?? '',
			interests: studentAgent.interests ?? ['','',''],
			canEdit: true
		});
	}

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
		<ProfileContainer profile={profileExamples[index]} onEdit={() => { console.log('Edit profile:', profileExamples[index]); }} />
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