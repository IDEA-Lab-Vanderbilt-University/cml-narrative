<!--
 /src/lib/components/scene/Scene.svelte
 Scene.svelte
 cml-narrative
 
 Created by Ian Thompson on September 7th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->


<script>
	/**  The background image of the scene */
	export let background = '';
</script>

<!-- <div class="w-screen h-screen">
	<div class="bg-gray-400 w-full h-full relative z-0">
		<div
			class="bg-center bg-cover z-0 w-full h-full"
			style={`background-image: url('${background}');`}
		/>
		<div class="absolute inset-x-0 bottom-0 flex justify-center items-center z-10">
			<slot />
		</div>
	</div>
</div> -->

<!-- <div class="w-screen h-screen bg-cover" style={`background-image: url('${background}');`}>
	<div class="w-full h-full z-10">
		<slot />
	</div>
</div> -->

<!-- <div class="w-screen h-screen bg-cover" style={`background-image: url('${background}');`}>
	<div class="h-full w-full flex flex-col">
		<div class="h-full ">
			<slot name="content"></slot>
		</div>
		<div class="h-fit mb-7">
			<slot name="dialog"></slot>

		</div>
	</div>


</div> -->

<div class="w-full h-screen bg-gray-200 flex justify-center items-center bg-cover" >
	<div class=" w-full h-full relative z-0 bg-cover" style={`background-image: url('${background}');`}>
	  <div class="w-full h-full">
		<slot name="content"></slot>
	  </div>
	  <div class="absolute inset-0 flex items-end pb-5 z-10 w-full">
		<slot name="dialog"></slot>
	  </div>
	</div>
</div>