<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount, onDestroy } from 'svelte';
	import { studentDataStore, studentProgressStore } from '$lib/utils/stores/store';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';
	import DataService from '$lib/utils/DataService';
	import type { Student, StudentProgress } from '$lib/types/UserData';
	import { languageStore } from '$lib/utils/stores/languageStore';
	import { getTranslation, type Language } from '$lib/utils/translations';

	import QrScanner from "qr-scanner";

	export let redirectOverride: string | null = null;

	let currentLanguage: Language = 'en';
	languageStore.subscribe((lang: Language) => {
		currentLanguage = lang;
	});

	let qrScanner: QrScanner | null = null;
	let qrVideo: HTMLVideoElement | null = null;
	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;
	let tempProgress: StudentProgress = {
		last_visited: '/entry',
	};

	let fileInput: HTMLInputElement | null = null;

	async function onFileChange(event: Event) {
		const input = event.target as HTMLInputElement;
		if (input && input.files && input.files[0]) {
			const file = input.files[0];
			try {
				const result = await QrScanner.scanImage(file, { returnDetailedScanResult: true });
				// result is either a string or a ScanResult object
				if (typeof result === 'string') {
					onScanSuccess(result, result);
				} else if (result && typeof result === 'object' && 'data' in result) {
					onScanSuccess(result.data, result);
				} else {
					message = getTranslation(currentLanguage, 'login.invalidQrCode');
					isSuccess = false;
					showFeedbackModal = true;
				}
			} catch (error) {
				message = getTranslation(currentLanguage, 'login.invalidQrCode');
				isSuccess = false;
				showFeedbackModal = true;
				console.log(error || 'No QR code found.');
			}
		}
	}

	onMount(async () => {
		try{
			qrScanner = new QrScanner(
				qrVideo as HTMLVideoElement,
				(result: QrScanner.ScanResult) => {
					onScanSuccess(result.data, result.data);
				},
				{
					returnDetailedScanResult: true,
					highlightScanRegion: true,
					highlightCodeOutline: true,
				}
			);
			await qrScanner.start();
		} catch (error) {
			console.error('Error starting QR scanner:', error);
		}
	});

	onDestroy(() => {
		stopScanner();
	});

	function stopScanner() {
		if (qrScanner) {
			qrScanner.stop();
			qrScanner.destroy();
			qrScanner = null;
		}
	}

	async function onScanSuccess(decodedText: string, decodedResult: any) {
		console.log('QR Code scanned:', decodedText);
		let student: Student = JSON.parse(decodedText);
		doSignIn(student);
	}

	async function doSignIn(user: Student) {
		try {
			if (!user.id) {
				isSuccess = false;
				message = getTranslation(currentLanguage, 'login.invalidQrCode');
				showFeedbackModal = true;
				return;
			}

			let serverUser = await DataService.Auth.signIn(user.id);
			message = getTranslation(currentLanguage, 'login.loginSuccessful');
			isSuccess = true;

			// initialize store
			console.log(user);
			studentDataStore.set(serverUser);

			if (!redirectOverride) {
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
			}
		} catch (err) {
			message = getTranslation(currentLanguage, 'login.loginFailed');
			isSuccess = false;
			console.log(err);
			console.log('login failed');
		}
		showFeedbackModal = true;
	}

	async function onFeedbackClose() {
		if (isSuccess) {
			if (redirectOverride) {
				await goto(redirectOverride);
			} else {
				await goto(tempProgress.last_visited || '/entry');
			}
		}
		showFeedbackModal = false;
	}
</script>

<div class="flex h-full w-full flex-col  items-center justify-center">
   {#if showFeedbackModal}
	   <FeedbackModal {message} {isSuccess} on:close={onFeedbackClose} />
   {/if}
   <div id="reader">
	   <video bind:this={qrVideo} style="width: 100%; height: auto;" class="mt-3 mb-3"><track kind="captions" /></video>
	   <p class="text-center text-lg font-bold">{getTranslation(currentLanguage, 'login.scanQrCode')}</p>
	   <p class="text-center text-sm">{getTranslation(currentLanguage, 'login.ensureWellLit')}</p>
	   <div class="flex flex-col items-center mt-4">
		   <button type="button" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-2" on:click={() => fileInput && fileInput.click()}>
			   {getTranslation(currentLanguage, 'login.scanFromFile')}
		   </button>
		   <input type="file" accept="image/*" bind:this={fileInput} class="hidden" on:change={onFileChange} />
	   </div>
   </div>
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