/**
 * Translation strings for the application
 * Organized by feature/component
 */

export const translations = {
	en: {
		tablet: {
			travelLogs: 'Travel Logs',
			profiles: 'Profiles',
			badges: 'Badges'
		}
	},
	es: {
		tablet: {
			travelLogs: 'Registros de Viaje',
			profiles: 'Perfiles',
			badges: 'Insignias'
		}
	}
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = 'tablet.travelLogs' | 'tablet.profiles' | 'tablet.badges';

/**
 * Get a translated string by key
 * @param language - Language code (e.g., 'en', 'es')
 * @param key - Dot-notation key (e.g., 'tablet.travelLogs')
 * @returns The translated string
 */
export function getTranslation(language: Language, key: TranslationKey): string {
	const keys = key.split('.');
	let value: any = translations[language];

	for (const k of keys) {
		value = value?.[k];
	}

	return typeof value === 'string' ? value : key;
}
