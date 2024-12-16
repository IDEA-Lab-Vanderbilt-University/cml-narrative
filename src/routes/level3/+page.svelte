<script lang="ts">
	import { goto } from '$app/navigation';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import type { UserProgress } from '$lib/types/UserData.js';
	import DataService from '$lib/utils/DataService/index.js';
	import { userDataStore } from '$lib/utils/stores/store.js';
	import { createEventDispatcher } from 'svelte';
	import script from '$lib/scripts/level3/index.js';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import SpotApplication from '$lib/components/sequences/tablet/tablet-tutorial/SpotApplication.svelte';
	import TextResponseModal from '$lib/components/activities/free-response/TextResponseModal.svelte';
	import PizzaDisplay from '$lib/components/activities/pizza-time/PizzaDisplay.svelte';

	export let data;

	let line: Line;
	$: line = data.line;

    let lineNumber = 1;
    $: lineNumber = line.id;

	/**
	 * Handles an emitted dialogEvent as sent from a DialogControl component and progresses the script as such
	 * @param event can be destructured to obtain which way the dialog in a script should progress
	 */
	const handleDialogEvent = async (event: any) => {
		var state: NavigationDirection = event.detail.state;

		handleNavigation(state);
	};

	const getUpdatedProgress = ():UserProgress => {
		return {
			level: 0,
			levelLabel: 'level-one',
			subLevel: 0,
			subLevelLabel: '/level1?page=1',
			lastUpdated: new Date()
		};
	}

	const updateLocalProgress = (progress: UserProgress) => {
		userDataStore.update((data) => {
			data.progress = progress;
			return data;
		})
	}

	/**
	 * Determine the state of the DialogEvent that was emitted. Then, we will navigate
	 * the user to the appropriate url with appropriate querystring which represents
	 * which line in the script should be returned to the user.
	 */
	const handleNavigation = async (direction: NavigationDirection) => {
		if (direction == NavigationDirection.forward) {
			if (line.id == script.lines.length) {
				let progress = getUpdatedProgress();
				await DataService.Data.updateUserProgress(progress);
				updateLocalProgress(progress);
				
                // Next level
                goto('/level3/traininator?page=1');
			} else {
				goto(`/level3?page=${line.id + 1}`);
			}
		} else if (direction == NavigationDirection.backward) {
			if(line.id > 1) {
				goto(`/level3?page=${line.id - 1}`);
			} else {
				goto('/level2/outro?page=9');
			}
		}
	};

    let content: HTMLDivElement | null;

    let signMessages = [
        'HELP THE KIDS!',
        'I\'M ALWAYS LATE BUT IT\'S NOT MY FAULT',
        'Fix the cars!',
        'We want cars that work!',
        'Make cars work for kids!',
        'Accesible transport for kids',
        'No more missed birthday parties!',
        'HELP THE KIDS!',
    ];

    let signColors = [
        '#eee',
        '#fdfdfd',
        '#e9e8d7',
        '#fdfdfd',
        '#e9e8d7',
        '#eee',
        '#fdfdfd',
        '#e9e8d7',
    ];

    let signAngles = [
        'rotate(-10deg)',
        'rotate(5deg)',
        'rotate(-1deg)',
        'rotate(-5deg)',
        'rotate(1deg)',
        'rotate(-4deg)',
        'rotate(4deg)',
        'rotate(8deg)',
    ];

    let signAnimationDurations = [
        10,
        12,
        8,
        9,
        11,
        7,
        13,
        10,
    ];

    let signAnimationDelays = [
        -2,
        -1,
        -5,
        -4,
        -5,
        -6,
        -7,
        -8,
    ];

    let trainingSetImgs = [
        'pexels-10761393.jpg',
        'pexels-3936894.jpg',
        'pexels-5940020.jpg',
        'pexels-5940022.jpg',
        'pexels-alena-darmel-7322232.jpg',
        'pexels-alexandru-molnar-7597466.jpg',
        'pexels-allan-franca-carmo-5333090.jpg',
        'pexels-amina-filkins-5561138.jpg',
        'pexels-amina-filkins-5561141.jpg',
        'pexels-anastasia-shuraeva-5704405.jpg',
        'pexels-anastasia-shuraeva-5704736.jpg',
        'pexels-andrea-piacquadio-3781916.jpg',
        'pexels-andrea-piacquadio-3831569.jpg',
        'pexels-andrea-piacquadio-3868631.jpg',
        'pexels-andrea-piacquadio-788567.jpg',
        'pexels-anna-shvets-5067742.jpg',
        'pexels-anna-shvets-5257317.jpg',
        'pexels-anna-shvets-5257474.jpg',
        'pexels-anna-shvets-5257477.jpg',
        'pexels-anna-shvets-5257495.jpg',
        'pexels-anna-shvets-5257499.jpg',
        'pexels-anna-shvets-5257554.jpg',
        'pexels-arthouse-studio-4571943.jpg',
        'pexels-august-de-richelieu-7428149.jpg',
        'pexels-barbara-olsen-7869697.jpg',
        'pexels-bhavesh-jain-3559739.jpg',
        'pexels-chevanon-photography-2421934.jpg',
        'pexels-cottonbro-10057606.jpg',
        'pexels-cottonbro-5961941.jpg',
        'pexels-cottonbro-6292756.jpg',
        'pexels-cottonbro-6293197.jpg',
        'pexels-cottonbro-6690063.jpg',
        'pexels-cottonbro-7609953.jpg',
        'pexels-dayvison-de-oliveira-silva-6263047.jpg',
        'pexels-douglas-santiago-2589409.jpg',
        'pexels-engin-akyurt-2174606.jpg',
        'pexels-estudio-polaroid-3116381.jpg',
        'pexels-evelina-zhu-5737177.jpg',
        'pexels-furkanfdemir-6206939.jpg',
        'pexels-furkanfdemir-7124299.jpg',
        'pexels-gabriel-santos-1843896.jpg',
        'pexels-gary-barnes-6248659.jpg',
        'pexels-george-milton-6953595.jpg',
        'pexels-ghen-mar-4313354.jpg',
        'pexels-griffin-wooldridge-5088236.jpg',
        'pexels-himesh-mehta-2856346.jpg',
        'pexels-hitesh-ghate-2601464.jpg',
        'pexels-italo-melo-1786258.jpg',
        'pexels-ivan-babydov-7787914.jpg',
        'pexels-jaroslav-nymbursk-3862753.jpg',
        'pexels-jonas-kakaroto-2850984.jpg',
        'pexels-jonas-kakaroto-2850985.jpg',
        'pexels-joshua-mcknight-1139245.jpg',
        'pexels-juan-vargas-6398330.jpg',
        'pexels-kaboompics-com-6110.jpg',
        'pexels-kampus-production-6667685.jpg',
        'pexels-kampus-production-6950704.jpg',
        'pexels-kampus-production-8422670.jpg',
        'pexels-ketut-subiyanto-4350178.jpg',
        'pexels-kindel-media-8172610.jpg',
        'pexels-laura-garcia-3271268.jpg',
        'pexels-laura-tancredi-7065261.jpg',
        'pexels-liza-summer-6383015.jpg',
        'pexels-los-muertos-crew-10041269.jpg',
        'pexels-lucas-pezeta-1878522.jpg',
        'pexels-marcelo-chagas-6357429.jpg',
        'pexels-marcus-aurelius-6787920.jpg',
        'pexels-marcus-aurelius-6787936.jpg',
        'pexels-marllon-cristhian-barbosa-3110392.jpg',
        'pexels-mart-production-7328511.jpg',
        'pexels-mart-production-7330712.jpg',
        'pexels-mary-taylor-5896618.jpg',
        'pexels-meruyert-gonullu-6888761.jpg',
        'pexels-michelle-zallouaa-6816181.jpg',
        'pexels-mikhail-nilov-8317673.jpg',
        'pexels-moe-magners-5333749.jpg',
        'pexels-moe-magners-5335305.jpg',
        'pexels-moe-magners-5335306.jpg',
        'pexels-monstera-5876516.jpg',
        'pexels-monstera-6238083.jpg',
        'pexels-monstera-6310890.jpg',
        'pexels-monstera-6311127.jpg',
        'pexels-monstera-6311661.jpg',
        'pexels-namgel-sherpa-4490075.jpg',
        'pexels-omar-ramadan-6577460.jpg',
        'pexels-ono-kosuki-5648376.jpg',
        'pexels-ono-kosuki-5999814.jpg',
        'pexels-pnw-production-8980772.jpg',
        'pexels-polina-tankilevitch-6927556.jpg',
        'pexels-rene-asmussen-638196.jpg',
        'pexels-rodnae-productions-7845361.jpg',
        'pexels-shvets-production-7544674.jpg',
        'pexels-shvets-production-7544926.jpg',
        'pexels-shvets-production-7545335.jpg',
        'pexels-skyler-ewing-4904586.jpg',
        'pexels-skyler-ewing-5422380.jpg',
        'pexels-skyler-ewing-5422381.jpg',
        'pexels-sora-shimazaki-5673486.jpg',
        'pexels-svh-4250875.jpg',
        'pexels-tarzine-jackson-773371.jpg',
        'pexels-team-maestroo-4150434.jpg',
        'pexels-tehmasip-khan-9678499.jpg',
        'pexels-teona-swift-6873954.jpg',
        'pexels-teona-swift-6873993.jpg',
        'pexels-teona-swift-6874030.jpg',
        'pexels-tim-mossholder-3336057.jpg',
        'pexels-tim-samuel-5835016.jpg',
        'pexels-vincent-tan-6934326.jpg',
        'pexels-yaroslav-shuraev-8087566.jpg',
    ];
