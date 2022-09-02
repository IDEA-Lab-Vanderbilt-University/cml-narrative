<!--
 DialogControl.svelte
 application
 
 Created by Ian Thompson on September 1st 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	/** Dispatch the back dialogEvent */
	const back = () => {
		dispatch('dialogEvent', {
			state: 'back'
		});
	};

	/** Dispatch the forward dialogEvent */
	const forward = () => {
		dispatch('dialogEvent', {
			state: 'forward'
		});
	};
</script>

<div class="text-white text-4xl flex bg-gray-500 border-2 border-black space-x-2 p-2 rounded-md">
	<button on:click={back}> &larr; </button>
	<button>R</button>
	<button on:click={forward}>&rarr;</button>
</div>
