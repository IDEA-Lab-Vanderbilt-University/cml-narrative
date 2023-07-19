<!--
 /src/routes/activities/draw-an-algorithim/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 16th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import DrawAlgorithim from '$lib/components/activities/draw/DrawAlgorithim.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import Tablet from '$lib/components/tablet/Tablet.svelte';

	import { Draw } from '$lib/components/activities/draw/Draw.jsx';
	import { ReactAdapter } from 'svelte-react-kit';
	import { megaJoulesMeter } from '$lib/utils/stores/store';

	enum ResponseType {
		undefined,
		draw,
		camera
	}

	let responseTypeState: ResponseType = ResponseType.undefined;
</script>

<Tablet>
	{#if responseTypeState == ResponseType.undefined}
		<div class="flex h-full w-full flex-col items-center justify-center text-white">
			<h3 class="text-4xl">Draw a picture of what you think an algorithm is.</h3>
			<p class="mt-2 text-2xl">(You can draw on a piece of paper and take a picture too)</p>
			<div class="mt-7 flex space-x-4">
				<button class="btn-primary btn" on:click={() => (responseTypeState = ResponseType.draw)}
					>Draw</button>
				<button
					class="btn-secondary btn"
					on:click={() => {
						megaJoulesMeter.set(4);
					}}>Use Camera</button>
			</div>
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
</Tablet>

<!-- <Tablet>
	<div class="flex h-full w-full flex-col items-center rounded-md  text-white p-5 font-mono">
		<h1 class="text-4xl font-bold">Draw a picture of what you think an algorithm is</h1>
		<p class="mt-4 text-xl italic">
			In the box below, draw a picture of what you think an algorithm is.
		</p>
		<div class="h-full w-full pt-8">
			<!-- 
				The Draw component is utlizes a React based library. As such, a special adapter is needed to 
				allow interface between a Svelte and React component. More can be read in the documentation of the 
				Draw component.
			
			<ReactAdapter el={Draw} />
		</div>

		<div class="mt-8 flex items-center justify-between space-x-5 align-middle">
			<button class="w-8">
				<img src="/img/icons/camera.svg" alt="" />
			</button>
			<a href="/training?page=15" class="rounded-md bg-lapiz-blue px-8 text-xl text-white"
				>Submit</a>
		</div>
	</div>
</Tablet> -->
