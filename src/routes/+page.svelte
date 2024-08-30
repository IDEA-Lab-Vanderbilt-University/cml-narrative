<script lang="ts">
	import { HomeScreenStates } from '$lib/types/Enums';
	import Login from '$lib/components/auth/Login.svelte';

	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let showTablet: boolean = false;
	let showLogIn: boolean = false;

	let screenState: HomeScreenStates = HomeScreenStates.home;
	let source: AudioBufferSourceNode;

	onMount(() => {
		setTimeout(() => {
			screenState = HomeScreenStates.home;
		}, 0);
	});

	const handleLogin = () => {
		showLogIn = true;
	};

	function runAudio() {
		const context = new AudioContext();
		source = context.createBufferSource();
		const request = new XMLHttpRequest();
		request.open('GET', '/audio/level0/computer/computer_l0_s1.wav', true);
		request.responseType = 'arraybuffer';
		request.onload = function () {
			context.decodeAudioData(request.response, function (buffer) {
				source.buffer = buffer;
				source.connect(context.destination);
				source.start(0);
			});
		};
		request.send();
	}

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
					<h2 class="text-5xl" in:fade={{ delay: 500 }}>WELCOME TO S.P.O.T</h2>
					<p class="text-xl" in:fade={{ delay: 700 }}>Solving Problems of Tomorrow</p>
				</div>
				<div class="mt-10 space-x-3" in:fade={{ delay: 1500 }}>
					<div id="button-container" class="mt-10 space-x-3" in:fade={{ delay: 1500 }}>
						<button
							id="welcome"
							class="new-agent rounded-md bg-green-500 px-3 py-2 text-3xl text-white shadow-lg"
							on:click={() => {
								runAudio();
								document.getElementById('welcome')?.classList.add('hidden');
								document.getElementById('new-agent')?.classList.remove('hidden');
								document.getElementById('active-agent')?.classList.remove('hidden');
							}}
							>Enter SPOT</button>
						<button
							id="new-agent"
							class="new-agent hidden rounded-md bg-red-500 px-3 py-2 text-3xl text-white shadow-lg"
							on:click={() => {
								stopAudio();
								screenState = HomeScreenStates.signUp;
							}}>Login Agent</button>
						<!-- <button
							id="active-agent"
							class="hidden rounded-md bg-blue-400 px-3 py-2 text-3xl text-white shadow-lg"
							on:click={() => {
								stopAudio();
								screenState = HomeScreenStates.login;
							}}>Active Agents</button> -->
					</div>
				</div>
				<img id="spotdots" src="/img/logos/SPOT-dots.svg" alt="" class="mt-8 h-24" in:fade={{ delay: 2000 }} />
			{:else if screenState == HomeScreenStates.signUp}
				<Login on:back={() => (screenState = HomeScreenStates.home)} />
			<!-- {:else if screenState == HomeScreenStates.login}
				<ActiveAgentLogin on:back={() => (screenState = HomeScreenStates.home)} /> -->
			{/if} 
		</div>
	</div>
</div>

<style>
	#welcome {
		box-shadow: 0 0 6px rgba(163, 212, 163, 0.613);
		transition: all 0.2s ease-in-out;
	}

	#welcome:hover {
		box-shadow: 0 0 9px rgb(180, 234, 180);
		transform: scale(1.05);
	}

	#welcome:active {
		box-shadow: 0 0 12px rgb(101, 242, 101);
		transform: scale(1.1);
	}

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

	#toptext, #spotdots {
		pointer-events: none;
		user-select: none;
	}
</style>
