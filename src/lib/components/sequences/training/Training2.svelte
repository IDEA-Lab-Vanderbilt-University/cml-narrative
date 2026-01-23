<!--
 /src/lib/components/sequences/training/Training2.svelte
 Training2.svelte
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

<div class="flex h-full w-full flex-col items-center justify-center space-y-9 px-8">
	<h2 class="font-mono text-3xl">
		{getTranslation(currentLanguage, 'introduction.trainingTechnology.description')}
	</h2>
	<div class="flex w-fit space-x-10">
		<img src="/img/icons/car.svg" alt="" class="w-48" />
		<img src="/img/icons/mobile-app.png" alt="" class="w-48" />
		<img src="/img/icons/controller.svg" alt="" class="w-48" />
	</div>
</div>
