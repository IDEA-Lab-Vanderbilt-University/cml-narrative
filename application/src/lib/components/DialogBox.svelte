<!--
 DialogBox.svelte
 application
 
 Created by Ian Thompson on September 1st 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script>
	import DialogControl from '$lib/components/DialogControl.svelte';

	/** The text of what the speaker should be saying */
	export let dialog = '';
	/** Who is saying the text in the dialog box */
	export let speaker = '';
	/** The path to the img file of the avatar speaking */
	export let avatar = '';
</script>

<img src={avatar} alt="" class="h-96 -z-10 absolute right-40 bottom-24" />
<div
	class="indicator bg-gray-500 w-full mx-40 px-20 py-2 text-white rounded-lg rounded-bl-none rounded-tl-none border-4 border-black z-10"
>
	<!-- <img src="img/characters/ian-half.png" alt="" /> -->
	<div class="indicator-item indicator-top indicator-start">
		<p class="font-bold text-4xl bg-lime-400 text-black px-4 py-2 rounded-md border-2 border-black">
			{speaker}
		</p>
	</div>
	<div class="indicator-item indicator-top indicator-end">
		<DialogControl on:dialogEvent />
	</div>
	<div class="card h-40 w-full">
		<div class="card-body w-full">
			<p class="text-3xl ">{dialog}</p>
		</div>
	</div>
</div>
