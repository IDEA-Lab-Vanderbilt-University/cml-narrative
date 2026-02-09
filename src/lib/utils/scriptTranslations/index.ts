import { introductionTranslations } from './introduction';
import { level1Translations } from './level1';
import { level2Translations } from './level2';
import { level3Translations } from './level3';
import { level4Translations } from './level4';
import { level4newTranslations } from './level4new';
import { level5Translations } from './level5';
import { outroTranslations } from './outro';

export const scriptTranslations = {
	en: {
		introduction: introductionTranslations.en,
		level1: level1Translations.en,
		level2: level2Translations.en,
		level3: level3Translations.en,
		level4: level4Translations.en,
		level4new: level4newTranslations.en,
		level5: level5Translations.en,
		outro: outroTranslations.en
	},
	es: {
		introduction: introductionTranslations.es,
		level1: level1Translations.es,
		level2: level2Translations.es,
		level3: level3Translations.es,
		level4: level4Translations.es,
		level4new: level4newTranslations.es,
		level5: level5Translations.es,
		outro: outroTranslations.es
	}
} as const;

export type ScriptLanguage = keyof typeof scriptTranslations;
export type ScriptSection = keyof typeof scriptTranslations.en;
export type ScriptKey = keyof typeof scriptTranslations.en.level1.main | number;

export {
	introductionTranslations,
	level1Translations,
	level2Translations,
	level3Translations,
	level4Translations,
	level4newTranslations,
	level5Translations,
	outroTranslations
};
