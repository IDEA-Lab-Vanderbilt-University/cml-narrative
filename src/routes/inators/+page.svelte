<script lang="ts">
	import Login from "$lib/components/auth/Login.svelte";
	import { HomeScreenStates } from "$lib/types/Enums";
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	
    let screenState: HomeScreenStates = HomeScreenStates.home;

	onMount(() => {
		setTimeout(() => {
			screenState = HomeScreenStates.home;
		}, 0);
	});
</script>

<div
    class="absolute inset-0 z-10 flex flex-col items-center justify-center px-72 py-32 align-middle">
    {#if screenState == HomeScreenStates.home}
        <div id="toptext" class="font-mokoto space-y-4 text-center text-white">
            <h2 class="text-5xl" in:fade|global={{ delay: 500 }}>WELCOME TO S.P.O.T</h2>
            <p class="text-xl" in:fade|global={{ delay: 700 }}>Solving Problems of Tomorrow</p>
            <p class="text-xl" in:fade|global={{ delay: 700 }}>Inators Login</p>
        </div>
        <div class="mt-10 space-x-3" in:fade|global={{ delay: 1500 }}>
            <div id="button-container" class="mt-10 space-x-3" in:fade|global={{ delay: 1500 }}>
                <button
                    id="new-agent"
                    class="new-agent rounded-md bg-red-500 px-3 py-2 text-3xl text-white shadow-lg"
                    on:click={() => {
                        screenState = HomeScreenStates.signUp;
                    }}>Login Agent</button>
            </div>
        </div>
        <img id="spotdots" src="/img/logos/SPOT-dots.svg" alt="" class="mt-8 h-24" in:fade|global={{ delay: 2000 }} />
    {:else if screenState == HomeScreenStates.signUp}
        <Login on:back={() => (screenState = HomeScreenStates.home)} redirectOverride="/inators/menu" />
    {/if} 
</div>