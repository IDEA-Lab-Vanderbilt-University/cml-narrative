<!--
 /src/routes/activities/draw-an-algorithim/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 16th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import Scene from '$lib/components/scene/Scene.svelte';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
</script>

<Tablet>
	<div class="flex h-full w-full flex-col items-center rounded-md bg-white p-5 font-mono">
		<h1 class="text-4xl font-bold">Draw a picture of what you think Machine :earning is</h1>
		<p class="mt-4 text-xl italic">
			In the box below, draw a picture of what you think Machine Learning is.
		</p>
		<textarea
			class="textarea-bordered textarea mx-8 mt-9 h-full w-full border-4 border-dashed text-xl"
			placeholder="I think machine learning is...." />
		<div class="mt-8 flex items-center justify-between space-x-5 align-middle">
			<button class="w-8">
				<img src="/img/icons/camera.svg" alt="" />
			</button>
			<a href="/training?page=12" class="rounded-md bg-lapiz-blue px-8 text-xl text-white"
				>Submit</a>
		</div>
	</div>
</Tablet>
