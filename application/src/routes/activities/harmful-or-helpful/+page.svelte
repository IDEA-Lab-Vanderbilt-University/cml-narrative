<!--
 /src/routes/activities/harmful-or-helpful/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 16th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import Bank from '$lib/components/activities/drag-and-drop/Bank.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import Tablet from '$lib/components/tablet/Tablet.svelte';

	// import ConfirmationModal from "$lib/components/modals/activities/hurtful-harmful/ConfirmationModal.svelte";
	import { getContext } from 'svelte';
	// const { open } = getContext('simple-modal');

	let items1 = [
		{ id: 1, title: 'iPhone', img: '/img/icons/mobile-app.png' },
		{ id: 2, title: 'Social Media', img: '/img/icons/social-media.png' },
		{ id: 3, title: 'Internet', img: '/img/icons/wifi.png' }
	];
	let hurtful = [];
	let helpful = [];
	let bothHurtfulAndHelpful = [];

	const handleDrop = (e) => {
		console.log(e.detail);

		if (
			e.detail.id == 'harmful' ||
			e.detail.id == 'helpful' ||
			e.detail.id == 'harmfulAndHelpful'
		) {
			// if
			// open(ConfirmationModal, {detail: e.detail})
		}
	};
</script>

<Scene background="/img/backgrounds/Spark_Lab.jpg">
	<div class="h-full w-full p-4" slot="content">
		<Tablet>
			<div class="h-full w-full rounded-md bg-white p-4">
				<div class="flex flex-col justify-around space-y-10">
					<div class="space-y-4 text-center font-mono">
						<p class="text-3xl font-bold">Is this technology helpful or harmful?</p>
						<p>Drag and drop each of the technologies into the proper bin.</p>
					</div>
					<div class="mt-4 h-1/4 border-2 border-dashed border-slate-200 bg-gray-50">
						<Bank items={items1} type="light" />
					</div>

					<div class="flex h-full space-x-3">
						<div
							class="h-full w-full rounded-sm border-2 bg-gray-50 p-2 text-center text-2xl text-black">
							<p>Harmful</p>
							<Bank items={hurtful} type="light" id="harmful" on:itemDropped={handleDrop} />
						</div>
						<div
							class=" h-full w-full rounded-sm border-2 bg-gray-50 p-2 text-center text-2xl text-black">
							<p>Helpful</p>
							<Bank items={helpful} type="light" id="helpful" on:itemDropped={handleDrop} />
						</div>
						<div
							class=" h-full w-full rounded-sm border-2 bg-gray-50 p-2 text-center text-2xl text-black">
							<p>Both Harmful and Helpful</p>
							<Bank
								items={bothHurtfulAndHelpful}
								type="light"
								id="harmfulAndHelpful"
								on:itemDropped={handleDrop} />
						</div>
					</div>
					<div class="flex items-center justify-center">
						<a
							href="/training?page=6"
							class="w-fit  rounded-md bg-lapiz-blue px-5 text-3xl text-white">Submit</a>
					</div>
				</div>
			</div></Tablet>
	</div>
</Scene>
