<!--
 /src/lib/components/audio/AudioPlayer.svelte
 AudioPlayer.svelte
 cml-narrative
 
 Created by Ian Thompson on August 8th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script context="module" lang="ts">
	const players = new Set();

	export function stopAll() {
		players.forEach(() => p.pause());
	}

	export const play = () => {
		players.forEach((p) => {
			p.play();
		});
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';

	export let src: string;
	let player: HTMLAudioElement;

	onMount(() => {
		players.add(player);
		console.log('mounting plater');

		player.play();
	});
</script>

<audio bind:this={player} {src}>
	<track kind="captions" />
</audio>
