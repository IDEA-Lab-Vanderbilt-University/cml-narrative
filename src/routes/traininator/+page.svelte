<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	import Welcome from '$lib/components/sequences/traininator/Welcome.svelte';
	import ModelName from '$lib/components/sequences/traininator/ModelName.svelte';
	import AddClasses from '$lib/components/sequences/traininator/AddClasses.svelte';

	// import { modelName, classes, classNames, model } from './stores';

	export let data: PageData;

	let page: number;
	$: {
		page = data.page;
	}

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

	let modelName: string;
	let classes: string[];

	// onMount(() => startCamera());
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<!-- <video bind:this={videoElement} class="rounded-xl" autoplay>
            <track kind="captions" />
        </video> -->

	{#if page === 1}
		<Welcome />
	{:else if page === 2}
		<ModelName bind:modelName />
	{:else if page === 3}
		<AddClasses bind:classes />
	{/if}
</div>
