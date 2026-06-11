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
	import { browser } from '$app/environment';
	import { languageStore } from '$lib/utils/stores/languageStore';
	import { getAudioPath } from '$lib/utils/Assets/AudioPath';
	import type { Language } from '$lib/utils/translations';

	export let src: string;
	let hasPlayerMounted = false;
	let currentLanguage: Language = 'en';
	let fullAudioPath = '';
	let pathResolutionRequestId = 0;
	let attemptedNonEnglishPaths = new Set<string>(); // Track paths we've tried to warn only once

	const dispatch = createEventDispatcher();

	// Subscribe to language changes
	const unsubscribe = languageStore.subscribe(lang => {
		currentLanguage = lang;
	});

	function pathExists(path: string): Promise<boolean> {
		if (!browser) return Promise.resolve(false);
		return fetch(path, { method: 'HEAD' })
			.then((response) => response.ok)
			.catch(() => false);
	}

	function toMp3RelativePath(relativePath: string): string | null {
		if (!/\.wav$/i.test(relativePath)) return null;
		return relativePath.replace(/\.wav$/i, '.mp3');
	}

	function toWavRelativePath(relativePath: string): string | null {
		if (!/\.mp3$/i.test(relativePath)) return null;
		return relativePath.replace(/\.mp3$/i, '.wav');
	}

	function withExtension(relativePath: string, extension: 'wav' | 'mp3'): string {
		const noExt = relativePath.replace(/\.(wav|mp3)$/i, '');
		return `${noExt}.${extension}`;
	}

	function toNestedRelativePath(relativePath: string): string | null {
		const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
		const segments = cleanPath.split('/').filter(Boolean);

		if (segments.length < 3) return null;

		const filename = segments[segments.length - 1];
		const parentDir = segments[segments.length - 2];
		if (!filename.toLowerCase().startsWith(`${parentDir.toLowerCase()}_`)) return null;

		return `/${[...segments.slice(0, segments.length - 1), parentDir, filename].join('/')}`;
	}

	function buildRelativeCandidates(relativePath: string): string[] {
		if (!relativePath) return [];

		const hasKnownExtension = /\.(wav|mp3)$/i.test(relativePath);
		const directCandidates = hasKnownExtension
			? [relativePath, toMp3RelativePath(relativePath), toWavRelativePath(relativePath)].filter(Boolean) as string[]
			: [withExtension(relativePath, 'wav'), withExtension(relativePath, 'mp3')];

		const nestedCandidates = directCandidates
			.map((candidate) => toNestedRelativePath(candidate))
			.filter(Boolean) as string[];

		return [...new Set([...directCandidates, ...nestedCandidates])];
	}

	async function resolveAudioPath(relativePath: string, language: Language): Promise<string> {
		const languageCandidates = buildRelativeCandidates(relativePath).map((candidate) => getAudioPath(language, candidate));
		const englishCandidates = language === 'en' || language === 'es'
			? []
			: buildRelativeCandidates(relativePath).map((candidate) => getAudioPath('en', candidate));

		const allCandidates = [...languageCandidates, ...englishCandidates];

		for (const candidatePath of allCandidates) {
			if (await pathExists(candidatePath)) {
				if (language !== 'en' && candidatePath.includes('/audio/en/')) {
					const pathKey = `${language}:${relativePath}`;
					if (!attemptedNonEnglishPaths.has(pathKey)) {
						console.warn(`[Audio] Language-specific file not found for ${relativePath}. Falling back to English: ${candidatePath}`);
						attemptedNonEnglishPaths.add(pathKey);
					}
				}
				return candidatePath;
			}
		}

		return allCandidates[0] || '';
	}

	// Handle audio load errors (when file doesn't exist)
	function handleAudioError() {
		if (!src) return;
		if (currentLanguage === 'en' || currentLanguage === 'es' || !browser) return;
		resolveAudioPath(src, 'en').then((englishPath) => {
			if (englishPath && englishPath !== fullAudioPath) {
				fullAudioPath = englishPath;
			}
		});
	}

	// Reactive statement: Resolve audio path when src or language changes
	$: {
		if (browser && src && currentLanguage) {
			const requestId = ++pathResolutionRequestId;
			resolveAudioPath(src, currentLanguage).then((resolvedPath) => {
				if (requestId === pathResolutionRequestId && resolvedPath !== fullAudioPath) {
					fullAudioPath = resolvedPath;
				}
			});
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
		players.forEach((p) => p.pause());
	});
</script>

<audio bind:this={player} src={fullAudioPath} on:error={handleAudioError}>
	<track kind="captions" />
</audio>
