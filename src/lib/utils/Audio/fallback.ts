/**
 * fallback.ts
 * Handles audio file fallback logic and logging for missing language-specific files
 */

import type { Language } from '$lib/utils/translations';
import { getAudioPath } from '$lib/utils/Assets/AudioPath';

interface AudioPathResult {
	path: string;
	language: Language;
	fallback: boolean;
}

// Cache to track which files we've already warned about to avoid spam
const warnedPaths = new Set<string>();

/**
 * Attempts to construct an audio path for the specified language,
 * falling back to English if the file is not found. Logs warnings for missing files.
 * 
 * @param language - The requested language
 * @param relativePath - The relative audio path (e.g., '/level1/bot_buddy/file.wav')
 * @returns Object with constructed path, actual language used, and whether fallback occurred
 */
export async function getAudioPathWithFallback(
	language: Language,
	relativePath: string
): Promise<AudioPathResult> {
	// If already English or relativePath is empty, no fallback needed
	if (language === 'en' || !relativePath) {
		return {
			path: getAudioPath('en', relativePath),
			language: 'en',
			fallback: false
		};
	}

	// Try the requested language path first
	const requestedPath = getAudioPath(language, relativePath);
	
	// Check if file exists by attempting to fetch (HEAD request would be ideal but fetch is simpler)
	try {
		const response = await fetch(requestedPath, { method: 'HEAD' });
		
		if (response.ok) {
			// File exists, use it
			return {
				path: requestedPath,
				language,
				fallback: false
			};
		}
	} catch (error) {
		// Fetch failed, will fall back
	}

	// File not found, fall back to English
	const englishPath = getAudioPath('en', relativePath);
	
	// Log warning only once per unique path
	if (!warnedPaths.has(requestedPath)) {
		console.warn(
			`[Audio] Language-specific file not found: ${requestedPath}\n` +
			`Falling back to English: ${englishPath}`
		);
		warnedPaths.add(requestedPath);
	}

	return {
		path: englishPath,
		language: 'en',
		fallback: true
	};
}

/**
 * Synchronous version that doesn't check for file existence
 * Use this when you want immediate path construction without async checks
 */
export function getAudioPathWithFallbackSync(
	language: Language,
	relativePath: string
): AudioPathResult {
	// For now, always use the requested language path without checking
	// The audio player will handle 404s naturally
	const path = getAudioPath(language, relativePath);
	
	return {
		path,
		language,
		fallback: false
	};
}
