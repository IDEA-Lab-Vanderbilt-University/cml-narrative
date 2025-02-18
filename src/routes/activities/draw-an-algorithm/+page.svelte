<script lang="ts">
	import Tablet from '$lib/components/tablet/Tablet.svelte';

	import ImageResponse from '$lib/components/activities/free-response/ImageResponse.svelte';
	import FeedbackModal from '$lib/components/modals/FeedbackModal.svelte';

	import DataService from '$lib/utils/DataService';
	import { goto } from '$app/navigation';
	import type { StudentProgress } from '$lib/types/UserData';
	import type { studentDataStore } from '$lib/utils/stores/store';
	import ImageResponseModal from '$lib/components/activities/free-response/ImageResponseModal.svelte';

	let message = '';
	let isSuccess = false;
	let showFeedbackModal = false;
	let submissionType = '';
	let doSubmit = false;

	async function onFeedbackClose() {
		showFeedbackModal = false;
		if (doSubmit) {
			onSubmit();
		}
	}

	const getUpdatedProgress = (): StudentProgress => {
		return {
			level: 0,
			levelLabel: 'level-zero',
			subLevel: 1,
			last_visited: '/training?page=10',
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
				await DataService.Data.uploadResponseImages('algorithm', imageUrlsS3, 'image');
				submissionType = 'image';
			} else {
				let res = await DataService.Data.uploadImageOrSvgToS3(images, 'svg');
				await DataService.Data.uploadResponseImages('algorithm', res, 'svg');
				submissionType = 'svg';
			}
			message = `Algorithm ${submissionType} responses were recorded successfully!`;
			isSuccess = true;
			let progress = getUpdatedProgress();
			await DataService.Data.updateUserProgress(progress);
			updateLocalProgress(progress);
		} catch (error) {
			message = `Algorithm ${submissionType} responses submission failed!`;
			isSuccess = false;
			console.error(error);
		}
		showFeedbackModal = true;
	};

	const onSubmit = () => {
		goto('/training?page=9');
	};
</script>

<ImageResponseModal
	promptedTechnology="an Algorithm"
	message={message} 
	isSuccess={isSuccess} 
	showFeedbackModal={showFeedbackModal} 
	handleImageSubmission={handleImageSubmission} 
	onSubmit={onSubmit} 
	onFeedbackClose={onFeedbackClose}
/>