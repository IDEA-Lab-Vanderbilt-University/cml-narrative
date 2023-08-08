<!--
 /src/lib/components/audio/AudioPlayer.svelte
 AudioPlayer.svelte
 cml-narrative
 
 Created by Ian Thompson on August 8th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { onMount } from 'svelte';

	export let src: string;
	let player: HTMLAudioElement;

	onMount(() => {
		player.play();
	});
</script>

<audio bind:this={player} {src}>
	<track kind="captions" />
</audio>
