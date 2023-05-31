/**
 /src/lib/components/tour/TourManager.ts
 TourManager.ts
 cml-narrative
 
 Created by Ian Thompson on May 30th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import { writable } from 'svelte/store';

export const tourManager = writable({
    showTour: false,
    tourMessage: "",
    position: 'top',
    attachTo: ""
});

export interface TourManager {
    showTour: boolean
    tourMessage: string,
    position?: string,
    attachTo: HTMLElement | null
}