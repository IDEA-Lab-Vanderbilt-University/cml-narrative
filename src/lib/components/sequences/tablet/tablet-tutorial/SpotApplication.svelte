<!--
 /src/lib/components/sequences/tablet/tablet-tutorial/TravelLog.svelte
 TravelLog.svelte
 cml-narrative
 
 Created by Ian Thompson on January 14th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	export let color: string;
	export let img: string;
	export let title: string;
	export let pulse: boolean = false;
	
	let dispatch = createEventDispatcher<{ event: string; id: string }>();

	onMount(() => {
		dispatch('applicationContainerEvent', {
			event: 'mount',
			id: `#tablet-app-container-${title.toLowerCase()}`
		});
	});

	onDestroy(() => {
		dispatch('applicationContainerEvent', {
			event: 'destroy',
			id: `#tablet-app-container-${title.toLowerCase()}`
		});
	});
</script>

<button on:click={() => dispatch('click')} role="button" 
	class="flex h-full w-full flex-col items-center justify-center space-y-7 font-mokoto text-2xl text-white" >
	<div class="icon  {pulse? "animate-pulse" : ""}" style="background-color: {color};">
		<div class="overlay">
		<img src={img} alt="" id={`tablet-app-container-${title.toLowerCase()}`} />
		</div>
	</div>
	<p class="text-2xl">{title}</p>
</button>

<style>
	button .icon {
		height: 11vw;
  		width: 11vw;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(33, 33, 33, 0) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.584) 64%, rgba(255,255,255,1) 65%, rgba(255,255,255,1) 100%);
		transition: all 0.2s;
	}

	button .icon:hover {
		transform: scale(1.1);
		background: radial-gradient(circle, rgba(33, 33, 33, 0) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.7) 64%, rgba(255,255,255,1) 65%, rgba(255,255,255,1) 100%);
	}

	button .icon:active {
		transform: scale(0.9);
		background: radial-gradient(circle, rgba(33, 33, 33, 0) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 0.7) 64%, rgba(255,255,255,1) 65%, rgba(255,255,255,1) 100%);
	}

	button .icon img {
		transition: all 0.2s;
		height: 60%;
		width: 60%;
		margin: 20%;
		filter:blur(0.5px);
	}
</style>