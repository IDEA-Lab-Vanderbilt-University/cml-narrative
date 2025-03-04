<script lang="ts">
	import type { TravelLog, TravelLogWithStudent } from '$lib/types/UserData';
	import { pendingTravelLogStore } from '$lib/utils/stores/store';
	import PendingCodinatorModal from '$lib/components/teacher-view/modals/PendingCodinatorModal.svelte';
	import { PUBLIC_BACKEND_API_URL } from '$env/static/public';
	import { RequestFactory } from '$lib/utils/network/RequestFactory';
	import { goto } from '$app/navigation';
	import { onMount, getContext } from 'svelte';
	import DataService from '$lib/utils/DataService';

	// @ts-ignore
	const { open } = getContext('simple-modal');


	async function logout() {
		try {
			const res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/logout`, 'POST');
			console.log(res);
			goto('/teacher');
		} catch (error) {
			alert('Error logging out');
			console.log(error);
		}
	}

	// Fetch pending travel logs on component mount
	onMount(() => {
		DataService.TravelLog.fetchPending();
	});
</script>

<svelte:head>
	<title>Codinator Submissions - CML Teacher</title>
</svelte:head>

<div class="m-9">
	<div class="my-5 flex w-full items-center justify-center">
		<h1 class="text-4xl font-bold text-white">Student Submissions</h1>
	</div>

	<div class="mt-8 flex items-center justify-center">
		<table class="w-3/4 space-y-4 rounded bg-blue-50 shadow">
			<tr class="text-left">
				<th class="w-1/2 px-5 py-5">Name</th>
				<th class="w-1/2 py-5">Updated At</th>
			</tr>

			{#each $pendingTravelLogStore as tl}
				<tr
					class="cursor-pointer py-4 text-lg hover:bg-blue-100 hover:shadow-inner"
					on:click={() => {
						console.log(tl);
						open(PendingCodinatorModal, { tl }, { styleWindow: { width: '90%' } });
					}}>
					<!-- <td class="px-5">{student.id}</td> -->
					<td class="w-1/2 px-5 py-2">{tl.student?.first_name} {tl.student?.last_name}</td>
					<td class="w-1/2"
						>{tl.updated_at
							? new Date(tl.updated_at.secs_since_epoch * 1000).toLocaleString()
							: 'NULL'}</td>
				</tr>
			{/each}
		</table>

		<div class="absolute bottom-5 left-4 flex flex-col items-start space-y-2">
			<button
				class="rounded-full bg-cyan-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-cyan-600"
				on:click={fetchPendingTravelLogs}>
				Refresh
			</button>

			<button
				class="rounded-full bg-green-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-green-600"
				on:click={() => {
					goto('/teacher/class-creation');
				}}>
				Class View
			</button>
		</div>

		<div class="absolute right-4 top-4 flex flex-col items-start space-y-2">
			<button
				class="rounded-full bg-red-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-red-600"
				on:click={logout}>
				Log Out
			</button>
		</div>
	</div>
</div>
