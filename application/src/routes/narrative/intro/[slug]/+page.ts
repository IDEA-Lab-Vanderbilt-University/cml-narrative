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


    // if (slug >= scriptLength) {
    //     return {
    //         script: script[script.length]
    //     }
    // } else if (slug <= scriptLength) {
    //     return {
    //         script: script[0]
    //     }
    // }

    // goto("")
    return {
        
        script: script[params.slug - 1]
    }
    
    
//   if (params.slug === 'hello-world') {
//     return {
//       title: 'Hello world!',
//       content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
//     };
//   }
 
  throw error(404, 'Not found');
}