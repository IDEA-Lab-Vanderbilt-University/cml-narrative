import { writable } from 'svelte/store';

export let modelName = writable('');
export let classes = writable([]);
export let classNames = writable([]);
export let model = writable(null);
