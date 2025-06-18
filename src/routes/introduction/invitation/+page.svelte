<!--
 /src/routes/introduction/invitation/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on July 19th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { goto } from '$app/navigation';
	import Scene from '$lib/components/scene/Scene.svelte';
	import { studentProgressStore } from '$lib/utils/stores/store';
	import { fade, fly } from 'svelte/transition';
</script>

<Scene background="/img/backgrounds/captain_office.jpg">
	<div
		slot="content"
		class="flex h-full items-center justify-center"
		in:fly|global={{ y: 200, duration: 1000 }}
		out:fly|global={{ y: 200, duration: 1000 }}>
		<div
			class="flex w-fit flex-col items-center justify-center space-y-12 rounded-lg bg-gray-600 py-6 px-12 text-5xl text-white shadow-xl">
			<img src="/img/logos/SPOT-dots.svg" alt="" class="h-24" />
			<h2 class="border-y-2 border-dashed border-yellow-500 py-7">
				Are you ready to help us travel to the future?
			</h2>
			<button id="readyBtn" class="rounded-md bg-yellow-500 px-4 py-2 text-black shadow-lg"
				on:click={() => {
					goto('/introduction?page=4');
					studentProgressStore.update((data) => {
						data.last_visited = '/introduction?page=4';
						return data;
					});
				}}>
				I am ready!
			</button>
		</div>
	</div>
</Scene>

<style>

	#readyBtn {
		transition: all 0.2s ease-in-out;
		animation: pulseGlow 2s infinite reverse ease-in-out;
	}

	#readyBtn:hover {
		transform: scale(1.1);
	}

	#readyBtn:active {
		transform: scale(0.9);
	}

	img, h2 {
		user-select: none;
		pointer-events: none;
	}

	@keyframes pulseGlow {
		0% {
			box-shadow: 0 0 0 0 rgba(255, 245, 130, 0.7);
		}
		70% {
			box-shadow: 0 0 0 10px rgba(255, 255, 150, 0);
		}
		100% {
			box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
		}

	}
</style>
