<script>
	import { goto } from "$app/navigation";
	import TextResponseModal from "$lib/components/activities/free-response/TextResponseModal.svelte";

</script>

<TextResponseModal id="algorithm" promptedTechnology={"an Algorithm"} onSuccess={() => {
	goto("/activities/draw-an-algorithm");
}} />