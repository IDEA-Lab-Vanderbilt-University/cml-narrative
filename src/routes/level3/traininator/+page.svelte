<script lang="ts">
	import { goto } from '$app/navigation';
	import type { UserProgress } from '$lib/types/UserData.js';
	import DataService from '$lib/utils/DataService/index.js';
	import { userDataStore } from '$lib/utils/stores/store.js';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
    import { onMount, onDestroy } from 'svelte';
    import * as tf from '@tensorflow/tfjs';
	import TraininatorProgressBar from '$lib/components/activities/traininator/TraininatorProgressBar.svelte';
    import { trainingSetImgs, trainingSet1NoFaceImgs, trainingSet2FaceImgs, testSet1Imgs } from '$lib/utils/Assets/TraininatorDataSets';
	import TraininatorCard from '$lib/components/activities/traininator/TraininatorCard.svelte';
	import { classes } from '../../traininator/stores';
	import TraininatorImageSet from '$lib/components/activities/traininator/TraininatorImageSet.svelte';
	import { cleanUpMobileNet, loadMobileNetFeatureModel, testModel, trainModel } from '$lib/utils/traininator/TraininatorUtils';
	import TraininatorBoostersList from '$lib/components/activities/traininator/TraininatorBoostersList.svelte';
	import TraininatorModelMatrix from '$lib/components/activities/traininator/TraininatorModelMatrix.svelte';

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


    onMount(async () => {
        console.log('Component mounted');
        await loadMobileNetFeatureModel();
    });

    onDestroy(() => {
        cleanUpMobileNet();

        if (model) {
            model.dispose();
        }
    });

    let trainingProgress = 0;
    let trainingStep = 'Loading Training Data...';
    let isTraining = false;
    
    let testingProgress = 0;
    let testingStep = 'Loading Testing Data...';
    let isTesting = false;

    const CLASS_NAMES = ['Face', 'No Face'];

    let predictions: number[] = [];

    let activeTestImg = 0;
    let testLabels: number[] = [];

    const nextTestImage = (choice: number) => {
        testLabels.push(choice);
        activeTestImg++;
        if (activeTestImg >= testSet1Imgs.length) {
            step = 6;
        }
    }

    let model: tf.Sequential;

    $: {
        if (step == 2 && !isTraining) {
            isTraining = true;

            trainModel(
                [
                    trainingSetImgs.map((img) => '/img/traininator datasets/training set 1/' + img),
                    trainingSet1NoFaceImgs.map((img) => '/img/traininator datasets/training set 1 no face/' + img),
                ],
                booster,
                (progress) => {
                    if (progress > trainingProgress) {
                        trainingProgress = progress;
                    }
                },
                (step) => {
                    trainingStep = step;
                }
            ).then((mdl) => {
                trainingProgress = 100;
                trainingStep = 'Training Complete!';

                isTraining = false;

                if(!mdl) {
                    console.log('Error training model');
                    step = 1;
                    return;
                }

                model = mdl;
                setTimeout(() => {
                    step = 3;
                }, 1000);
            });
        }        
    }

    $: {
        if (step == 4 && !isTesting) {
            isTesting = true;

            testModel(model, testSet1Imgs, CLASS_NAMES, '/img/traininator datasets/test set/', 
                (progress) => {
                    if (progress > testingProgress) {
                        testingProgress = progress;
                    }
                },
                (step) => {
                    testingStep = step;
                }
            ).then((preds) => {
                isTesting = false;

                testingProgress = 100;
                testingStep = 'Testing Complete!';

                if(!preds) {
                    console.log('Error testing model');
                    step = 3;
                    return;
                }

                predictions = preds;

                setTimeout(() => {
                    step = 5;
                }, 1000);
            });
        }
    }

    let testAccuracy = 0;
    let truePositives = 0;
    let trueNegatives = 0;
    let falsePositives = 0;
    let falseNegatives = 0;

    $: {
        if (step == 6) {
            testAccuracy = testLabels.filter((label, i) => label === predictions[i]).length / testLabels.length * 100;
            truePositives = testLabels.filter((label, i) => label === 0 && predictions[i] === 0).length;
            trueNegatives = testLabels.filter((label, i) => label === 1 && predictions[i] === 1).length;
            falsePositives = testLabels.filter((label, i) => label === 1 && predictions[i] === 0).length;
            falseNegatives = testLabels.filter((label, i) => label === 0 && predictions[i] === 1).length;
        }
    }
