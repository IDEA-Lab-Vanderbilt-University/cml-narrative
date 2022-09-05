<!--
 +page.svelte
 application
 
 Created by Ian Thompson on September 5th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script>
	import { onMount } from 'svelte';

	var height = 0;
	var width = 0;
	onMount(() => {
		var c = document.getElementById('application');
		var ctx = c.getContext('2d');
		ctx.width = width; //document.width is obsolete
		ctx.height = height;

		ctx.moveTo(0, 0);
		ctx.lineTo(200, 100);
		ctx.stroke();

		ctx.globalCompositeOperation = 'destination-over';
		// Now draw!
		ctx.fillStyle = 'blue';
		ctx.fillRect(0, 0, c.width, c.height);
	});
</script>

<svelte:window bind:innerHeight={height} bind:innerWidth={width} />

<canvas class="" id="application" width="700" height="400" />
