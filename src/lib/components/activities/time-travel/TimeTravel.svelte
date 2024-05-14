<script lang="ts">
	import { onMount } from 'svelte';
	import Tablet from '$lib/components/tablet/Tablet.svelte';

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
</script>

<Tablet>
	<div class="mx-auto grid max-w-3xl grid-cols-4 items-center gap-2">
		<div>
			<p class="m-4 text-xl text-white">MONTH</p>
			<div class="relative">
				<button
					class="shadow-green-glow mx-4 min-h-20 min-w-40 rounded-md bg-slate-800 text-white outline outline-lime-400 text-left px-2"
					on:click={toggleDropdown}>{selectedMonth}</button>
				{#if showDropdown}
					<div
						class="absolute left-4 top-20 max-h-60 max-w-40 overflow-y-auto rounded-md border border-gray-300 bg-lime-200 shadow-md">
						{#each months as month}
							<button
								class="w-full px-4 py-2 text-left hover:bg-lime-400"
								on:click={() => selectMonth(month)}>{month}</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
		<div>
			<p class="m-4 text-xl text-white">DAY</p>
			<input
				type="text"
				id="day"
				class="shadow-green-glow mx-4 min-h-20 max-w-40 rounded-md bg-slate-800 px-2 text-white outline outline-lime-400"
				placeholder="01"
				bind:value={selectedDay} />
		</div>
		<div>
			<p class="m-4 text-xl text-white">YEAR</p>
			<input
				type="text"
				id="year"
				class="shadow-green-glow mx-4 min-h-20 max-w-40 rounded-md bg-slate-800 px-2 text-white outline outline-lime-400"
				placeholder="1999" 
				bind:value={selectedYear}/>
		</div>
		<div>
			<p class="m-4 text-xl text-white">TIME</p>
			<input
				type="text"
				id="year"
				class="shadow-green-glow mx-4 min-h-20 max-w-40 rounded-md bg-slate-800 px-2 text-white outline outline-lime-400"
				placeholder="00:00"
				bind:value={selectedTime} />
		</div>
	</div>
	<span class="grid place-items-center text-xl text-white m-4">PRESENT TIME</span>
	<div class="mx-auto my-4 grid max-w-3xl grid-cols-4 items-center gap-2">
		<div>
			<p class="m-4 text-xl text-white">TIME</p>
			<input
				type="text"
				id="year"
				class="shadow-green-glow mx-4 min-h-20 max-w-40 rounded-md bg-slate-800 px-2 text-white outline outline-lime-400"
				placeholder="00:00"
				value={selectedMonth}
			/>
		</div>
		<div>
			<p class="m-4 text-xl text-white">DAY</p>
			<input
				type="text"
				id="day"
				class="shadow-green-glow mx-4 min-h-20 max-w-40 rounded-md bg-slate-800 px-2 text-white outline outline-lime-400"
				placeholder="01" 
				bind:value={selectedDay}/>
		</div>
		<div>
			<p class="m-4 text-xl text-white">YEAR</p>
			<input
				type="text"
				id="year"
				class="shadow-green-glow mx-4 min-h-20 max-w-40 rounded-md bg-slate-800 px-2 text-white outline outline-lime-400"
				value="2075"
			/>
		</div>
		<div>
			<p class="m-4 text-xl text-white">TIME</p>
			<input
				type="text"
				id="year"
				class="shadow-green-glow mx-4 min-h-20 max-w-40 rounded-md bg-slate-800 px-2 text-white outline outline-lime-400"
				placeholder="00:00" 
				bind:value={selectedTime}/>
		</div>
	</div>
	<span class="grid place-items-center text-xl text-white m-4">DESTINATION TIME</span>
	<button class="shadow-green-glow mx-4 min-h-12 min-w-32 rounded-md bg-lime-400 text-slate-800 outline outline-slate-800 px-2">LAUNCH</button>
</Tablet>