<script>
	import { goto } from "$app/navigation";
	import TextResponseModal from "$lib/components/activities/free-response/TextResponseModal.svelte";

</script>

<TextResponseModal id="machineLearning" promptedTechnology={"Machine Learning"} onSuccess={() => {
	goto("/activities/draw-machine-learning");
}} />