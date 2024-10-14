<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import AudioPlayer from '../audio/AudioPlayer.svelte';

	/**  The background image of the scene */
	export let background = '';

	export let audio: string = '';

	export let darken: boolean = false;

	const dispatch = createEventDispatcher();
	let player: HTMLAudioElement;

	function handlePlayerMounted(event: any) {
		player = event.detail.player;
		dispatch('scenePlayerMounted', { player });
	}

	let audioPlayer: AudioPlayer | void;

	onMount(() => {
		document.addEventListener('showTablet', (e) => {
			audioPlayer?.stopAll();		
		});
		document.addEventListener('hideTablet', (e) => {
			audioPlayer?.playAll();
		});
	});
</script>

<AudioPlayer on:playerMounted={handlePlayerMounted} src={audio} bind:this={audioPlayer} />

<div class="flex h-screen w-full items-center justify-center bg-gray-200 bg-cover">
	<div
		class={`relative z-50 h-full w-full  bg-cover ${darken ? 'brightness-40' : ''}`}
		style={`background-image: url('${background}'); background-size: cover; background-position: center; background-repeat: no-repeat;`}>
		<slot name="content" />

		<!-- Conditionally display the Dialog slot, as there wont always be a dialog box present -->
		{#if $$slots.dialog}
			<slot name="dialog" />
		{/if}
	</div>
</div>
