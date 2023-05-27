<!--
 Tablet.svelte
 cml-narrative
 
 Created by Ian Thompson on January 7th 2023
 ianthompson@nicelion.com
 https://www.nicelion.com
 
 Copyright (c) 2023 Nice Lion Technologies LLC. All Rights Reserved.
 
--->
<script lang="ts">
    import { fade, fly } from 'svelte/transition';

</script>
<!-- in:fly="{{duration: 1000, y:200}}" out:fly="{{duration: 1000, y:200}}" -->
<!-- <div class="h-full w-full p-7 bg-gray-900 border-4 border-gray-400 rounded-xl" >
    <div class=" h-full w-full rounded-lg flex flex-col">
        <div class="h-fit w-full flex justify-between p-4 font-mokoto">
            <div class="flex space-x-3 items-center align-middle">
                <p class="text-5xl font-bold text-white">S.P.O.T</p>
                <img src="/img/logos/SPOT-dots.svg" class="w-24 h-full" alt="">
            </div>
            <p class="text-xl font-bold text-white">Solving Problems of Tomorrow</p>
        </div>
        <div class="h-full bg-base-content  rounded-md">
            <slot></slot>
        </div>
        <div class="h-fit  text-white text-center">
            MEGA Joules METER
        </div>
    </div>
</div> -->

<div class="h-screen w-screen p-7 bg-dark-navy " >
    <div class=" h-full w-full rounded-lg flex flex-col">
        <div class="h-fit w-full flex justify-between p-4 font-mokoto">
            <div class="flex space-x-3 items-center align-middle">
                <p class="text-5xl font-bold text-white">S.P.O.T</p>
                <img src="/img/logos/SPOT-dots.svg" class="w-24 h-full" alt="">
            </div>
            <p class="text-xl font-bold text-white">Solving Problems of Tomorrow</p>
        </div>
        <div class="h-full tablet-gradient  glow">
            <div class="w-full h-full grid-background">
                <slot />
            </div>
            <!-- <slot></slot> -->
        </div>
        <div class="h-fit pt-3 text-white text-center flex space-x-5 justify-end">
            <img src="/img/svg/gear.svg" alt="" class="h-20 w-20">
            <img src="/img/svg/power-button.svg" alt="" class="h-20 w-20">
        </div>
    </div>
</div>