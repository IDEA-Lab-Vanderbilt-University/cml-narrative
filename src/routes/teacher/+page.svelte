<script lang="ts">
	import { goto } from '$app/navigation';
	import { PUBLIC_BACKEND_API_URL } from '$env/static/public';
	import DataService from '$lib/utils/DataService';
	import { RequestFactory } from '$lib/utils/network/RequestFactory';

	let showSignUp = false;

	let first_name: string;
	let last_name: string;
	let agent_name: string;
	let email: string;
	let password: string;
	let school: string;

	async function loginAndGoToCC() {
		try {
			const res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/login`, 'POST', {
				email: email,
				password: password
			});
			console.log(res);
			goto('/teacher/class-creation');
		} catch (error) {
			alert('Invalid credentials');
			console.log(error);
		}
	}

	async function signupAndGoToCC() {
		try {
			const res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/teachers`, 'POST', {
				first_name: first_name,
				last_name: last_name,
				agent_name: agent_name,
				email: email,
				password: password,
				school: school
			});
			console.log(res);
			goto('/teacher/class-creation');
		} catch (error) {
			alert('Invalid credentials');
			console.log(error);
		}
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center">
	<div class="my-5 flex w-full items-center justify-center">
		<h1 class="text-3xl font-bold text-white">Teacher Dashboard</h1>
	</div>

	{#if showSignUp}
		<input
			type="text"
			placeholder="First Name"
			class="mt-3 w-64 rounded-md bg-white px-4 py-3 shadow-md"
			bind:value={first_name} />

		<input
			type="text"
			placeholder="Last Name"
			class="mt-3 w-64 rounded-md bg-white px-4 py-3 shadow-md"
			bind:value={last_name} />

		<input
			type="text"
			placeholder="Agent Name"
			class="mt-3 w-64 rounded-md bg-white px-4 py-3 shadow-md"
			bind:value={agent_name} />

		<input
			type="text"
			placeholder="School"
			class="mt-3 w-64 rounded-md bg-white px-4 py-3 shadow-md"
			bind:value={school} />
	{/if}

	<input
		type="email"
		placeholder="Email"
		class="mt-3 w-64 rounded-md bg-white px-4 py-3 shadow-md"
		bind:value={email} />
	<input
		type="password"
		placeholder="Password"
		class="mt-3 w-64 rounded-md bg-white px-4 py-3 shadow-md"
		bind:value={password} />

	{#if showSignUp}
		<button
			on:click={signupAndGoToCC}
			class="mt-5 flex items-center justify-center gap-5 rounded-md bg-yellow-400 bg-opacity-75 px-4 py-2 align-middle font-mokoto shadow-md">
			<p class="text-3xl font-bold text-gray-800">Sign Up</p>
		</button>

		<button
			on:click={() => {
				showSignUp = false;
			}}
			class="mt-5 flex h-8 items-center justify-center gap-5 rounded-full bg-green-400 bg-opacity-75 px-4 py-3 align-middle shadow-md">
			<p class="text-l font-bold text-gray-800">Existing Teacher Log In</p>
		</button>
	{:else}
		<button
			on:click={loginAndGoToCC}
			class="mt-8 flex items-center justify-center gap-5 rounded-md bg-yellow-400 bg-opacity-75 px-4 py-3 align-middle font-mokoto shadow-md">
			<p class="text-3xl font-bold text-gray-800">Login</p>
		</button>

		<button
			on:click={() => {
				showSignUp = true;
			}}
			class="mt-8 flex h-8 items-center justify-center gap-5 rounded-full bg-green-400 bg-opacity-75 px-4 py-3 align-middle shadow-md">
			<p class="text-l font-bold text-gray-800">New Teacher Sign Up</p>
		</button>
	{/if}

	<button
		on:click={() => {
			goto('/teacher/forgot-password');
		}}
		class="mt-5 flex h-8 items-center justify-center gap-5 rounded-full bg-blue-400 bg-opacity-75 px-4 py-3 align-middle shadow-md">
		<p class="text-l font-bold text-gray-800">Forgot Password</p>
	</button>

	<button id="return-home" on:click={() => goto('/')} class="mt-10 flex items-center justify-center gap-2 rounded-md bg-white bg-opacity-75 px-4 py-2 align-middle font-mokoto shadow-md">
		Return to SPOT Home
		<img src="/img/logos/SPOT-dots.svg" alt="SPOT Logo" class="inline-block h-6 w-6 ml-2" />
	</button>
</div>

<style>
	#return-home {
		box-shadow: 0 0 6px rgb(163, 191, 212);
		transition: all 0.2s ease-in-out;
	}

	#return-home:hover {
		transform: scale(1.05);
	}

	#return-home:active {
		transform: scale(0.95);
	}
</style>
