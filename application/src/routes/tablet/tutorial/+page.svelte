<!--
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on November 21st 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script lang="ts">
	import DialogBox from "$lib/components/DialogBox.svelte";


</script>

<div class="w-full h-full flex justify-around items-center">
    <div class="flex flex-col items-center space-y-5 text-4xl">
        <img src="/img/icons/journal.png" alt="" class="w-24">
        <p>Travel Log</p>
    </div>
    <div class="flex flex-col items-center space-y-5 text-4xl">
        <img src="/img/icons/profile.png" alt="" class="w-24">
        <p>Profile</p>
    </div>
    <div class="flex flex-col items-center space-y-5 text-4xl">
        <img src="/img/icons/award.png" alt="" class="w-24">
        <p>Badges</p>
    </div>
</div>

<div class="w-full bg-gray-100 p-4 z-50 relative items-center align-middle flex">
    <button on:click class="h-12 w-12">
        <img src="/img/icons/previous.png" alt="" class="">
    </button>
    <p class="text-2xl text-center text-black px-20 w-full">This is your spot tablet</p>
    <button on:click class="h-12 w-12">
        <img src="/img/icons/previous.png" alt="" class="rotate-180">
    </button>
    <img src="/img/characters/agent-spark/spark_clapping.png" alt="" class="absolute right-40 bottom-0 h-48">
    <!-- <img src={avatar} alt="" class="h-96 -z-10 absolute right-40 bottom-32" /> -->

</div>
