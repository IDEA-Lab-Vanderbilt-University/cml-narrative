<!--
 /src/lib/components/sequences/tablet/create-profile/Name.svelte
 Name.svelte
 cml-narrative
 
 Created by Ian Thompson on January 9th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<div class="flex flex-col w-full h-full justify-center items-center space-y-10">
    <h1 class="text-5xl text-lapiz-blue">What is your name?</h1>
    <div class="flex w-full justify-center space-x-7">
        <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text text-3xl">First name:</span>
            </label>
            <input type="text" placeholder="Ada" class="input input-bordered w-full" />
        </div>
        <div class="form-control w-full max-w-xs">
            <label class="label">
              <span class="label-text text-3xl">Last name:</span>
            </label>
            <input type="text" placeholder="Lovelace" class="input input-bordered w-full" />
        </div>
    </div>
</div>