<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { Student } from '$lib/types/teacher-view/Student';
	import UploadCsvModal from '$lib/components/teacher-view/modals/UploadCSVModal.svelte';
	import StudentInfoModal from '$lib/components/teacher-view/modals/StudentInfoModal.svelte';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';
	import { generateQRCodes } from '$lib/utils/teacher-view/qr/QRGenerator';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import { studentClassStore, sessionTeacherID } from '$lib/utils/stores/store';
	import DataService from '$lib/utils/DataService';
	import { goto } from '$app/navigation';

	// @ts-ignore
	const { open } = getContext('simple-modal');

	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;

	let showStudentInfoModal = false;

	var newStudent: Student = {
		teacher_id: $sessionTeacherID, // TODO: read from session
		first_name: '',
		last_name: ''
		// age: 0
	};

	var showManual = false;

	function fetchStudents() {
		DataService.Data.fetchStudents($sessionTeacherID, true).then((res) => {
			$studentClassStore = res;
		});
		console.log('Fetched students: ', $studentClassStore);
	}

	// selection management
	let selectedStudents: Student[] = [];

	function toggleAllSelections(isSelected: boolean) {
		selectedStudents = isSelected ? [...$studentClassStore] : [];
		console.log(selectedStudents);
	}

	function deleteSelectedStudents() {
		let result = confirm('Are you sure you want to delete these students?');
		if (!result) return;

		selectedStudents.forEach((student) => {
			if (student.id) {
				DataService.Data.deleteStudent(student.id);
			}
		});

		$studentClassStore = $studentClassStore.filter(
			(student) => !selectedStudents.includes(student)
		);
		selectedStudents = [];
	}

	function generateSelectedAgentIDs() {
		try {
			generateQRCodes(selectedStudents);
			message = 'Agent IDs generated for selected students!';
			isSuccess = true;
		} catch (err) {
			message = 'Error generating agent IDs';
			isSuccess = false;
			throw new Error('Error generating agent IDs');
		}
		showFeedbackModal = true;
	}

	function logSelectedStudents() {
		console.log(selectedStudents);
	}

	const showAddManually = () => {
		showManual = !showManual;
	};

	const addStudentManually = async () => {
		const student = await DataService.Data.registerStudent(newStudent);
		$studentClassStore = [...$studentClassStore, student];

		// Clear form data
		newStudent = {
			teacher_id: $sessionTeacherID, // TODO: read from session
			first_name: '',
			last_name: ''
			// age: 0,
		};
	};

	const openCSVModal = () => {
		open(UploadCsvModal, {
			onParse
		});
	};

	const openStudentInfoModal = (student: Student) => {
		open(StudentInfoModal, { student: student });
	};

	const onParse = async (csv: Student[]): Promise<void> => {
		await DataService.Data.registerAllStudents(csv);
		$studentClassStore = [...$studentClassStore, ...csv];
	};

	function onFeedbackClose() {
		showFeedbackModal = false;
	}

	onMount(() => {
		DataService.Data.fetchTeacherID()
			.then((res) => {
				$sessionTeacherID = res;
				console.log('Teacher ID: ', $sessionTeacherID);
				newStudent.teacher_id = $sessionTeacherID;
				fetchStudents();
			})
			.catch((err) => {
				alert('You are not logged in!');
				goto('/teacher');
			});
	});
</script>

<svelte:head>
	<title>Create Class - CML Teacher</title>
</svelte:head>

<Tablet showMeter={false} showBottomButtons={false}>
	<div class="m-9">
		{#if showFeedbackModal}
			<FeedbackModal {message} {isSuccess} on:close={onFeedbackClose} />
		{/if}

		<div class="my-5 flex w-full items-center justify-center">
			<h1 class="text-4xl font-bold text-white">Your Students</h1>
		</div>

		{#if showManual}
			<div class="mt-8 flex flex-col items-center justify-center space-y-4">
				<div class="flex w-3/4 space-x-2 rounded bg-gray-100 p-3 shadow">
					<!-- <input
						type="text"
						placeholder="ID"
						class="input input-bordered w-full max-w-xs"
						bind:value={manualForm.id} /> -->
					<input
						type="text"
						placeholder="First name"
						class="input input-bordered w-1/3"
						bind:value={newStudent.first_name} />
					<input
						type="text"
						placeholder="Last name"
						class="input input-bordered w-1/3"
						bind:value={newStudent.last_name} />
					<input
						type="number"
						placeholder="Age"
						class="input input-bordered w-1/6"
						bind:value={newStudent.age} />
					<div class="ml-auto">
						<button class="btn btn-primary" on:click={addStudentManually}>Add student</button>
					</div>
				</div>
			</div>
		{/if}

		<div class="mt-8 flex items-center justify-center">
			<table class="w-3/4 space-y-4 rounded bg-blue-50 shadow">
				<tr class="text-left">
					<!-- <th class="px-5 py-5">ID</th> -->
					<th class="w-1/12 px-5">
						<input
							type="checkbox"
							class="checkbox-primary checkbox"
							on:change={(e) => toggleAllSelections(e.target.checked)}
							checked={$studentClassStore.length > 0 &&
								selectedStudents.length === $studentClassStore.length} />
					</th>
					<th class="w-2/6 px-5 py-5">Name</th>
					<th class="w-2/6 py-5">Updated At</th>
				</tr>

				{#each $studentClassStore as student}
					<tr
						class="cursor-pointer py-4 text-lg hover:shadow-inner hover:bg-blue-100"
						on:click={() => {
							console.log(student);
							openStudentInfoModal(student);
						}}>
						<td class="flex w-1/12 items-center px-5 py-2 text-left">
							<input
								type="checkbox"
								class="checkbox-primary checkbox"
								bind:group={selectedStudents}
								name={student.last_name}
								value={student}
								on:click|stopPropagation
								on:change={logSelectedStudents} />
						</td>
						<!-- <td class="px-5">{student.id}</td> -->
						<td class="w-2/6 px-5">{student.first_name} {student.last_name}</td>
						<td class="w-2/6"
							>{student.updated_at
								? new Date(student.updated_at.secs_since_epoch * 1000).toLocaleString()
								: 'NULL'}</td>
					</tr>
				{/each}
			</table>

			<div class="absolute bottom-4 left-4 flex flex-col items-start space-y-2">
				{#if selectedStudents.length > 0}
					<button
						class="rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-blue-600"
						on:click={generateSelectedAgentIDs}>
						Get QR Codes
					</button>

					<button
						class="rounded-full bg-red-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-red-600"
						on:click={deleteSelectedStudents}>
						Delete
					</button>
				{:else}
					<button
						class="rounded-full bg-green-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-green-600"
						on:click={showAddManually}>
						Add Student
					</button>

					<button
						class="rounded-full bg-orange-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-orange-600"
						on:click={openCSVModal}>
						Add by Upload
					</button>

					<button
						class="rounded-full bg-cyan-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-cyan-600"
						on:click={fetchStudents}>
						Refresh
					</button>
				{/if}
			</div>
		</div>
	</div>
</Tablet>
