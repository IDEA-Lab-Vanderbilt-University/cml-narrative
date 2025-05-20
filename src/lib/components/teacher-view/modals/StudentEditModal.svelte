<script lang="ts">
	import type { Student } from '$lib/types/UserData';

	export let student: Student;
	export let onSave: (student: Student) => void;
	export let onCancel: () => void;

	let first_name = student.first_name;
	let last_name = student.last_name;
	let age = student.age;


	function submitEdit() {
		onSave({
			...student,
			first_name,
			last_name,
			age
		});
	}

	function cancelEdit() {
		onCancel();
	}
</script>

<div style="position: fixed !important; top: 0 !important; left: 0 !important; width: 100vw !important; height: 100vh !important; background: rgba(0,0,0,0.3) !important; z-index: 999999 !important; display: flex !important; align-items: center !important; justify-content: center !important;">
	<div style="background: #fff !important; color: #000 !important; padding: 2rem !important; border-radius: 12px !important; min-width: 40vw !important; max-width: 60vw !important; min-height: 200px !important; box-shadow: 0 2px 10px rgba(0,0,0,0.2) !important; z-index: 1000000 !important;">
		<h2>Edit Student Info</h2>
		<table class="text-left">
			<tr>
				<th>Student ID:</th>
				<td>{student.id}</td>
			</tr>
			<tr>
				<th>Teacher ID:</th>
				<td>{student.teacher_id}</td>
			</tr>
			<tr>
				<th>First Name:</th>
				<td><input type="text" bind:value={first_name} /></td>
			</tr>
			<tr>
				<th>Last Name:</th>
				<td><input type="text" bind:value={last_name} /></td>
			</tr>
			<tr>
				<th>Age:</th>
				<td><input type="number" min="0" bind:value={age} /></td>
			</tr>
		</table>
			<div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: flex-end;">
			<button on:click={submitEdit}>Save</button>
			<button on:click={cancelEdit} type="button">Cancel</button>
		</div>
	</div>
</div>

<style>
table {
	font-family: 'Cantora One';
}
th {
	width: 30%;
	text-align: right;
	padding-right: 10px;
}
input[type="text"], input[type="number"] {
	font-size: 1rem;
	padding: 0.2rem 0.5rem;
	border: 1px solid #ccc;
	border-radius: 4px;
}
</style>
