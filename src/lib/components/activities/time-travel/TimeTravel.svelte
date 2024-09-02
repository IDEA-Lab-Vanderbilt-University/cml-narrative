<script lang="ts">
	import { onMount } from 'svelte';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import TimeRow from './TimeRow.svelte';
	import { goto } from '$app/navigation';

	let selectedMonth: string = '';
	let selectedDay: string = '';
	let selectedYear: string = '';
	let selectedTime: string = '';

	const months = [
		'JAN',
		'FEB',
		'MAR',
		'APR',
		'MAY',
		'JUN',
		'JUL',
		'AUG',
		'SEP',
		'OCT',
		'NOV',
		'DEC'
	];

	onMount(() => {
		selectedMonth = months[0]; // Set the initial selected month
	});

	let showDropdown = false;

	function toggleDropdown() {
		showDropdown = !showDropdown;
	}

	function selectMonth(month: string) {
		selectedMonth = month;
		showDropdown = false;
	}

	let destDate = new Date();
	destDate.setFullYear(2075);

	let destTimeRow: TimeRow | void;
	let presTimeRow: TimeRow | void;
	let launchButton: HTMLButtonElement | void;
	let energyText: HTMLSpanElement | void;

	let energy = 1200;
	let presentDate = new Date();
	let startTime = presentDate.getTime();

	const timeTravel = () => {
		console.log('Time Traveling...');

		if (launchButton) {
			launchButton.disabled = true;
		}
		
		let timeTravelInterval = setInterval(() => {
			let remainingTime = Math.max(destDate.getTime() - presentDate.getTime(), 1);
			
			let speed = Math.ceil(Math.max(remainingTime / 50, 120000000));
			energy = 1200 - Math.round(1200 * (1 - (remainingTime / (destDate.getTime() - startTime))));
			let energyColor = Math.round((energy / 1200) * 200) + 55;
			energyText?.style.setProperty('color', `rgb(${energyColor}, ${energyColor}, ${energyColor})`);

			presentDate.setTime(presentDate.getTime() + speed);
			
			// Prevent the present date from going past the destination date
			if (presentDate.getTime() > destDate.getTime()) {
				presentDate.setTime(destDate.getTime());
				energy = 0;
				clearInterval(timeTravelInterval);

				setTimeout(() => {
					goto('/level1');
				}, 1500);
			}

			if (presTimeRow) {
				presTimeRow.date = presentDate;
			}
		}, 100);
	}
</script>

<Tablet showMeter={false}>
	<div id="timeTravelStuff">
		<TimeRow date={presentDate} bind:this={presTimeRow} />
		<span class="grid place-items-center text-white timelabel">PRESENT TIME</span>	
		<TimeRow date={destDate} bind:this={destTimeRow}/>
		<span class="grid place-items-center text-white timelabel">DESTINATION TIME</span>
		<TimeRow />
		<span class="grid place-items-center text-white timelabel">LAST TIME DEPARTED</span>
		<span id="energyRemaining" class="text-white grid place-items-center" bind:this={energyText}>{energy} MJ</span>
		<span class="grid place-items-center text-white timelabel">ENERGY REMAINING</span>
		<span class="grid place-items-center text-xl text-white m-4">
		<button bind:this={launchButton} class="launchbutton shadow-green-glow mx-4 min-h-12 min-w-32 rounded-md bg-lime-400 text-slate-800 outline outline-slate-800 px-2" on:click={timeTravel}>LAUNCH</button>
		</span>
	</div>
</Tablet>

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

	.launchbutton:hover {
		transform: scale(1.05);
	}

	.launchbutton:active {
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
	}

	#timeTravelStuff {
		margin: 4vh;
	}

	.timelabel {
		margin-bottom: 0.5em;
		font-size: 2vh;
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