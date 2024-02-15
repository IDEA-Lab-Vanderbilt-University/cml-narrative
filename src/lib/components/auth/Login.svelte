<script lang="ts">
	import { goto } from '$app/navigation';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';
	import { accessTokenStore, agentData } from '$lib/utils/stores/store';
	import { fade } from 'svelte/transition';
	import type { StudentAuthData } from '$lib/types/StudentData';
	import DataService from '$lib/utils/DataService';
	import type { UserData } from '$lib/types/UserData';

	const dispatch = createEventDispatcher();

	// let video: HTMLVideoElement;
	// let qrScanner: QrScanner | null = null;
	// let scanning = false;

	// onMount(async () => {
	// 	qrScanner = new QrScanner(
	// 		video,
	// 		(result: any) => {
	// 			console.log('QR code detected:', result);
	// 			// let student:StudentAuthData = JSON.parse(result);
	// 			// let user: UserData = getUserData(student);
	// 			// agentData.set(user);
	// 			// doSignIn(user);
	// 		},
	// 		{ returnDetailedScanResult: true }
	// 	);
	// });

	// onDestroy(() => {
	// 	qrScanner?.destroy();
	// 	qrScanner = null;
	// });

	// function start() {
	// 	qrScanner?.start();
	// 	scanning = true;
	// }

	// function stop() {
	// 	qrScanner?.stop();
	// 	scanning = false;
	// }

	import { Html5QrcodeScanner } from 'html5-qrcode';

	let html5QrcodeScanner: Html5QrcodeScanner;

	onMount(() => {
		html5QrcodeScanner = new Html5QrcodeScanner(
			'reader',
			{ fps: 10, qrbox: { width: 250, height: 250 }},
			/* verbose= */ false
		);
		html5QrcodeScanner.render(onScanSuccess, onScanFailure);
	});

	onDestroy(() => {
		html5QrcodeScanner.clear();
	});

	function onScanSuccess(decodedText: string, decodedResult: any) {
		// handle the scanned code as you like, for example:
		// console.log(`Code matched = ${decodedText}`, decodedResult);
		// alert(`Code matched = ${decodedText}`);
		let student: StudentAuthData = JSON.parse(decodedText);
		student.password = "password"
		let user: UserData = getUserData(student);
		console.log(user)
		agentData.set(user);
		doSignIn(user);
	}

	function onScanFailure(error: any) {
		// handle scan failure, usually better to ignore and keep scanning.
		// for example:
		// console.warn(`Code scan error = ${error}`);
	}

	async function doSignIn(user: UserData) {
		const res = await DataService.Auth.signIn(user);
		if (res) {
			accessTokenStore.set(res);
			alert("login successful")
			goto('/entry')
		} else {
			alert("login failed!")
		}
	}

	function getUserData(student: StudentAuthData): UserData {
		let user: UserData = {
			name: {
				first: student.firstName,
				last: student.lastName
			},
			age: 0,
			interests: [],
			agentName: '',
			email: student.email,
			password: student.password
		};
		return user;
	}
</script>

<div class="flex h-full w-full flex-col  items-center justify-center">
	<button
		class="absolute left-1/4 top-1/4"
		out:fade
		on:click={() => {
			dispatch('back');
		}}>
		<img src="/img/svg/dialog-arrow.svg" alt="" class="mt-8 h-14 rotate-180" />
	</button>

	<div id="reader" style="width: 350px; font-family:'Mokoto';  color: white;" />
	<!-- <button
		in:fade={{ delay: 1500 }}
		on:click={() => {
			goto('/introduction?page=1');
		}}
		class="font-mokoto mt-8 flex items-center justify-center gap-5 rounded-md bg-black bg-opacity-75 px-4 py-3 align-middle shadow-md">
		<p class="text-3xl font-bold text-white">Begin</p>
	</button> -->
</div>
