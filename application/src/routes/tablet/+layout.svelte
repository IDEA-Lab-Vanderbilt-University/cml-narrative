<!--
 +layout.svelte
 cml-narrative
 
 Created by Ian Thompson on October 22nd 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script>
    import { getContext } from 'svelte';
    const { close } = getContext('simple-modal');

    const closeTablet = () => {
        close()
    }

</script>
<div class="bg-independence w-full h-screen z-50 rounded-md">
    <div class="flex justify-between items-center p-4">
        <!-- img -->
        <!-- <img src="/img/logos/SPOT-logo.svg" class="w-1/6" alt=""> -->
        <div class="flex space-x-8 items-center align-middle">
            <p class="text-6xl font-bold text-white">S.P.O.T</p>
            <img src="/img/logos/SPOT-dots.svg" class="w-24" alt="">
        </div>
        <!-- Tagline -->
        <p class="text-3xl font-bold text-white">Solving Problems of Tomorrow</p>
    </div>

    <div class="w-full h-4/5 p-8">
        <!-- content -->
        <div class="h-full w-full bg-gray-50 rounded-md p-2">
            <slot />
        </div>
        
    </div>
    <div class="flex justify-between px-10 items-center">
        <!-- footer -->
        <img src="/img/icons/settings.png"  class="h-20 w-20 hover:animate-wiggle" alt="">
        <div class="">
            MEGA JOULES METER?
        </div>
        <img src="/img/icons/power.png" class="h-20 w-20 hover:animate-wiggle" alt="" on:click={closeTablet}>

    </div>
</div>