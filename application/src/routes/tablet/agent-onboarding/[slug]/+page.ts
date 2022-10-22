/**
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
export function load({ params, routeId }) {

    let { slug } = params
    let scriptLength = script.length

    console.log(params.slug);
    

    return {index: params.slug}
    
    
 
  throw error(404, 'Not found');
}