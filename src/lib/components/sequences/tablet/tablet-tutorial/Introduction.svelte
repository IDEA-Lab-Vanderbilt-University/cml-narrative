<!--
 /src/lib/components/sequences/tablet/tablet-tutorial/Introduction.svelte
 Introduction.svelte
 cml-narrative
 
 Created by Ian Thompson on January 14th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { Assets } from '$lib/utils/Assets';
	import { onDestroy, onMount, createEventDispatcher } from 'svelte';
	import { languageStore } from '$lib/utils/stores/languageStore';
	import { getTranslation, type Language } from '$lib/utils/translations';

	let dispatch = createEventDispatcher();

	let currentLanguage: Language = 'en';
	languageStore.subscribe((lang: Language) => {
		currentLanguage = lang;
	});

	onMount(() => {
		dispatch('applicationContainerEvent', {
			event: 'mount',
			id: `#profile-element-tablet-intro`
		});
	});

	onDestroy(() => {
		dispatch('applicationContainerEvent', {
			event: 'destroy',
			id: `#profile-element-tablet-intro`
		});
	});
</script>

<div class="flex h-full w-full items-center justify-around p-8 align-middle font-mokoto text-white">
	<div class="flex flex-col items-center justify-center space-y-7 text-2xl">
		<img src={Assets.Tablet.travelLog} alt="" class="h-96" />
		<p>{getTranslation(currentLanguage, 'introduction.tabletTutorial.travelLog')}</p>
	</div>
	<div
		class="flex flex-col items-center justify-center space-y-7 text-2xl"
		id="profile-element-tablet-intro">
		<img src="/img/tablet/profile.png" alt="" class="h-96 object-contain" />
		<p>{getTranslation(currentLanguage, 'introduction.tabletTutorial.profile')}</p>
	</div>
	<div class="flex flex-col items-center justify-center space-y-7 text-2xl">
		<img src={Assets.Tablet.badges} alt="" class="h-96" />
		<p>{getTranslation(currentLanguage, 'introduction.tabletTutorial.badges')}</p>
	</div>
</div>
