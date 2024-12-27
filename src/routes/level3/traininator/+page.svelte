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
    import { onMount } from 'svelte';

    let step = 1;

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

    let model;

    const startTraining = () => {
        step = 2;
    }

    let booster = 'none';

    const updateBooster = (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
        const target = event.target as HTMLInputElement;
        if (target) {
            booster = target.value || 'none';
        }
    }

    const getBoosterStyle = (booster: string, img: string) => {
        switch (booster) {
            case 'rotate':
                const angleMax = 25; // Maximum rotation angle in degrees

                // Random rotation angle between -angleMax and +angleMax
                const angle = ((Math.random() + 0.25) * 1.8 * angleMax) - angleMax;

                // Scale depends on the angle: the more the angle, the smaller the scale range
                const scaleBase = 1.1; // Base scale to ensure it overflows slightly
                const scaleFactor = Math.max(1.65, Math.abs(angle) / angleMax * 2.5); // Adjust scale based on angle
                const scale = scaleBase + Math.random() * (scaleFactor - scaleBase);

                // Create a CSS transform string
                const transform = `transform: scale(${scale}) rotate(${angle}deg)`;

                return transform;
            case 'flip':
                return 'transform: scaleX(-1);';
            case 'adjust':
                return 'filter: hue-rotate(' + Math.round((Math.random() * 20 + 10) * Math.sign(Math.random() - 0.5) ) + 'deg) saturate(' + Math.round(Math.random() * 2 + 1) + ');';
            default:
                return '';
        }
    }

    let mobilenet: tf.GraphModel | null = null;
    const MOBILE_NET_INPUT_HEIGHT = 224;
    const MOBILE_NET_INPUT_WIDTH = 224;

    /**
     * Loads the MobileNet model and warms it up so ready for use.
     **/
    async function loadMobileNetFeatureModel() {
        if (mobilenet) {
            return;
        }

        if (!tf) {
            console.error('TensorFlow.js not loaded');
            return;
        }

        const URL = 
            'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v3_small_100_224/feature_vector/5/default/1';
        
        mobilenet = await tf.loadGraphModel(URL, {fromTFHub: true});
        
        // Warm up the model by passing zeros through it once.
        tf.tidy(function () {
            let answer = mobilenet.predict(tf.zeros([1, MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH, 3]));
            console.log(answer.shape);
        });
    }


    onMount(async () => {
        console.log('Component mounted');
        await loadMobileNetFeatureModel();
    });
</script>

<svelte:head>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs/dist/tf.min.js"> </script>
</svelte:head>

<Tablet showMeter={false}>
    {#if step == 1}

        <div id='header'><div class="activestep">Training</div><div>Testing</div></div>
        <div id="traininatorbody">
            <div id="left">
                <div class="header">Categories</div>
                <ul id="categories">
                    <li><a href="#face"><span>Face</span> ({trainingSetImgs.length})</a></li>
                    <li><a href="#noFace"><span>No Face</span> ({trainingSet2Imgs.length})</a></li>
                </ul>
                <div class="header">Model Booster (x2)</div>
                <ul id="boosters">
                    <li><input type="radio" id="none" name="booster" value="none" checked on:change={updateBooster}><label for="none">None</label></li>
                    <li><input type="radio" id="rotate" name="booster" value="rotate" on:change={updateBooster}><label for="rotate">Rotate</label></li>
                    <li><input type="radio" id="flip" name="booster" value="flip" on:change={updateBooster}><label for="flip">Reflect</label></li>
                    <li><input type="radio" id="adjust" name="booster" value="adjust" on:change={updateBooster}><label for="adjust">Recolor</label></li>
                </ul>

                <button id="trainButton" on:click={startTraining}>Train Model</button>
            </div>
            <div id="right">
                <div class="header">Training Data</div>
                <div id="trainingSets">
                    <div class="trainingSet">
                        <a id="face" />
                        <div class="trainingSetHeader">
                            <h2>Face ({trainingSetImgs.length}):</h2>
                        </div>
                        <div class="trainingSetImages">
                            {#each trainingSetImgs as img}
                                <img src={'/img/traininator datasets/training set 1/' + img} alt={img} class="trainingImg" />
                            {/each}
                        </div>
                        {#if booster != 'none'}
                            <div class="boosterImages">
                                {#each trainingSetImgs as img}
                                    <div class="imgContainer">
                                        <img src={'/img/traininator datasets/training set 1/' + img} alt={img} class="trainingImg" style={getBoosterStyle(booster, img)} />
                                    </div>
                                {/each}
                            </div>
                            <div class="boosterOverlay">
                                +{trainingSetImgs.length} Boosted Images!
                            </div>
                        {/if}
                    </div>
                    <div class="trainingSet">
                        <a id="noFace" />
                        <div class="trainingSetHeader">
                            <h2>No Face ({trainingSet2Imgs.length}):</h2>
                        </div>
                        <div class="trainingSetImages">
                            {#each trainingSet2Imgs as img}
                                <img src={'/img/traininator datasets/training set 2/' + img} alt={img} class="trainingImg" />
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    {:else if step == 2}
        <div id='header'><div class="activestep">Training</div><div>Testing</div></div>

        <div class="header">Training Model</div>
        
        <progress id="trainingProgress" value="50" max="100"></progress>

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
        height: 60vh;
    }

    .trainingSetImages {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        max-width: 100%;
    }

    .boosterImages {
        display: flex;
        flex-wrap: nowrap;
        overflow: hidden;
        width: 100%;
        max-width: 55vw;
    }

    .boosterImages .imgContainer {
        width: 7.5vw;
        min-width: 7.5vw;
        height: 7.5vw;
        min-height: 7.5vw;
        aspect-ratio: 1/1;
        object-fit: cover;
        object-position: center;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        position: relative;
        background-color: #f0f0f01d;
        margin: 0.25vw;
    }

    .boosterImages .imgContainer img {
        width: 7.5vw;
        min-width: 7.5vw;
        height: 7.5vw;
        min-height: 7.5vw;
        transform-origin: center center;
        margin: 0;
    }

    .boosterOverlay {
        background-color: #555555a9;
        color: #eee;
        font-size: 1.5rem;
        width: 75%;
        margin: 1vh auto;
        text-align: center;
        border-radius: 10px;
        padding: 1vh 0;
        position: relative;
        z-index: 1;
        top: -12vh;
    }

    .trainingSet {
        display: flex;
        flex-wrap: wrap;
    }

    .trainingImg {
        width: 7.5vw;
        height: 7.5vw;
        aspect-ratio: 1/1;
        margin: 0.25vw;
        object-fit: cover;
        object-position: center;
        border-radius: 5px;
    }

    #trainingSets {
        overflow-y: scroll;
        height: 50vh;
        scrollbar-color: white transparent;
    }

    #left {
        width: 20vw; 
        min-width: 20vw;
    }

    .header {
        color: #eee;
        font-size: 2rem;
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
        user-select: none;
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

    #trainingProgress {
        width: 80%;
        position: relative;
        left: 10%;
        top: 20vh;
        margin: 0 auto;
        height: 5vh;
        border-radius: 1vh;
        background-color: #f0f0f01d;
        transition: 0.3s;
        filter: drop-shadow(0 0 0.75vh #30e0ff);
    }
</style>