<!--
 /src/lib/components/scene/ProjectorView.svelte
 ProjectorView.svelte
 cml-narrative
 
 Created by Ian Thompson on January 16th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script lang="ts">
    import { fade, fly } from 'svelte/transition';

</script>

<div class="flex w-full h-full flex-col" >
    <div class="w-full h-12 bg-gray-900 z-10"></div>
    <div class="h-full z-0" in:fly="{{ y: -800, duration: 2000, delay: 200 }}">
        <div class="bg-white mx-8 h-4/5 rounded-sm border-4 border-b-0 border-black border-t-0">
            <slot />
        </div>
        <div class="w-full h-12 bg-white rounded-sm border-4 border-black"></div>
        <div class="w-full flex items-center justify-center flex-col">
            <div class="w-2 bg-black h-12"></div>
            <div class="h-10 w-10 rounded-full bg-lapiz-blue border-4 border-black"></div>
        </div>
    </div>
</div>
