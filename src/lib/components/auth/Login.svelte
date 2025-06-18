<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { studentDataStore, studentProgressStore } from '$lib/utils/stores/store';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';
	import { fade } from 'svelte/transition';
	import DataService from '$lib/utils/DataService';
	import type { Student, StudentProgress } from '$lib/types/UserData';

	const dispatch = createEventDispatcher();
	import { Html5QrcodeScanner } from 'html5-qrcode';
	import { RequestFactory } from '$lib/utils/network/RequestFactory';

	let html5QrcodeScanner: Html5QrcodeScanner;
	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;
	let tempProgress: StudentProgress = {
		last_visited: '/entry',
	};

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

	async function onScanSuccess(decodedText: string, decodedResult: any) {
		let student: Student = JSON.parse(decodedText);
		doSignIn(student);
	}

	function onScanFailure(error: any) {
		// handle scan failure, usually better to ignore and keep scanning.
		// for example:
		console.warn(`Code scan error = ${error}`);
	}

	async function doSignIn(user: Student) {
		try {
			if (!user.id) {
				isSuccess = false;
				message = 'Invalid QR Code';
				showFeedbackModal = true;
				return;
			}

			let serverUser = await DataService.Auth.signIn(user.id);
			message = 'Login Successful!';
			isSuccess = true;

			// initialize store
			console.log(user);
			studentDataStore.set(serverUser);

			// Create progress if it doesn't exist
			if (!serverUser.progress) {
				let defaultProgress = {
					student_id: user.id,
					badge_count: 0,
					megajoules: 0,
					updated_at: {
						secs_since_epoch: new Date().getTime() / 1000,
						nanos_since_epoch: 0	
					},
					last_visited: '/entry'
				};

				serverUser.progress = await DataService.StudentProgress.createProgress(defaultProgress);

				// Update user
				studentDataStore.update((data) => {
					data.progress = serverUser.progress;
					return data;
				});
			}

			tempProgress = serverUser.progress;
			studentProgressStore.set(serverUser.progress);

		} catch (err) {
			message = 'Login Failed!';
			isSuccess = false;
			console.log(err);
			console.log('login failed');
		}
		showFeedbackModal = true;
	}

	async function onFeedbackClose() {
		if (isSuccess) {
			await goto(tempProgress.last_visited || '/entry');
		}
		showFeedbackModal = false;
	}
</script>

<div class="flex h-full w-full flex-col  items-center justify-center">
	{#if showFeedbackModal}
		<FeedbackModal {message} {isSuccess} on:close={onFeedbackClose} />
	{/if}
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