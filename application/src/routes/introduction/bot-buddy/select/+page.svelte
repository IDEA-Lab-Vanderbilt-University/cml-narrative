<!--
 /src/routes/introduction/bot-buddy/select/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on January 14th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->


<script lang="ts">
	import Scene from "$lib/components/scene/Scene.svelte";


</script>

<Scene background="/img/backgrounds/Spark_Lab.jpg">
    <div slot="content" class="w-full h-full p-96">
        <div class="bg-jet flex flex-col p-24 items-center justify-center text-white rounded-md shadow-md">
            <h1 class="text-4xl mb-9 ">Select a Bot Buddy</h1>
            <div class="flex space-x-7">
                <p>BOT BUDDY 1</p>
                <p>BOT BUDDY 2</p>
                <p>BOT BUDDY 3</p>
                <p>BOT BUDDY 4</p>
                <p>BOT BUDDY 5</p>
            </div>

        </div>
    </div>
</Scene>