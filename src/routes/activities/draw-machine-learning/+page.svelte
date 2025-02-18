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
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';

	import DataService from '$lib/utils/DataService';
	import { goto } from '$app/navigation';
	import type { UserProgress } from '$lib/types/UserData';
	import { userDataStore } from '$lib/utils/stores/store';
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

	const getUpdatedProgress = (): StudentProgress => {
		return {
			level: 0,
			levelLabel: 'level-zero',
			subLevel: 1,
			subLevelLabel: '/training?page=14',
			lastUpdated: new Date()
		};
	};

	const updateLocalProgress = (progress: StudentProgress) => {
		userDataStore.update((data) => {
			data.progress = progress;
			return data;
		});
	};

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
			isSuccess = true
			let progress = getUpdatedProgress();
			await DataService.Data.updateUserProgress(progress);
			updateLocalProgress(progress);
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