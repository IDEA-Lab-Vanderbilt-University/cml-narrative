/**
 * Translation strings for the application
 * Organized by feature/component
 */

export const translations = {
	en: {
		tablet: {
			travelLogs: 'Travel Logs',
			profiles: 'Profiles',
			badges: 'Badges',
			previous: 'Previous',
			next: 'Next',
			goBack: 'Go back',
			notEarnedYet: 'You have not earned this badge yet!',
			editProfile: 'Edit Profile',
			editYourProfile: 'Edit Your Profile',
			spotRank: 'SPOT Rank',
			favoriteBadge: 'Favorite Badge',
			iLikeTo: 'I like to:',
			hereIsPizza: 'Here is the pizza you designed earlier!',
			noTravelLogsAvailable: 'No travel logs available.'
		}
	},
	es: {
		tablet: {
			travelLogs: 'Registros de Viaje',
			profiles: 'Perfiles',
			badges: 'Insignias',
			previous: 'Anterior',
			next: 'Siguiente',
			goBack: 'Volver',
			notEarnedYet: '¡Aún no has ganado esta insignia!',
			editProfile: 'Editar Perfil',
			editYourProfile: 'Edita tu Perfil',
			spotRank: 'Rango SPOT',
			favoriteBadge: 'Insignia Favorita',
			iLikeTo: 'Me gusta:',
			hereIsPizza: '¡Aquí está la pizza que diseñaste anteriormente!',
			noTravelLogsAvailable: 'No hay registros de viaje disponibles.'
		}
	}
} as const;

export type Language = keyof typeof translations;
export type TranslationKey = 'tablet.travelLogs' | 'tablet.profiles' | 'tablet.badges' | 'tablet.previous' | 'tablet.next' | 'tablet.goBack' | 'tablet.notEarnedYet' | 'tablet.editProfile' | 'tablet.editYourProfile' | 'tablet.spotRank' | 'tablet.favoriteBadge' | 'tablet.iLikeTo' | 'tablet.hereIsPizza' | 'tablet.noTravelLogsAvailable';

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
