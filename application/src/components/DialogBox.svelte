<!--
 DialogBox.svelte
 application
 
 Created by Ian Thompson on September 1st 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script>
	import DialogControl from './DialogControl.svelte';

	export let dialog = '';
	export let speaker = '';
</script>

<!-- <div
	class="bg-gray-500 w-full mx-40 px-20 py-8 text-white rounded-full rounded-bl-none border-2 border-black"
>
	<p class="text-2xl font-bold">
		{dialog}
	</p>
</div>

<div class="">{speaker}</div> -->

<div
	class="indicator bg-gray-500 w-full mx-40 px-20 py-2 text-white rounded-lg rounded-bl-none rounded-tl-none border-4 border-black"
>
	<div class="indicator-item indicator-top indicator-start">
		<p class="font-bold text-4xl bg-lime-400 text-black px-4 py-2 rounded-md border-2 border-black">
			{speaker}
		</p>
	</div>
	<div class="indicator-item indicator-top indicator-end">
		<DialogControl on:dialogEvent />
	</div>
	<div class="card h-40">
		<div class="card-body">
			<p class="text-3xl">{dialog}</p>
		</div>
	</div>
</div>
