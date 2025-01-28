<script lang="ts">
	import { goto } from '$app/navigation';

	export let step: number;
</script>

<div class="my-5 flex h-1/3 w-full flex-col items-center justify-end">
	<h1 class="my-2 text-center text-5xl font-bold tracking-wider text-white">Welcome to the</h1>
	<h1 class="my-2 text-center text-5xl font-bold tracking-wider text-white">
		S.P.O.T Traininator!
	</h1>
</div>
<div class="my-5 flex h-2/3 w-full flex-col items-center justify-start">
	<button
		on:click={() => {
			step++;
			// goto('/traininator?page=2');
		}}
		class="my-5 mt-10 flex items-center justify-center gap-5 rounded-full border-2 border-white bg-blue-400 bg-opacity-75 px-4 py-3 align-middle shadow-md">
		<p class="mx-5 text-xl font-bold text-white">New Model</p>
	</button>

	<button
		on:click={() => {}}
		class="my-5 flex items-center justify-center gap-5 rounded-full border-2 border-white bg-orange-400 bg-opacity-75 px-4 py-3 align-middle shadow-md">
		<p class="mx-5 text-xl font-bold text-white">Load Model</p>
	</button>
</div>


<style>
	button {
		transition: all 0.3s;
	}

	button:hover {
		transform: scale(1.05);
	}

	button:active {
		transform: scale(0.95);
	}
</style>