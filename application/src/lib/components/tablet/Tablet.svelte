<!--
 Tablet.svelte
 cml-narrative
 
 Created by Ian Thompson on January 7th 2023
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2023 Nice Lion Technologies LLC. All Rights Reserved.
 
--->
<script lang="ts">
	import { goto } from '$app/navigation';
	import { megaJoulesMeter, tabletPowerNavigation } from '$lib/utils/stores/store';
	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import MegaJoulesMeter from './MegaJoulesMeter.svelte';

	let isPowerDownEnabled: boolean = false;

	$: {
		isPowerDownEnabled = $tabletPowerNavigation.href;
	}

	const handlePowerDown = () => {
		console.log('powerdown');

		if (isPowerDownEnabled) {
			goto($tabletPowerNavigation.href);
		} else {
			console.warn('Navigation not permitted at this time!');
			
		}
	};
</script>

<div class="h-screen w-screen bg-dark-navy p-7 ">
	<div class=" flex h-full w-full flex-col rounded-lg">
		<div class="flex h-fit w-full justify-between p-4 font-mokoto">
			<div class="flex items-center space-x-3 align-middle">
				<p class="text-5xl font-bold text-white">S.P.O.T</p>
				<img src="/img/logos/SPOT-dots.svg" class="h-full w-24" alt="" />
			</div>
			<p class="text-xl font-bold text-white">Solving Problems of Tomorrow</p>
		</div>
		<div class="tablet-gradient glow  h-full">

			<div class="w-full h-full flex justify-center items-center">
				<div class="h-full w-full relative z-0">
					<div class="grid-background h-full w-full">
						<slot />
					</div>				  
					<div class="absolute inset-0 flex items-start justify-end  ml-auto z-10 h-fit w-1/6 p-2">
						<MegaJoulesMeter amount={$megaJoulesMeter} />
					</div>
				</div>
			  </div>



			<!-- <slot></slot> -->
		</div>
		<div id="tablet-actions" class="flex h-fit justify-end space-x-5 pt-3 text-center text-white">
			<img id="tablet-settings" src="/img/svg/gear.svg" alt="" class="h-20 w-20" />
			<button
				id="tablet-power-button"
				class={`${!isPowerDownEnabled ? 'cursor-not-allowed opacity-60' : ''} h-20 w-20`}
				on:click={handlePowerDown}>
				<img src="/img/svg/power-button.svg" alt="" />
			</button>
		</div>
	</div>
</div>
