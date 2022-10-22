<!--
 +page.svelte
 cml-narrative
 
 Created by Ian Thompson on October 22nd 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script>
    import { fly } from 'svelte/transition';


    let index = 3

    let profileData = {
        name: "",
        age: "",
        description: {
            description1: "",
            description2: "",
            description3: ""

        },
        agentName: ""
    }

    const advanceFlow = () => {
        index += 1
    }

    const regressFlow = () => {
        index -= 1
    }


</script>




<div class="w-full h-full flex flex-col">
    <div class="flex h-full flex-col justify-center items-center">
        {#if index == 0}
            <div class=" space-y-5">
                <p class="text-sky-800 text-4xl font-mono">What is your name?</p>
                <input class="p-4 border-sky-800 border-2 rounded-lg w-full text-black " type="text" placeholder="Johnny" bind:value={profileData.name}>
            </div>
            {#if profileData.name != ""}
                <div class="mt-12 space-y-5" transition:fly>
                    <p class="text-sky-800 text-4xl font-mono">How old are you?</p>
                    <input class="p-4 border-sky-800 border-2 rounded-lg w-full text-black " type="number" placeholder="8" bind:value={profileData.age}>
                </div> 
            {/if}
            
        {:else if index == 1}
            <p class="text-sky-800 text-4xl font-mono">Tell us three words that describe you:</p>
            <div class="space-y-6 mt-5">
                <input class="p-4 border-sky-800 border-2 rounded-lg w-full text-black " type="text" placeholder="Placeholder" bind:value={profileData.description.description1}>
                <input class="p-4 border-sky-800 border-2 rounded-lg w-full text-black " type="text" placeholder="Placeholder" bind:value={profileData.description.description2}>
                <input class="p-4 border-sky-800 border-2 rounded-lg w-full text-black " type="text" placeholder="Placeholder" bind:value={profileData.description.description3}>
            </div>
            
        {:else if index == 2}
            <div class="flex justify-center w-full space-x-10">
                <div class="flex flex-col items-center">
                    <img src="/img/characters/agent-spark/spark_talking.png" class="rounded-full" alt="">
                    <p>Agent Spark</p>
                </div>
                <div class="p-8 text-black">
                    <p class="text-4xl">I like to:</p>
                    <ul class="list-disc text-2xl ml-9">
                        <li>Swim</li>
                        <li>Play video games</li>
                        <li>Listen to music</li>
                    </ul>
                </div>
            </div>
        {:else if index == 3}
            <div class="flex flex-col justify-center w-full space-x-10">
                <div class="flex flex-col items-center">
                    <img src="/img/characters/agent-spark/spark_talking.png" class="rounded-full" alt="">
                    <p class="text-3xl pt-4">Choose an avatar</p>
                </div>
            </div>
        {:else if index == 4}
            <div class=" space-y-5">
                <p class="text-sky-800 text-4xl font-mono">Enter your agent name:</p>
                <input class="p-4 border-sky-800 border-2 rounded-lg w-full text-black " type="text" placeholder="Agent Peppercorn" bind:value={profileData.agentName}>
            </div>
        {:else if index == 5}
            <div class="flex flex-col justify-center w-full space-x-10">
                <div class="flex flex-col items-center">
                    <img src="/img/characters/agent-spark/spark_talking.png" class="rounded-full" alt="">
                    <p class="text-3xl pt-4">{profileData.agentName}</p>
                </div>
            </div>
        {/if}
    
    </div>
    <div class="w-full flex justify-between px-8">
        <button on:click={regressFlow} class="p-3 bg-sky-800 text-white rounded-lg ">Previous</button>
        <button on:click={advanceFlow} class="p-3 bg-sky-800 text-white rounded-lg ">Next</button>
    </div>
</div>

