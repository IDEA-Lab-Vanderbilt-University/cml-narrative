/**
 /src/routes/api/auth/+server.ts
 +server.ts
 cml-narrative
 
 Created by Ian Thompson on August 9th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { RequestHandler } from './$types';

export const GET: RequestHandler = async (event) => {

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");

    // var raw = JSON.stringify({
    //     "agentName": "Ian",
    //     "password": "124359"
    // });

    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    // };

    // // let response = await fetch("http://localhost:8001/api/auth/signin", requestOptions)

    // let res = null
    // fetch("http://localhost:8001/api/auth/signin", requestOptions)
    // .then(response => response.text())
    // .then(result => {
    //     console.log(result)
    //     res = result
    //     return new Response(res)
    // })
    // .catch(error => console.log('error', error));
    
    

    return new Response();
};