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

    let welcomeMessage = "Welcome, Agent!"

    const handleIDProcess = (e) => {
        welcomeMessage = "Welcome Agent " + e.detail.firstName
    }

</script>

<div class="w-full bg-white h-full flex">
    <div class="w-2/5 ">
        <Scanner on:idProcessed={handleIDProcess}/>
    </div>
    <div class=" text-black items-center flex flex-col w-full justify-center px-8">
        <h3 class="font-bold text-2xl">{welcomeMessage}</h3>
        <p class="mt-5 px-9 text-center">
            You should have recieved your Special Agent badge from Mission Control. Scan your badge here to login.
        </p>
    </div>
</div>