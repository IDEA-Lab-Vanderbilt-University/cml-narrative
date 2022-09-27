<!--
 +page.svelte
 application
 
 Created by Ian Thompson on September 27th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<!-- <script lang="ts">
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";
    let items = [
        {id: 1, name: "item1"},
        {id: 2, name: "item2"},
        {id: 3, name: "item3"},
        {id: 4, name: "item4"}
    ];
    const flipDurationMs = 300;
    function handleDndConsider(e) {
        items = e.detail.items;
    }
    function handleDndFinalize(e) {
        items = e.detail.items;
    }
</script>

<!-- <div class="text-black bg-white h-screen">
    hello
</div> -->

<!-- <style>
    section {
        width: 100%;
        padding: 0.3em;
        border: 1px solid black;
        /* this will allow the dragged element to scroll the list */
        overflow: scroll;
        height: 200px;
    }
    div {
        width: 100%;
        padding: 0.2em;
        border: 1px solid blue;
        margin: 0.15em 0;
    }
</style>

<div class="text-black bg-white h-screen w-full">
    <section use:dndzone="{{items, flipDurationMs}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
        {#each items as item(item.id)}
        <div animate:flip="{{duration: flipDurationMs}}">{item.name}</div>
        {/each}
    </section>
</div> -->

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


