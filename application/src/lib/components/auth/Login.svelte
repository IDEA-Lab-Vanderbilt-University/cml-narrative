<!--
 /src/lib/components/auth/Login.svelte
 Login.svelte
 cml-narrative
 
 Created by Ian Thompson on May 25th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { env } from '$env/dynamic/public';
	import type { StudentAuthData } from '$lib/types/StudentData';
	import DataService from '$lib/utils/DataService';
	import Scanner from './Scanner.svelte';
	import { createEventDispatcher, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	let agentHasBeenFound: boolean = false;
	let signInError: Error | null = null;

	let welcomeMessage = 'Welcome, Agent!';
	let studentAuth: StudentAuthData;

	const handleIDProcess = async (e) => {
		studentAuth = e.detail;
		// agentHasBeenFound = true

		try {
			let auth = await DataService.Auth.signIn(studentAuth);
			// agentHasBeenFound = true;
		} catch (error) {
			console.log(error);
			signInError = error;
		}
	};

	const handleReset = () => {
		agentHasBeenFound = false;
		signInError = null;
		studentAuth = {};
	};

	onMount(() => {
		// setTimeout(() => {
		//     agentHasBeenFound = true
		// }, 2000);
	});
</script>

<div class="flex h-full w-full flex-col  items-center justify-center">
	{#if signInError}
		<div class="font-mokoto mt-9 space-y-4 text-center text-white">
			<p class="text-error text-3xl" in:fade={{ delay: 600 }}>ACCESS DENIED!</p>
			<p class="text-xl" in:fade={{ delay: 1200 }}>{signInError}</p>
		</div>
		<button in:fade={{ delay: 1500 }} on:click={handleReset}>
			<img src="/img/svg/dialog-arrow.svg" alt="" class="mt-8 h-14 rotate-180" />
		</button>
	{:else if !agentHasBeenFound}
		<div class="font-mokoto flex flex-col space-y-3 text-center text-white" out:fade>
			<h2 class="text-3xl font-bold">New Agents</h2>
			<p>Scan your Agent Badge below</p>
		</div>
		<div class=" mt-7 h-1/2 w-1/2 " out:fade>
			<!-- {#if env.PUBLIC_USE_SCANNER == true} -->
			<!-- <Scanner on:idProcessed={handleIDProcess} /> -->
			<!-- <!-- {:else} -->
			<button
				class="text-4xl text-white"
				on:click={() =>
					handleIDProcess({
						detail: {
							firstName: 'Ian',
							lastName: 'Thompson',
							id: 12432,
							password: 'password',
							email: 'email@ian.com'
						}
					})}>TEST</button>
			<!-- {/if} -->
		</div>
		<button
			out:fade
			on:click={() => {
				dispatch('back');
			}}>
			<img src="/img/svg/dialog-arrow.svg" alt="" class="mt-8 h-14 rotate-180" />
		</button>
	{:else}
		<div class="font-mokoto mt-9 space-y-4 text-center text-white">
			<p class="text-3xl text-green-500" in:fade={{ delay: 600 }}>MATCH FOUND!</p>
			<p class="text-xl" in:fade={{ delay: 1200 }}>
				Welcome, {studentAuth.firstName}
				{studentAuth.lastName}
			</p>
		</div>
		<button
			in:fade={{ delay: 1500 }}
			on:click={() => {
				goto('/introduction?page=1');
			}}>
			<img src="/img/svg/dialog-arrow.svg" alt="" class="mt-8 h-14" />
		</button>
	{/if}
</div>
