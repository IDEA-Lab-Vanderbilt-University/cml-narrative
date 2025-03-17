<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { TravelLogWithStudent } from '$lib/types/UserData';
	import { PUBLIC_BACKEND_API_URL } from '$env/static/public';
	import { RequestFactory } from '$lib/utils/network/RequestFactory';
	import { pendingTravelLogStore } from '$lib/utils/stores/store';

	// @ts-ignore
	const { close } = getContext('simple-modal');

	export let tl: TravelLogWithStudent;

	let rejectionComment = '';

	async function approveTravelLog() {
		try {
			const res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/travel-logs/${tl.id}`, 'PUT', {
				id: tl.id,
				status: 'approved'
			});
			console.log(res);
			pendingTravelLogStore.update((logs) => logs.filter((log) => log.id !== tl.id));
			close();
		} catch (error) {
			alert('Error approving submission');
			console.log(error);
		}
	}

	async function rejectTravelLog() {
		try {
			if (!rejectionComment) {
				alert('Please provide suggestions for revision');
				return;
			}
			let dataObj = JSON.parse(tl.data);
			dataObj.rejectionComment = rejectionComment;

			const res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/travel-logs/${tl.id}`, 'PUT', {
				id: tl.id,
				status: 'rejected',
				data: JSON.stringify(dataObj)
			});
			console.log(res);
			pendingTravelLogStore.update((logs) => logs.filter((log) => log.id !== tl.id));
			rejectionComment = '';
			close();
		} catch (error) {
			alert('Error rejecting submission');
			console.log(error);
		}
	}

	let submissionType = 'text';

	onMount(() => {
		if (tl.data) {
			// Check if the data is a URL
			if (tl.data.startsWith('http://') || tl.data.startsWith('https://') || tl.data.startsWith('data:image/')) {
				submissionType = 'image';
			}
		}
	});
</script>

<div class="grid grid-cols-5 items-center justify-center">
	{#if submissionType === 'text'}
		<div class="col-span-4 flex h-full flex-col items-center justify-center">
			<h1 class="font-cantora text-2xl font-bold">Codinator Submission</h1>
			<p class="text-md mt-2 w-3/4 text-center">{tl.data}</p>
		</div>
	{:else if submissionType === 'image'}
		<div class="col-span-4 flex h-full flex-col items-center justify-center">
			<h1 class="font-cantora text-2xl font-bold">Codinator Submission</h1>
			<img
				src={tl.data}
				alt="Codinator Submission"
				class="h-full w-full object-contain" />
		</div>
	{/if}

	<div class="col-span-1 flex h-full flex-row items-center justify-center text-center">
		<div class="flex flex-col justify-center gap-10">
			<button
				class="rounded-full bg-green-500 px-4 py-2 font-cantora text-2xl font-bold text-white shadow-lg hover:bg-green-600"
				on:click={approveTravelLog}>
				Approve
			</button>
			<h1 class="font-cantora text-2xl font-bold">- OR -</h1>
			<div class="flex flex-col gap-4">
				<textarea
					class="text-md h-40 rounded-lg border-2 p-2 text-black"
					placeholder="Suggest revision..."
					bind:value={rejectionComment} />
				<button
					class="rounded-full bg-red-500 px-4 py-2 font-cantora text-2xl font-bold text-white shadow-lg hover:bg-red-600"
					on:click={rejectTravelLog}>
					Send Back
				</button>
			</div>
		</div>
	</div>
</div>

<style>
</style>
