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
                goto('/level3/outro?page=1');
			} else {
				goto(`/level3/traininator??page=${line.id + 1}`);
			}
		} else if (direction == NavigationDirection.backward) {
			if(line.id > 1) {
				goto(`/level3/traininator?page=${line.id - 1}`);
			} else {
				goto('/level3?page=23');
			}
		}
	};




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

    let trainingSet2Imgs = [
        'Picture1.jpg',
        'Picture10.jpg',
        'Picture11.jpg',
        'Picture12.jpg',
        'Picture13.jpg',
        'Picture14.jpg',
        'Picture15.jpg',
        'Picture16.jpg',
        'Picture17.jpg',
        'Picture18.jpg',
        'Picture19.jpg',
        'Picture2.jpg',
        'Picture20.jpg',
        'Picture21.jpg',
        'Picture22.jpg',
        'Picture3.jpg',
        'Picture4.jpg',
        'Picture5.jpg',
        'Picture6.jpg',
        'Picture7.jpg',
        'Picture8.jpg',
        'Picture9.jpg',
    ];

    let testSet1Imgs = [
        'pexels-2048716.jpg',
        'pexels-7640389.jpg',
        'pexels-allan-mas-5622395.jpg',
        'pexels-amina-filkins-5560085.jpg',
        'pexels-amina-filkins-5561138.jpg',
        'pexels-barbara-olsen-7879739.jpg',
        'pexels-cottonbro-7014762.jpg',
        'pexels-eren-li-7169351.jpg',
        'pexels-kamaji-ogino-5094100.jpg',
        'pexels-kampus-production-6314558.jpg',
        'pexels-karolina-grabowska-7296777.jpg',
        'pexels-katerina-holmes-5905497.jpg',
        'pexels-kelvin-octa-1096147.jpg',
        'pexels-ketut-subiyanto-4473861.jpg',
        'pexels-konstantin-mishchenko-6160380.jpg',
        'pexels-mikhail-nilov-8923804.jpg',
        'pexels-monstera-5063574.jpg',
        'pexels-monstera-6186123.jpg',
        'pexels-monstera-7139022.jpg',
        'pexels-rodnae-productions-8385873.jpg',
        'pexels-victoria-borodinova-1620760.jpg',
    ];

    let testSet2Imgs = [
        'Picture1.jpg',
        'Picture10.jpg',
        'Picture2.jpg',
        'Picture3.jpg',
        'Picture4.jpg',
        'Picture5.jpg',
        'Picture6.jpg',
        'Picture7.jpg',
        'Picture8.jpg',
        'Picture9.jpg',
    ];

</script>

<Tablet showMeter={false}>
    {#if lineNumber == 1}

        <div id='header'><div class="activestep">Training</div><div>Testing</div></div>
        <div id="traininatorbody">
            <div id="left">
                <div class="header">Categories</div>
                <ul id="categories">
                    <li><span>Face</span> ({trainingSetImgs.length})</li>
                    <li><span>No Face</span> ({trainingSet2Imgs.length})</li>
                </ul>
                <div class="header">Model Booster (x2)</div>
                <ul id="boosters">
                    <li><input type="radio" id="rotate" name="booster" value="rotate"><label for="rotate">Rotate</label></li>
                    <li><input type="radio" id="flip" name="booster" value="flip"><label for="flip">Reflect</label></li>
                    <li><input type="radio" id="adjust" name="booster" value="adjust"><label for="adjust">Recolor</label></li>
                </ul>

                <button id="trainButton">Train Model</button>
            </div>
            <div id="right">
                <div class="header">Training Data</div>
                <div id="trainingSets">
                    <div class="trainingSet">
                        <div class="trainingSetHeader">
                            <h2>Face ({trainingSetImgs.length}):</h2>
                        </div>
                        {#each trainingSetImgs as img}
                            <img src={'/img/traininator datasets/training set 1/' + img} alt={img} class="trainingImg" />
                        {/each}
                    </div>
                    <div class="trainingSet">
                        <div class="trainingSetHeader">
                            <h2>No Face ({trainingSet2Imgs.length}):</h2>
                        </div>
                        {#each trainingSet2Imgs as img}
                            <img src={'/img/traininator datasets/training set 2/' + img} alt={img} class="trainingImg" />
                        {/each}
                    </div>
                </div>
            </div>
        </div>

    {/if}
</Tablet>

<style>
    #traininatorbody {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        margin: 10px;
        width: 100%;
        align-content: center;
        gap: 2vw;
        width: 80vw;
        margin: 0 auto;
    }


    .trainingSet {
        display: flex;
        flex-wrap: wrap;
    }


    .trainingImg {
        width: 7.5vw;
        height: 7.5vw;
        margin: 0.25vw;
        object-fit: cover;
        object-position: center;
        border-radius: 5px;
    }

    #trainingSets {
        overflow: scroll;
        height: 70vh;
    }

    #left {
        width: 20vw; 
        min-width: 20vw;
    }

    .header {
        color: #eee;
        font-size: 2.5rem;
        width: 100%;
        text-align: center;
        border-bottom: #eee 0.5vh solid;
        margin-bottom: 1vh;
    }

    .trainingSetHeader {
        color: #eee;
        font-size: 2rem;
        width: 100%;
    }

    #categories {
        list-style-type: none;
        padding: 0;
    }

    #categories li {
        color: #eee;
        cursor: pointer;
        font-size: 1.5rem;
        width: 80%;
        margin: 1vh auto;
        text-align: justify; 
        text-align-last: justify;
    }

    #categories li span {
        text-justify: none;
    }

    #boosters {
        list-style-type: none;
        padding: 0;
    }

    #boosters input[type="radio"] {
        display: none;
    }

    #boosters input[type="radio"] + label {
        color: #eee;
        cursor: pointer;
        font-size: 1.5rem;
        width: 100%;
        margin: 1vh auto;
        text-align: center;
        background-color: #f0f0f01d;
        border-radius: 10px;
        transition: 0.3s;
        display: block;
    }

    #boosters input[type="radio"]:hover + label {
        background-color: #f0f0f0d1;
        color: #000;
    }

    #boosters input[type="radio"]:active + label {
        background-color: #f0f0f0;
        color: #000;
    }

    #boosters input[type="radio"]:checked + label {
        background-color: #50107a;
        color: #eee;
    }

    #trainButton {
        background: radial-gradient(farthest-corner at bottom right, #49c5ff 75%, #fff 100%);
        background-color: #49c5ff;
        color: #111;
        border: none;
        border: 2px solid #289dd3;
        height: 7vh;
        border-radius: 3.5vh;
        padding: 1vh 2vw;
        font-size: 1.5rem;
        cursor: pointer;
        transition: 0.3s;
        display: block;
        margin: 5vh auto;
    }

    #trainButton:hover {
        transform: scale(1.05);
    }

    #trainButton:active {
        transform: scale(0.95);
    }

    #header {
        display: flex;
        justify-content: space-between;
        padding: 10px;
        margin: 10px;
        width: 100%;
        padding-left: 20vw;
        padding-right: 20vw;
    }

    #header div {
        font-size: 1.5rem;
        font-weight: bold;
        background-color: #f0f0f01d;
        color: #000;
        border-radius: 10px;
        padding: 1vh 5vw;
    }

    #header div.activestep {
        background-color: #f0f0f0;
        color: #000;
    }
</style>