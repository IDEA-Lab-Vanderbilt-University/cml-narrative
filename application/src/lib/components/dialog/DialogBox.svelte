<!--
 /src/lib/components/DialogBox.svelte
 DialogBox.svelte
 cml-narrative
 
 Created by Ian Thompson on September 7th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->


<script lang="ts">
	import type { Line } from '$lib/types/Script';

	// import DialogControl from '$lib/components/DialogControl.svelte';
	
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	
	/** The text of what the speaker should be saying */
	export let dialog = '';
	/** Who is saying the text in the dialog box */
	export let speaker = '';
	/** The path to the img file of the avatar speaking */
	export let avatar = '';

	export let line: Line

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



<div class="flex flex-col px-4 w-full">
	<div class="flex justify-between align-bottom items-end z-20 relative w-full">
		<div class=" bg-peach w-fit h-fit z-20 rounded text-4xl px-3 text-black relative -bottom-4">
			{speaker}
		</div>
		<div class="self-end mr-14">
			<img src={avatar} alt="">
		</div>
	</div>

	<div class="w-full text-white p-4 rounded relative bg-jet ">
		<div class="grid grid-cols-5 text-3xl">
			<button class="rotate-180" on:click={back}>➜</button>
			<p class="col-span-3 text-3xl leading-relaxed w-full h-36 ">
				{dialog}
			</p>
			<button class="" on:click={forward}>➜</button>
		</div>
	</div>
</div>


<!-- <img src={avatar} alt="" class="h-96 z-10 absolute right-52 bottom-52" />
<div class="absolute mx-8 z-10"> -->
	<!-- <div class="relative top-2 bg-peach w-fit z-20 rounded text-3xl px-3 text-black">
		{speaker}
	</div>
	 -->
	
	<!-- <div class="w-full text-white p-4 rounded relative bg-jet ">
		<div class="grid grid-cols-5 text-center text-3xl">
			<button class="rotate-180">➜</button>
			<p class="col-span-3 text-left text-2xl leading-relaxed">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat dolores repellat reprehenderit corrupti aliquam veniam voluptas animi delectus ipsam nulla perspiciatis, amet saepe atque, doloribus eaque provident in nobis obcaecati iure nostrum iste inventore. Doloremque eligendi quo architecto quod tenetur.
			</p>
			<button class="">➜</button>
		</div>
	</div>

</div> -->
	<!-- <div class="absolute top-2 left-2 bg-peach text-black font-bold text-3xl p-3 rounded-md shadow">
		<p>{speaker}</p>
	</div> -->
	<!-- <div class="absolute -top-40 right-2  shadow">
		<img src={avatar} alt="">
	</div> -->



<!-- <div class="static ... bg-blue-50">
	<p>Static parent</p>
	<div class="absolute bottom-0 left-0 ...">
	  <p>Absolute child</p>
	</div>
</div>
 -->








<!-- <img src={avatar} alt="" class="h-96 -z-10 absolute right-40 bottom-32" />
<div class="indicator bg-jet w-full mx-40 px-4 py-2 text-white rounded-lg rounded-bl-none rounded-tl-none shadow-xl z-10">

	<div class="indicator-item indicator-top indicator-start">
		<p class="font-bold text-4xl bg-peach text-black px-4 py-2 shadow-lg rounded-lg rounded-br-none" >
			{speaker}
		</p>
	</div>
	<div class="indicator-item indicator-top indicator-end">

	</div>
	<div class="card h-40 w-full">
		<div class="card-body w-full">
			<div class="flex justify-evenly align-middle items-center">
				<button on:click={back} class="rotate-180 text-4xl rounded-full bg-yellow-500 p-4">
					➜
				</button>
				<p class="text-4xl leading-normal w-full px-4">{dialog}</p>
				<button on:click={forward} class=" text-4xl rounded-full bg-yellow-500 p-4">

					➜
				</button>
			</div>
		</div>
	</div>
</div> -->
