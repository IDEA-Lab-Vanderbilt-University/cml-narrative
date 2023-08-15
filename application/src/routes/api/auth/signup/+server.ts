/**
 /src/routes/api/auth/signup/+server.ts
 +server.ts
 cml-narrative
 
 Created by Ian Thompson on August 14th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/
import { json } from '@sveltejs/kit';


import type { RequestHandler } from './$types';

// export const POST: RequestHandler = async (event) => {

//     console.log(event);
    
//     // var myHeaders = new Headers();
//     // myHeaders.append("Content-Type", "application/json");

//     // var raw = JSON.stringify({
//     //     "agentName": "Ian",
//     //     "password": "124359"
//     // });

//     // var requestOptions = {
//     //     method: 'POST',
//     //     headers: myHeaders,
//     //     body: raw,
//     //     redirect: 'follow'
//     // };

//     // // let response = await fetch("http://localhost:8001/api/auth/signin", requestOptions)

//     // let res = null
//     // fetch("http://localhost:8001/api/auth/signin", requestOptions)
//     // .then(response => response.text())
//     // .then(result => {
//     //     console.log(result)
//     //     res = result
//     //     return new Response(res)
//     // })
//     // .catch(error => console.log('error', error));
    
    

//     return new Response();
// };

export async function POST({ request, cookies }) {
	const { profileData } = await request.json();

    console.log(profileData);
    console.log(cookies)

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify({...profileData, password: "12345"}),
        redirect: 'follow'
    };


    try {
        let response = await fetch("http://localhost:8001/api/auth/signup", requestOptions)
        let result = await response.json()

        console.log("acess: ", result.accessToken);
        
        cookies.set("accessToken", result.accessToken, {path: '/', maxAge: 60 * 60 * 24 * 7})
        

        return json(result, {status: 201})
    } catch (error) {
        return json(null, { status: 201 });
    }
    


	// const userid = cookies.get('userid');
	// const { id } = await database.createTodo({ userid, description });

	return json(null, { status: 201 });
}