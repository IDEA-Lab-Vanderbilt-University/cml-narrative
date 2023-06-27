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

<Scene background="/img/backgrounds/Spark_Lab.jpg">
	<div class="h-full w-full p-4" slot="content">
		<Tablet>
			<div class="flex h-full w-full flex-col items-center rounded-md bg-white p-5 font-mono">
				<h1 class="text-4xl font-bold">What do you think Machine Learning is?</h1>
				<p class="mt-4 text-xl italic">
					In the box below, describe what you think an Machine Learning is.
				</p>
				<textarea
					class="textarea-bordered textarea mx-8 mt-9 h-1/2 w-full border-4 border-dashed text-xl"
					placeholder="I think machine learning is...." />
				<a
					href="/activities/draw-an-algorithm"
					class="mt-9 rounded-md bg-lapiz-blue px-8 text-xl text-white">Submit</a>
			</div>
		</Tablet>
	</div>
</Scene>
