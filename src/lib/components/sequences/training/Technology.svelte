<!--
 /src/lib/components/sequences/training/Technology.svelte
 Technology.svelte
 cml-narrative
 
 Created by Ian Thompson on January 16th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { languageStore } from '$lib/utils/stores/languageStore';
	import { getTranslation, type Language } from '$lib/utils/translations';

	let currentLanguage: Language = 'en';
	languageStore.subscribe((lang: Language) => {
		currentLanguage = lang;
	});
</script>

<div class="flex h-full w-full flex-col items-center justify-center space-y-7">
	<h1 class="font-mono text-6xl">{getTranslation(currentLanguage, 'introduction.trainingTechnology.heading')}</h1>
	<img src="/img/icons/chip.svg" alt="" class="h-56" />
</div>
