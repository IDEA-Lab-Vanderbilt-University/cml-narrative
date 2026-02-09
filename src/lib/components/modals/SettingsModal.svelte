<script lang="ts">
	import { defaultSettings } from "$lib/types/Settings";
	import { settingsStore } from "$lib/utils/stores/store";
	import { onMount } from "svelte";
	import { getTranslation, type Language } from '$lib/utils/translations';
	import { languageStore } from '$lib/utils/stores/languageStore';

	let open = false;
	let currentLanguage: Language = 'en';
	languageStore.subscribe((lang: Language) => {
		currentLanguage = lang;
	});

    export const show = () => {
		open = true;
        dialog?.show();
    }

	onMount(() => {
		dialog?.addEventListener("close", () => {
			open = false;
			settingsStore.set(settings);
		});
	});

    let dialog: HTMLDialogElement | void;

    let settings = defaultSettings;

    settingsStore.subscribe((value) => {
		settings = value;
		settings.textPeriod = settings.textPeriod.toString();
	});
</script>

<div id="full" class="{open ? "" : "hidden"}">
	<dialog	bind:this={dialog} on:close>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click|stopPropagation>
			<h1>{getTranslation(currentLanguage, 'settings.title')}</h1>
			<hr />
			<label for="textSpeed">{getTranslation(currentLanguage, 'settings.textSpeed')}:</label>
			<select name="textSpeed" bind:value={settings.textPeriod}>
				<option value=15>{getTranslation(currentLanguage, 'settings.textSpeedFast')}</option>
				<option value=45>{getTranslation(currentLanguage, 'settings.textSpeedMedium')}</option>
				<option value=75>{getTranslation(currentLanguage, 'settings.textSpeedSlow')}</option>
			</select>
			<hr />
			<label for="fontSize">{getTranslation(currentLanguage, 'settings.fontSize')}:</label>
			<select name="fontSize" bind:value={settings.fontSize}>
				<option value="text-3xl">{getTranslation(currentLanguage, 'settings.fontSizeBig')}</option>
				<option value="text-2xl">{getTranslation(currentLanguage, 'settings.fontSizeMedium')}</option>
				<option value="text-xl">{getTranslation(currentLanguage, 'settings.fontSizeSmall')}</option>
			</select>
			<hr />
			<label for="audioEnabled">{getTranslation(currentLanguage, 'settings.audioEnabled')}:</label>
			<input type="checkbox" name="audioEnabled"  bind:checked={settings.audioEnabled}/>
			<hr />
			<!-- svelte-ignore a11y-autofocus -->
			<button autofocus on:click={() => dialog?.close()}>{getTranslation(currentLanguage, 'settings.saveAndClose')}</button>
		</div>
	</dialog>
</div>
<style>

    dialog {
		max-width: 32em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		transform: translateY(-50%);
	}

	dialog > div {
		padding: 1em;
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	button {
		display: block;
	}

	h1 {
		font-size: 24pt;
		text-align: center;
	}

	button {
		border: 1px black solid;
		padding: 2px 4px;
		margin: 4px;
		border-radius: 4px;
		background-color: #77dd88;
		transition: all 0.2s linear;
	}

	button:hover {
		background-color: #86ee9a;
	}

	button:active {
		background-color: #66cc77;
	}

	hr {
		margin: 2px 0;
	}

	#full {
		width: 100vw;
		height: 100vh;
		position: absolute;
		z-index: 100;
		background-color: rgba(0,0,0,0.3);
		backdrop-filter: blur(10px);
		align-content: center;
	}

	.hidden {
		display: none;
	}
</style>