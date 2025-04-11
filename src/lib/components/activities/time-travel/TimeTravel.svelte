<script lang="ts">
	import { onMount } from 'svelte';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import TimeRow from './TimeRow.svelte';
	import { goto } from '$app/navigation';
	import WarpSpeed from '$lib/components/effects/warpspeed';
	import { fade } from 'svelte/transition';
	import { studentProgressStore } from '$lib/utils/stores/store';

	let warpEffect: WarpSpeed | null = null;

	export let destinationPage: string;
	export let direction: 'forward' | 'backward' = 'forward';
	export let audio = '/audio/timetravelforward.mp3';

	onMount(() => {
		energyText?.style.setProperty('text-shadow', `0 0 10px rgba(255, 255, 0, 1)`);
	});

	let presentDate = new Date();
	let destDate = new Date();

	if (direction === 'forward') {
		destDate.setFullYear(2075);
	} else {
		presentDate.setFullYear(2075);
	}
	
	let destTimeRow: TimeRow | void;
	let presTimeRow: TimeRow | void;
	let launchButton: HTMLButtonElement | void;
	let energyText: HTMLSpanElement | void;

	const MAX_ENERGY = 100;
	let energy = MAX_ENERGY;
	let startTime = presentDate.getTime();

	const gotoDestinationPage = () => {
		studentProgressStore.update((data) => {
			data.last_visited = destinationPage;

			// Time travel always consumes all energy
			data.megajoules = 0;
			return data;
		});

		goto(destinationPage);
	}

	const timeTravel = () => {
		console.log('Time Traveling...');

		audioplayer?.play();

		if (launchButton) {
			launchButton.disabled = true;
		}

		warpEffect = new WarpSpeed("warpCanvas", {
			speed: 0,
			starColor: "#ffffff",
			density: 0.75,
			warpEffect: false,
			depthAlpha: false,
			backgroundColor: "rgba(0, 0, 0, 0)",
		});
		
		let timeTravelInterval = setInterval(() => {
			let remainingTime = Math.max(Math.abs(destDate.getTime() - presentDate.getTime()), 1);
			
			let speed = Math.ceil(Math.max(remainingTime / 10, 250000000));
			energy = MAX_ENERGY - Math.round(MAX_ENERGY * (1 - (remainingTime / (Math.abs(destDate.getTime() - startTime)))));
			
			if (warpEffect) {
				let warpFactor = Math.sin(energy * Math.PI / MAX_ENERGY);
				warpEffect.SPEED = 5.0 * warpFactor;
				warpEffect.DENSITY = 0.5 * warpFactor + 0.5;
				warpEffect.STAR_COLOR = `rgba(255, 255, 255, ${warpFactor * 0.5 + 0.5})`; 
			}	

			let energyColor = Math.round((energy / MAX_ENERGY) * 155) + 100;
			energyText?.style.setProperty('color', `rgb(${energyColor}, ${energyColor}, 0)`);
			energyText?.style.setProperty('text-shadow', `0 0 rgba(${energyColor}, ${energyColor}, 0, 1)`);

			if(direction === 'forward') {
				presentDate.setTime(presentDate.getTime() + speed);
			} else {
				presentDate.setTime(presentDate.getTime() - speed);
			}

			// Prevent the present date from going past the destination date
			if(direction === 'forward' && presentDate.getTime() > destDate.getTime()) {
				presentDate.setTime(destDate.getTime());
				energy = 0;
				clearInterval(timeTravelInterval);

				if(warpEffect) {
					warpEffect.SPEED = 0;
					warpEffect.DENSITY = 0;
					warpEffect.STAR_COLOR = `rgba(255, 255, 255, 0)`;
				}

				setTimeout(() => {
					warpEffect?.destroy();
					warpEffect = null;
					gotoDestinationPage();
				}, 1500);
			} else if(direction === 'backward' && presentDate.getTime() < destDate.getTime()) {
				presentDate.setTime(destDate.getTime());
				energy = 0;
				clearInterval(timeTravelInterval);

				if(warpEffect) {
					warpEffect.SPEED = 0;
					warpEffect.DENSITY = 0;
					warpEffect.STAR_COLOR = `rgba(255, 255, 255, 0)`;
				}

				setTimeout(() => {
					warpEffect?.destroy();
					warpEffect = null;
					gotoDestinationPage();
				}, 1500);
			}

			if (presTimeRow) {
				presTimeRow.date = presentDate;
			}
		}, 100);
	}

	let audioplayer: HTMLAudioElement | void;
</script>

<div in:fade={{duration: 500}} out:fade={{duration: 500}}>
	<audio src={audio} bind:this={audioplayer}/>
	<Tablet showMeter={false} showBottomButtons={false}>
		<div id="timeTravelStuff">
			<TimeRow date={presentDate} bind:this={presTimeRow} />
			<span class="grid place-items-center text-white timelabel">PRESENT TIME</span>	
			<TimeRow date={destDate} bind:this={destTimeRow}/>
			<span class="grid place-items-center text-white timelabel">DESTINATION TIME</span>
			<span id="energyRemaining" class="text-white grid place-items-center" bind:this={energyText}>{energy} MJ</span>
			<span class="grid place-items-center text-white timelabel">ENERGY REMAINING</span>
			<span class="grid place-items-center text-xl text-white m-4">
			<button bind:this={launchButton} class="launchbutton shadow-green-glow mx-4 min-h-12 min-w-32 rounded-md bg-lime-400 text-slate-800 outline outline-slate-800 px-2" on:click={timeTravel}>LAUNCH</button>
			</span>
		</div>
	</Tablet>
</div>
<canvas id="warpCanvas"></canvas>


<style>
	.launchbutton {
		transition: all 0.2s ease-in-out;
	}

	.launchbutton:enabled {
		animation: pulseglow 2s infinite;
	}

	.launchbutton:disabled {
		background-color: #a0a0a0;
	}

	.launchbutton:enabled:hover {
		transform: scale(1.05);
	}

	.launchbutton:enabled:active {
		transform: scale(0.95);
	}

	#energyRemaining {
		width: fit-content;
		margin: 0 auto;
		background-color: #000;
		border: 2px solid #a0a0a0;
		min-width: 18rem;
		height: 4vh;
		font-size: 3vh;
		line-height: 3vh;
		vertical-align: middle;
		color: yellow;
		animation: pulseglowaddon 2.5s infinite;
	}

	#timeTravelStuff {
		margin: 4vh;
	}

	.timelabel {
		margin-bottom: 0.5em;
		font-size: 2vh;
	}

	#warpCanvas {
		display: block;
		width: 100vw;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 1;
		pointer-events: none;
		user-select: none;
	}

	@keyframes pulseglow {
		0% {
			box-shadow: 0 0 0 0 rgba(163, 212, 163, 0.7);
		}
		70% {
			box-shadow: 0 0 0 10px rgba(180, 234, 180, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(180, 234, 180, 0);
		}
	}
</style>