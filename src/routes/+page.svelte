<script lang="ts">
	import { HomeScreenStates } from '$lib/types/Enums';
	import Login from '$lib/components/auth/Login.svelte';

	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { debugMode, showLanguageChoice } from '$lib/utils/stores/store';
	import { goto } from '$app/navigation';
	import LanguageMenu from '$lib/components/LanguageMenu.svelte';

	let showTablet: boolean = false;
	let showLogIn: boolean = false;

	let screenState: HomeScreenStates = HomeScreenStates.home;
	let source: AudioBufferSourceNode;

	onMount(() => {
		setTimeout(() => {
			screenState = HomeScreenStates.home;
		}, 0);
	});

	const stopAudio = () => {
		if (source) {
			source.stop();
		}
	};
</script>

<div class="h-screen w-screen items-center">
	<div class="relative z-0 h-full w-full">
		<img src="/img/svg/5999179.jpg" alt="" class="h-full w-full" />
		<div
			class="absolute inset-0 z-10 flex flex-col items-center justify-center px-72 py-32 align-middle">
			{#if screenState == HomeScreenStates.home}
				<div id="toptext" class="font-mokoto space-y-4 text-center text-white">
					<h2 class="text-5xl" in:fade|global={{ delay: 500 }}>WELCOME TO S.P.O.T</h2>
					<p class="text-xl" in:fade|global={{ delay: 700 }}>Solving Problems of Tomorrow</p>
				</div>
				<div class="mt-10 space-x-3" in:fade|global={{ delay: 1500 }}>
					<div id="button-container" class="mt-10 space-x-3" in:fade|global={{ delay: 1500 }}>
						<button
							id="new-agent"
							class="new-agent rounded-md bg-red-500 px-3 py-2 text-3xl text-white shadow-lg"
							on:click={() => {
								stopAudio();
								if(debugMode) {
									goto('/entry');
									return;
								}
								screenState = HomeScreenStates.signUp;
							}}>Login Agent</button>
					</div>
				</div>
				<img id="spotdots" src="/img/logos/SPOT-dots.svg" alt="" class="mt-8 h-24" in:fade|global={{ delay: 2000 }} />
				<div class="mt-10 space-x-3" in:fade|global={{ delay: 1500 }}>
					<div id="button-container" class="mt-10 space-x-3" in:fade|global={{ delay: 1500 }}>
						<button
							id="senior-agent"
							class="senior-agent rounded-md bg-blue-500 px-2 py-1 text-xl text-white shadow-lg"
							on:click={() => {
								stopAudio();
								goto('/teacher');
								return;
							}}>Login Senior Agent</button>
					</div>
				</div>
			{:else if screenState == HomeScreenStates.signUp}
				<Login on:back={() => (screenState = HomeScreenStates.home)} />
			{/if} 
			{#if showLanguageChoice}
			<div class="absolute bottom-4 left-4" >
				<LanguageMenu />
			</div>
			{/if}
		</div>
	</div>
</div>

<style>
	#new-agent {
		box-shadow: 0 0 6px rgb(212, 163, 163);
		transition: all 0.2s ease-in-out;
	}

	#new-agent:hover {
		box-shadow: 0 0 9px rgb(228, 137, 137);
		transform: scale(1.05);
	}

	#new-agent:active {
		box-shadow: 0 0 12px rgb(241, 103, 103);
		transform: scale(1.1);
	}

	#senior-agent {
		box-shadow: 0 0 6px rgb(163, 191, 212);
		transition: all 0.2s ease-in-out;
		position: absolute;
		bottom: 2vh;
		right: 2vh;
	}

	#toptext, #spotdots {
		pointer-events: none;
		user-select: none;
	}
</style>
