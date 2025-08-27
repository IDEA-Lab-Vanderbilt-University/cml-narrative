<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { Student, Teacher } from '$lib/types/UserData';
	import UploadCsvModal from '$lib/components/teacher-view/modals/UploadCSVModal.svelte';
	import StudentInfoModal from '$lib/components/teacher-view/modals/StudentInfoModal.svelte';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';
	import { generateQRCodes } from '$lib/utils/teacher-view/qr/QRGenerator';
	import { studentClassStore, sessionTeacherID } from '$lib/utils/stores/store';
	import DataService from '$lib/utils/DataService';
	import { goto } from '$app/navigation';

	import { PUBLIC_BACKEND_API_URL } from '$env/static/public';
	import { RequestFactory } from '$lib/utils/network/RequestFactory';
	import ManualStudentEntry from '$lib/components/teacher-view/ManualStudentEntry.svelte';
	import StudentEditModal from '$lib/components/teacher-view/modals/StudentEditModal.svelte';

	// @ts-ignore
	const { open } = getContext('simple-modal');

	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;

	var newStudent: Student = {
		teacher_id: $sessionTeacherID, // TODO: read from session
		first_name: '',
		last_name: '',
		age: undefined,
	};

	var teacher: Teacher;

	var showManual = false;

	let editingStudent: Student | null = null;

	let classes: string[] = [];
	let selectedClass: string | null = null;
	let isAdmin = false;

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
		// If opening the manual entry and a class is selected, default it on the new student
		if (showManual && selectedClass && selectedClass !== '') {
			// @ts-ignore - in case Student type doesn't include class_name yet
			newStudent = { ...newStudent, class_name: selectedClass } as any;
		}
	};

	const addStudentManually = async () => {
		const student = await DataService.Data.registerStudent(newStudent);
		$studentClassStore = [...$studentClassStore, student];

		// Clear form data
		newStudent = {
			teacher_id: $sessionTeacherID, // TODO: read from session
			first_name: '',
			last_name: '',
			age: undefined,
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
		if(selectedClass != null) {
			csv = csv.map(student => ({ ...student, class_name: selectedClass }));
		}

		let responses = await DataService.Data.registerAllStudents(csv);

		if (responses === false) {
			message = 'Error uploading CSV file';
			isSuccess = false;
			showFeedbackModal = true;
			return;
		}

		console.log('CSV upload responses: ', responses);
		
		$studentClassStore = [...$studentClassStore, ...responses];
	};

	function onFeedbackClose() {
		showFeedbackModal = false;
	}

	function openStudentEditModal(student: Student) {
		editingStudent = student;
	}

	function handleEditSave(updatedStudent: Student) {
		// Update the student in the store
		$studentClassStore = $studentClassStore.map(s => s.id === updatedStudent.id ? updatedStudent : s);
		DataService.Student.updateStudent(updatedStudent); // Persist change
		editingStudent = null;
	}

	function handleEditCancel() {
		editingStudent = null;
	}
	
	let showHidden = false;

	const downloadSelectedStudents = async () => {
		// Fetch students' travel logs
		const travelLogs = selectedStudents.map((student) => {
			return DataService.TravelLog.getTravelLogs(null, student.id);
		});
		
		// Wait for all travel logs to be fetched
		const logs = await Promise.all(travelLogs);
		console.log('Travel logs: ', logs);

		let csvContent = 'data:text/csv;charset=utf-8,' 
				+ 'ID, Description, Status, Data, Updated At\n';

		// Create a CSV file from each student's travel logs
		for (let i = 0; i < logs.length; i++) {
			const student = selectedStudents[i];
			const travelLog = logs[i].map((log) => {
				return [
					student.id,
					log.description,
					log.status,
					'"' + log.data.replaceAll('"', '""') + '"',
					'"' + (log.updated_at ? new Date(log.updated_at.secs_since_epoch * 1000).toLocaleString() : 'NULL') + '"'
				];
			});

			if(travelLog.length === 0) {
				console.warn(`No travel logs found for ${student.first_name} ${student.last_name}, skipping...`);
				continue;
			}

			// Convert travel log to CSV format
			csvContent += travelLog.map(e => e.join(",")).join("\n");
		}

		// Create a link element to download the CSV file
		const encodedUri = encodeURI(csvContent);
		const link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", `${teacher.school}_${teacher.last_name}_SPOT_logs_${new Date().toISOString().slice(0, 10)}.csv`);
		document.body.appendChild(link); // Required for FF

		// Download the CSV file
		link.click();
	};

	function renameClass(oldClassName: string) {
		const newName = prompt('Enter a new name for the class:', oldClassName);
		if (!newName || newName.trim() === '') {
			alert('Class name cannot be empty');
			return;
		}

		if (classes.includes(newName)) {
			alert('Class name already exists');
			return;
		}

		if (oldClassName === newName) {
			alert('Class name is the same, no changes made');
			return;
		}

		// Update the class name for each student
		let studentsToUpdate = $studentClassStore.filter(student => student.class_name === oldClassName);
		studentsToUpdate.forEach(student => {
			student.class_name = newName;
			DataService.Student.updateStudent(student); // Persist change
		});
		$studentClassStore = $studentClassStore.map(s => s.class_name === oldClassName ? { ...s, class_name: newName } : s);
		classes = classes.map(c => c === oldClassName ? newName : c);
		selectedClass = newName; // Update selected class if it was the renamed one

	}

	onMount(() => {
		DataService.Data.fetchTeacherID()
			.then(async (res) => {
				$sessionTeacherID = res;
				teacher = await DataService.Teacher.getTeacher($sessionTeacherID);
				console.log('Teacher ID: ', $sessionTeacherID);
				newStudent.teacher_id = $sessionTeacherID;

				DataService.Data.fetchIsTeacherAdmin()
					.then((result) => {
						isAdmin = result;
						if (isAdmin) {
							console.log('Teacher is admin');
						} else {
							console.log('Teacher is not admin');
						}
					})
					.catch((err) => {
						console.error('Error checking if teacher is admin: ', err);
					});

				DataService.Teacher.getClasses($sessionTeacherID)
					.then((c) => {
						classes = c.filter((className) => className !== ''); // Filter out empty class names
						console.log('Classes: ', classes);
					})
					.catch((err) => {
						console.error('Error fetching classes: ', err);
					});
					
				fetchStudents();
			})
			.catch((err) => {
				alert('You are not logged in!');
				goto('/teacher');
			});

		
		
		// Keyboard event listener for toggling hidden elements with shift
		document.addEventListener('keydown', (event) => {
			if (event.shiftKey) {
				showHidden = true;
			}
		});

		document.addEventListener('keyup', (event) => {
			if (!event.shiftKey) {
				showHidden = false;
			}
		});
	});

	let studentsFiltered = [];

	// Filter students based on selected class
	$: studentsFiltered = $studentClassStore.filter(student => {
		return !selectedClass || (student.class_name ?? '') === selectedClass;
	});
</script>

<svelte:head>
	<title>Create Class - CML Teacher</title>
</svelte:head>

<div class="m-9">
	{#if showFeedbackModal}
		<FeedbackModal {message} {isSuccess} on:close={onFeedbackClose} />
	{/if}

	{#if editingStudent}
		<div class="modal-overlay">
			<div class="modal-debug-container">
				<h2 style="color:black;">DEBUG: Modal should be below</h2>
				<StudentEditModal
					student={editingStudent}
					onSave={handleEditSave}
					onCancel={handleEditCancel}
					{classes}
				/>
			</div>
		</div>
	{/if}

	<div class="my-5 flex w-full items-center justify-center flex-col gap-5">
		<h1 class="text-4xl font-bold text-white">Your Students</h1>

		{#if showManual}
			<ManualStudentEntry {newStudent} onAdd={addStudentManually} classes={classes} selectedClass={selectedClass} />
		{/if}

		<div class="flex w-3/4 items-center justify-between">
			<div class="flex items-center gap-2 w-full">
				<!-- Tabs replacing the select dropdown -->
				<div class="tabs tabs-boxed overflow-x-auto no-scrollbar w-full whitespace-nowrap">
					<button
						class="tab whitespace-nowrap text-sm md:text-base {selectedClass === '' || selectedClass === null ? 'tab-active' : ''}"
						on:click={() => (selectedClass = '')}
						aria-selected={selectedClass === '' || selectedClass === null}
						role="tab"
						>
						All Classes
					</button>
					{#each classes as c}
							<button
								class="tab whitespace-nowrap text-sm md:text-base {selectedClass === c ? 'tab-active' : ''}"
								on:click={() => (selectedClass = c)}
								aria-selected={selectedClass === c}
								role="tab"
								>
								{c}
								<button
									class="btn btn-ghost btn-xs"
									on:click={(e) => { e.stopPropagation(); renameClass(c); }}
									aria-label={`Rename class ${c}`}
								>
									✏️
								</button>
							</button>
					{/each}
				</div>
			</div>

			<button
				class="btn btn-secondary ml-4 flex-shrink-0"
				on:click={() => {
					const name = prompt('Enter a new class name:');
					if (!name) return;
					const trimmed = name.trim();
					if (!trimmed) return;
					if (!classes.includes(trimmed)) {
						classes = [...classes, trimmed];
					}
					selectedClass = trimmed;
				}}>
				Add Class
			</button>
		</div>

		<table class="w-3/4 rounded bg-blue-50 shadow" style="max-height: {showManual ? '50vh' : '60vh'}; overflow-y: scroll; display: block;">
			<thead class="text-left table">
				<tr class="text-left">
					<!-- <th class="px-5 py-5">ID</th> -->
					<th class="w-1/12 px-5">
						<input
							type="checkbox"
							class="checkbox-primary checkbox"
							on:change={(e) => toggleAllSelections(e.target instanceof HTMLInputElement && e.target.checked)} 
							checked={$studentClassStore.length > 0 &&
								selectedStudents.length === $studentClassStore.length} />
					</th>
					<th class="w-2/6 px-5 py-5">Name</th>
					<th class="w-2/6 py-5">Updated At</th>
					<th class="">
						
					</th>
				</tr>
			</thead>
			<tbody class="w-full table">
			{#each studentsFiltered as student}
				<tr
					class="w-full cursor-pointer text-lg hover:bg-blue-100 hover:shadow-inner"
					on:click={() => {
						console.log(student);
						openStudentInfoModal(student);
					}}>
					<td class="w-1/12 items-center px-5 table-cell text-left">
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
							<td>
								<button
									class="btn btn-primary"
									on:click={(e) => {
										e.stopPropagation();
										openStudentInfoModal(student);
									}}>
									View
								</button>
								<button
									class="btn btn-secondary"
									on:click={(e) => {
										e.stopPropagation();
										openStudentEditModal(student);
									}}>
									Edit
								</button>
							</td>
				</tr>
			{/each}
			</tbody>
		</table>

		<div class="fixed bottom-5 left-4 flex flex-col items-start space-y-2">
			{#if selectedStudents.length > 0}
				<button
					class="rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-blue-600"
					on:click={generateSelectedAgentIDs}>
					Get QR Codes
				</button>

				{#if showHidden}
					<button
						class="rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-blue-600"
						on:click={downloadSelectedStudents}>
						Download Data
					</button>
				{/if}

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

				<button
					class="rounded-full bg-yellow-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-yellow-600"
					on:click={() => {
						goto('/teacher/student-submissions');
					}}>
					Student Submissions
				</button>
			{/if}
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

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 9999;
		background: rgba(0,0,0,0.3); /* optional: dim background */
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.modal-debug-container {
		background: white;
		border: 2px solid red;
		padding: 2rem;
		border-radius: 1rem;
		min-width: 300px;
		min-height: 200px;
		box-shadow: 0 0 20px rgba(0,0,0,0.2);
		z-index: 10000;
	}

	.no-scrollbar::-webkit-scrollbar { display: none; }
	.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
	.tabs.tabs-boxed { white-space: nowrap; }
	.tabs.tabs-boxed > div.inline-flex { display: inline-flex; }
</style>