<script lang="ts">
	import { languageStore } from '$lib/utils/stores/languageStore';

	export let handleClick: () => void;
</script>


<div
	class="hud-red-blue-border bg-opacity-85 flex items-center justify-center space-x-5 rounded-md bg-slate-700 py-3 px-3 text-2xl text-white">
	<!-- <img src="/img/characters/agent-spark/spark_gesture.png" alt="" class="h-24 -scale-x-1"> -->
	<p>
		{#if $languageStore === 'es'}
			¿Necesitas ideas? ¡Mira los perfiles de los agentes SPOT y ve palabras que los describen!
		{:else}
			Need ideas? Check out the SPOT agent's profiles and see words that describe them!
		{/if}
		<a
			href="#"
			on:click={handleClick}
			class="rounded-lg bg-gradient-to-b from-red-400 to-red-600 px-3 text-black shadow-xl"
			id="view-profiles">
			{$languageStore === 'es' ? 'Perfiles' : 'Profiles'}
		</a>
	</p>
</div>

<style>
	#view-profiles {
		animation: glowpulse 2.5s infinite;
	}

	@keyframes glowpulse {
		0% {
			box-shadow: 0 0 5px #ff0000;
		}

		50% {
			box-shadow: 0 0 15px #ff0000;
		}

		100% {
			box-shadow: 0 0 5px #ff0000;
		}
	}
</style>
