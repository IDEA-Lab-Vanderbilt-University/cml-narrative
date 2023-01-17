<!--
 /src/routes/activities/draw-an-algorithim/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 16th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script lang="ts">
	import Scene from "$lib/components/scene/Scene.svelte";
	import Tablet from "$lib/components/tablet/Tablet.svelte";


</script>

<Scene background="/img/backgrounds/Spark_Lab.jpg">
    <div class="w-full h-full p-4" slot="content">
        <Tablet>
            <div class="flex flex-col font-mono bg-white w-full h-full p-5 rounded-md items-center">
                <h1 class="text-4xl font-bold">Draw a picture of what you think Machine :earning is</h1>
                <p class="text-xl italic mt-4">In the box below, draw a picture of what you think Machine Learning is.</p>
                <textarea class="textarea textarea-bordered w-full mx-8 mt-9 h-full border-dashed border-4 text-xl" placeholder="I think machine learning is...."></textarea>
                <div class="flex items-center justify-between align-middle mt-8 space-x-5">
                    <button class="w-8">
                        <img src="/img/icons/camera.svg" alt="">
                    </button>
                    <a href="/training?page=12" class="text-xl px-8 text-white bg-lapiz-blue rounded-md">Submit</a>
                </div>
            </div>
        </Tablet>
    </div>
</Scene>

