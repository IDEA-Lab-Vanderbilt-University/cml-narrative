<script context="module" lang="ts">
	import { defaultSettings, type Settings } from "$lib/types/Settings";
	import { settingsStore } from "$lib/utils/stores/store";

	const players = new Set<HTMLAudioElement>();

	let settings: Settings = defaultSettings;
	
	settingsStore.subscribe(value => {
		settings = value;
	});

	export const play = (currentPlayer: HTMLAudioElement) => {
		if(settings.audioEnabled ?? defaultSettings.audioEnabled) {
			players.forEach((p) => {
				if (p == currentPlayer) {
					p.play();
				} else {
					p.pause();
				}
			});
		}
	};
</script>

<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	export let src: string;
	let hasPlayerMounted = false;

	const dispatch = createEventDispatcher();

	$: {
		if (hasPlayerMounted && (settings.audioEnabled ?? defaultSettings.audioEnabled)) {
			player.pause();
			
			// Reset the audio element to the beginning
			player.currentTime = 0;

			// Set the new source and play
			player.src = src;
			player.play();
		}
	}

	let player: HTMLAudioElement;

	onMount(() => {
		hasPlayerMounted = true;
		players.add(player);		
		dispatch('playerMounted', player);
	});

	
	export function stopAll() {
		players.forEach((p) => p.pause());
	}

	export function playAll() {
		players.forEach((p) => p.play());
	}

	onDestroy(() => {
		players.forEach((p) => {
			if (p) {
				p.pause();
				p.src = '';
			}
		});
	});
</script>

<audio bind:this={player} {src}>
	<track kind="captions" />
</audio>
