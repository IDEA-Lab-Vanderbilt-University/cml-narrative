<script lang="ts">
	import Tablet from '$lib/components/tablet/Tablet.svelte';
</script>

<Tablet showMeter={false} showBottomButtons={false} showLanguageMenu={false}>
	<slot />
</Tablet>