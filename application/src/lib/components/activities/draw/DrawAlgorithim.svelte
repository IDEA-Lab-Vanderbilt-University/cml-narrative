<!--
 /src/lib/components/activities/draw/DrawAlgorithim.svelte
 DrawAlgorithim.svelte
 cml-narrative
 
 Created by Ian Thompson on May 22nd 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 

  This 

--->
<script>
	import { Draw } from '$lib/components/activities/draw/Draw.jsx';
	import { ReactAdapter } from 'svelte-react-kit';
</script>

<div class="mt-8 h-full w-full">
	<ReactAdapter el={Draw} />
</div>