</script>

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">
		<DialogBox {line} on:dialogEvent={handleDialogEvent} />
	</div>

	<div slot="content" class="h-full w-full" bind:this={content}>
        {#if ![16, 17, 18].includes(lineNumber)}
            <TabletButton on:click={() => { 
                if (lineNumber == 15) {
                    handleNavigation(NavigationDirection.forward);
                } else {
                    const event  = new CustomEvent('showTablet', {
                        bubbles: true
                    });
                    
                    content?.dispatchEvent(event);
                }
            }}
            />
        {/if}
        {#if lineNumber == 3}
            <img src="/img/characters/bot-buddy/bot-buddy-protest-screen.png" id="bbscreen"/>
            <button id="bbscreenbtn" on:click={() => handleNavigation(NavigationDirection.forward)}>
                </button>
        {/if}
        {#if lineNumber > 3 && lineNumber < 13}
            <div class="signs">
                {#each signMessages as sign, i}
                    <div class="signOuter" style="animation-duration: {signAnimationDurations[i]}s; animation-delay: {signAnimationDelays[i]}s">
                        <div class="sign" style="transform: {signAngles[i]}">
                            <div class="signtext" style="background-color: {signColors[i]}">
                                {sign}
                            </div>
                        </div>            
                    </div>
                {/each}
            </div>
        {/if}
        {#if lineNumber == 16 || lineNumber == 18}
            <div id="faketablet">
                <div id="faketabletcontent">
                    {#each trainingSetImgs as img}
                        <img src={'/img/traininator datasets/training set 1/' + img} />
                    {/each}
                </div>
            </div>
        {/if}
        {#if lineNumber == 17}
            <TextResponseModal id="carTrainingSet" title={`What groups of people are represented in this dataset? What groups of people are not represented in this dataset?`} onSuccess={() => handleNavigation(NavigationDirection.forward)} prompt="" placeholder="" />    
        {/if}
        {#if lineNumber == 20}
                <img src="/img/misc/thoughts.png" id="thoughtbubble"/>
                <div id="thoughtpizza">
                    <PizzaDisplay crust="thick" sauce="marinara" cheese veggies={['bolts']} finishingTouches={['jalapeno']}/>
                </div>
        {/if}
    </div>
</Scene>

<style>
#bbscreen {
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    width: auto;
    object-fit: cover;
    transform: translateX(-50%);
}

#bbscreenbtn {
    position: absolute;
    top: 40%;
    left: calc(50% - 15vh);
    height: 30%;
    width: 30vh;
    background: none;
    border: none;
}

.signs {
    display: flex;
    justify-content: space-between;
    align-items: end;
    position: absolute;
    bottom: 10vh;
    width: 100%;
}

.signOuter {
    animation: sign infinite;
}

.signtext {
    color: black;
    font-size: 1.75vw;
    max-width: 15vw;
    min-height: 8vw;
    padding: 1.5vw;
    text-align: center;
}

.sign::after {
    display: block;
    content: '';
    width: 10%;
    height: 8vh;
    background-color: #56370e;
    position:relative;
    left: 45%;
}

@keyframes sign {
    0% {
        transform: rotate(-5deg);
    }
    50% {
        transform: rotate(5deg) translateY(2vw);
    }
    100% {
        transform: rotate(-5deg);
    }
}

#faketablet {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    border: 1vw solid #666;
    border-radius: 4vw;
}

#faketablet::after {
    /* Screen shine effect*/
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% + 1vw);
    height: calc(100% + 1vw);
    background: linear-gradient(140deg, rgba(255,255,255,0.25) 0%,rgba(255,255,255,0.15) 35%, rgba(255,255,255,0) 45%);
    border-radius: 3vw;
}

#faketabletcontent {
    position: absolute;
    top: 2vw;
    left: 2vw;
    width: calc(100% - 4vw);
    height: calc(100% - 4vw);
    background-color: #eee;
    border-radius: 2vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 2vw;
    padding: 2vw;
}

#faketabletcontent img {
    width: 10%;
    height: 30%;
    object-fit: cover;
    border-radius: 1vw;
}

#thoughtbubble {
    position: absolute;
    top: 0;
    left: 60%;
    height: 50%;
    width: auto;
    object-fit: cover;
}

#thoughtpizza {
    position: absolute;
    top: 0;
    left: 60%;
    transform: scale(0.5) translateY(-10%);
}
</style>