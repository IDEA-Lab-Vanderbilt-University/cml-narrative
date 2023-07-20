<!--
 /src/routes/activities/draw-an-algorithim/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 16th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import Tablet from '$lib/components/tablet/Tablet.svelte';

	import ImageResponse from '$lib/components/activities/free-response/ImageResponse.svelte';

	import { getContext } from 'svelte';
	import DataService from '$lib/utils/DataService';
	import { goto } from '$app/navigation';

	let hasRecievedResponse = false;

	const hanldeImageSubmission = async (event) => {
		console.log(event);

		try {
			await DataService.Data.uploadResponseImages('algorithm', event.detail.image).then(() => {
				console.log('finished');
			});
			console.log('finisdshed');
			hasRecievedResponse = true;
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = () => {
		if (hasRecievedResponse) {
			goto('/training?page=11');
		}
	};
</script>

<Tablet>
	<ImageResponse
		promptedTechnology="an Algorithm"
		on:imageSubmitted={hanldeImageSubmission}
		on:submitClicked={handleSubmit} />
</Tablet>
