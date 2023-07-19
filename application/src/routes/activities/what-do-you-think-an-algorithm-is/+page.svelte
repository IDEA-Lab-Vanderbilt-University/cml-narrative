<!--
 /src/routes/activities/harmful-or-helpful/what-do-you-think-an-algorithim-is/+page.svelte
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
	<div
		class="flex h-full w-full flex-col items-center justify-center rounded-md bg-gray-900 bg-opacity-50 p-5 font-mono text-white bg-blend-darken">
		<h1 class="text-4xl font-bold">What do you think an algorithm is?</h1>
		<p class="mt-4 text-xl italic">In the box below, describe what you think an algorithm is.</p>
		<textarea
			class="textarea-bordered textarea  mx-12 mt-9 h-1/2 w-full border-4 border-dashed border-white bg-transparent text-xl"
			placeholder="I think an algorithm is...." />
		<a
			href="/activities/draw-an-algorithm"
			class="mt-9 rounded-md bg-lapiz-blue px-8 text-xl text-white">Next</a>
	</div>
</Tablet>
