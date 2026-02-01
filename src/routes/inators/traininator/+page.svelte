<script>
	import { goto } from "$app/navigation";
	import TraininatorMain from "$lib/components/activities/traininator/TraininatorMain.svelte";
</script>

<TraininatorMain />

<button
    class="absolute bottom-4 right-4 z-50 rounded-full bg-blue-500 px-4 py-2 text-white shadow-lg"
    on:click={() => (goto('/inators/menu'))}
>
    Go to Menu
</button>