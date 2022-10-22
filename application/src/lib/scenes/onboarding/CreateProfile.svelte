<!--
 AssignName.svelte
 cml-narrative
 
 Created by Ian Thompson on October 22nd 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script>
    let index = 0
</script>


<div class="w-full h-full flex flex-col justify-center items-center">
    {#if index == 0}
        <div class=" space-y-5">
            <p class="text-sky-800 text-4xl font-mono">What is your name?</p>
            <input class="p-4 border-sky-800 border-2 rounded-lg w-full text-black " type="text" placeholder="Johnny">
        </div>
        <div class="mt-12 space-y-5">
            <p class="text-sky-800 text-4xl font-mono">How old are you?</p>
            <input class="p-4 border-sky-800 border-2 rounded-lg w-full text-black " type="number" placeholder="8">
        </div>

    {/if}

</div>