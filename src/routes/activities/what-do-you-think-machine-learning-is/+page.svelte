<script>
	import { goto } from "$app/navigation";
	import TextResponseModal from "$lib/components/activities/free-response/TextResponseModal.svelte";
	import { requireLogin } from "$lib/utils/stores/store";

	requireLogin();
</script>

<TextResponseModal id="machineLearning" promptedTechnology={"Machine Learning"} onSuccess={() => {
	goto("/activities/draw-machine-learning");
}} />