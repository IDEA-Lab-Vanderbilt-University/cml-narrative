<script lang="ts">
	import { onMount } from 'svelte';

	let videoElement: HTMLVideoElement;
	let videoStream: MediaStream;

	async function startCamera() {
		try {
			videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
			videoElement.srcObject = videoStream;
			await videoElement.play();
		} catch (error) {
			console.error('Error accessing camera: ', error);
		}
	}

	// onMount(() => startCamera());
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<div class="my-5 flex h-1/3 w-full flex-col items-center justify-end">
		<h1 class="my-2 text-center text-5xl font-bold tracking-wider text-white">Welcome to the</h1>
		<h1 class="my-2 text-center text-5xl font-bold tracking-wider text-white">
			S.P.O.T Traininator!
		</h1>
	</div>
	<div class="my-5 flex h-2/3 w-full flex-col items-center justify-start">
		<!-- <video bind:this={videoElement} class="rounded-xl" autoplay>
				<track kind="captions" />
			</video> -->

		<button
			on:click={() => {}}
			class="my-5 mt-10 flex items-center justify-center gap-5 rounded-full border-2 border-white bg-blue-400 bg-opacity-75 px-4 py-3 align-middle shadow-md">
			<p class="mx-5 text-xl font-bold text-gray-800">New Model</p>
		</button>

		<button
			on:click={() => {}}
			class="my-5 flex items-center justify-center gap-5 rounded-full border-2 border-white bg-orange-400 bg-opacity-75 px-4 py-3 align-middle shadow-md">
			<p class="mx-5 text-xl font-bold text-gray-800">Load Model</p>
		</button>
	</div>
</div>
