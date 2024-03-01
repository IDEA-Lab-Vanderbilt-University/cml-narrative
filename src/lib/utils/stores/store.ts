/**
 /src/lib/utils/stores/store.ts
 store.ts
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { UserData } from '$lib/types/UserData';
import { writable } from 'svelte/store';
import { persist, createLocalStorage } from '@macfja/svelte-persistent-store';
import type { DragStackItem, HarmfulHelpfulItem } from '$lib/types/DragDropItem';
import type { StudentAuthData } from '$lib/types/StudentData';

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

// export const agentData = writable({});

// let defaultStudentData: StudentAuthData = {
// 	id: 0,
// 	firstName: '',
// 	lastName: '',
// 	email: '',
// 	password: ''
// };

let defaultUserData: UserData = {
	name: {
		first: '',
		last: ''
	},
	age: 0,
	interests: [],
	avatarImg: '',
	agentName: '',
	email: '',
	password: '',
	progress: {
		level: 0,
		levelLabel: '',
		subLevel: 0,
		subLevelLabel: '',
		lastUpdate: undefined
	}
};

export const agentData = persist(
	writable<UserData>(defaultUserData),
	createLocalStorage(),
	'agentData'
);

export const tabletPowerNavigation = writable({});

export const accessTokenStore = writable('');

/**
 * Defines the store for the Megajoules meter. A number 0-14 should be passed.
 * This store allows this information to be accessed throughout the application.
 */
export const megaJoulesMeter = writable(0);

export const drawResponse = writable();

let deafaultDragItems: DragStackItem[] = [
	{
		id: 1,
		itemId: 'google',
		title: 'Google',
		el: null,
		img: '/img/new-icons/google.png',
		type: undefined,
		reasoning: undefined
	},
	{
		id: 2,
		itemId: '',
		title: 'Self Driving Car',
		el: null,
		img: '/img/new-icons/self-driving-car.png',
		type: undefined,
		reasoning: undefined
	},
	{
		id: 3,
		itemId: 'smart-phone',
		title: 'Smart Phone',
		el: null,
		img: '/img/new-icons/smart-phone.png',
		type: undefined,
		reasoning: undefined
	},
	{
		id: 4,
		itemId: 'computer',
		title: 'Computer',
		el: null,
		img: '/img/new-icons/computer.png',
		type: undefined,
		reasoning: undefined
	},
	{
		id: 5,
		itemId: 'smart-watch',
		title: 'Smart Watch',
		el: null,
		img: '/img/new-icons/smartwatch.png',
		type: undefined,
		reasoning: undefined
	},
	{
		id: 6,
		itemId: 'tablet',
		title: 'Tablet',
		el: null,
		img: '/img/new-icons/tablet.png',
		type: undefined,
		reasoning: undefined
	}
];

export const dragItemsStore = writable<DragStackItem[]>(deafaultDragItems);
export const harmfulHelpfulStore = writable<HarmfulHelpfulItem[]>([]);
