/**
 /src/routes/api/auth/signin/+server.ts
 +server.ts
 cml-narrative
 
 Created by Ian Thompson on August 15th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import { CML_BACKEND } from '$env/static/private';
import { RequestFactory } from '$lib/utils/network/RequestFactory.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {

    const { credentials } = await request.json();

    try {

        let response = await RequestFactory(`${CML_BACKEND}/auth/signin`, credentials)
        
        cookies.set("accessToken", response.accessToken, {path: '/', maxAge: 60 * 60 * 24 * 7})
        

        return json("result", {status: 201})
    } catch (error) {
        return json(null, { status: 201 });
    }
}