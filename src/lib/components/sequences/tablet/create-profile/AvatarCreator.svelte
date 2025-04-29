<!--
 /src/lib/components/sequences/tablet/create-profile/AgentName.svelte
 AgentName.svelte
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->
<script lang="ts">
	import { tourManager } from '$lib/components/tour/TourManager';
    import libmoji from '$lib/utils/libmoji';

	import type { Student } from '$lib/types/UserData';

	export let profileData: Student;

	import { createEventDispatcher, onDestroy, onMount } from 'svelte';
	const dispatch = createEventDispatcher();

	const handleSubmit = () => {
		dispatch('submitClicked');
	};
    


    // Test the library
    const randomMoji = () => {
        let pose = libmoji.poses[1];
        let gender = libmoji.genders[libmoji.randInt(libmoji.genders.length)];
        let style = libmoji.styles[libmoji.randInt(libmoji.styles.length)];
        let traits = libmoji.randTraits(libmoji.getTraits(gender[0],style[0]));
        let outfit = libmoji.randOutfit(libmoji.getOutfits(libmoji.randBrand(libmoji.getBrands(gender[0]))));

        let testUrl = libmoji.buildPreviewUrl(pose,3,gender[1],style[1],0,traits,outfit);

        return testUrl;
    };

    let options = [0, 1 ,2, 3, 4, 5, 6, 7, 8].map(() => randomMoji());
</script>

<div class="flex h-full w-full flex-col items-center justify-center space-y-5 font-mono" style="transform: translateY(-10%)">
	<h1 class="text-white" style="font-size:6vh">Choose your Picture</h1>
	<div class="flex w-full justify-center space-x-7">
		<div class="moji-container">
			{#each options as moji}
                <button class="moji h-32 w-32 rounded-full border-4 shadow-lg hover:cursor-pointer hover:shadow-xl {
                    profileData.avatar == moji ? 'border-4 border-lapiz-blue bg-white' : 'border-gray-500 bg-transparent'
                }"
                 on:click={() => { profileData.avatar = moji; }} 
                 style="background-image: url({moji});" 
                 />
            {/each}
		</div>
	</div>
	<button
		id="submit-button"
		class="bg-lapiz-blue rounded-md px-7 py-3 text-3xl text-white shadow hover:shadow-lg"
        disabled={!profileData.avatar}
		on:click={handleSubmit}>
		SUBMIT
	</button>
	<div class="hud-red-blue-border text-white">
		S.P.O.T agents pick a profile picture that represents them. What picture would you like to use?
	</div>
</div>

<style>
    .moji-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
    }

    .moji {
        transition: all 0.2s ease-in-out;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    .moji:hover {
        transform: scale(1.1);
    }
    .moji:active {
        transform: scale(0.9);
    }

    #submit-button:disabled {
        background-color: gray;
        cursor: not-allowed;
    }
</style>