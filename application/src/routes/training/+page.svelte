<!--
 /src/routes/training/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 16th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script lang="ts">
	import DialogBox from "$lib/components/dialog/DialogBox.svelte";
	import SlimDialogBox from "$lib/components/dialog/SlimDialogBox.svelte";
import ProjectorView from "$lib/components/scene/ProjectorView.svelte";
    import Scene from "$lib/components/scene/Scene.svelte";
    import { fade, fly } from 'svelte/transition';


</script>

<Scene background="/img/backgrounds/Spark_Lab.jpg">
    <div class="w-full h-full" slot="content">
        <ProjectorView>
            <div class="w-full h-full flex flex-col justify-center items-center space-y-7">
                <h1 class="text-6xl font-mono">Technology</h1>
                <img src="/img/icons/chip.svg" alt="" class="h-56">
            </div>
        </ProjectorView>
    </div>
    <div class="w-full" slot="dialog">
        <SlimDialogBox speaker={"line.speaker"} dialog={"line.dialog"} avatar={"line.avatar"} ></SlimDialogBox>
    </div>
</Scene>