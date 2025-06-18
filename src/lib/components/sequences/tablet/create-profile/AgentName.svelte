<!--
 /src/lib/components/sequences/tablet/create-profile/AgentName.svelte
 AgentName.svelte
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { tourManager } from '$lib/components/tour/TourManager';

	import type { Student } from '$lib/types/UserData';

	export let profileData: Student;

	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	const handleSubmit = () => {
		dispatch('submitClicked');
	};

	const getRandomAgentName = () => {
		const agentNames = [
			'Pineapple',
			'Penguin',
			'Panda',
			'Raven',
			'Fox',
			'Wolf',
			'Polar Bear',
			'Snow Leopard',
			'Dolphin',
			'Tangerine',
			'Tango',
			'Treetop',
			'Rainbow',
			'Raindrop',
			'Freeze',
			'Frost',
			'Flame',
			'Fungi',
			'Fossil',
			'Gravity',
			'Galaxy',
			'Electron',
			'Neutron',
			'Photon',
			'Quasar',
			'Cheese',
			'Cherry',
			'Rose',
			'Ruby',
			'Sapphire',
			'Emerald',
			'Amethyst',
			'Opal',
			'Platipus',
			'Ocelot',
			'Orca',
			'Octopus',
			'Nebula',
			'Nova',
			'Rocket',
			'Comet',
			'Dragon',
			'Phoenix',
		];

		return agentNames[Math.floor(Math.random() * agentNames.length)];
	};
</script>

<div class="flex h-full w-full flex-col items-center justify-center space-y-5 font-mono" style="transform: translateY(-10%)">
	<h1 class="text-white" style="font-size:6vh">Choose an Agent name</h1>
	<div class="flex w-full justify-center space-x-7">
		<div class="form-control w-full max-w-2xl">
			<input
				id="agent-name-input"
				type="text"
				placeholder={getRandomAgentName()}
				class="input-bordered input h-full w-full font-mono"
				style="padding: 2vh 2vw; font-size: 4vh"
				bind:value={profileData.agent_name} />
		</div>
	</div>
	<button
		id="submit-button"
		class="bg-lapiz-blue rounded-md px-7 py-3 text-3xl text-white shadow hover:shadow-lg"
		on:click={handleSubmit}>
		SUBMIT
	</button>
	<div class="hud-red-blue-border text-white">
		S.P.O.T agents usually choose a name about what inspires them. What inspires you?
	</div>
</div>