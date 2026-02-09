/**
 * Utility function to resolve dialog from a Line object
 * Handles both static strings and function-based translations
 */
import type { Line } from '$lib/types/Script';

/**
 * Get the dialog text from a Line object
 * If dialog is a function, call it to get the translated string
 * Otherwise return the string as-is
 */
export function getLineDialog(line: Line | undefined): string {
	if (!line || line.dialog === undefined) return '';
	
	if (typeof line.dialog === 'function') {
		return line.dialog();
	}
	
	return line.dialog;
}
