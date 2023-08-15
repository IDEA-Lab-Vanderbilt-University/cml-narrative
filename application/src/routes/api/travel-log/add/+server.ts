/**
 /src/routes/api/travel-log/add/+server.ts
 +server.ts
 cml-narrative
 
 Created by Ian Thompson on August 14th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/
import { RequestFactory } from '$lib/utils/network/RequestFactory.js';
import { json } from '@sveltejs/kit';
import { CML_BACKEND } from '$env/static/private';

export async function POST({ request, cookies }) {

    // Destructure the POSTed travel logs 
    const { travelLog } = await request.json();

    // Get the accessToken from session cookies
    const accessToken = cookies.get("accessToken")


    try {
        // Create our request from the RequestFactory and grab the result
        let result = await RequestFactory(`${CML_BACKEND}/travellogs`, travelLog, accessToken)

        console.log(result)

        return json(result, {status: 201})

    } catch (error) {
        console.log(error);
        
        return json(error, {status: 500, statusText: String(error)})
    }
}