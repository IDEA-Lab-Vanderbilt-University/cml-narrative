/**
 /src/routes/narrative/intro/+page.ts
 +page.ts
 cml-narrative
 
 Created by Ian Thompson on October 22nd 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/


import { error } from '@sveltejs/kit';
import script from '$lib/scripts/intro/script1';
import { goto } from '$app/navigation';

/** @type {import('./$types').PageLoad} */
export function load({ params, routeId, url }) {

    let { slug } = params
    let scriptLength = script.length
    
    // Get the page query param
    const page = url.searchParams.get('page')
    
    console.log("page", page);
    

    return {
        
        script: script[page - 1]
    }
    
    
  throw error(404, 'Not found');
}