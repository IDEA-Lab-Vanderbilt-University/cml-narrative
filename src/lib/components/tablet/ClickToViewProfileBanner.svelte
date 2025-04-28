<script lang="ts">
	export let handleClick: () => void;
</script>


<div
	class="hud-red-blue-border bg-opacity-85 flex items-center justify-center space-x-5 rounded-md bg-slate-700 py-3 px-3 text-2xl text-white">
	<!-- <img src="/img/characters/agent-spark/spark_gesture.png" alt="" class="h-24 -scale-x-1"> -->
	<p>
		Need ideas? Check out the SPOT agent's profiles and see words that describe them! <a
			href="#"
			on:click={handleClick}
			class="rounded-lg bg-gradient-to-b from-red-400 to-red-600 px-3 text-black shadow-xl"
			id="view-profiles">
			Profiles
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
