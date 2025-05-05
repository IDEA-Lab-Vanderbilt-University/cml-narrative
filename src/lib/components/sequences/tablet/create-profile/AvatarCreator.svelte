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
        15257000,
        16691590,
        12684916,
        9657655,
        6963494
    ];

    const hairColors = [
        15714429,
        5587258,
        8672042,
        13666386,
        2039326
    ];

    const hairStyles = [
        1301,
        1303,
        1307,
        1315,
        1709,
        1705,
        1696,
        1685,
        1682,
        1335,
        1337,
        1692
    ];

    // Selected options to filter, if null, all options are available
    let selectedSkinTone: number | null = null;
    let selectedHairColor: number | null = null;
    let selectedHairStyle: number | null = null;

    // Test the library
    const randomMoji = ({ hairStyle }: { hairStyle?: number }) => {
        let pose = libmoji.poses[1];
        let gender = libmoji.genders[libmoji.randInt(libmoji.genders.length)];
        let style = libmoji.styles[libmoji.randInt(libmoji.styles.length)];
        let traits = libmoji.randTraits(libmoji.getTraits(gender[0],style[0]));

        // Filter the traits based on selected options
        for(let i = 0; i < traits.length; i++) {
            if(traits[i][0] === 'skin_tone') {
                // Set the skin tone to one of the allowed options
                traits[i][1] = selectedSkinTone !== null ? selectedSkinTone : skinTones[libmoji.randInt(skinTones.length)];
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

            if(traits[i][0] === 'hair') {
                // Get hair from list
                const randomHair = hairStyle ?? hairStyles[libmoji.randInt(hairStyles.length)];
                traits[i][1] = selectedHairStyle ?? randomHair; // Set the hair to one of the agent's hair
            }

            // Makeup remover
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
                traits[i][1] = ''; // Remove hair treatment
            }

            if(traits[i][0] === 'brow_tone') {
                // Remove the eyebrow color
                traits[i][1] = ''; // Remove eyebrow color
            }
            
            if(traits[i][0] === 'hair_tone') {
                // Set the hair color to one of the allowed options
                traits[i][1] = selectedHairColor ?? hairColors[libmoji.randInt(hairColors.length)];
            }

        }


        let testUrl = libmoji.buildPreviewUrl("head",3,gender[1],style[1],0,traits,[]);

        return testUrl;
    };

    let options = hairStyles.map((i) => randomMoji({hairStyle: i}));
    const regenOptions = () => {
        options = hairStyles.map((i) => randomMoji({hairStyle: i}));
    };
</script>

<div class="flex h-full w-full flex-col items-center justify-center space-y-2 font-mono">
	<h1 class="text-white" style="font-size:4vh">Choose your Picture</h1>
	<div class="flex w-full justify-center space-x-2">
		<div class="moji-container moji-cols">
			{#each options as moji, i}
                <button class="moji rounded-full border-4 shadow-lg hover:cursor-pointer hover:shadow-xl {
                    profileData.avatar == moji ? 'border-4 border-lapiz-blue bg-white' : 'border-gray-500 bg-transparent'
                }"
                 on:click={() => { profileData.avatar = moji; }} 
                 style="background-image: url({moji});" 
                 />
            {/each}
		</div>
	</div>
    <div class="text-center">
        <h2 class="text-white" style="font-size:3vh">Skin Tone</h2>
        <div class="flex w-full justify-center space-x-7">
            <div class="moji-container">
                {#each skinTones as skinTone}
                    <button class="moji-small rounded-full border-4 shadow-lg hover:cursor-pointer hover:shadow-xl"
                        style="background-color: rgba({libmoji.getColorFromCode(skinTone).r}, {libmoji.getColorFromCode(skinTone).g}, {libmoji.getColorFromCode(skinTone).b}, 1);" 
                        on:click={() => { selectedSkinTone = skinTone; regenOptions(); }}
                    />
                {/each}
            </div>
        </div>
    </div>
    <div class="text-center">
        <h2 class="text-white" style="font-size:3vh">Hair Color</h2>
        <div class="flex w-full justify-center space-x-7">
            <div class="moji-container">
                {#each hairColors as hairColor}
                    <button class="moji-small rounded-full border-4 shadow-lg hover:cursor-pointer hover:shadow-xl"
                        style="background-color: rgba({libmoji.getColorFromCode(hairColor).r}, {libmoji.getColorFromCode(hairColor).g}, {libmoji.getColorFromCode(hairColor).b}, 1);" 
                        on:click={() => { selectedHairColor = hairColor; regenOptions(); }}
                    />
                {/each}
            </div>
        </div>
    </div>
    <!-- <div class="flex w-full justify-center">
        <button
            class="bg-lapiz-blue rounded-md px-2 py-2 text-xl text-white shadow hover:shadow-lg"
            on:click={regenOptions}>
            New Faces
        </button>
    </div> -->
    <div>
        <button
            id="submit-button"
            class="bg-lapiz-blue rounded-md px-7 py-3 m-2 text-2xl text-white shadow hover:shadow-lg"
            disabled={!profileData.avatar}
            on:click={handleSubmit}>
            SUBMIT
        </button>
    </div>
	<!-- <div class="hud-red-blue-border text-white" id="bottom-text">
		S.P.O.T agents pick a profile picture that represents them. What picture would you like to use?
	</div> -->
</div>

<style>
    .moji-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 2vh;
        flex-wrap: wrap;
        width: 90vw;
    }

    .moji-container.moji-cols {
        display: grid;
        grid-template-columns: repeat(6, minmax(15vh, 1fr));
        grid-auto-rows: minmax(15vh, auto);
        align-items: center;
        align-content: center;
        justify-self: center;
        justify-items: center;
        width: 80vw;
    }

    .moji, .moji-small {
        transition: all 0.2s ease-in-out;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    .moji {
        width:  calc(min(15vh, 15vw));
        height: calc(min(15vh, 15vw));
    }

    .moji-small {
        width: calc(min(5vh, 5vw));
        height: calc(min(5vh, 5vw));
    }

    .moji:hover, .moji-small:hover {
        transform: scale(1.1);
    }
    .moji:active, .moji-small:active {
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