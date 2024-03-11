<script lang="ts">
	import { goto } from '$app/navigation';
	import Tablet from '$lib/components/tablet/Tablet.svelte';

	let email: string;
	let password: string;

	const authenticateAndGoToCC = () => {
        console.log("im-here")
        console.log(email)
        console.log(password)
		try {
            if(email == "sriharsha.9554@gmail.com" && password == "password") {
                goto('teacher/class-creation')
            } else {
                throw new Error("Invalid credentials")
            }
		} catch (error) {
            alert("Invalid credentials")
			console.log(error);
		}
	};
</script>

<Tablet>
	<div class="flex h-full w-full flex-col  items-center justify-center">
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
