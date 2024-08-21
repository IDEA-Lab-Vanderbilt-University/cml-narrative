<script lang="ts">
	import { defaultSettings } from "$lib/types/Settings";
	import { settingsStore } from "$lib/utils/stores/store";
	import { onMount } from "svelte";

	let open = false;

    export const show = () => {
		open = true;
        dialog?.show();
    }

	onMount(() => {
		dialog?.addEventListener("close", () => {
			open = false;
		});
	});

    let dialog: HTMLDialogElement | void;

    let settings = defaultSettings;

    settingsStore.subscribe((value) => settings = value);
</script>

<div id="full" class="{open ? "" : "hidden"}">
	<dialog	bind:this={dialog} on:close>
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div on:click|stopPropagation>
			<h1>Settings</h1>
			<hr />
			<label for="textSpeed">Text Speed:</label>
			<select id="textSpeed">
				<option value="15">Fast</option>
				<option value="50">Medium</option>
				<option value="80">Slow</option>
			</select>
			<hr />
			<label for="fontSize">Font size:</label>
			<select id="fontSize">
				<option value="text-3xl">Big</option>
				<option value="text-2xl">Medium</option>
				<option value="text-xl">Small</option>
			</select>
			<hr />
			<!-- svelte-ignore a11y-autofocus -->
			<button autofocus on:click={() => dialog?.close()}>Save and Close</button>
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