/**
 * Script translation utility with support for simple templating
 */

import { scriptTranslations, type ScriptLanguage, type ScriptSection } from './scriptTranslations';

/**
 * Simple template interpolation supporting {variable} syntax
 * @param template - Template string with {variable} placeholders
 * @param values - Object with variable values
 * @returns Interpolated string
 */
function interpolate(template: string, values?: Record<string, string | number>): string {
	if (!values) return template;
	
	return template.replace(/\{(\w+)\}/g, (match, key) => {
		return String(values[key] ?? match);
	});
}

/**
 * Get a script translation with optional template interpolation
 * @param language - Language code (e.g., 'en', 'es')
 * @param section - Script section (e.g., 'level1')
 * @param subsection - Subsection path (e.g., 'main')
 * @param lineId - The line ID or key to retrieve
 * @param templateValues - Optional values for template interpolation
 * @returns The translated string or the lineId as fallback
 */
export function getScriptTranslation(
	language: ScriptLanguage,
	section: ScriptSection,
	subsection: string,
	lineId: string | number,
	templateValues?: Record<string, string | number>
): string {
	try {
		const sectionData = scriptTranslations[language]?.[section] as Record<string, any>;
		if (!sectionData) return String(lineId);
		
		const subsectionData = sectionData?.[subsection] as any[];
		if (!subsectionData) return String(lineId);
		
		// Handle array-based translations (indexed by id)
		if (Array.isArray(subsectionData)) {
			const lineObj = subsectionData.find((item) => item.id === lineId);
			if (lineObj?.dialog) {
				return interpolate(lineObj.dialog, templateValues);
			}
		}
		
		return String(lineId);
	} catch {
		return String(lineId);
	}
}

/**
 * Batch retrieve multiple script translations for a section
 * Useful for loading all dialogues for a level at once
 * @param language - Language code
 * @param section - Script section
 * @param subsection - Subsection path
 * @returns Map of lineId to translated dialog strings
 */
export function getScriptSectionTranslations(
	language: ScriptLanguage,
	section: ScriptSection,
	subsection: string
): Map<number, string> {
	const result = new Map<number, string>();
	
	try {
		const sectionData = scriptTranslations[language]?.[section] as Record<string, any>;
		const subsectionData = sectionData?.[subsection] as any[];
		
		if (Array.isArray(subsectionData)) {
			subsectionData.forEach((item) => {
				if (item.id && item.dialog) {
					result.set(item.id, item.dialog);
				}
			});
		}
	} catch {
		// Silently fail and return empty map
	}
	
	return result;
}

/**
 * Get a translation with fallback to English if translation is missing
 * @param language - Language code
 * @param section - Script section
 * @param subsection - Subsection path
 * @param lineId - The line ID
 * @param templateValues - Optional template values
 * @returns Translated string with fallback to English
 */
export function getScriptTranslationWithFallback(
	language: ScriptLanguage,
	section: ScriptSection,
	subsection: string,
	lineId: string | number,
	templateValues?: Record<string, string | number>
): string {
	let translation = getScriptTranslation(language, section, subsection, lineId, templateValues);
	
	// If not found and language is not English, try English
	if (translation === String(lineId) && language !== 'en') {
		translation = getScriptTranslation('en', section, subsection, lineId, templateValues);
	}
	
	return translation;
}
