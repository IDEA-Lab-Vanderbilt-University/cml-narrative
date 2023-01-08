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
	import DialogBox from "$lib/components/dialog/DialogBox.svelte";
	import Scene from "$lib/components/scene/Scene.svelte";
	import Tablet from "$lib/components/tablet/Tablet.svelte";
	
	import { onMount }  from 'svelte';;
	import { fade, fly } from 'svelte/transition';

	let showTablet: boolean = false

	onMount(() => {
		// Initialising the canvas
		var canvas = document.querySelector('canvas')
		var ctx = canvas.getContext('2d');

		// // Setting the width and height of the canvas
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		// // Setting up the letters
		var letters = 'ABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXYZABCDEFGHIJKLMNOPQRSTUVXY123456789';
		letters = letters.split('');

		// Setting up the columns
		var fontSize = 10,
			columns = canvas.width / fontSize;

		// Setting up the drops
		var drops = [];
		for (var i = 0; i < columns; i++) {
			drops[i] = 1;
		}


		// Setting up the draw function
		function draw() {
			ctx.fillStyle = 'rgba(0, 0, 0, .1)';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			for (var i = 0; i < drops.length; i++) {

				var text = letters[Math.floor(Math.random() * letters.length)];
				ctx.fillStyle = '#0f0';
				ctx.fillText(text, i * fontSize, drops[i] * fontSize);
				drops[i]++;

				if (drops[i] * fontSize > canvas.height && Math.random() > .95) {
					drops[i] = 0;

					// Now, we will show the tablet after the initial animation is finished
					showTablet = true

				}
			}
		}

		// Loop the animation
		setInterval(draw, 33);
	})

	

</script>



<div class="w-full h-screen bg-gray-200 flex justify-center items-center">
	<div class="bg-gray-400 h-full w-full relative z-0">
		<canvas class="h-full w-full"/>
		{#if showTablet}
		<div class="absolute inset-0 flex justify-center items-center z-10 py-32 px-48" in:fade="{{delay: 500}}">
			<Tablet >
				<div class="bg-white h-full rounded p-8 flex flex-col items-center justify-center" >
					<div class="text-black space-y-5">
						<h1 class="text-center text-6xl">Welcome, agent!</h1>
						<p class="text-xl">
							Welcome to the SPOT Agency portal. Please select an option below.
						</p>
					</div>
					<div class="flex flex-col space-y-8 mt-12 w-full items-center">
						<a href="/introduction?page=1" class="text-2xl rounded p-4 bg-blue-400 text-white shadow-md hover:shadow-lg w-full text-center max-w-lg">New Agent</a>
						<a href="/" class="text-2xl rounded p-4 bg-blue-400 text-white shadow-md hover:shadow-lg w-full text-center max-w-lg">Returning Agent</a>
					</div>
				</div>
			</Tablet>
		</div>

		{/if}
	</div>
  </div>

<!-- <Scene background="/img/backgrounds/Spark_Lab.jpg">
	<div class="w-full h-full py-6 px-40" slot="content">
		<Tablet>
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
		</Tablet>
	</div>
</Scene> -->