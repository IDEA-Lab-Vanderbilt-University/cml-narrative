<!--
 +page.svelte
 application
 
 Created by Ian Thompson on September 1st 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script lang="ts">
    import TabletView from '$lib/components/modals/tablet/TabletView.svelte';
	import { getContext } from 'svelte';
    const { open } = getContext('simple-modal');
	import { fly } from 'svelte/transition';



	const onModalClick = () => {
		open(TabletView, {
			
		}, {

				// transitionWindow: fly,
				// transitionWindowProps: {
				// 	y: 100,
				// 	duration: 1000
				// },

		})
	}

</script>

<div class="p-8 flex flex-col space-y-5">
	<h1 class="text-4xl text-center">Welcome to the CML SvelteKit Demo</h1>

	<a href="/narrative/" class="h-24 w-fit rounded-md bg-blue-400 p-10 text-black text-2xl"
	>Narrative</a
>

	<a href="/demos/simple-script" class="h-24 w-fit rounded-md bg-blue-400 p-10 text-black text-2xl"
		>Simple Script Example</a
	>
	<a href="/demos/canvas" class="h-24 w-fit rounded-md bg-blue-400 p-10 text-black text-2xl"
		>Canvas</a
	>

	<a href="/demos/drag-and-drop" class="h-24 w-fit rounded-md bg-blue-400 p-10 text-black text-2xl"
	>Drag and Drop</a>

	<a href="/demos/tablet" class="h-24 w-fit rounded-md bg-blue-400 p-10 text-black text-2xl"
	>Tablet Modal</a>
</div>
