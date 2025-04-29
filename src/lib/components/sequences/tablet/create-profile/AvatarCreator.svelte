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
        
        const bannedSkinTones = [
            12434877, // Grayscale
            3776963, // Blue
            898981, // Cyan
            7292807, // Purple
            1271190, // Blue
            1416510, // Green
            14363906, // Red
            12881912, // Purple
            9545463, // Blue
        ];

        // If the skin tone is in the banned list, get a new one
        for(let i = 0; i < traits.length; i++) {
            if(traits[i][0] === 'skin_tone') {
                let skinTone = traits[i][1];
                if(bannedSkinTones.includes(skinTone)) {
                    
                    console.log('Banned skin tone:', skinTone);
                    
                    // Get a new skin tone from a few allowed options
                    const options = [
                        9655597,
                        16764057,
                        11897407,
                        16691590,
                    ];

                    traits[i][1] = options[libmoji.randInt(options.length)];
                }
            }

            if(traits[i][0] === 'glasses') {
                // With some chance, remove the glasses
                if(Math.random() < 0.75) {
                    traits[i][1] = ''; // Remove glasses
                }
            }

            if(traits[i][0] === 'hat') {
                // With some chance, remove the hat
                if(Math.random() < 0.75) {
                    traits[i][1] = ''; // Remove hat
                }
            }

            if(traits[i][0] === 'beard') {
                // With some chance, remove the beard
                if(Math.random() < 0.75) {
                    traits[i][1] = ''; // Remove beard
                }
            }
        }


        let testUrl = libmoji.buildPreviewUrl(pose,3,gender[1],style[1],0,traits,[]);

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