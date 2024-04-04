<script lang="ts">
	import { Draw } from '$lib/components/activities/draw/Draw.jsx';
	import { ReactAdapter } from 'svelte-react-kit';
	import { drawResponse, megaJoulesMeter } from '$lib/utils/stores/store';

	import { createEventDispatcher, getContext } from 'svelte';
	import CameraModal from '$lib/components/modals/CameraModal.svelte';
	// @ts-ignore
	const { open } = getContext('simple-modal');

	export let promptedTechnology: string;


	let dispatch = createEventDispatcher();

	enum ResponseType {
		undefined,
		draw,
		camera
	}

	$: {
		if ($drawResponse) {
			// WE can assume that an image has been drawn and saved because the store is not populated. We can then handle it here.
			dispatch('imageSubmitted', {
				images: $drawResponse,
				doSubmit: true
			});

			// reset the draw response
			drawResponse.set(null);
		}
	}

	let responseTypeState: ResponseType = ResponseType.undefined;

	const onFinish = async (images: HTMLImageElement[]) => {
		console.log('images ', images);
		// await DataService.Data.uploadResponseImages('drawAlgorithm', images);
		dispatch('imageSubmitted', {
			images: images,
			doSubmit: true
		});
	};

	const openCamera = () => {
		open(CameraModal, {
			onFinish
		});
	};

	const submitClicked = () => {
		dispatch('submitClicked')
	};
</script>

{#if responseTypeState == ResponseType.undefined}
	<div class="flex h-full w-full flex-col items-center justify-center text-white">
		<h3 class="text-4xl">Draw a picture of what you think {promptedTechnology} is.</h3>
		<p class="mt-2 text-2xl">(You can draw on a piece of paper and take a picture too)</p>
		<div class="mt-7 flex space-x-4">
			<button class="btn-primary btn" on:click={() => (responseTypeState = ResponseType.draw)}
				>Draw</button>
			<button class="btn-secondary btn" on:click={openCamera}>Use Camera</button>
		</div>
		<!-- <button class="btn btn-accent mt-4" on:click={submitClicked}>Next</button> -->
	</div>
{:else if responseTypeState == ResponseType.draw}
	<div class="mt-auto h-full w-full  items-center justify-center">
		<!-- 
            The Draw component is utlizes a React based library. As such, a special adapter is needed to 
            allow interface between a Svelte and React component. More can be read in the documentation of the 
            Draw component.
        --->

		<ReactAdapter el={Draw} />
	</div>
{/if}
