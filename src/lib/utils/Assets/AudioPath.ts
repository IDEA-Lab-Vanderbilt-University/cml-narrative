/**
 * AudioPath.ts
 * Utility for constructing language-specific audio file paths
 */

import type { Language } from '$lib/utils/translations';

/**
 * Constructs the full audio path from a relative path and language
 * @param language - The current language (e.g., 'en', 'es')
 * @param relativePath - The relative path to audio file (e.g., '/level1/bot_buddy/file.wav')
 * @returns Full path with language directory (e.g., '/audio/en/level1/bot_buddy/file.wav')
 */
export function getAudioPath(language: Language, relativePath: string): string {
	// Ensure language defaults to 'en' if not recognized
	const lang = language || 'en';
	
	// Remove leading slash from relative path if present for consistent construction
	const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
	
	// Construct full path: /audio/{language}/{relativePath}
	return `/audio/${lang}/${cleanPath}`;
}
