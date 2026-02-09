<script lang="ts">
	import DefinitionView from "../tablet/DefinitionView.svelte";
	import Tablet from "../tablet/Tablet.svelte";
	import { getTranslation, type Language } from '$lib/utils/translations';
	import { languageStore } from '$lib/utils/stores/languageStore';

	let currentLanguage: Language = 'en';
	languageStore.subscribe((lang: Language) => {
		currentLanguage = lang;
	});

    export let title: string;
    export let definition: string;
</script>

<Tablet showMeter={false}>
    <DefinitionView title={title} definition={definition} />

    <div class="button-container">
        <button class="button" on:click>{getTranslation(currentLanguage, 'common.next')}</button>
    </div>
</Tablet>

<style>
.button-container {
    display: flex;
    justify-content: center;
}

.button {
    background-color: #4adde2;
    border: none;
    color: white;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 1.5rem;
    padding: 10px 24px;
    cursor: pointer;
    border-radius: 30px;
}

</style>