<script lang="ts">
	import { goto } from '$app/navigation';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import LanguageMenu from '$lib/components/LanguageMenu.svelte';
	import type { Student } from '$lib/types/UserData';
	import { studentDataStore, showLanguageChoice } from '$lib/utils/stores/store';
	import { fade } from 'svelte/transition';
	import { languageStore } from '$lib/utils/stores/languageStore';
	import { getTranslation, getTranslationWithValues, type Language } from '$lib/utils/translations';

	let student: Student;
	let currentLanguage: Language = 'en';
	languageStore.subscribe((lang: Language) => {
		currentLanguage = lang;
	});

	studentDataStore.subscribe((value) => {
		student = value;
	});
</script>

<Tablet>
<div class="relative flex h-full w-full flex-col items-center justify-center">
	<div class="flex h-full w-full flex-col items-center justify-center">
		<div class="space-y-4 text-center font-mokoto text-white">
			<h2 class="text-5xl" in:fade|global={{ delay: 500 }}>{getTranslationWithValues(currentLanguage, 'entry.welcome', { firstName: student?.first_name ?? '', lastName: student?.last_name ?? '' })}</h2>
		</div>
		<button
			in:fade|global={{ delay: 1500 }}
			on:click={() => {
				goto('/introduction?page=1');
			}}
			class="mt-8 flex items-center justify-center gap-5 rounded-md bg-yellow-400 bg-opacity-75 px-4 py-3 align-middle font-mokoto shadow-md">
			<p class="text-3xl font-bold text-gray-800">{getTranslation(currentLanguage, 'entry.begin')}</p>
		</button>
	</div>
	{#if showLanguageChoice}
		<div class="absolute bottom-4 left-4">
			<LanguageMenu />
		</div>
	{/if}
</div>
</Tablet>