<script lang="ts">
	import type { Student } from '$lib/types/UserData';

	export let student: Student;
</script>

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
		<th>Name:</th>
		<td>{student.first_name} {student.last_name}</td>
	</tr>
	<tr>
		<th>Age:</th>
		<td>{student.age || 'Not specified'}</td>
	</tr>
	<tr>
		<th>Interests:</th>
		<td>{student.interests?.join(', ') || 'Not specified'}</td>
	</tr>
	<tr>
		<th>Agent Name:</th>
		<td>{student.agent_name || 'Not specified'}</td>
	</tr>
	<tr>
		<th>Updated At:</th>
		<td
			>{student.updated_at
				? new Date(student.updated_at.secs_since_epoch * 1000).toLocaleString()
				: 'NULL'}</td>
	</tr>
	<tr>
		<th>Class Name:</th>
		<td>{student.class_name || 'Not specified'}</td>
	</tr>

	{#if student.progress}
		<tr>
			<th><u>Progress</u></th>
			<td></td>
		</tr>
		<tr>
			<th>Last Visited:</th>
			<td>{student.progress.last_visited}</td>
		</tr>
		<tr>
			<th>Badge Count:</th>
			<td>{student.progress.badge_count}</td>
		</tr>
		<tr>
			<th>Mega Joules:</th>
			<td>{student.progress.megajoules}</td>
		</tr>
		<tr>
			<th>Progress Updated At:</th>
			<td>{student.progress.updated_at ? new Date(student.progress.updated_at.secs_since_epoch * 1000).toLocaleString() : 'Never'}</td>
		</tr>
	{:else}
		<tr>
			<th>Progress:</th>
			<td>None</td>
		</tr>
	{/if}
</table>

<style>
	table {
		font-family: 'Cantora One';
		/* font-weight: 700; */
	}

	th {
		width: 30%;
		text-align: right;
		padding-right: 10px;
	}
</style>
