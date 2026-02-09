/**
 * Language store and translation utilities
 */

import { derived } from 'svelte/store';
import { settingsStore } from './store';
import { getTranslation, type Language, type TranslationKey } from '$lib/utils/translations';
import { getScriptTranslationWithFallback } from '$lib/utils/getScriptTranslation';
import type { ScriptSection } from '../scriptTranslations';

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

/**
 * Derived store that provides a script translation function
 * Usage: $scriptT('level1', 'main', lineId)
 * Supports simple template interpolation: {variable}
 */
export const scriptT = derived(languageStore, ($language) => {
	return (
		section: ScriptSection,
		subsection: string,
		lineId: string | number,
		templateValues?: Record<string, string | number>
	): string => {
		return getScriptTranslationWithFallback($language as any, section, subsection, lineId, templateValues);
	};
});
