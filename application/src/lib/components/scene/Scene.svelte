<!--
 Scene.svelte
 application
 
 Created by Ian Thompson on September 2nd 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script>
	/**  The background image of the scene */
	export let background = '';
</script>

<div class="w-screen h-screen">
	<div class="bg-gray-400 w-full h-full relative z-0">
		<div
			class="bg-center bg-cover z-0 w-full h-full"
			style={`background-image: url('${background}');`}
		/>
		<div class="absolute inset-x-0 bottom-0 mb-16 flex justify-center items-center z-10">
			<slot />
		</div>
	</div>
</div>
