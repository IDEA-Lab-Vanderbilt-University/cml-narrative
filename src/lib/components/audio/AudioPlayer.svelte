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
	import { languageStore } from '$lib/utils/stores/languageStore';
	import { getAudioPath } from '$lib/utils/Assets/AudioPath';
	import type { Language } from '$lib/utils/translations';

	export let src: string; // Relative path (e.g., '/level1/bot_buddy/file.wav')
	let hasPlayerMounted = false;
	let currentLanguage: Language = 'en';
	let fullAudioPath = '';
	let attemptedNonEnglishPaths = new Set<string>(); // Track paths we've tried to warn only once

	const dispatch = createEventDispatcher();

	// Subscribe to language changes
	const unsubscribe = languageStore.subscribe(lang => {
		currentLanguage = lang;
	});

	// Construct full audio path synchronously
	function constructAudioPath(relativePath: string, language: Language): string {
		if (!relativePath) return '';
		return getAudioPath(language, relativePath);
	}

	// Handle audio load errors (when file doesn't exist)
	function handleAudioError() {
		// If we're not using English and haven't tried fallback yet
		if (currentLanguage !== 'en' && fullAudioPath && !fullAudioPath.includes('/audio/en/')) {
			const pathKey = `${currentLanguage}:${src}`;
			if (!attemptedNonEnglishPaths.has(pathKey)) {
				const englishPath = getAudioPath('en', src);
				console.warn(
					`[Audio] Language-specific file not found: ${fullAudioPath}\n` +
					`Falling back to English: ${englishPath}`
				);
				attemptedNonEnglishPaths.add(pathKey);
				fullAudioPath = englishPath;
			}
		}
	}

	// Reactive statement: Update audio when src or language changes
	$: {
		if (src && currentLanguage) {
			const newPath = constructAudioPath(src, currentLanguage);
			if (newPath !== fullAudioPath) {
				fullAudioPath = newPath;
			}
		}
	}

	// Reactive statement: Play audio when path changes
	$: {
		if (hasPlayerMounted && fullAudioPath && (settings.audioEnabled ?? defaultSettings.audioEnabled) && player) {
			player.pause();
			player.currentTime = 0;
			player.src = fullAudioPath;
			player.load();
			player.play().catch(err => {
				// Ignore specific autoplay/abort errors
				if (err.name !== 'NotAllowedError' && err.name !== 'AbortError') {
					console.error('[Audio] Playback error:', err);
				}
			});
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
		unsubscribe();
		players.forEach((p) => {
			if (p) {
				p.pause();
				p.src = '';
			}
		});
	});
</script>

<audio bind:this={player} src={fullAudioPath} on:error={handleAudioError}>
	<track kind="captions" />
</audio>
