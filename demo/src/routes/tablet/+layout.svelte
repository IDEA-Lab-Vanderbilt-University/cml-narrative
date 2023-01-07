<!--
 /src/routes/tablet/+layout.svelte
 +layout.svelte
 cml-narrative
 
 Created by Ian Thompson on October 22nd 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->


<script>
    import Scene from '$lib/components/scene/Scene.svelte';
    import { getContext } from 'svelte';
    const { close } = getContext('simple-modal');

    const closeTablet = () => {
        close()
    }

</script>

<Scene background="/img/backgrounds/captain_office.jpg">
    <div class="h-full w-full p-8">
        <div class="h-full w-full p-7 bg-gray-900 border-4 border-gray-400 rounded-xl">
            <div class="px-5 h-full">
                <div class="flex justify-between " id="top">
                    <div class="flex space-x-3 items-center align-middle">
                        <p class="text-2xl font-bold text-white">S.P.O.T</p>
                        <img src="/img/logos/SPOT-dots.svg" class="w-8" alt="">
                    </div>
                    <p class="text-xl font-bold text-white">Solving Problems of Tomorrow</p>
                </div>
                <div class="h-full bg-slate-100 p-2 rounded-md" id="content">
                    d
                </div>
                <div id="bottom" class="flex justify-center">
                    MEGA JOULES
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="p-5">
        <div class="p-7 bg-gray-900 border-2 border-gray-400 rounded-xl">
            <div class="bg-independence w-full h-screen z-20 rounded-md">
                <div class="flex justify-between items-center p-4">
                    <div class="flex space-x-8 items-center align-middle">
                        <p class="text-6xl font-bold text-white">S.P.O.T</p>
                        <img src="/img/logos/SPOT-dots.svg" class="w-24" alt="">
                    </div>
                    <p class="text-3xl font-bold text-white">Solving Problems of Tomorrow</p>
                </div>
            
                <div class="w-full h-4/5 p-8">
                    <div class="h-full w-full bg-gray-50 rounded-md p-2 z-50">
                        <slot />
                    </div>
                    
                </div>
                <div class="flex justify-between px-10 items-center">
                    <img src="/img/icons/settings.png"  class="h-20 w-20 hover:animate-wiggle" alt="">
                    <div class="">
                        MEGA JOULES METER?
                    </div>
                    <img src="/img/icons/power.png" class="h-20 w-20 hover:animate-wiggle" alt="" on:click={closeTablet}>
            
                </div>
            </div>
        </div>
    </div> -->
</Scene>

