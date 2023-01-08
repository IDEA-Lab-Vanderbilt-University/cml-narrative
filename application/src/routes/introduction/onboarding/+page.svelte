<!--
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 7th 2023
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2023 Nice Lion Technologies LLC. All Rights Reserved.
 
--->

<script lang="ts">
	import Scene from "$lib/components/scene/Scene.svelte";
	import Tablet from "$lib/components/tablet/Tablet.svelte";


</script>

<Scene background="/img/backgrounds/Spark_Lab.jpg">
    <div slot="content" class="h-full w-full py-4 px-12">    
        <Tablet>
            <div class="flex flex-col w-full h-full justify-center items-center text-white bg-gray-100 space-y-8">
                <h1 class="text-6xl text-jet">Welcome, new SPOT Agent!</h1>
                <a href="#" class=" bg-sky-900 text-2xl px-4 py-5 rounded-full  font-mokoto shadow-md hover:shadow-lg hover:opacity-75 transition ease-in-out duration-200">Create Agent Profile</a>
            </div>
        </Tablet>
    </div>

</Scene>