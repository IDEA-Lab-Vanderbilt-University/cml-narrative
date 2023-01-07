<!--
 +page.svelte
 application
 
 Created by Ian Thompson on September 5th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	// import { Canvas, Layer, t } from 'svelte-canvas';
	import { onMount } from 'svelte';

	import Scene from '$lib/canvas/Scene';

	let height: number,
		width: number = 0;

	onMount(() => {
		const canvas = document.getElementById('canvas1');
		const ctx: CanvasRenderingContext2D = canvas.getContext('2d');
		canvas.width = width;
		canvas.height = height;

		const scene = new Scene(width, height);


		const animate = () => {
			ctx.clearRect(0, 0, width, height);
			scene.update();
			scene.draw(ctx);
			requestAnimationFrame(animate);
		};

		animate();
	});
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

<canvas {width} {height} id="canvas1" />
<!-- <Canvas {width} {height}>
	<Layer {render} />
</Canvas> -->
<img src="/img/characters/ian-half.png" alt="" id="player" class="hidden" />
<img src="/img/principals-office-with-desk.jpg" alt="" id="background" class="hidden" />
