<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
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
	let handleShowTablet: () => void;
	let handleHideTablet: () => void;

	onMount(() => {
		if (!browser) return;

		handleShowTablet = () => {
			audioPlayer?.stopAll();		
		};

		handleHideTablet = () => {
			audioPlayer?.playAll();
		};

		document.addEventListener('showTablet', handleShowTablet);
		document.addEventListener('hideTablet', handleHideTablet);
	});

	onDestroy(() => {
		if (!browser) return;
		if (!handleShowTablet || !handleHideTablet) return;

		document.removeEventListener('showTablet', handleShowTablet);
		document.removeEventListener('hideTablet', handleHideTablet);
	});

	export let bgSize: string = 'cover';
	export let bgPosition: string = 'center';
</script>

<AudioPlayer on:playerMounted={handlePlayerMounted} src={audio} bind:this={audioPlayer} />

<div class="flex h-screen w-full items-center justify-center bg-gray-200 bg-cover">
	<div
		class={`relative z-50 h-full w-full  bg-cover ${darken ? 'brightness-40' : ''}`}
		style={`background-image: url('${background}'); background-size: ${bgSize}; background-position: ${bgPosition}; background-repeat: no-repeat;`}>
		<slot name="content" />

		<!-- Conditionally display the Dialog slot, as there wont always be a dialog box present -->
		{#if $$slots.dialog}
			<slot name="dialog" />
		{/if}
	</div>
</div>
