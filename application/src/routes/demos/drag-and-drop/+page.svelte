<!--
 +page.svelte
 application
 
 Created by Ian Thompson on September 27th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->


<script>
	import Bank from "$lib/components/dropzone/Bank.svelte";
	import ConfirmationModal from "$lib/components/modals/activities/hurtful-harmful/ConfirmationModal.svelte";
    import { getContext } from 'svelte';
    const { open } = getContext('simple-modal');


	let items1 = [
		{id:1, title: 'iPhone', img: '/img/icons/mobile-app.png'},
		{id:2, title: 'Social Media', img: '/img/icons/social-media.png'},
		{id:3, title: 'Internet', img: '/img/icons/wifi.png'}
	];
	let hurtful = [];
    let helpful = []
	let bothHurtfulAndHelpful = [];

    const handleDrop = (e) => {
        console.log(e.detail);

        if (e.detail.id == "harmful" || e.detail.id == "helpful" || e.detail.id == "harmfulAndHelpful") {
            // if 
            open(ConfirmationModal, {detail: e.detail})
        }
    }

</script>
    <div class="h-screen w-full bg-gray-100 p-8">
        <div class="text-black space-y-4">
            <h1 class="text-3xl text-center">Are these technologies helpful or harmful?</h1>
            <p class="text-xl">Drag and drop each technology into one of the baskets below based on your thoughts on whether the
                technology is helpful or harmful?</p>
        </div>
    
        <div class="mt-8 h-1/4">
            <Bank items={items1} type='light'/>
        </div>
        <div class="flex space-x-5 h-full">
            <div class="h-72 w-full text-center text-2xl text-black bg-gray-50 p-2 border-2 rounded-sm">
                <p>Harmful</p>
                <Bank items={hurtful} type='light' id="harmful" on:itemDropped={handleDrop}/>
    
            </div>
            <div class=" h-72 w-full text-center text-2xl text-black bg-gray-50 p-2 border-2 rounded-sm">
                <p>Helpful</p>
                <Bank items={helpful} type='light'id="helpful" on:itemDropped={handleDrop}/>
    
            </div>
            <div class=" h-72 w-full text-center text-2xl text-black bg-gray-50 p-2 border-2 rounded-sm">
                <p>Both Harmful and Helpful</p>
                <Bank items={bothHurtfulAndHelpful} type='light' id="harmfulAndHelpful" on:itemDropped={handleDrop}/>
    
            </div>
    
        </div>
    </div>


