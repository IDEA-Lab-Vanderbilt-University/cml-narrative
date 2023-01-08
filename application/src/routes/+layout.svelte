<!--
 /src/routes/+layout.svelte
 +layout.svelte
 cml-narrative
 
 Created by Ian Thompson on January 7th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu

 
 This file serves as the main layout handler. Any code present on this page will be present on all pages on this web application. 

 The "slot" component is dynamic, as other components can be fed into it. 

--->

<script>
    import "../app.css";
</script>
  
<div class="hidden lg:block font-cantora">
    <slot />
</div>

<div class="lg:hidden text-center font-cantora space-y-6 flex flex-col px-12 items-center h-screen justify-center align-middle ">
    <h1 class="text-5xl">Sorry, Agent!</h1>
    <p class="text-3xl">Your screen size is too small. Please use a compatible device to access the Agent Portal.</p>
</div>