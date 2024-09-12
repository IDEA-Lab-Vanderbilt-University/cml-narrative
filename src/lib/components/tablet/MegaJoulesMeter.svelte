<!--
 /src/lib/components/tablet/MegaJoulesMeter.svelte
 MegaJoulesMeter.svelte
 cml-narrative
 
 Created by Ian Thompson on January 14th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { createEventDispatcher, onDestroy, onMount } from 'svelte';

	export let amount: number = 0;

	let dispatch = createEventDispatcher();

	onMount(() => {
		dispatch('applicationContainerEvent', {
			event: 'mount',
			id: `#megajoules-meter`
		});
	});

	onDestroy(() => {
		dispatch('applicationContainerEvent', {
			event: 'destroy',
			id: `#megajoules-meter`
		});
	});
</script>

<div class="w-full" id="megajoules-meter">
	<img src={`/img/tablet/meter/meter-${amount}.svg`} alt="{amount} Megajoules" />
</div>

<style>
	#megajoules-meter img {
		pointer-events: none;
		user-select: none;
	}
</style>