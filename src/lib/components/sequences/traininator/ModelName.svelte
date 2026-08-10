<script lang="ts">
	import { settingsStore } from '$lib/utils/stores/store';

	export let step: number;
	export let modelName: string;
</script>

<div class="justify-top my-5 flex h-2/3 w-full flex-col items-center space-y-20">
	<h2 class="my-2 text-center text-5xl font-bold tracking-wider text-white">
		{$settingsStore?.language === 'es' ? '¿Cómo quieres llamar a tu modelo?' : 'What do you want to call your model?'}
	</h2>
	<input
		type="text"
		class="input-primary mt-4 w-96 rounded-md bg-white px-4 py-3 text-center shadow-md"
		placeholder={$settingsStore?.language === 'es' ? 'Nombre del modelo' : 'Model Name'}
		bind:value={modelName} />
	<button
		on:click={() => {
			if (modelName === '') {
				alert($settingsStore?.language === 'es' ? 'Debes ingresar un nombre para el modelo' : 'You need to enter a model name');
				return;
			}
			step++;
			// goto('/traininator?page=3');
		}}
		class="my-5 mt-10 flex items-center justify-center gap-5 rounded-full border-2 border-white bg-blue-400 bg-opacity-75 px-4 py-3 align-middle shadow-md">
		<p class="mx-5 text-xl font-bold text-gray-800">{$settingsStore?.language === 'es' ? 'Siguiente' : 'Next'}</p>
	</button>
</div>
