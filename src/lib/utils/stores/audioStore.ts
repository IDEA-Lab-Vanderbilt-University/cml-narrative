import { writable } from 'svelte/store';

/**
 * Audio state management
 * Tracks whether audio playback has finished
 */
export const audioPlaybackFinished = writable(false);
