/**
 /src/lib/utils/api/index.ts
 index.ts
 cml-narrative
 
 Created by Ian Thompson on June 5th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import { PUBLIC_BACKEND_API_URL } from '$env/static/public';
import { RequestFactory } from '../network/RequestFactory';
import { get } from 'svelte/store';
import {
	accessTokenStore,
	debugMode,
	pendingTravelLogStore,
	studentDataStore,
} from '../stores/store';
import { type Teacher, type Student, type StudentProgress, type TravelLog } from '$lib/types/UserData';

/**
 * Handles and contains all of the authentication logic
 */
const Auth = {
	/**
	 * Sign in a user with a credential
	 *
	 * This function is a WIP but will check with the back end to determine if the user has been created, and then
	 * "sign"the user in. To do this, we will create a user store and set the appropriate data. We can also look into
	 * persisting this store and having it be saved as a cookie.
	 *
	 * @param credential UUID of the user
	 * @returns Promise<Student> the student object
	 */
	signIn: async (id: string) => {
		return new Promise<Student>(async (resolve, reject) => {
			console.log('Attempting to sign in user with data: ', id);

			if(debugMode){
				resolve({
					id: 'DEBUG-STUDENT',
					teacher_id: 'DEBUG-TEACHER',
					first_name: 'Debug',
					last_name: 'Student',
					agent_name: 'Debug Student',
					age: 1,
					interests: ['Debugging', 'Debugging', 'Debugging'],
					progress: {
						id: 'DEBUG-PROGRESS',
						badge_count: 0,
						megajoules: 0,
						last_visited: '/entry',
						student_id: 'DEBUG-STUDENT',
					}
				});
				return;
			}

			try {
				let res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/students/${id}`, 'GET');

				if (res) {
					resolve(res);
					console.log('after sign in : ', res);
					accessTokenStore.set(res.id);
					resolve(res);
				} else {
					reject(res);
				}
			} catch (error) {
				reject(error);
			}
		});
	},
};

const Student = {
	updateStudent: async (student: Student) => {
		return new Promise<void>(async (resolve, reject) => {
			if(debugMode){
				resolve();
				return;
			}

			try {
				let res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/students/${student.id}`, 'PUT', student);

				studentDataStore.set(student);

				resolve();
			} catch (error) {
				reject(error);
			}
		});
	}
}

