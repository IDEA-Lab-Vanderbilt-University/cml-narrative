/**
 * audioPathStore.ts
 * Provides reactive audio path construction based on current language
 */

import { derived } from 'svelte/store';
import { languageStore } from './languageStore';
import { getAudioPath } from '$lib/utils/Assets/AudioPath';
import type { Language } from '$lib/utils/translations';

/**
 * Derived store that provides an audio path construction function
 * Usage: const fullPath = $audioPath('/level1/bot_buddy/file.wav')
 * This will reactively update when the language changes
 */
export const audioPath = derived(languageStore, ($language) => {
	return (relativePath: string): string => {
		return getAudioPath($language, relativePath);
	};
});

/**
 * Get the current language from the language store
 * This is a helper for components that need the current language value directly
 */
export function getCurrentAudioLanguage(): Language {
	let currentLanguage: Language = 'en';
	languageStore.subscribe(lang => {
		currentLanguage = lang;
	})();
	return currentLanguage;
}
