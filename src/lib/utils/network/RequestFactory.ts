/**
 /src/lib/utils/network/RequestFactory.ts
 RequestFactory.ts
 cml-narrative
 
 Created by Ian Thompson on August 15th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

/**
 * Create a network request
 * @param url url of server you are attempting to request
 * @param method HTTP method to use for request
 * @param body data to send to server
 * @param accessToken optional accessToken for requests that require an access token
 * @returns promise with JSON object
 */
export const RequestFactory = async (
	url: string, 
	method: string, 
	body?: FormData | any, 
	accessToken?: string,
	includeCredentials: boolean = true
) => {
	return new Promise<any>(async (resolve, reject) => {
		// Initialize headers
		var headers = new Headers();

		// If the optional accessToken param is passed, then we want to append
		// the access token to the headers of our request
		if (accessToken) {
			headers.append('x-access-token', accessToken);
		}

		// Initialize request options for a POST request
		var requestOptions: RequestInit = {
			method: method,
			credentials: includeCredentials ? 'include' : 'omit',
			headers: headers,
			redirect: 'follow'
		};

		// Set the request body based on the type of body parameter
		if (body){
			if (body instanceof FormData) {
				requestOptions.body = body;
			} else {
				headers.append('Content-Type', 'application/json');
				requestOptions.body = JSON.stringify(body);
			}
		}

		// Execute request
		try {
			console.log(url);
			console.log('requestOptions: ', requestOptions);
			let response = await fetch(url, requestOptions);
			if (!response.ok) {
				let errorDetails = '';
				try {
					errorDetails = await response.text();
				} catch (readError) {
					errorDetails = '';
				}

				const message = errorDetails
					? `Error fetching data from server: ${response.statusText} (${response.status}) - ${errorDetails}`
					: `Error fetching data from server: ${response.statusText} (${response.status})`;

				throw new Error(message);
			}

			const contentType = response.headers.get('content-type') || '';
			let result: any;

			if (contentType.includes('application/json')) {
				result = await response.json();
			} else {
				const textResult = await response.text();
				try {
					result = JSON.parse(textResult);
				} catch (parseError) {
					result = { response: textResult };
				}
			}

			resolve(result);
		} catch (error) {
			reject(error);
		}
	});
};
