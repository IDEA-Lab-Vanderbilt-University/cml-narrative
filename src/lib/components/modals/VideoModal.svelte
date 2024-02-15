<script lang="ts">
	import { onDestroy, getContext } from 'svelte';
	import DataService from '$lib/utils/DataService';
	import type { DragStackItem, Reasoning } from '$lib/types/DragDropItem';
	import { dragItemsStore } from '$lib/utils/stores/store';
	// @ts-ignore
	const { close } = getContext('simple-modal');

	export let onFinish = () => {};
	export let currentDragObject: DragStackItem;

	let isRecording = false;
	let mediaRecorder: MediaRecorder;
	let chunks: BlobPart[] = [];
	let url: string = '';
	let videoElement: HTMLVideoElement;
	let stream: MediaStream | null = null;

	const _onFinish = () => {
		// @ts-ignore
		onFinish();
		close();
	};

	onDestroy(() => {
		console.log('camera should be destroyed');
		videoElement.pause();

		if (stream) {
			stream.getTracks().forEach((track) => track.stop());
			stream = null;
		}
	});

	const startRecording = async () => {
		isRecording = true;
		stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
		mediaRecorder = new MediaRecorder(stream);
		videoElement.srcObject = stream;
		videoElement.muted = true;
		chunks = [];
		mediaRecorder.start();
		mediaRecorder.ondataavailable = (event) => {
			chunks.push(event.data);
		};
	};

	const stopRecording = () => {
		isRecording = false;
		mediaRecorder.stop();
		mediaRecorder.onstop = async () => {
			const blob = new Blob(chunks, { type: 'video/webm' });
			url = URL.createObjectURL(blob);

			// Ensure all tracks are stopped before clearing stream
			if (stream) {
				await Promise.all(stream?.getTracks().map((track) => track.stop()));
				stream = null;
			}

			videoElement.srcObject = null;
		};
		uploadToS3();
	};

	const generateFileName = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();
		return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}.webm`;
	};

	const uploadToS3 = async () => {
		try {
			console.log('videmodal hprop: ', currentDragObject);
			let res = await DataService.Data.uploadVideoToS3(url, generateFileName());
			let data: Reasoning = { reasonText: '', reasonVideo: res };
			dragItemsStore.update((items) => {
				items[0].reasoning = data;
				console.log('uploadtos3 lo ', items);
				return items;
			});
			console.log('media uploaded to s3.');
			_onFinish();
		} catch (error) {
			console.error(error);
		}
	};
</script>

<div class="space-y-6">
	<div class="flex h-full w-full flex-col items-center space-y-6">
		<video bind:this={videoElement} autoplay />
		{#if isRecording}
			<button class="btn btn-primary" on:click={stopRecording}>Stop</button>
		{:else}
			{#if url}
				<video src={url} controls style="width: 300px; height: 300px;" />
			{/if}
			<button class="btn btn-secondary" on:click={startRecording}>Record</button>
			<button class="btn btn-accent" on:click={uploadToS3}>Submit Video</button>
		{/if}
	</div>
</div>
