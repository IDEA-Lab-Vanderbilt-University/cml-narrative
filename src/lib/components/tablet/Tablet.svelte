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
	import SettingsModal from '../modals/SettingsModal.svelte';

	/**
	 * Tracks if powerdown button is enabled. This is determined by a store
	 * that will track the href for the button is present or not.
	 *
	 * If the store has a href, then we can assume that the powerdown button should
	 * be enabled. Then, we will adjust the css properties of the powerdown button to enable user
	 * interaction.
	 * 
	 * If a function is provided, then we will call that function instead.
	 */
	export let powerDown: string | Function | void = undefined;

	$: {
		if ($tabletPowerNavigation != undefined && $tabletPowerNavigation.href != undefined) {
			powerDown = $tabletPowerNavigation.href;
		} 
	}

	/**
	 * First, we will check to see powerdown is enabled. If it is, then we will use the href provided in the store
	 * to navigate the user to the proper location.
	 */
	const handlePowerDown = () => {
		console.log('powerdown');

		if (powerDown != undefined && typeof powerDown === 'string') {
			goto(powerDown);
		} else if (powerDown != undefined && typeof powerDown === 'function') {
			powerDown();
		} else {
			console.warn('Navigation not permitted at this time!');
		}
	};

	let tabletSettings: SettingsModal | void;

	const showSettings = () => {
		tabletSettings?.show();
	};

	export let showMeter: boolean = true;
	export let showBottomButtons: boolean = true;
</script>

<SettingsModal bind:this={tabletSettings}/>

<div class="h-full w-full bg-dark-navy p-7 z-50 absolute">
	<div class="flex h-full w-full flex-col rounded-lg">
		<div class="tabletHeader flex h-fit w-full justify-between p-4 font-mokoto">
			<div class="flex items-center space-x-3 align-middle">
				<p class="text-5xl font-bold text-white">S.P.O.T</p>
				<img src="/img/logos/SPOT-dots.svg" class="h-full w-24" alt="" />
			</div>
			<p class="text-xl font-bold text-white">Solving Problems of Tomorrow</p>
		</div>
		<div class="tablet-gradient glow  h-full">
			<div class="flex h-full w-full items-center justify-center">
				<div class="relative z-0 h-full w-full">
					<div class="grid-background h-full w-full">
						<slot />
					</div>
					<div class="absolute inset-0 z-10 ml-auto flex  h-fit w-1/6 items-start justify-end p-2 {showMeter? '' : 'hidden'}">
						<MegaJoulesMeter amount={$megaJoulesMeter} />
					</div>
				</div>
			</div>
		</div>
		<div id="tablet-actions" class="flex h-fit justify-end space-x-5 pt-3 text-center text-white" style="{showBottomButtons? "": "display: none !important;"}">
			<button id="tablet-settings-button" on:click={showSettings}>
				<img id="tablet-settings" src="/img/svg/gear.svg" alt="" class="h-20 w-20" />
			</button>
			<button
				id="tablet-power-button"
				class={`${(powerDown == undefined) ? 'cursor-not-allowed powerDown-disabled' : ''} h-20 w-20`}
				on:click={handlePowerDown}>
				<img src="/img/svg/power-button.svg" alt="" />
			</button>
		</div>
	</div>
</div>


<style>
	.tabletHeader {
		user-select: none;
	}

	.hidden {
		display: none;
	}

	.powerDown-disabled {
		filter: saturate(50%) brightness(30%);
		cursor: not-allowed;
	}

	#tablet-actions {
		height: 8vh;
		display: flex;
		justify-content: flex-end;
		justify-items: center;
		position:sticky;
		bottom: 0;
		width: 100%;
		padding: 1vh;
	}

	#tablet-actions img {
		pointer-events: none;
		height: 7.5vh;
	}

	#tablet-actions button {
		transition: all 0.3s;
		align-self: center;
	}

	#tablet-actions button:hover {
		transform: scale(1.05);
	}

	#tablet-actions button:active {
		transform: scale(0.95);
	}

	.grid-background {
		overflow: hidden;
	}
</style>