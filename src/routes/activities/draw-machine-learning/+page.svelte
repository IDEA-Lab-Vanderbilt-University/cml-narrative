<script lang="ts">
	import DataService from '$lib/utils/DataService';
	import ImageResponseModal from '$lib/components/activities/free-response/ImageResponseModal.svelte';
	import { requireLogin, studentProgressStore } from '$lib/utils/stores/store';
	import { goto } from '$app/navigation';
	
	requireLogin();

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
		console.log(event);
		const images: HTMLImageElement[] | HTMLOrSVGElement = event.detail.images;
		doSubmit = event.detail.doSubmit;
		let imageUrls: string[] = [];
		try {
			//  Create a data URL from the images or SVG element
			const canvas = document.createElement('canvas');
			if (images instanceof Array) {
				for(let image of images) {
					if (image instanceof HTMLImageElement) {
						// Check if image src is a data URL already
						if (image.src.startsWith('data:')) {
							imageUrls.push(image.src);
							continue;
						}

						// Otherwise, draw the image on a canvas and get the data URL
						canvas.width = image.width;
						canvas.height = image.height;
						const ctx = canvas.getContext('2d');

						if (ctx) {
							ctx.drawImage(image, 0, 0);
							imageUrls.push(canvas.toDataURL('image/png'));
						} else {
							throw new Error('Failed to get canvas context');
						}
					}
				}
			} else if (images instanceof SVGElement) {
				// Handle the SVG element
				const svgData = new XMLSerializer().serializeToString(images);
				const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
				const url = URL.createObjectURL(svgBlob);
				imageUrls.push(url);
			} else if (images instanceof HTMLImageElement) {
				canvas.width = images.width;
				canvas.height = images.height;
				const ctx = canvas.getContext('2d');

				if (ctx) {
					ctx.drawImage(images, 0, 0);
					imageUrls.push(canvas.toDataURL('image/png'));
				} else {
					throw new Error('Failed to get canvas context');
				}
			} else {
				throw new Error('Invalid image type');
			}

			if (imageUrls.length === 0) {
				throw new Error('No images to submit');
			}

			//  Submit the data URL to the server
			await DataService.TravelLog.submitTravelLog(
				{
					description: 'draw-machine-learning',
					data: imageUrls.length > 1 ? JSON.stringify(imageUrls) : imageUrls[0],
					status: 'complete',
				}
			);
			
			message = `Machine learning ${submissionType} responses were recorded successfully!`;
			isSuccess = true;

		} catch (error) {
			message = `Machine learning ${submissionType} responses submission failed!`;
			isSuccess = false;
			console.error(error);
		}
		showFeedbackModal = true;
	};

	const onSubmit = () => {
		studentProgressStore.update((progress) => {
			progress.last_visited = '/training?page=12';
			return progress;
		});
		
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