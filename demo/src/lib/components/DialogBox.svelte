<!--
 /src/lib/components/DialogBox.svelte
 DialogBox.svelte
 cml-narrative
 
 Created by Ian Thompson on September 7th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->


<script>
	import DialogControl from '$lib/components/DialogControl.svelte';
	
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	/** The text of what the speaker should be saying */
	export let dialog = '';
	/** Who is saying the text in the dialog box */
	export let speaker = '';
	/** The path to the img file of the avatar speaking */
	export let avatar = '';

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

<img src={avatar} alt="" class="h-96 -z-10 absolute right-40 bottom-32" />
<div
	class="indicator bg-jet w-full mx-40 px-4 py-2 text-white rounded-lg rounded-bl-none rounded-tl-none shadow-xl z-10"
>
	<!-- <img src="img/characters/ian-half.png" alt="" /> -->
	<div class="indicator-item indicator-top indicator-start">
		<p class="font-bold text-4xl bg-peach text-black px-4 py-2 shadow-lg rounded-lg rounded-br-none" >
			{speaker}
		</p>
	</div>
	<div class="indicator-item indicator-top indicator-end">
		<!-- <DialogControl on:dialogEvent /> -->
	</div>
	<div class="card h-40 w-full">
		<div class="card-body w-full">
			<div class="flex justify-evenly align-middle items-center">
				<button on:click={back} class="rotate-180 text-4xl rounded-full bg-yellow-500 p-4">
					<!-- <img src="/img/icons/previous.png" alt="" class="w-full"> -->
					➜
				</button>
				<p class="text-4xl leading-normal w-full px-4">{dialog}</p>
				<button on:click={forward} class=" text-4xl rounded-full bg-yellow-500 p-4">
					<!-- <img src="/img/icons/previous.png" alt="" class="w-full rotate-180"> -->
					➜
				</button>
			</div>
		</div>
	</div>
</div>
