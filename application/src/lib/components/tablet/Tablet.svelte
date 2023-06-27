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

<div class="h-screen w-screen bg-dark-navy p-7 ">
	<div class=" flex h-full w-full flex-col rounded-lg">
		<div class="flex h-fit w-full justify-between p-4 font-mokoto">
			<div class="flex items-center space-x-3 align-middle">
				<p class="text-5xl font-bold text-white">S.P.O.T</p>
				<img src="/img/logos/SPOT-dots.svg" class="h-full w-24" alt="" />
			</div>
			<p class="text-xl font-bold text-white">Solving Problems of Tomorrow</p>
		</div>
		<div class="tablet-gradient glow  h-full">
			<div class="grid-background h-full w-full">
				<slot />
			</div>
			<!-- <slot></slot> -->
		</div>
		<div id="tablet-actions" class="flex h-fit justify-end space-x-5 pt-3 text-center text-white">
			<img id="tablet-settings" src="/img/svg/gear.svg" alt="" class="h-20 w-20" />
			<img id="tablet-power-button" src="/img/svg/power-button.svg" alt="" class="h-20 w-20" />
		</div>
	</div>
</div>
