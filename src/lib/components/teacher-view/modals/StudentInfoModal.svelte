<script lang="ts">
	import type { Student } from '$lib/types/UserData';
	import { getTranslation, type Language } from '$lib/utils/translations';
	import { languageStore } from '$lib/utils/stores/languageStore';

	let currentLanguage: Language = 'en';
	languageStore.subscribe((lang: Language) => {
		currentLanguage = lang;
	});

	export let student: Student;
</script>

<table class="text-left">
	<tr>
		<th>{getTranslation(currentLanguage, 'common.teacher.studentId')}:</th>
		<td>{student.id}</td>
	</tr>
	<tr>
		<th>{getTranslation(currentLanguage, 'common.teacher.teacherId')}:</th>
		<td>{student.teacher_id}</td>
	</tr>
	<tr>
		<th>{getTranslation(currentLanguage, 'common.teacher.name')}:</th>
		<td>{student.first_name} {student.last_name}</td>
	</tr>
	<tr>
		<th>{getTranslation(currentLanguage, 'common.teacher.age')}:</th>
		<td>{student.age || getTranslation(currentLanguage, 'common.teacher.notSpecified')}</td>
	</tr>
	<tr>
		<th>{getTranslation(currentLanguage, 'common.teacher.interests')}:</th>
		<td>{student.interests?.join(', ') || getTranslation(currentLanguage, 'common.teacher.notSpecified')}</td>
	</tr>
	<tr>
		<th>{getTranslation(currentLanguage, 'common.teacher.agentName')}:</th>
		<td>{student.agent_name || getTranslation(currentLanguage, 'common.teacher.notSpecified')}</td>
	</tr>
	<tr>
		<th>{getTranslation(currentLanguage, 'common.teacher.updatedAt')}:</th>
		<td
			>{student.updated_at
				? new Date(student.updated_at.secs_since_epoch * 1000).toLocaleString()
				: 'NULL'}</td>
	</tr>
	<tr>
		<th>{getTranslation(currentLanguage, 'common.teacher.className')}:</th>
		<td>{student.class_name || getTranslation(currentLanguage, 'common.teacher.notSpecified')}</td>
	</tr>

	{#if student.progress}
		<tr>
			<th><u>{getTranslation(currentLanguage, 'common.teacher.progress')}</u></th>
			<td></td>
		</tr>
		<tr>
			<th>{getTranslation(currentLanguage, 'common.teacher.lastVisited')}:</th>
			<td>{student.progress.last_visited}</td>
		</tr>
		<tr>
			<th>{getTranslation(currentLanguage, 'common.teacher.badgeCount')}:</th>
			<td>{student.progress.badge_count}</td>
		</tr>
		<tr>
			<th>{getTranslation(currentLanguage, 'common.teacher.megaJoules')}:</th>
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
