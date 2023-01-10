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

export const agentData = writable({});