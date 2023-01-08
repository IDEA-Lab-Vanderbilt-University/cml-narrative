/**
 /src/routes/introduction/+page.ts
 +page.ts
 cml-narrative
 
 Created by Ian Thompson on January 7th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { PageLoad } from './$types';

import { error } from '@sveltejs/kit';

import script from '$lib/scripts/introduction/script';

/**@type {import('.$types').PageLoad} */
export const load: PageLoad = async ({params, url}) => {
    console.log(script);
    
    return {
        
    }
    throw error(404, 'Not found');
};