<script lang="ts">
	import { goto } from '$app/navigation';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import type { Student } from '$lib/types/UserData';
	import { studentDataStore } from '$lib/utils/stores/store';
	import { fade } from 'svelte/transition';

	let student: Student;

	studentDataStore.subscribe((value) => {
		student = value;
	});
</script>

<Tablet>
<div class="flex h-full w-full flex-col  items-center justify-center">
	<div class="space-y-4 text-center font-mokoto text-white">
		<h2 class="text-5xl" in:fade|global={{ delay: 500 }}>WELCOME {student.first_name} {student.last_name}!</h2>
	</div>
	<button
		in:fade|global={{ delay: 1500 }}
		on:click={() => {
			goto('/introduction?page=1');
		}}
		class="mt-8 flex items-center justify-center gap-5 rounded-md bg-yellow-400 bg-opacity-75 px-4 py-3 align-middle font-mokoto shadow-md">
		<p class="text-3xl font-bold text-gray-800">Begin</p>
	</button>
</div>
</Tablet>