<!--
 /src/routes/+layout.svelte
 +layout.svelte
 cml-narrative
 
 Created by Ian Thompson on January 7th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu

 
 This file serves as the main layout handler. Any code present on this page will be present on all pages on this web application. 

 The "slot" component is dynamic, as other components can be fed into it. 

--->
<script lang="ts">
	import TabletModal from '$lib/components/modals/TabletModal.svelte';
	import TourWrapper from '$lib/components/tour/TourWrapper.svelte';
	import { onMount } from 'svelte';
	import '../app.css';
	import Modal from 'svelte-simple-modal';
	import { browser } from '@tensorflow/tfjs';
	import { page } from '$app/stores';

	let tabletModal: TabletModal | void;
	let main: HTMLDivElement | void;
	
	onMount(() => {
		document.addEventListener('showTablet', (e) => {
			console.log('showTablet event received');
			if (tabletModal) {
				tabletModal.hidden = false;
				main?.classList.remove('lg:block');
				main?.classList.add('hidden');
			}
		});
		document.addEventListener('hideTablet', (e) => {
			console.log('showTablet event received');
			if (tabletModal) {
				tabletModal.hidden = true;
				main?.classList.add('lg:block');
				main?.classList.remove('hidden');
			}
		});
		
		if(browser) {
			history.pushState(null, '', window.location.href);
		}


		window.addEventListener('popstate', (e) => {
			if(browser) {
				history.pushState(null, '', $page.url.href);
				console.log('popstate event received at ' + $page.url.href);
			
				// When the back button is pressed, we want to hide the tablet modal or do nothing
				if (tabletModal) {
					tabletModal.hidden = true;
					main?.classList.add('lg:block');
					main?.classList.remove('hidden');
				}

				e.preventDefault();
				e.stopPropagation();
			}
			return false;
		});
	});
</script>

<svelte:head>
	<title>S.P.O.T - Solving Problems of Tomorrow</title>
</svelte:head>

<Modal>
	<TabletModal hidden bind:this={tabletModal}></TabletModal>

	<div class="right-size hidden font-cantora lg:block w-full h-full" bind:this={main}>
		<TourWrapper>
			<slot />
		</TourWrapper>
	</div>

	<div
		id="too-small"
		class="font-cantora flex h-screen flex-col items-center justify-center space-y-6 px-12 text-center align-middle lg:hidden ">
		<h1 class="text-5xl">Sorry, Agent!</h1>
		<p class="text-3xl">
			Your screen size is too small. Please use a compatible device to access the Agent Portal.
		</p>
	</div>
</Modal>

<style>
	@media (max-height: 640px) {
		.right-size {
			display: none;
		}
	
		#too-small {
			vertical-align: middle;
			display: table-cell;
			text-align: center;
			width: 100vw;
		}
	}


	@media (max-width: 640px) {
		.right-size {
			display: none;
		}
	
		#too-small {
			vertical-align: middle;
			display: table-cell;
			text-align: center;
			width: 100vw;
		}
	}
	
</style>
