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

	let hasRecievedResponse;

	const hanldeImageSubmission = async (event) => {
		console.log(event);

		try {
			await DataService.Data.uploadResponseImages('machineLearning', event.detail.image).then(
				() => {
					console.log('finished');
				}
			);
			console.log('finisdshed');
		} catch (error) {
			console.error(error);
		}
	};
</script>

<Tablet>
	<ImageResponse promptedTechnology="Machine Learning" on:imageSubmitted={hanldeImageSubmission} />
</Tablet>
