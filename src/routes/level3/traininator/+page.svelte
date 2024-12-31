<script lang="ts">
	import { goto } from '$app/navigation';
	import type { UserProgress } from '$lib/types/UserData.js';
	import DataService from '$lib/utils/DataService/index.js';
	import { userDataStore } from '$lib/utils/stores/store.js';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
    import { onMount, onDestroy } from 'svelte';
    import * as tf from '@tensorflow/tfjs';
	import TraininatorProgressBar from '$lib/components/activities/traininator/TraininatorProgressBar.svelte';
    import { trainingSetImgs, trainingSet2Imgs, testSet1Imgs } from '$lib/utils/Assets/TraininatorDataSets';

    let step = 1;

    

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

    let mobilenet: tf.GraphModel | Promise<tf.GraphModel> | null = null;
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
        
        mobilenet = tf.loadGraphModel(URL, {fromTFHub: true});

        mobilenet = await mobilenet;
        
        if (!mobilenet) {
            console.error('Failed to load MobileNet model');
            return;
        }

        // Warm up the model by passing zeros through it once.
        tf.tidy(function () {
            if (!mobilenet || mobilenet instanceof Promise) {
                return;
            }

            let answer = mobilenet.predict(tf.zeros([1, MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH, 3]));
            console.log(answer.shape);
        });
    }

    onMount(async () => {
        console.log('Component mounted');
        await loadMobileNetFeatureModel();
    });

    onDestroy(() => {
        if (mobilenet) {
            if (mobilenet instanceof Promise) {
                mobilenet.then((model) => {
                    model.dispose();
                });
            } else {
                mobilenet.dispose();
            }
        }

        if (model) {
            model.dispose();
        }
    });

    let trainingProgress = 0;
    let trainingStep = 'Loading Training Data...';
    let isTraining = false;
    
    let testingProgress = 0;
    let testingStep = 'Loading Training Data...';
    let isTesting = false;

    let model: tf.Sequential | null = null;
    const CLASS_NAMES = ['Face', 'No Face'];

    async function trainModel() {
        if (isTraining) {
            return;
        }

        isTraining = true;

        model = tf.sequential();
        model.add(tf.layers.dense({inputShape: [1024], units: 128, activation: 'relu'}));
        model.add(tf.layers.dense({units: CLASS_NAMES.length, activation: 'softmax'}));


        model.compile({
            optimizer: 'adam',
            loss: (CLASS_NAMES.length === 2) ? 'binaryCrossentropy': 'categoricalCrossentropy',
            metrics: ['accuracy']
        });
        
        console.log('Model created: ', );
        model.summary();
        console.log('Training model...');


        const trainingData: tf.Tensor[] = [];
        const trainingLabels: number[] = [];

        const loadImage = (img: string, label: number, path: string) => {
            return new Promise<void>((resolve) => {
                const image = new Image();
                image.src = path + img;
                image.onload = () => {
                    const tensor = tf.browser.fromPixels(image).resizeBilinear([MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH]).toFloat().div(255);
                    trainingData.push(tensor);
                    trainingLabels.push(label);

                    // Update the training progress
                    trainingProgress += 5 / (trainingSetImgs.length + trainingSet2Imgs.length);

                    resolve();
                }
            });
        }

        const loadAllImages = async () => {
            const promises = [];

            for (const img of trainingSetImgs) {
                promises.push(loadImage(img, 1, '/img/traininator datasets/training set 1/'));
            }

            for (const img of trainingSet2Imgs) {
                promises.push(loadImage(img, 0, '/img/traininator datasets/training set 2/'));
            }

            await Promise.all(promises);

            console.log('Training data loaded: ', trainingData);
            console.log('Training labels loaded: ', trainingLabels);
        }

        await loadAllImages();
        
        if (!mobilenet) {
            console.error('MobileNet model not loaded');
            return;
        }

        if (mobilenet instanceof Promise) {
            mobilenet = await mobilenet;
        }

        // Predict the features for all images
        const features: tf.Tensor[] = [];
        for (let i = 0; i < trainingData.length; i++) {
            const img = trainingData[i];
            const feature = mobilenet.predict(img.expandDims(0));
            features.push(feature);
            
            // Update the training progress
            trainingProgress = Math.round((i + 1) / trainingData.length * 5) + 5;
        }

        console.log('Features extracted');

        // Convert the features to tensors
        const xs = tf.concat(features);
        const ys = tf.oneHot(tf.tensor1d(trainingLabels, 'int32'), CLASS_NAMES.length);

        trainingStep = 'Training Model...';

        // Train the model
        const epochs = 7;
        await model.fit(xs, ys, {
            epochs,
            callbacks: {
                onEpochEnd: async (epoch: number, logs: any) => {
                    trainingProgress = Math.round((epoch + 1) / 10 * 90) + 10;
                    trainingStep = 'Training Model... (' + (epoch + 1) + '/' + epochs + ')';

                    console.log('Epoch: ', epoch, ' Loss: ', logs.loss, ' Accuracy: ', logs.acc);

                    if (epoch === epochs - 1) {
                        trainingProgress = 100;
                        trainingStep = 'Training Complete!';
                        setTimeout(() => {
                            step = 3;
                        }, 1500);
                    }
                }
            }
        });

        isTraining = false;
    }

    let predictions: number[] = [];

    /**
     * Predicts the labels for the test set so we can evaluate the model.
     **/
    async function testModel() {
        if (!model) {
            console.error('Model not trained');
            return;
        }

        if (isTesting) {
            return;
        }

        const testSetImgs = testSet1Imgs;

        const testData: tf.Tensor[] = [];

        const loadImage = (img: string, path: string) => {
            return new Promise<void>((resolve) => {
                const image = new Image();
                image.src = path + img;
                image.onload = () => {
                    const tensor = tf.browser.fromPixels(image).resizeBilinear([MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH]).toFloat().div(255);
                    testData.push(tensor);

                    // Update the testing progress
                    testingProgress += 5 / testSetImgs.length;

                    resolve();
                }
            });
        }

        const loadAllImages = async () => {
            const promises = [];

            for (const img of testSetImgs) {
                promises.push(loadImage(img, '/img/traininator datasets/test set/'));
            }

            await Promise.all(promises);

            console.log('Test data loaded: ', testData);
        }

        await loadAllImages();

        if (!mobilenet) {
            console.error('MobileNet model not loaded');
            return;
        }

        if (mobilenet instanceof Promise) {
            mobilenet = await mobilenet;
        }

        // Predict the features for all images
        const features: tf.Tensor[] = [];
        for (let i = 0; i < testData.length; i++) {
            testingStep = 'Predicting image ' + (i + 1) + '/' + testData.length;
            const img = testData[i];
            const feature = mobilenet.predict(img.expandDims(0));
            features.push(feature);
            
            // Update the testing progress
            testingProgress = Math.round((i + 1) / testData.length * 5) + 5;
        }

        testingStep = 'Finalizing predictions...';

        console.log('Features extracted');

        predictions = [];        
        
        for(let i = 0; i < features.length; i++) {
            const feature = features[i];
            const prediction = model.predict(feature) as tf.Tensor;
            const predictionData = prediction.dataSync();
            const predictedLabel = predictionData.indexOf(Math.max(...predictionData));
            console.log('Predicted label: ', predictedLabel, ' Prediction: ', predictionData);
            predictions.push(predictedLabel);
            testingProgress = Math.round((i + 1) / features.length * 90) + 10;
        }

        console.log('Predictions: ', predictions);

        isTesting = false;

        setTimeout(() => {
            step = 5;
        }, 1500);
    }

    $: {
        if (step == 2) {
            trainModel();
        }
    }

    $: {
        if (step == 4) {
            testModel();
        }
    }
