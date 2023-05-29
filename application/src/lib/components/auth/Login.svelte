<!--
 /src/lib/components/auth/Login.svelte
 Login.svelte
 cml-narrative
 
 Created by Ian Thompson on May 25th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script lang="ts">
	import { goto } from "$app/navigation";
	import Scanner from "./Scanner.svelte";
    import { createEventDispatcher, onMount } from "svelte";
    import { fade, fly } from 'svelte/transition';

    const dispatch = createEventDispatcher()

    let agentHasBeenFound: boolean = false

    let welcomeMessage = "Welcome, Agent!"
    let agent = {}
    const handleIDProcess = (e) => {
        agent = e.detail
        agentHasBeenFound = true
    }

    onMount(()=> {
        // setTimeout(() => {
        //     agentHasBeenFound = true
        // }, 2000);
    })

</script>

<div class="w-full h-full flex flex-col  items-center justify-center">

    {#if !agentHasBeenFound}
        <div class="flex flex-col font-mokoto text-center text-white space-y-3" out:fade>
            <h2 class="text-3xl font-bold">New Agents</h2>
            <p>Scan your Agent Badge below</p>
        </div>
        <div class=" w-1/2 h-1/2 mt-7 " out:fade>
            <Scanner on:idProcessed={handleIDProcess}/>
        </div>
        <button out:fade on:click={() => {
            dispatch("back")
        }}>
            <img src="/img/svg/dialog-arrow.svg" alt="" class="mt-8 h-14 rotate-180">
        </button>
    {:else}
        <div class="text-center text-white mt-9 space-y-4 font-mokoto" >
            <p class="text-3xl text-green-500" in:fade="{{delay: 600}}">MATCH FOUND!</p>
            <p class="text-xl" in:fade="{{delay: 1200}}">Welcome, {agent.firstName} {agent.lastName}</p>
        </div>
        <button in:fade="{{delay: 1500}}" on:click={() => {
            goto("/introduction?page=1")
        }}>
            <img src="/img/svg/dialog-arrow.svg" alt="" class="mt-8 h-14">
        </button>
    {/if}
</div>