<!--
 /src/lib/components/sequences/tablet/Interest.svelte
 Interest.svelte
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import type { Student } from '$lib/types/UserData';
	import { onMount } from 'svelte';
	import { languageStore } from '$lib/utils/stores/languageStore';
	import type { Language } from '$lib/utils/translations';

	export let profileData: Student;
	export let prompt: string;
	export let index: number;

	let currentLanguage: Language = 'en';
	languageStore.subscribe((lang: Language) => {
		currentLanguage = lang;
	});

	let randomPlaceholder = '';
	let placeholderPrefix = 'I like to';
	
	const getRandomInterest = () => {
		let interests: string[] = currentLanguage === 'es'
			? ['jugar baloncesto', 'jugar fútbol', 'bailar', 'salir afuera', 'dibujar']
			: ['play basketball', 'play football', 'dance', 'go outside', 'draw'];

		const random = Math.floor(Math.random() * interests.length);

		return interests[random];
	};

	$: placeholderPrefix = currentLanguage === 'es' ? 'Me gusta' : 'I like to';

	onMount(() => {
		randomPlaceholder = getRandomInterest();
	});

	$: if (currentLanguage) {
		randomPlaceholder = getRandomInterest();
	}
</script>

<div class="flex h-full w-full flex-col items-center justify-center space-y-10 mt-[-100px]">
	<h1 class="text-6xl text-white">{prompt}</h1>
	<div class="flex w-full justify-center space-x-7">
		<div class="form-control h-24 w-full max-w-2xl">
			<input
				type="text"
				placeholder={`${placeholderPrefix} ${randomPlaceholder}!`}
				class="input-bordered input h-full  w-full font-mono text-4xl"
				bind:value={profileData.interests[index]} />
		</div>
	</div>
</div>
