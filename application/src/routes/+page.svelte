<script lang="ts">
	import { HomeScreenStates } from '$lib/types/Enums';
	import Login from '$lib/components/auth/Login.svelte';

	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

	let showTablet: boolean = false;
	let showLogIn: boolean = false;

	let screenState: HomeScreenStates = HomeScreenStates.home;

	onMount(() => {
		setTimeout(() => {
			screenState = HomeScreenStates.home;
		}, 0);
	});

	const handleLogin = () => {
		showLogIn = true;
	};
</script>

<div class="h-screen w-screen items-center">
	<div class=" relative z-0 h-full w-full">
		<img src="/img/svg/5999179.jpg" alt="" class="h-full w-full" />
		<div
			class="absolute inset-0 z-10 flex flex-col items-center justify-center px-72 py-32 align-middle">
			{#if screenState == HomeScreenStates.home}
				<div class="font-mokoto space-y-4 text-center text-white">
					<h2 class="text-5xl" in:fade={{ delay: 500 }}>WELCOME TO S.P.O.T</h2>
					<p class="text-xl" in:fade={{ delay: 700 }}>Solving Problems of Tomorrow</p>
				</div>
				<div class="mt-10 space-x-3" in:fade={{ delay: 1500 }}>
					<button
						id="new-agent"
						class="new-agent rounded-md bg-red-500 px-3 py-2 text-3xl text-white shadow-lg"
						on:click={() => (screenState = HomeScreenStates.signUp)}>New Agents</button>
					<button
						class="rounded-md bg-blue-400 px-3 py-2 text-3xl text-white shadow-lg"
						on:click={() => (screenState = HomeScreenStates.login)}>Active Agents</button>
				</div>
				<img src="/img/logos/SPOT-dots.svg" alt="" class="mt-8 h-24" in:fade={{ delay: 2000 }} />
			{:else if screenState == HomeScreenStates.signUp}
				<Login on:back={() => (screenState = HomeScreenStates.home)} />
			{/if}
		</div>
	</div>
</div>
