<!--
 /src/routes/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 7th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu

--->

<!-- Default landing page -->

<script lang="ts">
	import Scene from "$lib/components/scene/Scene.svelte";


</script>

<Scene background="/img/backgrounds/Spark_Lab.jpg">
	<div class="w-full h-full p-72" slot="content">
		<div class="bg-white h-full rounded p-8 flex flex-col items-center justify-center">
			<div class="text-black space-y-5">
				<h1 class="text-center text-6xl">Welcome, agent!</h1>
				<p class="text-xl">
					Welcome to the SPOT Agency portal. Please select an option below
				</p>
			</div>
			<div class="flex flex-col space-y-8 mt-12 w-full items-center">
				<a href="/introduction?page=1" class="text-2xl rounded p-4 bg-blue-400 text-white shadow-md hover:shadow-lg w-full text-center max-w-lg">New Agent</a>
				<a href="/" class="text-2xl rounded p-4 bg-blue-400 text-white shadow-md hover:shadow-lg w-full text-center max-w-lg">Returning Agent</a>
			</div>
		</div>
	</div>
</Scene>