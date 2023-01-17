<!--
 /src/routes/activities/harmful-or-helpful/what-do-you-think-an-algorithim-is/+page.svelte
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
                <h1 class="text-4xl font-bold">What do you think an algorithm is?</h1>
                <p class="text-xl italic mt-4">In the box below, describe what you think an algorithm is.</p>
                <textarea class="textarea textarea-bordered w-full mx-8 mt-9 h-1/2 border-dashed border-4 text-xl" placeholder="I think an algorithm is...."></textarea>
                <a href="/activities/draw-an-algorithm" class="text-xl px-8 text-white bg-lapiz-blue rounded-md mt-9">Submit</a>
            </div>
        </Tablet>
    </div>
</Scene>

