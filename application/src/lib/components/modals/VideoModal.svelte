<script lang="ts">
	import { onDestroy, getContext } from 'svelte';
	import DataService from '$lib/utils/DataService';
	const { close } = getContext('simple-modal');

	export let onFinish = () => {};

	let mediaRecorder: MediaRecorder;
	let chunks: BlobPart[] = [];
	let url: string = '';
	let videoElement: HTMLVideoElement;
	let stream: MediaStream | null = null;

	const _onFinish = () => {
		onFinish(url);
		close();
	};

	onDestroy(() => {
		console.log('camera should be destroyed');
		videoElement.pause();
		stream?.getTracks()[0].stop();
	});

	const startRecording = async () => {
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
		mediaRecorder.stop();
		mediaRecorder.onstop = () => {
			const blob = new Blob(chunks, { type: 'video/webm' });
			url = URL.createObjectURL(blob);

			// Stop all tracks and release the stream
			stream?.getTracks().forEach((track) => track.stop());
			videoElement.srcObject = null;
		};
	};

	const uploadToS3 = async () => {
		try {
			await DataService.Data.uploadMediaToS3(url);
			alert('media uploaded to s3.');
		} catch (error) {
			console.error(error);
		}
	};
</script>

<div class="space-y-6">
	<div class="flex h-full w-full flex-col items-center space-y-6">
		<!-- <video
			bind:this={video}
			src=""
			class="h-full w-full rounded-md"
			id="video"
			on:canplay={handleCanPlay}>Video stream not availible</video>
		<div class="flex space-x-3">
			{#if !recording}
				<button class="btn-primary btn" on:click={startRecording}>Record</button>
			{:else}
				<button class="btn-danger btn" on:click={stopRecording}>Stop</button>
			{/if}
			<button class="btn-success btn" on:click={_onFinish}>Done</button>
		</div> -->
		<video bind:this={videoElement} autoplay />
		<button on:click={startRecording}>Record</button>
		<button on:click={stopRecording}>Stop</button>
		<button on:click={uploadToS3}>Done</button>
	</div>

	<!-- <canvas bind:this={canvas} id="canvas" class="hidden" />

	<div class="output hidden">
		<img bind:this={photo} id="photo" alt="The screen capture will appear in this box." />
	</div> -->
</div>
