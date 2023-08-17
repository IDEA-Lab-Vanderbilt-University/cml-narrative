/**
 /src/lib/utils/api/index.ts
 index.ts
 cml-narrative
 
 Created by Ian Thompson on June 5th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { StudentAuthData } from '$lib/types/StudentData';
import { RequestFactory } from '../network/RequestFactory';

/**
 * Handles and contains all of the authentication logic
 */
const Auth = {
	/**
	 * TODO: Implement signup
	 * @param username
	 * @param email
	 * @param password
	 * @returns
	 */
	signUp: async (profileData) => {
		return new Promise(async (resolve, reject) => {
			console.log(profileData);
			
			let response = await fetch("http://localhost:5173/api/auth/signup", {
				method: "POST",
				body: JSON.stringify({
					profileData
				}),
				headers: {
					'Content-Type': 'application/json'

				}
			})

			let result = await response.json()

			// console.log("res: ", await res.json());
			

			resolve(result);
		});
	},
	/**
	 * Sign in a user with a credential
	 *
	 * This function is a WIP but will check with the back end to determine if the user has been created, and then
	 * "sign"the user in. To do this, we will create a user store and set the appropriate data. We can also look into
	 * persisting this store and having it be saved as a cookie.
	 *
	 * @param credential StudentAuthData credential to sign in with
	 * @returns promise wheter or not the user has been signed in or not
	 */
	signIn: async (credential: StudentAuthData) => {
		return new Promise<void>(async (resolve, reject) => {
			console.log('Attempting to sign in user with data: ', credential);

			let res = await RequestFactory("/api/auth/signin", {
				credentials: {
					agentName: credential.agentName,
					password: credential.password
				}
			})

			// let res = await fetch("http://localhost:8001/api/auth/signin", {
			// 	method: "POST",
			// 	body: {
			// 		agentName: credential.agentName,
			// 		password: credential.password
			// 	}
			// })

			// console.log(res);
			
			resolve(res);
			// throw new Error("Could not validate ID. Please make sure you are scanning your AGENT ID badge provided by Mission Control");
		});
	}
};

const Data = {
	setProfileData: async (data) => {
		return new Promise<void>((resolve, reject) => {
			console.log('Attempting to save profile data with data: ', data);
			resolve();
		});
	},
	/**
	 * Handles the submission of the post training survey.
	 * @param surveyResponse an object containing the questions and responses of the post survey
	 * @returns promise
	 */
	submitPostSurvey: async (surveyResponse: {}) => {
		return new Promise<void>(async (resolve, reject) => {
			console.log('attempting to submit post survey with data: ', surveyResponse);

			try {

				let res = await RequestFactory("/api/travel-log/add", {
					travelLog: {
						surveyResponse,
						description: "post-survey"
					}
				})
				resolve()
			} catch (error) {
				reject(error)
			}
		});
	}, 
	submitFreeResponse: async (id: string, data: any) => {
		return new Promise<void>(async (resolve, reject) => {
			console.log(`Attempting to submit free response with id: ${id} and data: `, data);
			
			try {
				let res = await RequestFactory("/api/travel-log/add", {
					travelLog: {
						response: data,
						description: id
					}
				})
				resolve()
			} catch (error) {
				reject(error)
			}
		})
	}, 
	uploadResponseImages: async (id: string, data: HTMLImageElement[] | HTMLOrSVGImageElement) => {
		return new Promise<void>((resolve, reject) => {
			console.log(`Attempting to submit an response image for id ${id} with data: `, data);
			resolve()
		})
	},
	submitHelpfulOrHarmfulResponse: async (data: {}) => {
		return new Promise<void>(async (resolve, reject) => {
			console.log("Attempting to upload helpfulOrHarmful responses with data: ", data);
			
			try {
				let res = await RequestFactory("/api/travel-log/add", {
					travelLog: {
						response: data,
						description: "helpful-or-harmful"
					}
				})
				resolve()
			} catch (error) {
				reject(error)
			}
		})
	}
};

/**
 * DataService is the manager for all of the communication between the frontend and the backend
 */
const DataService = {
	Auth,
	Data
};

export default DataService;