</script>

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
        
        <TraininatorProgressBar trainingProgress={trainingProgress} trainingStep={trainingStep} />
    {:else if step == 3}
        <div id='header'><div>Training</div><div class="activestep">Testing</div></div>
        <div id="traininatorbody">
            <div id="left">
                <div class="header">Model Performance</div>
                <div id="modelPerformance">
                    Should be correct <br/>
                    <span id="testgoal">90%</span> <br/>
                    of the time <br/>
                    (or better!)
                </div>

                <div class="header">Model Matrix:</div>
                <table id="modelMatrix">
                    <thead>
                        <tr>
                            <th></th>
                            <th colspan="2">Model Says...</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>Face</td>
                            <td>No Face</td>
                        </tr>
                        <tr>
                            <td>Face</td>
                            <td><span>-</span></td>
                            <td><span>-</span></td>
                        </tr>
                        <tr>
                            <td>No Face</td>
                            <td><span>-</span></td>
                            <td><span>-</span></td>
                        </tr>
                    </tbody>
                </table>
                <div id="modelMatrixOverlay">
                    Test model to see results!
                </div>

                <button id="trainButton" on:click={() => {step = 4;}}>Test Model</button>
            </div>
            <div id="right">
                <div class="header">Testing Model</div>
                <div id="trainingSets">
                    <div class="trainingSet">
                        <div class="trainingSetHeader">
                            <h2>Test Set 1 ({testSet1Imgs.length}):</h2>
                        </div>
                        <div class="trainingSetImages">
                            {#each testSet1Imgs as img}
                                <img src={'/img/traininator datasets/test set/' + img} alt={img} class="trainingImg" />
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {:else if step == 4}
        <div id='header'><div>Training</div><div class="activestep">Testing</div></div>
        <div class="header">Testing Model</div>

        <TraininatorProgressBar trainingProgress={testingProgress} trainingStep={testingStep} />
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
        font-size: 3vh;
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

    #modelPerformance {
        color: #eee;
        font-size: 1.25rem;
        width: 100%;
        text-align: center;
        margin: 1vh auto;
    }

    #modelPerformance span {
        font-size: 1.5rem;
        background-color: #ffb814e4;
        color: #fefefe;
        border-radius: 10px;
        padding: 0.5vh 0.5vw;
    }

    #modelMatrix {
        width: 100%;
        margin: 1vh auto;
        border-collapse: collapse;
        color: #eee;
        text-align: center;
        font-size: 2.35vh
    }

    #modelMatrix tbody tr td {
        border: 1px solid #eee;
        padding: 1vh 1vw;
    }

    #modelMatrix tbody tr:first-child td {
        border: none;
    }

    #modelMatrix tbody tr td:first-child {
        border: none;
    }

    #modelMatrixOverlay {
        background-color: #99bacfcc;
        color: #eee;
        font-size: 2.5vh;
        width: 75%;
        margin: 1vh auto;
        text-align: center;
        border-radius: 10px;
        padding: 3vh 2vh;
        position: relative;
        z-index: 1;
        margin-top: -15vh;
    }
</style>