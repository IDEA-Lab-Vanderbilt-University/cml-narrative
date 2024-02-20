<script lang="ts">
	import Tablet from '$lib/components/tablet/Tablet.svelte';

	import ImageResponse from '$lib/components/activities/free-response/ImageResponse.svelte';

	import DataService from '$lib/utils/DataService';
	import { goto } from '$app/navigation';

	let hasRecievedResponse = false;


	const handleImageSubmission = async (event: CustomEvent<any>) => {
		const images: HTMLImageElement[] | HTMLOrSVGElement = event.detail.images;
		let imageUrlsS3: string[] = [];
		try {
			if (images instanceof Array) {
				const promises = images.map(async (image) => {
					let res = await DataService.Data.uploadImageOrSvgToS3(image.src, 'image');
					return res;
				});
				imageUrlsS3 = await Promise.all(promises);
				console.log('imageurls: ', imageUrlsS3);
				await DataService.Data.uploadResponseImages('algorithm', imageUrlsS3, 'image');
			} else {
				let res = await DataService.Data.uploadImageOrSvgToS3(images, 'svg');
				await DataService.Data.uploadResponseImages('algorithm', res, 'svg');
			}
			goto('/training?page=11');
		} catch (error) {
			console.error(error);
		}
	};

	const handleSubmit = () => {
		console.log('submit');
		console.log(hasRecievedResponse);

		if (hasRecievedResponse) {
			goto('/training?page=11');
		}
	};
</script>

<Tablet>
	<ImageResponse
		promptedTechnology="an Algorithm"
		href="/training?page=11"
		on:imageSubmitted={handleImageSubmission}
		on:submitClicked={handleSubmit} />
</Tablet>
