<script lang="ts">
	import Popover from './Popover.svelte';
	import { tourManager } from './TourManager';
</script>

<div class="" style="position: absolute; z-index: 1000;">
	{#each $tourManager as popover}
		<div class="" id="temp-pop-container">
			<Popover popoverData={popover} />
		</div>
	{/each}
</div>

<slot />
