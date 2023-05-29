<!--
 /src/lib/components/auth/Login.svelte
 Login.svelte
 cml-narrative
 
 Created by Ian Thompson on May 25th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script>
	import Scanner from "./Scanner.svelte";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher()

    let welcomeMessage = "Welcome, Agent!"

    const handleIDProcess = (e) => {
        welcomeMessage = "Welcome Agent " + e.detail.firstName
    }

</script>

<div class="w-full h-full flex flex-col  items-center justify-center">
    <div class="flex flex-col font-mokoto text-center text-white space-y-3">
        <h2 class="text-3xl font-bold">New Agents</h2>
        <p>Scan your Agent Badge below</p>
    </div>
    <div class=" w-1/2 h-1/2 mt-7 border-gray-300 border-4 rounded-md shadow-xl">
        <Scanner />
    </div>
    <button on:click={() => {
        dispatch("back")
    }}>
        <img src="/img/svg/dialog-arrow.svg" alt="" class="mt-8 h-14 rotate-180">
    </button>

    <!-- <div class="w-2/5 ">
        <Scanner on:idProcessed={handleIDProcess}/>
    </div>
    <div class=" text-black items-center flex flex-col w-full justify-center px-8">
        <h3 class="font-bold text-2xl">{welcomeMessage}</h3>
        <p class="mt-5 px-9 text-center">
            You should have recieved your Special Agent badge from Mission Control. Scan your badge here to login.
        </p>
    </div> -->
</div>