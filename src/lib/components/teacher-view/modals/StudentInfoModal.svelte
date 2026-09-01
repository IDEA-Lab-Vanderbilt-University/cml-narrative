<script lang="ts">
	import { goto } from '$app/navigation';
	import { getContext } from 'svelte';
	import type { Student } from '$lib/types/UserData';
	import { getTranslation, type Language } from '$lib/utils/translations';
	import { languageStore } from '$lib/utils/stores/languageStore';
	import { Badges } from '$lib/utils/Assets/Badges';

	// @ts-ignore
	const { close } = getContext('simple-modal');

	let currentLanguage: Language = 'en';
	languageStore.subscribe((lang: Language) => {
		currentLanguage = lang;
	});

	export let student: Student;

	$: lastEarnedBadge = student.progress?.badge_count && student.progress.badge_count > 0
		? Badges[(student.progress.badge_count - 1) < 0 ? 0 : student.progress.badge_count - 1] ?? null
		: null;

	const formatDate = (timestamp?: { secs_since_epoch: number; nanos_since_epoch: number }) => {
		if (!timestamp) {
			return 'Never';
		}

		return new Date(timestamp.secs_since_epoch * 1000).toLocaleString();
	};

	const getCurrentLevel = () => {
		const lastVisited = student.progress?.last_visited ?? '';

		if (lastVisited.includes('/introduction')) {
			return 'Introduction';
		}

		const levelMatch = lastVisited.match(/\/level(\d+)/);
		if (levelMatch?.[1]) {
			return `Level ${levelMatch[1]}`;
		}

		return 'Unknown';
	};

	const getInterests = () => {
		if (!student.interests || student.interests.length === 0) {
			return getTranslation(currentLanguage, 'common.teacher.notSpecified');
		}

		return student.interests.join(', ');
	};
</script>

<div class="student-info-card">
	<div class="section-title">Information</div>
	<div class="info-row">
		<div class="label">{getTranslation(currentLanguage, 'common.teacher.name')}:</div>
		<div class="value">{student.first_name} {student.last_name}</div>
	</div>
	<div class="info-row">
		<div class="label">{getTranslation(currentLanguage, 'common.teacher.agentName')}:</div>
		<div class="value">{student.agent_name || getTranslation(currentLanguage, 'common.teacher.notSpecified')}</div>
	</div>
	<div class="info-row">
		<div class="label">{getTranslation(currentLanguage, 'common.teacher.age')}:</div>
		<div class="value">{student.age || getTranslation(currentLanguage, 'common.teacher.notSpecified')}</div>
	</div>
	<div class="info-row">
		<div class="label">{getTranslation(currentLanguage, 'common.teacher.interests')}:</div>
		<div class="value wrap-text">{getInterests()}</div>
	</div>
	<div class="info-row">
		<div class="label">{getTranslation(currentLanguage, 'common.teacher.className')}:</div>
		<div class="value">{student.class_name || getTranslation(currentLanguage, 'common.teacher.notSpecified')}</div>
	</div>

	<div class="section-title section-title-spaced">Progress</div>
	<div class="info-row">
		<div class="label">Current Level:</div>
		<div class="value">{student.progress ? getCurrentLevel() : 'None'}</div>
	</div>
	<div class="info-row">
		<div class="label">Last Login:</div>
		<div class="value">{formatDate(student.updated_at)}</div>
	</div>
	<div class="info-row">
		<div class="label">Badge Count:</div>
		<div class="value">{student.progress?.badge_count ?? 0}</div>
	</div>
	<div class="info-row">
		<div class="label">Last Earned Badge:</div>
		<div class="value">{lastEarnedBadge?.name || getTranslation(currentLanguage, 'common.teacher.notSpecified')}</div>
	</div>
	<div class="info-row">
		<div class="label">Travel Log:</div>
		<div class="value">
			<a
				class="travel-log-link"
				href={`/teacher/student-travel-log?student_id=${student.id}`}
				on:click|preventDefault={() => {
					close();
					goto(`/teacher/student-travel-log?student_id=${student.id}`);
				}}>
				View travel log
			</a>
		</div>
	</div>
</div>

<style>
	.student-info-card {
		background: #fff;
		padding: 0;
		border-radius: 0;
		font-family: 'Times New Roman', serif;
		display: inline-block;
		max-width: min(92vw, 640px);
		border: 1px solid #d1d5db;
		background: white;
	}

	.section-title {
		text-align: center;
		text-decoration: underline;
		font-size: 1.8rem;
		padding: 0.25rem 0.5rem;
		background: #fff;
		border-bottom: 1px solid #d1d5db;
		font-weight: 700;
		font-family: 'Cantora One';
	}

	.section-title-spaced {
		border-top: 1px solid #d1d5db;
		margin-top: 0.15rem;
	}

	.info-row {
		display: grid;
		grid-template-columns: minmax(170px, 230px) 1fr;
		border-bottom: 1px solid #d1d5db;
	}

	.info-row:last-child {
		border-bottom: none;
	}

	.label,
	.value {
		padding: 0.35rem 0.5rem;
		font-size: 1.05rem;
		line-height: 1.05;
		font-family: 'Cantora One';
	}

	.label {
		text-align: right;
		font-weight: 700;
		border-right: 1px solid #d1d5db;
		white-space: nowrap;
	}

	.value {
		min-width: 0;
	}

	.wrap-text {
		word-break: break-word;
		white-space: normal;
	}

	.travel-log-link {
		color: #2563eb;
		text-decoration: underline;
		font-size: 1.05rem;
	}

	.travel-log-link:hover {
		color: #1d4ed8;
	}

	:global(.simple-modal-content) {
		max-width: 92vw;
		width: fit-content;
		padding: 0.75rem !important;
	}

	:global(.simple-modal-content > div) {
		padding: 0 !important;
		background: transparent !important;
		box-shadow: none !important;
		width: fit-content !important;
		max-width: 100% !important;
	}
</style>
