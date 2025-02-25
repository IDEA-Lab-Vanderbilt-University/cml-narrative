<script lang="ts">
	import DataService from '$lib/utils/DataService';
	import { goto } from '$app/navigation';
	import ImageResponseModal from '$lib/components/activities/free-response/ImageResponseModal.svelte';

	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;
	let submissionType = ''
	let doSubmit = false;

	async function onFeedbackClose() {
		showFeedbackModal = false;
		if(doSubmit) {
			onSubmit();
		}
	}

	const handleImageSubmission = async (event: CustomEvent<any>) => {
		const images: HTMLImageElement[] | HTMLOrSVGElement = event.detail.images;
		doSubmit = event.detail.doSubmit;
		let imageUrlsS3: string[] = [];
		try {
			if (images instanceof Array) {
				const promises = images.map(async (image) => {
					let res = await DataService.Data.uploadImageOrSvgToS3(image.src, 'image');
					return res;
				});
				imageUrlsS3 = await Promise.all(promises);
				console.log('imageurls: ', imageUrlsS3);
				await DataService.Data.uploadResponseImages('machineLearning', imageUrlsS3, 'image');
				submissionType = 'image';
			} else {
				let res = await DataService.Data.uploadImageOrSvgToS3(images, 'svg');
				await DataService.Data.uploadResponseImages('machineLearning', res, 'svg');
				submissionType = 'svg';
			}
			
			message = `Response recorded successfully!`;
			isSuccess = true;

		} catch (error) {
			message = `Responses submission failed!`;
			isSuccess = false
			console.error(`Error in submitting machine learning  ${submissionType} responses`, error);
		}
		showFeedbackModal = true;
	};
	const onSubmit = () => {
		goto('/training?page=12');
	}
</script>

<ImageResponseModal 
	promptedTechnology="Machine Learning"
	message={message} 
	isSuccess={isSuccess} 
	showFeedbackModal={showFeedbackModal} 
	handleImageSubmission={handleImageSubmission} 
	onSubmit={onSubmit} 
	onFeedbackClose={onFeedbackClose}
/>