const StudentProgress = {
	getProgress: async (progress_id: string) => {
		return new Promise<StudentProgress>(async (resolve, reject) => {
			if(debugMode){
				resolve({
					id: 'DEBUG-PROGRESS',
					badge_count: 0,
					megajoules: 0,
					last_visited: '/entry',
					student_id: 'DEBUG-STUDENT',
				});
				return;
			}

			try {
				let res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/progress/${progress_id}`, 'GET');
				resolve(res);
			} catch (error) {
				reject(error);
			}
		});
	},

	createProgress: async (progress: StudentProgress) => {
		return new Promise<StudentProgress>(async (resolve, reject) => {
			if (debugMode) {
				resolve(progress);
				return;
			}

			try {
				let res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/progress`, 'POST', progress);
				console.log('createProgress res: ', res);
				resolve(res);
			} catch (error) {
				reject(error);
			}
		});
	},

	updateProgress: async (progress: StudentProgress) => {
		return new Promise<void>(async (resolve, reject) => {
			if(debugMode){
				resolve();
				return;
			}

			try {
				let res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/progress/${progress.id}`, 'PUT', progress);
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	},
}

const Data = {
	/**
	 * Handles the submission of the post training survey.
	 * @param surveyResponse an object containing the questions and responses of the post survey
	 * @returns promise
	 */
	submitPostSurvey: async (surveyResponse: {}) => {
		return new Promise<void>(async (resolve, reject) => {
			console.log('attempting to submit post survey with data: ', surveyResponse);

			if(debugMode){
				resolve();
				return;
			}

			let token;
			accessTokenStore.subscribe((value) => {
				token = value;
			});

			console.log('token ikkada: ', token);
			const body: TravelLogBody = {
				description: `level-zero-post-survey`,
				data: surveyResponse
			};

			try {
				let res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/travel-logs`, 'POST', body, token);
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	},
	submitFreeResponse: async (id: string, data: any) => {
		return new Promise<void>(async (resolve, reject) => {
			if (debugMode) {
				resolve();
				return;
			}

			let token;
			accessTokenStore.subscribe((value) => {
				token = value;
			});
			
			const body: TravelLogBody = {
				description: `level-zero-what-is-${id}-free-response`,
				data: data
			};
			try {
				let res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/travel-logs`, 'POST', body, token);
				resolve(res);
			} catch (error) {
				reject(error);
			}
		});
	},
	uploadVideoToS3: async (mediaPath: string, fileName: string) => {
		return new Promise<string>(async (resolve, reject) => {
			if(debugMode){
				resolve('DEBUG-URL');
				return;
			}

			let token;
			accessTokenStore.subscribe((value) => {
				token = value;
			});

			console.log('TOKEN IKKADA: ', token);
			try {
				const formData = new FormData();

				const response = await fetch(mediaPath);
				const fileBlob = await response.blob();

				formData.append('file', fileBlob, fileName); // Append the file name with extension
				console.log('the form data', formData);
				console.log('the token', token);

				let res = await RequestFactory(
					`${PUBLIC_BACKEND_API_URL}/file/upload`,
					'POST',
					formData,
					token
				);
				console.log(res.url);
				resolve(res.url);
			} catch (error) {
				console.error('upload media to s3 error: ', error);
				reject(error);
			}
		});
	},
	uploadImageOrSvgToS3: async (mediaPath: string | HTMLOrSVGElement, type: string) => {
		return new Promise<string>(async (resolve, reject) => {
			if(debugMode){
				resolve('DEBUG-URL');
				return;
			}

			let fileName = generateImageOrSvgFileName(type);

			let token;
			accessTokenStore.subscribe((value) => {
				token = value;
			});

			console.log('TOKEN IKKADA: ', token);

			if (typeof mediaPath !== 'string') {
				try {
					let svgElement = mediaPath;
					if (svgElement instanceof SVGElement) {
						let serializer = new XMLSerializer();
						let svgString = serializer.serializeToString(svgElement);
						let svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
						let fileName = generateImageOrSvgFileName(type);

						const formData = new FormData();
						formData.append('file', svgBlob, fileName);

						let res = await RequestFactory(
							`${PUBLIC_BACKEND_API_URL}/file/upload`,
							'POST',
							formData,
							token
						);

						console.log(res);
						resolve(res.url);
					}
				} catch (error) {
					console.error('upload media to s3 error: ', error);
					reject(error);
				}
			} else {
				try {
					const formData = new FormData();

					const response = await fetch(mediaPath);
					const fileBlob = await response.blob();

					formData.append('file', fileBlob, fileName); // Append the file name with extension

					let res = await RequestFactory(
						`${PUBLIC_BACKEND_API_URL}/file/upload`,
						'POST',
						formData,
						token
					);

					console.log(res);
					resolve(res.url);
				} catch (error) {
					console.error('upload media to s3 error: ', error);
					reject(error);
				}
			}
		});
	},
	uploadResponseImages: async (id: string, data: string | string[], type: string) => {
		return new Promise<void>(async (resolve, reject) => {
			if(debugMode){
				resolve();
				return;
			}

			let token = get(accessTokenStore);

			console.log(`Attempting to submit an response image for id ${id} with data: `, data);
			let tlBody = getTravelLogBody(data, id, type);
			try {
				let res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/api/travellogs`, 'POST', tlBody, token);
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	},
	fetchTeacherID: async () => {
		return new Promise<string>(async (resolve, reject) => {
			try {
				let res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/whoami`, 'GET');
				resolve(res);
			} catch (error) {
				reject(error);
			}
		});
	},
	fetchStudents: async (teacher_id: string, include_progress: boolean = false) => {
		return new Promise<Student[]>(async (resolve, reject) => {
			try {
				let res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/students?teacher_id=${teacher_id}&include_progress=${include_progress}`, 'GET');
				resolve(res);
			} catch (error) {
				reject(error);
			}
		});
	},
	registerStudent: async (student: Student) => {
		return new Promise<Student>(async (resolve, reject) => {
			try {
				console.log('student: ' + JSON.stringify(student));

				let res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/students`, 'POST', student);

				console.log('registerStudent res: ', res);
				resolve(res);
			} catch (error) {
				reject(error);
			}
		});
	},
	deleteStudent: async (id: string) => {
		return new Promise<void>(async (resolve, reject) => {
			try {
				let res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/students/${id}`, 'DELETE');
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	},
	registerAllStudents: async (students: Student[]) => {
		return new Promise<Array<any> | boolean>(async (resolve, reject) => {
			try {
				// let students: Student[] = [];
				// studentClassStore.subscribe((data) => {
				// 	students = data;
				// });
				const responses = await Promise.all(
					students.map(async (item) => {
						try {
							const res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/students`, 'POST', item);
							return res;
						} catch (error) {
							console.error('Error signing up student: ', error);
							reject(false);
							return error;
						}
					})
				);
				resolve(responses);
			} catch (error) {
				reject(false);
				throw new Error('Error singing up student');
			}
		});
	}
};

const Teacher = {
	getTeacher: async (id: string) => {
		return new Promise<Teacher>(async (resolve, reject) => {
			if(debugMode){
				resolve({
					id: 'DEBUG-TEACHER',
					first_name: 'Debug',
					last_name: 'Teacher',
					agent_name: 'Debug Teacher',
					email: 'debug@teacher.edu',
					updated_at: {
						secs_since_epoch: 0,
						nanos_since_epoch: 0
					},
					school: 'Debug Academy'
				});
				return;
			}

			try {
				let res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/teachers/${id}`, 'GET');
				resolve(res);
			} catch (error) {
				reject(error);
			}
		});
	}
};

const TravelLog = {
	submitTravelLog: async (log: TravelLog) => {
		return new Promise<void>(async (resolve, reject) => {
			if(debugMode){
				resolve();
				return;
			}

			let token = get(accessTokenStore);
			log.student_id = token;

			try {
				let res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/travel-logs`, 'POST', log, token);
				resolve();
			} catch (error) {
				reject(error);
			}
		});
	},

	fetchPending: async () => {
		try {
			const res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/travel-logs/pending`, 'GET');
			console.log(res);
			pendingTravelLogStore.set(res);
		} catch (error) {
			alert('Error fetching travel logs');
			console.log(error);
		}
	},

	getTravelLogs: async (description: string | null = null, student_id: string = '') => {
		return new Promise<TravelLog[]>(async (resolve, reject) => {
			if(debugMode){
				resolve([]);
				return;
			}

			if (student_id === '') {
				student_id = get(accessTokenStore);
			}

			try {
				let url = `${PUBLIC_BACKEND_API_URL}/travel-logs?student_id=${student_id}`;

				if (description) {
					url += `&description=${description}`;
				}

				let res = await RequestFactory(url, 'GET');
				resolve(res);
			} catch (error) {
				reject(error);
			}
		});
	},


	handleImageSubmission: async (event: CustomEvent<any>, description: string) => {
		console.log(event);
		const images: HTMLImageElement[] | HTMLOrSVGElement = event.detail.images;
		let imageUrls: string[] = [];
		let isSuccess = false;

		try {
			//  Create a data URL from the images or SVG element
			const canvas = document.createElement('canvas');
			if (images instanceof Array) {
				for(let image of images) {
					if (image instanceof HTMLImageElement) {
						// Check if image src is a data URL already
						if (image.src.startsWith('data:')) {
							imageUrls.push(image.src);
							continue;
						}

						// Otherwise, draw the image on a canvas and get the data URL
						canvas.width = image.width;
						canvas.height = image.height;
						const ctx = canvas.getContext('2d');

						if (ctx) {
							ctx.drawImage(image, 0, 0);
							imageUrls.push(canvas.toDataURL('image/png'));
						} else {
							throw new Error('Failed to get canvas context');
						}
					}
				}
			} else if (images instanceof SVGElement) {
				// Handle the SVG element
				const svgData = new XMLSerializer().serializeToString(images);
				const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
				const url = URL.createObjectURL(svgBlob);
				imageUrls.push(url);
			} else if (images instanceof HTMLImageElement) {
				canvas.width = images.width;
				canvas.height = images.height;
				const ctx = canvas.getContext('2d');

				if (ctx) {
					ctx.drawImage(images, 0, 0);
					imageUrls.push(canvas.toDataURL('image/png'));
				} else {
					throw new Error('Failed to get canvas context');
				}
			} else {
				throw new Error('Invalid image type');
			}

			if (imageUrls.length === 0) {
				throw new Error('No images to submit');
			}

			//  Submit the data URL to the server
			await DataService.TravelLog.submitTravelLog(
				{
					description,
					data: imageUrls.length > 1 ? JSON.stringify(imageUrls) : imageUrls[0],
					status: 'complete',
				}
			);
			isSuccess = true;
		} catch (error) {
			isSuccess = false;
			console.error(error);
		}
		return isSuccess;
	},
};

/**
 * DataService is the manager for all of the communication between the frontend and the backend
 */
const DataService = {
	Auth,
	Data,
	Student,
	StudentProgress,
	Teacher,
	TravelLog,
};

export default DataService;

interface TravelLogBody {
	data: any;
	description: string;
}

function getTravelLogBody(data: string | string[], id: string, type: string): TravelLogBody {
	return {
		description: `level-zero-what-is-${id}-${type}`,
		data: data
	};
}

function generateImageOrSvgFileName(type: string) {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const extension = type === 'image' ? 'png' : 'svg';
	return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}.${extension}`;
}
