/**
 * Language store and translation utilities
 */

import { derived } from 'svelte/store';
import { settingsStore } from './store';
import { getTranslation, type Language, type TranslationKey } from '$lib/utils/translations';

/**
 * Derived store that provides the current language
 */
export const languageStore = derived(settingsStore, ($settings) => {
	const lang = $settings.language as Language || 'en';
	return lang;
});

/**
 * Derived store that provides a translation function
 * Usage: $t('tablet.travelLogs')
 */
export const t = derived(languageStore, ($language) => {
	return (key: TranslationKey): string => {
		return getTranslation($language, key);
	};
});

/**
 * Update the language in settings
 */
export function setLanguage(language: Language) {
	settingsStore.update((settings) => ({
		...settings,
		language
	}));
}
