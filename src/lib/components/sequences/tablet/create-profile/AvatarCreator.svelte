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
    
    const skinTones = [
        9655597,
        11897407,
        16764057,
        16691590,
    ];

    let selectedSkinTone = skinTones[0];

    // Test the library
    const randomMoji = () => {
        let pose = libmoji.poses[1];
        let gender = libmoji.genders[libmoji.randInt(libmoji.genders.length)];
        let style = libmoji.styles[libmoji.randInt(libmoji.styles.length)];
        let traits = libmoji.randTraits(libmoji.getTraits(gender[0],style[0]));
        
        const bannedSkinTones = [
            12434877, // Grayscale
            13151395, // Grayscale
            3776963, // Blue
            898981, // Cyan
            7292807, // Purple
            1271190, // Blue
            1416510, // Green
            14363906, // Red
            12881912, // Purple
            9545463, // Blue
            16240700, // Lemon
        ];

        // If the skin tone is in the banned list, get a new one
        for(let i = 0; i < traits.length; i++) {
            if(traits[i][0] === 'skin_tone') {
                let skinTone = selectedSkinTone || traits[i][1];
                if(bannedSkinTones.includes(skinTone)) {
                    
                    console.log('Banned skin tone:', skinTone);
                    
                    // Get a new skin tone from a few allowed options
                    const options = [
                        9655597,
                        16764057,
                        11897407,
                        16691590,
                    ];

                    skinTone = options[libmoji.randInt(options.length)];
                }
                traits[i][1] = skinTone; // Set the skin tone to one of the allowed options
            }

            if(traits[i][0] === 'glasses') {
                const agentGlasses = [2437, 2460, 2452];
                const randomGlasses = agentGlasses[libmoji.randInt(agentGlasses.length)];
                traits[i][1] = randomGlasses; // Set the glasses to one of the agent's glasses
            }

            if(traits[i][0] === 'hat') {
                traits[i][1] = ''; // Remove hat
            }

            // Remove the beard
            if(traits[i][0] === 'beard') {
                traits[i][1] = ''; // Remove beard
            }

            // Remove the face lines
            if(traits[i][0] === 'face_lines') {
                traits[i][1] = ''; // Remove face lines
            }

            // Remove hair treatment
            if(traits[i][0] === 'hair_treatment_tone'){
                // With some chance, remove it
                if(Math.random() < 0.5) {
                    traits[i][1] = ''; // Remove hair treatment
                }
            }

            // Remove hair if the avatar is balding (technically possible for a child but comes up too often)
            if(traits[i][0] === 'hair') {
                const bannedHairStyles = [
                    1725, // Balding
                ];
                
                if(bannedHairStyles.includes(traits[i][1])) {
                    console.log('Banned hair style:', traits[i][1]);
                    // Get a new hair style from a few allowed options
                    const options = [
                        1318,
                        1336,
                        1697
                    ];
                    traits[i][1] = options[libmoji.randInt(options.length)];
                }
            }

            if(traits[i][0] === 'blush_tone') {
                // Remove the blush
                traits[i][1] = ''; // Remove blush
            }
            if(traits[i][0] === 'lipstick_tone') {
                // Remove the lipstick
                traits[i][1] = ''; // Remove lipstick
            }
            if(traits[i][0] === 'eyeshadow_tone') {
                // Remove the eyeshadow
                traits[i][1] = ''; // Remove eyeshadow
            }
            if(traits[i][0] === 'hair_treatment_tone') {
                // With some chance, remove the hair treatment
                if(Math.random() < 0.75) {
                    traits[i][1] = ''; // Remove hair treatment
                }
            }
            if(traits[i][0] === 'brow_tone') {
                // Remove the eyebrow color
                traits[i][1] = ''; // Remove eyebrow color
            }
            

        }


        let testUrl = libmoji.buildPreviewUrl(pose,3,gender[1],style[1],0,traits,[]);

        return testUrl;
    };

    let options = [0, 1 ,2, 3, 4, 5, 6, 7, 8].map(() => randomMoji());
    const regenOptions = () => {
        options = [0, 1 ,2, 3, 4, 5, 6, 7, 8].map(() => randomMoji());
    };
</script>

<div class="flex h-full w-full flex-col items-center justify-center space-y-5 font-mono" style="transform: translateY(-10%)">
	<h1 class="text-white" style="font-size:6vh">Choose your Picture</h1>
	<div class="flex w-full justify-center space-x-7">
		<div class="moji-container">
			{#each options as moji}
                <button class="moji rounded-full border-4 shadow-lg hover:cursor-pointer hover:shadow-xl {
                    profileData.avatar == moji ? 'border-4 border-lapiz-blue bg-white' : 'border-gray-500 bg-transparent'
                }"
                 on:click={() => { profileData.avatar = moji; }} 
                 style="background-image: url({moji});" 
                 />
            {/each}
		</div>
	</div>
    <div class="flex w-full justify-center">
        <button
            class="bg-lapiz-blue rounded-md px-3 py-3 text-2xl text-white shadow hover:shadow-lg"
            on:click={regenOptions}>
            New Faces
        </button>
    </div>
	<button
		id="submit-button"
		class="bg-lapiz-blue rounded-md px-7 py-3 text-2xl text-white shadow hover:shadow-lg"
        disabled={!profileData.avatar}
		on:click={handleSubmit}>
		SUBMIT
	</button>
	<div class="hud-red-blue-border text-white" id="bottom-text">
		S.P.O.T agents pick a profile picture that represents them. What picture would you like to use?
	</div>
</div>

<style>
    .moji-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1vh;
        flex-wrap: wrap;
        width: 90vw;
    }

    .moji {
        transition: all 0.2s ease-in-out;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        width:  calc(min(10vh, 10vw));
        height: calc(min(10vh, 10vw));
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

    #bottom-text {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        text-align: center;
        font-size: 2vh;
        z-index: 1;
    }

    button {
        z-index: 2;
    }
</style>