<!--
 /src/lib/components/dialog/TabletDialogBox.svelte
 TabletDialogBox.svelte
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import type { Line } from "$lib/types/Script";


    export let line: Line

</script>

<div class=" w-full text-white py-9 text-2xl flex items-center justify-center">
    <p>{line.dialog}</p>
    <img src={line.avatar} alt="" class="self-end">
</div>

<!-- <div class="flex flex-col px-4 w-full">
	<div class="flex justify-between align-bottom items-end z-20 relative w-full">
		<div class=" bg-peach w-fit h-fit z-20 rounded text-4xl px-3 text-black relative -bottom-4">
			{line.speaker}
		</div>
		<!-- <div class="self-end mr-14">
			<img src={line.avatar} alt="">
		</div> -->
	<!-- </div>

	<div class="w-full text-white p-4 rounded relative bg-jet ">
		<div class="grid grid-cols-5 text-3xl gap-4">

			<p class="col-span-3 text-3xl leading-relaxed w-full h-36 ">
				{line.dialog}
			</p>

		</div>
	</div>
</div> --> -->
