<!--
 /src/lib/components/modals/CameraModel.svelte
 CameraModel.svelte
 cml-narrative
 
 Created by Ian Thompson on July 19th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { getContext } from 'svelte';
	// @ts-ignore
	const { close } = getContext('simple-modal');

	export let onFinish = () => {};

	let width = 1000;
	let height = 1000;

	let streaming = false;

	let video: HTMLVideoElement;
	let canvas: HTMLCanvasElement;
	let photo: HTMLImageElement;
	let stream: MediaStream;
	let images: HTMLImageElement[] = [];

	const _onFinish = () => {
		// @ts-ignore
		onFinish(images);
		close();
	};

	onMount(async () => {
		try {
			stream = await navigator.mediaDevices.getUserMedia({
				video: { width: { ideal: 1980 }, height: { ideal: 1080 } },
				audio: false
			});

			video.srcObject = stream;
			video.play();
			clearPhoto();
		} catch (error) {
			console.error(error);
		}
	});

	onDestroy(() => {
		console.log('camera should be destroyed');
		video.pause();
		stream?.getTracks()[0].stop();
	});

	const takePicture = async () => {
		const context = canvas.getContext('2d');
		if (video.videoWidth && video.videoHeight) {
			canvas.width = video.videoWidth;
			canvas.height = video.videoHeight;
			context?.drawImage(video, 0, 0, canvas.width, canvas.height);

			let image: HTMLImageElement = new Image();
			const blob = await new Promise<Blob | null>((resolve) => {
				canvas.toBlob((blob) => {
					resolve(blob);
				}, 'image/png');
			});

			if (blob) {
				const imageUrl = URL.createObjectURL(blob);
				image.src = imageUrl;
				images = [image, ...images];
			}
		}
	};

	// const takePicture = async () => {
	// 	const context = canvas.getContext('2d');
	// 	console.log('video-h', video.videoHeight);
	// 	console.log('video-w', video.videoWidth);
	// 	if (width & height) {
	// 		canvas.width = width;
	// 		canvas.height = height;
	// 		context?.drawImage(video, 0, 0, width, height);

	// 		let image: HTMLImageElement = new Image();
	// 		const blob = await new Promise<Blob | null>((resolve) => {
	// 			canvas.toBlob((blob) => {
	// 				resolve(blob);
	// 			}, 'image/png');
	// 		});

	// 		if (blob) {
	// 			const imageUrl = URL.createObjectURL(blob);
	// 			image.src = imageUrl;
	// 			images = [image, ...images];
	// 		}
	// 	}
	// };

	// const takePicture = () => {
	// 	const context = canvas.getContext('2d');
	// 	if (width & height) {
	// 		canvas.width = width;
	// 		canvas.height = height;
	// 		context?.drawImage(video, 0, 0, width, height);

	// 		let image: HTMLImageElement = new Image();
	// 		canvas.toBlob((blob) => {
	// 			if (blob) {
	// 				const imageUrl = URL.createObjectURL(blob);
	// 				photo?.setAttribute('src', image.src);
	// 				image.src = imageUrl;
	// 			}
	// 		}, 'image/png');

	// 		images = [image, ...images];
	// 	}
	// };

	const handleCanPlay = () => {
		if (!streaming) {
			// height = (video.videoHeight / video.videoWidth) * width;
			video.setAttribute('width', width.toString());
			video.setAttribute('height', height.toString());
			canvas.setAttribute('width', width.toString());
			canvas.setAttribute('height', height.toString());
			streaming = true;
		} else {
			clearPhoto();
		}
	};

	const clearPhotos = () => {
		images = [];
	};

	const clearPhoto = () => {
		const context = canvas.getContext('2d');
		context.fillStyle = '#AAA';
		context.fillRect(0, 0, canvas.width, canvas.height);

		const data = canvas.toDataURL('image/png');
		photo.setAttribute('src', data);
	};
</script>

<div class="space-y-6">
	<div class="flex h-full w-full flex-col items-center space-y-6">
		<!-- svelte-ignore a11y-media-has-caption -->
		<video
			bind:this={video}
			src=""
			class="h-full w-full rounded-md"
			id="video"
			on:canplay={handleCanPlay}>Video stream not availible</video>
		<div class="flex space-x-3">
			<button class="btn btn-secondary" on:click={takePicture}>Capture</button>
			{#if images.length >= 1}
				<button class="btn btn-success" on:click={_onFinish}>Submit</button>
				<button class="btn btn-primary" on:click={clearPhotos}>Clear</button>
			{/if}
		</div>
	</div>

	<canvas bind:this={canvas} id="canvas" class="hidden" />

	<div class="output hidden">
		<img bind:this={photo} id="photo" alt="The screen capture will appear in this box." />
	</div>
	<p class="text-right">Images: {images.length}</p>

	<div class="flex space-x-1 overflow-scroll">
		{#each images as image}
			<img src={image.src} alt="" class="h-24 rounded-md" />
		{/each}
	</div>
</div>
