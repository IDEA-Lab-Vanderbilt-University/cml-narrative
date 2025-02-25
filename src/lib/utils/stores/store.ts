/**
 /src/lib/utils/stores/store.ts
 store.ts
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { Student, StudentProgress } from '$lib/types/UserData';
import { get, writable } from 'svelte/store';
import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import type { DragStackItem, HarmfulHelpfulItem } from '$lib/types/DragDropItem';
import type { TravelLog, TravelLogWithStudent } from '$lib/types/teacher-view/TravelLog';
import { defaultSettings, type Settings } from '$lib/types/Settings';
import type { PizzaConfig } from '$lib/components/activities/pizza-time/pizzatypes';
import DataService from '../DataService';

/**
 * A note on what this file does:
 *
 * This file defines "stores." Stores are Svelte's method of "state" management. Essentially, state is data that
 * needs to be accessed throughout the application. Typically, we can pass data to the different Svelte components via
 * props, however, sometimes this isn't feasible. For instance, every component might need to access a payers profile
 * information. Instead of having to pass that info between each of the components, we can create a store. These stores
 * are accessible throughout the application.
 *
 * So, in this file, we will define a few different stores for state we want to manage.
 *
 * By default, this does not persist. As in, once the browser is reloaded, the data is reset. So, we will need to make
 * calls to the API again to save data back into the stores, OR we can create special stores that will persist using
 * cookies, which is probably something we will do in the future.
 */

export let debugMode = false;

export const settingsStore = persist(
	writable<Settings>(defaultSettings),
	createLocalStorage(),
	'settings'
);

export const studentDataStore = writable<Student>({
	teacher_id: '',
	first_name: '',
	last_name: '',
});

export const studentProgressStore = writable<StudentProgress>({});

export const pizzaConfigStore = writable<PizzaConfig | undefined>(undefined);

export const tabletModalActive = writable(false);

export const tabletPowerNavigation = writable({
	href: undefined,
} as { href: string | undefined });

export const accessTokenStore = writable(debugMode? 'DEBUG-STUDENT' : '');

export const drawResponse = writable();

let deafaultDragItems: DragStackItem[] = [
	{
		id: 1,
		itemId: 'google',
		title: 'Google',
		el: null,
		img: '/img/new-icons/google.png',
		type: undefined,
		reasoning: undefined,
		plural: false
	},
	{
		id: 2,
		itemId: '',
		title: 'Self Driving Cars',
		el: null,
		img: '/img/new-icons/self-driving-car.png',
		type: undefined,
		reasoning: undefined,
		plural: true
	},
	{
		id: 3,
		itemId: 'smart-phone',
		title: 'Smart Phones',
		el: null,
		img: '/img/new-icons/smart-phone.png',
		type: undefined,
		reasoning: undefined,
		plural: true
	},
	{
		id: 4,
		itemId: 'computer',
		title: 'Computers',
		el: null,
		img: '/img/new-icons/computer.png',
		type: undefined,
		reasoning: undefined,
		plural: true
	},
	{
		id: 5,
		itemId: 'smart-watch',
		title: 'Smart Watches',
		el: null,
		img: '/img/new-icons/smartwatch.png',
		type: undefined,
		reasoning: undefined,
		plural: true
	},
	{
		id: 6,
		itemId: 'tablet',
		title: 'Tablets',
		el: null,
		img: '/img/new-icons/tablet.png',
		type: undefined,
		reasoning: undefined,
		plural: true
	}
];

export const dragItemsStore = writable<DragStackItem[]>(deafaultDragItems);
export const harmfulHelpfulStore = writable<HarmfulHelpfulItem[]>([]);
export const studentClassStore = writable<Student[]>([]);
export const sessionTeacherID = writable('');

// When the studentProgressStore is updated, update the studentDataStore
studentProgressStore.subscribe((value) => {
	if (!value) return;

	// Check for login
	if (!accessTokenStore || debugMode) return;
	if (!get(accessTokenStore)) return;

	studentDataStore.update((student) => {
		return { ...student, progress: value };
	});

	// Also send the progress to the server
	DataService.StudentProgress.updateProgress(value);
});

export const pendingTravelLogStore = writable<TravelLogWithStudent[]>([]);
