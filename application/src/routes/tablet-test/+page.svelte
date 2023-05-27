<!--
 /src/routes/tablet-test/+page.svelte
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on May 27th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<!-- <div class="w-screen h-screen bg-blue-900 px-36 py-24">
    <div class="w-full h-full ring-4 ring-blue-500 rounded-md shadow-2xl shadow-white grid-background">
        <div class="text-center text-7xl font-mokoto text-white p-24"> Welcome, New SPOT Agent!</div>
    </div>
</div> -->
<!-- 
<div class="w-screen h-screen bg-blue-900 px-36 py-24">
    <div class="w-full h-full ring-4 ring-blue-500 rounded-md shadow-2xl shadow-white grid-background">
        <div class="text-center text-7xl font-mokoto text-white p-24"> Welcome, New SPOT Agent!</div>
    </div>
    <div class="flex items-end w-full justify-end space-x-5">
        <img src="/img/svg/gear.svg" alt="" class="h-20 w-20">
        <img src="/img/svg/power-button.svg" alt="" class="h-20 w-20">

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
                
            </div>
            <!-- <slot></slot> -->
        </div>
        <div class="h-fit pt-3 text-white text-center flex space-x-5 justify-end">
            <img src="/img/svg/gear.svg" alt="" class="h-20 w-20">
            <img src="/img/svg/power-button.svg" alt="" class="h-20 w-20">
        </div>
    </div>
</div>