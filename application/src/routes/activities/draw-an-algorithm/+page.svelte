<!--
 /src/routes/activities/draw-an-algorithim/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 16th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script lang="ts">
	import DrawAlgorithim from "$lib/components/activities/draw/DrawAlgorithim.svelte";
    import Scene from "$lib/components/scene/Scene.svelte";
	import Tablet from "$lib/components/tablet/Tablet.svelte";

    import {Draw} from "$lib/components/activities/draw/Draw.jsx"
    import { ReactAdapter } from "svelte-react-kit";

</script>

<Scene background="/img/backgrounds/Spark_Lab.jpg">
    <div class="w-full h-full p-4" slot="content">
        <Tablet>
            <div class="flex flex-col font-mono bg-white w-full h-full p-5 rounded-md items-center">
                <h1 class="text-4xl font-bold">Draw a picture of what you think an algorithm is</h1>
                <p class="text-xl italic mt-4">In the box below, draw a picture of what you think an algorithm is.</p>
                <div class="w-full h-full pt-8">
                    <!-- 
                        The Draw component is utlizes a React based library. As such, a special adapter is needed to 
                        allow interface between a Svelte and React component. More can be read in the documentation of the 
                        Draw component.
                    -->
                    <ReactAdapter 
                        el={Draw}
                    />
                </div>

                <div class="flex items-center justify-between align-middle mt-8 space-x-5">
                    <button class="w-8">
                        <img src="/img/icons/camera.svg" alt="">
                    </button>
                    <a href="/training?page=15" class="text-xl px-8 text-white bg-lapiz-blue rounded-md">Submit</a>
                </div>
            </div>
        </Tablet>
    </div>
</Scene>

