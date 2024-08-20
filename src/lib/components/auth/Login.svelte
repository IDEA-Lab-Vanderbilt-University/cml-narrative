<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { studentDataStore, userDataStore } from '$lib/utils/stores/store';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';
	import { fade } from 'svelte/transition';
	import DataService from '$lib/utils/DataService';
	import type { StudentData, UserData, UserProgress } from '$lib/types/UserData';

	const dispatch = createEventDispatcher();
	import { Html5QrcodeScanner } from 'html5-qrcode';

	let html5QrcodeScanner: Html5QrcodeScanner;
	let user: UserData;
	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;

	onMount(() => {
		html5QrcodeScanner = new Html5QrcodeScanner(
			'reader',
			{ fps: 10, qrbox: { width: 250, height: 250 } },
			/* verbose= */ false
		);
		html5QrcodeScanner.render(onScanSuccess, onScanFailure);
	});

	onDestroy(() => {
		html5QrcodeScanner.clear();
	});

	function onScanSuccess(decodedText: string, decodedResult: any) {
		// handle the scanned code as you like, for example:
		let student: StudentData = JSON.parse(decodedText);
		student.password = 'password';

		user = getUserData(student);

		// initialize store
		studentDataStore.set(student);
		console.log(user);

		doSignIn(user);
	}

	function onScanFailure(error: any) {
		// handle scan failure, usually better to ignore and keep scanning.
		// for example:
		// console.warn(`Code scan error = ${error}`);
	}

	async function doSignIn(user: UserData) {
		try {
			let serverUser = await DataService.Auth.signIn(user);
			message = 'Login Successful!';
			isSuccess = true;

			// get local and server user progress
			let localUserProgress: UserProgress = await getLocalUserProgress(user);
			let serverUserProgress = serverUser.progress;
			console.log('server user progress: ', serverUserProgress.lastUpdated);
			console.log('local user progress: ', localUserProgress.lastUpdated);
			let latestUserProgress = await compareAndUpdateUserProgress(
				localUserProgress,
				serverUserProgress,
				serverUser
			);

			// console.log here
			console.log(serverUserProgress);

			user.progress = latestUserProgress;
			userDataStore.update((data) => {
				data.progress = latestUserProgress;
				return data;
			});

			console.log('is user updated?', user);
			console.log(user.progress?.subLevelLabel);
		} catch (err) {
			message = 'Login Failed!';
			isSuccess = false;
			console.log(err);
			console.log('login failed');
		}
		showFeedbackModal = true;
	}

	async function getLocalUserProgress(user: UserData): Promise<UserProgress> {
		return new Promise((resolve, reject) => {
			userDataStore.subscribe((data) => {
				// compare local user email and agentStore email
				if (user.email == data.email) {
					console.log('local user progress - email same');
					resolve(data.progress);
				} else {
					console.log('local user progress - email not same');
					resolve({
						level: 0,
						levelLabel: '',
						subLevel: 0,
						subLevelLabel: '',
						lastUpdated: undefined
					});
				}
			});
		});
	}

	async function compareAndUpdateUserProgress(
		localUserProgress: UserProgress,
		serverUserProgress: UserProgress,
		serverUser: UserData
	): Promise<UserProgress> {
		// if server is latest update local
		// if local is latest and local user matches the server user, update server
		// if local doesn't exist get server, update local and go to entry
		if (!localUserProgress.lastUpdated) {
			userDataStore.set(serverUser);
			return serverUserProgress;
		} else {
			// @ts-ignore
			if (localUserProgress.lastUpdated > new Date(serverUserProgress.lastUpdated)) {
				console.log('local is latest.');
				await DataService.Data.updateUserProgress(localUserProgress);
				console.log('check if progress is updated on server. local is latest.');
				return localUserProgress;
			} else {
				userDataStore.set(serverUser);
				console.log('server is latest.');
				return serverUserProgress;
			}
		}
	}

	function getUserData(student: StudentData): UserData {
		let user: UserData = {
			name: {
				first: student.firstName,
				last: student.lastName
			},
			age: 0,
			interests: [],
			agentName: '',
			email: student.email,
			password: student.password,
			progress: {
				level: 0,
				levelLabel: '',
				subLevel: 0,
				subLevelLabel: '',
				lastUpdated: undefined
			},
			avatarImg: ''
		};
		return user;
	}

	async function onFeedbackClose() {
		if (isSuccess) {
			await goto(user.progress.subLevelLabel || '/entry');
		}
		showFeedbackModal = false;
	}
</script>

<div class="flex h-full w-full flex-col  items-center justify-center">
	{#if showFeedbackModal}
		<FeedbackModal {message} {isSuccess} on:close={onFeedbackClose} />
	{/if}
	<button
		class="absolute left-1/4 top-1/4"
		out:fade
		on:click={() => {
			dispatch('back');
		}}>
		<img src="/img/svg/dialog-arrow.svg" alt="" class="mt-8 h-14 rotate-180" />
	</button>

	<div id="reader"/>
</div>

<style>
	div#reader {
		background-color: white;
		width: 350px;
		font-family: 'Mokoto';
		color: black;
		border-radius: 10px;
		box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.53);
		padding: 0 10px !important;
	}
</style>