<script lang="ts">
	import { getContext } from 'svelte';
	import type { Student } from '$lib/types/teacher-view/Student';
	import UploadCsvModal from '$lib/components/teacher-view/modals/UploadCSVModal.svelte';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';
	import { generateQRCodes } from '$lib/utils/teacher-view/qr/QRGenerator';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import { studentClassStore } from '$lib/utils/stores/store';
	import DataService from '$lib/utils/DataService';

	// @ts-ignore
	const { open } = getContext('simple-modal');

	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;

	var manualForm: Student = {
		id: 0,
		firstName: '',
		lastName: '',
		email: ''
	};

	var showManual = false;

	const showAddManually = () => {
		showManual = !showManual;
	};

	const addStudentManually = () => {
		// Add the current form data to the students array
		$studentClassStore = [...$studentClassStore, manualForm];

		// Clear form data
		manualForm = {
			id: 0,
			firstName: '',
			lastName: '',
			email: ''
		};
	};

	const openCSVModal = () => {
		open(UploadCsvModal, {
			onParse
		});
	};

	const onParse = (csv: Student[]): void => {
		$studentClassStore = [...$studentClassStore, ...csv];
	};

	const generateAgentIDs = () => {
		try {
			generateQRCodes($studentClassStore);
			message = 'Agent IDs generated!';
			isSuccess = true;
		} catch (err) {
			message = 'Error generating agent IDs';
			isSuccess = false;
			throw new Error('Error generating agent IDs');
		}
		showFeedbackModal = true;
	};

	const clearStudents = () => {
		$studentClassStore = [];
	};

	const submitToDB = async () => {
		try {
			const isOK = await DataService.Data.signUpStudentsToClass();
			if (!isOK) {
				throw new Error('Error adding agents to DB. Please try again.');
			}
			generateAgentIDs();
			message = 'Registration successful! QR codes generated!';
			isSuccess = true;
		} catch (err) {
			console.log('im here');
			message = 'Error adding agents to DB. Please try again.';
			isSuccess = false;
		}
		showFeedbackModal = true;
	};

	function onFeedbackClose() {
		showFeedbackModal = false;
	}

	const removeStudent = (id: number) => {
		$studentClassStore = $studentClassStore.filter((student) => student.id !== id);
	};

</script>

<svelte:head>
	<title>Create Class - CML Teacher</title>
</svelte:head>

<Tablet>
	<div class="m-9">
		{#if showFeedbackModal}
			<FeedbackModal {message} {isSuccess} on:close={onFeedbackClose} />
		{/if}
		<div class="my-5 flex w-full items-center justify-center">
			<button class="btn btn-primary mx-5 my-5" on:click={openCSVModal}>Add by Upload</button>
			<button class="btn btn-secondary mx-5" on:click={showAddManually}>Add Manually</button>
			<button class="btn btn-accent mx-5" on:click={generateAgentIDs}>Download QR Codes</button>
			<button class="btn btn-primary mx-5" on:click={clearStudents}>Clear Students</button>
			<button class="btn btn-secondary mx-5" on:click={submitToDB}
				>Register & Generated QR Codes</button>
		</div>

		{#if showManual}
			<div class="mt-8 flex flex-col  space-y-4 rounded bg-gray-100 p-3 shadow">
				<div class="flex space-x-2">
					<input
						type="text"
						placeholder="ID"
						class="input input-bordered w-full max-w-xs"
						bind:value={manualForm.id} />
					<input
						type="text"
						placeholder="First name"
						class="input input-bordered w-full max-w-xs"
						bind:value={manualForm.firstName} />
					<input
						type="text"
						placeholder="Last name"
						class="input input-bordered w-full max-w-xs"
						bind:value={manualForm.lastName} />
					<input
						type="text"
						placeholder="Email"
						class="input input-bordered w-full max-w-xs"
						bind:value={manualForm.email} />
				</div>
				<div class="ml-auto">
					<button class="btn btn-primary" on:click={addStudentManually}>Add student</button>
				</div>
			</div>
		{/if}

		<table class="mt-8 w-full space-y-4 rounded bg-blue-50 shadow">
			<tr class="text-left">
				<th class="px-5 py-5">ID</th>
				<th class="py-5">Name</th>
				<th class="py-5">Email</th>
				<th class="w-1/12 py-5">Action</th>
			</tr>

			{#each $studentClassStore as student}
				<tr class="py-4 text-lg">
					<td class="px-5">{student.id}</td>
					<td>{student.firstName} {student.lastName}</td>
					<td>{student.email}</td>
					<td
						><button
							on:click={() => removeStudent(student.id)}
							class="rounded-md bg-red-500 px-4 py-1">x</button
						></td>
				</tr>
			{/each}
		</table>
	</div>
</Tablet>