</script>

<Tablet showMeter={false}>
    <div id='header'><div class={step < 3? "activestep" : ""}>Training</div><div class={step >= 3? "activestep" : ""}>Testing</div></div>

    {#if step == 1}
        <div id="traininatorbody">
            <div id="left">
                <div class="header">Categories</div>
                <ul id="categories">
                    <li><a href="#face"><span>Face</span> {trainingSetImgs.length}</a></li>
                    <li><a href="#noFace"><span>No Face</span> {trainingSet1NoFaceImgs.length}</a></li>
                </ul>
                <div class="header">Model Booster (x2)</div>
                <TraininatorBoostersList onSelect={updateBooster} />

                <button id="trainButton" on:click={startTraining}>Train Model</button>
            </div>
            <div id="right">
                <div class="header">Training Data</div>
                <div id="trainingSets">
                    <TraininatorImageSet className="Face" imgs={trainingSetImgs} prefix={'/img/traininator datasets/training set 1/'} booster={booster} />
                    <TraininatorImageSet className="No Face" imgs={trainingSet1NoFaceImgs} prefix={'/img/traininator datasets/training set 1 no face/'} booster={booster} />
                </div>
            </div>
        </div>

    {:else if step == 2}
        <div class="header">Training Model</div>
        <TraininatorProgressBar trainingProgress={trainingProgress} trainingStep={trainingStep} />
    {:else if step == 3}
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
                <TraininatorModelMatrix classes={CLASS_NAMES} modelMatrix={[
                    ['-', '-'],
                    ['-', '-']
                ]} />

                <button id="trainButton" on:click={() => {step = 4;}}>Test Model</button>
            </div>
            <div id="right">
                <div class="header">Testing Model</div>
                <div id="trainingSets">
                    <TraininatorImageSet className="Test Set 1" imgs={testSet1Imgs} prefix={'/img/traininator datasets/test set/'} booster={'none'} />
                </div>
            </div>
        </div>
    {:else if step == 4}
        <div class="header">Testing Model</div>
        <TraininatorProgressBar trainingProgress={testingProgress} trainingStep={testingStep} />
    {:else if step == 5}
        <TraininatorCard prediction={predictions[activeTestImg]} image={'/img/traininator datasets/test set/' + testSet1Imgs[activeTestImg]} classes={CLASS_NAMES} choice={nextTestImage} />
    {:else if step == 6}
        <div id="traininatorbody">
            <div id="left">
                <div id="left">
                    <div class="header">Model Performance</div>
                    <div id="modelPerformance">
                        Should be correct <br/>
                        <span id="testgoal">90%</span> <br/>
                        of the time <br/>
                        (or better!)<br/>
                        <br/>
                        Model Accuracy: <br/>
                        <span id="testAccuracy">{testAccuracy.toFixed(2)}%</span>
                    </div>

                    <div class="header">Model Matrix:</div>
                    <TraininatorModelMatrix classes={CLASS_NAMES} modelMatrix={[
                        ["✓ " + truePositives, "✗ " + falseNegatives],
                        ["✗ " + falsePositives, "✓ " + trueNegatives]
                    ]}
                    cellClasses={
                        [
                            ["correct", "incorrect"],
                            ["incorrect", "correct"]
                        ]
                    } />
                </div>
            </div>
            <div id="right">
                <div class="header">Test Set 1 Results:</div>
                <div id="trainingSets">
                    <div class="trainingSet">
                        <TraininatorImageSet className="Test Set 1" imgs={testSet1Imgs} prefix={'/img/traininator datasets/test set/'} booster={'none'} 
                            labels={testLabels.map((label, i) => (label === predictions[i] ? '✓ ': '✗ ') + CLASS_NAMES[predictions[i]])} 
                            labelClassess={testLabels.map((label, i) => label === predictions[i] ? 'correct' : 'incorrect')} />
                    </div>
                </div>
            </div>
        </div>
    {/if}

    <canvas id="canvas" style="display: none;"></canvas>
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
        width: 95vw;
        margin: 0 auto;
        height: 60vh;
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

    .correct {
        background-color: #00ff009a;
    }

    .incorrect {
        background-color: #ff00009a;
    }

    #categories a {
        padding: 0.5vh;
        border-radius: 10px;
    }

    #categories a:hover {
        background-color: #f0f0f044;
    }
</style>