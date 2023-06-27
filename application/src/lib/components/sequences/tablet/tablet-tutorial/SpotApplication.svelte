<!--
 /src/lib/components/sequences/tablet/tablet-tutorial/TravelLog.svelte
 TravelLog.svelte
 cml-narrative
 
 Created by Ian Thompson on January 14th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	export let img: string;
	export let title: string;
</script>

<div
	class="flex h-full w-full flex-col items-center justify-center space-y-7 font-mokoto text-2xl text-lapiz-blue">
	<img src={img} alt="" class="h-56" />
	<p>{title}</p>
</div>
