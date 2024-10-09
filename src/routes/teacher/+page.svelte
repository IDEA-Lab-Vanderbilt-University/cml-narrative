<script lang="ts">
	import { goto } from '$app/navigation';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import { PUBLIC_BACKEND_API_URL } from '$env/static/public';
	import { sessionTeacherID } from '$lib/utils/stores/store';
	import { RequestFactory } from '../../lib/utils/network/RequestFactory';

	let isSignUp = false;

	let email: string;
	let password: string;

	async function authenticateAndGoToCC() {
		console.log(email);
		console.log(password);
		try {
			const res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/login`, 'POST', {
				email: email,
				password: password
			});
			console.log(res);
			$sessionTeacherID = res.id;
			goto('/teacher/class-creation');
		} catch (error) {
			alert('Invalid credentials');
			console.log(error);
		}
	}
</script>

<Tablet showMeter={false}>
	<div class="flex h-full w-full flex-col items-center justify-center">
		<div class="my-5 flex w-full items-center justify-center">
			<h1 class="text-5xl font-bold text-white">Teacher Dashboard</h1>
		</div>
		<input
			type="email"
			placeholder="Email"
			class="mt-8 w-64 rounded-md bg-white px-4 py-3 shadow-md"
			bind:value={email} />
		<input
			type="password"
			placeholder="Password"
			class="mt-4 w-64 rounded-md bg-white px-4 py-3 shadow-md"
			bind:value={password} />

		<button
			on:click={authenticateAndGoToCC}
			class="mt-8 flex items-center justify-center gap-5 rounded-md bg-yellow-400 bg-opacity-75 px-4 py-3 align-middle font-mokoto shadow-md">
			<p class="text-3xl font-bold text-gray-800">Login</p>
		</button>
	</div>
</Tablet>
