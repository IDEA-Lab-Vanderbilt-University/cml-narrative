<script lang="ts">
	import { goto } from '$app/navigation';
	import { studentProgressStore } from '$lib/utils/stores/store.js';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
    import { onMount, onDestroy } from 'svelte';
    import * as tf from '@tensorflow/tfjs';
	import TraininatorProgressBar from '$lib/components/activities/traininator/TraininatorProgressBar.svelte';
    import { trainingSetImgs, trainingSet1NoFaceImgs, trainingSet2FaceImgs, testSet1Imgs } from '$lib/utils/Assets/TraininatorDataSets';
	import TraininatorCard from '$lib/components/activities/traininator/TraininatorCard.svelte';
	import TraininatorImageSet from '$lib/components/activities/traininator/TraininatorImageSet.svelte';
	import { cleanUpMobileNet, loadMobileNetFeatureModel, testModel, trainModel, type Booster } from '$lib/utils/traininator/TraininatorUtils';
	import TraininatorBoostersList from '$lib/components/activities/traininator/TraininatorBoostersList.svelte';
	import TraininatorModelMatrix from '$lib/components/activities/traininator/TraininatorModelMatrix.svelte';

    // Current step in the training/testing process
    let step = 1;
    // Should we show the add images dialog?
    let showAddDialog = false;
    // Have we added the second training set?
    let set2Added = false;
    // Before the second training set is added, Bot Buddy will remind the user to add it
    let showBotBuddyDialog = false;

    const CLASS_NAMES = ['Face', 'No Face'];

    let trainingSets: Record<string, string[]> = {
        'Face': [...trainingSetImgs],
        'No Face': [...trainingSet1NoFaceImgs]
    };

    const startTraining = () => {
        if(!set2Added) {
            showBotBuddyDialog = true;
            return;
        }

        step = 2;
    }

    const restartTraining = () => {
        if(model) {
            model.dispose();
        }
        model = null;

        step = 1;
        trainingSets = {
            'Face': [...trainingSetImgs],
            'No Face': [...trainingSet1NoFaceImgs]
        };
        showAddDialog = false;
        set2Added = false;

        trainingProgress = 0;
        trainingStep = 'Loading Training Data...';
        isTraining = false;
        booster = 'none';
        
        testingProgress = 0;
        testingStep = 'Loading Testing Data...';
        isTesting = false;

        toLabel = [];
        predictions = [];
        activeTestImg = 0;
        testLabels = [];
        relabling = false;

        // For Level 3, resetting the model should include the extra training set
        fakeUpload();
    }

    let model: tf.Sequential | null = null;

    onMount(async () => {
        // Reset training data
        trainingSets = {
            'Face': [...trainingSetImgs],
            'No Face': [...trainingSet1NoFaceImgs]
        };

        console.log('Component mounted');
        await loadMobileNetFeatureModel();
    });

    onDestroy(() => {
        cleanUpMobileNet();

        if (model) {
            model.dispose();
            model = null;
        }
    });

    let trainingProgress = 0;
    let trainingStep = 'Loading Training Data...';
    let isTraining = false;
    let booster: Booster = 'none';
    
    let testingProgress = 0;
    let testingStep = 'Loading Testing Data...';
    let isTesting = false;

    let toLabel: Record<number, string>[] = [];
    let relabling = false;
    let predictions: number[] = [];
    let activeTestImg = 0;
    let testLabels: number[] = [];

    const nextTestImage = (choice: number) => {
        if (!relabling) {
            testLabels.push(choice);
            activeTestImg++;
            if (activeTestImg >= testSet1Imgs.length) {
                step = 6;
            }
        } else {
            testLabels[activeTestImg] = choice;
            relabling = false;
            step = 6;
        }
    }

    const fakeUpload = () => {
        trainingSets = {
            ...trainingSets,
            'Face': [...trainingSets['Face'], ...trainingSet2FaceImgs]
        };

        showAddDialog = false; 
        set2Added = true;
    }

    $: {
        if (step == 2 && !isTraining) {
            isTraining = true;

            trainModel(
                [
                    trainingSets['Face'],
                    trainingSets['No Face'],
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


                if(!mdl) {
                    console.log('Error training model');
                    step = 1;
                    return;
                }

                model = mdl;
                setTimeout(() => {
                    step = 3;
                    isTraining = false;
                }, 1000);
            });
        }        
    }

    $: {
        if (step == 4 && !isTesting) {
            isTesting = true;

            // Run the model on the test set
            testModel(model, testSet1Imgs,
                (progress) => {
                    if (progress > testingProgress) {
                        testingProgress = progress;
                    }
                },
                (step) => {
                    testingStep = step;
                }
            ).then((preds) => {

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
                    isTesting = false;
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

<Tablet showMeter={false} showBottomButtons={false}>
    <div id='header'><div class={step < 3? "activestep" : ""}>Training</div><div class={step >= 3? "activestep" : ""}>Testing</div></div>

    {#if step == 1}
        <div id="traininatorbody">
            <div id="left">
                <div class="header">Categories</div>
                <ul id="categories">
                    {#each CLASS_NAMES as className}
                        <li><a href={'#' + className}><span>{className}</span> {trainingSets[className].length}</a></li>
                    {/each}
                </ul>
                <div class="header">Model Booster (x2)</div>
                <TraininatorBoostersList onSelect={(b) => {booster = b;}} />

                <button id="trainButton" on:click={startTraining}>Train Model</button>
            </div>
            <div id="right">
                <div class="header">Training Data</div>
                <div id="trainingSets">
                    <TraininatorImageSet className="Face" imgs={trainingSets['Face']} booster={booster} allowAdd={!set2Added} onAdd={() => { showAddDialog = true}} />
                    <TraininatorImageSet className="No Face" imgs={trainingSets['No Face']} booster={booster} />
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
                    <TraininatorImageSet className="Test Set 1" imgs={testSet1Imgs} booster={'none'} />
                </div>
            </div>
        </div>
    {:else if step == 4}
        <div class="header">Testing Model</div>
        <TraininatorProgressBar trainingProgress={testingProgress} trainingStep={testingStep} />
    {:else if step == 5}
        <TraininatorCard prediction={predictions[activeTestImg]} image={testSet1Imgs[activeTestImg]} classes={CLASS_NAMES} choice={nextTestImage} />
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
                        Model Accuracy: <span id="testAccuracy" style="background-color: {testAccuracy >= 90? '#00ff00': '#ff0000'}">{testAccuracy.toFixed(2)}%</span> {#if testAccuracy >= 90}😊{:else}😞{/if}
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
                <div id="testingSetsPost">
                    <div class="trainingSet">
                        <TraininatorImageSet className="Test Set 1" imgs={testSet1Imgs} booster={'none'} 
                            labels={testLabels.map((label, i) => (label === predictions[i] ? '✓ ': '✗ ') + CLASS_NAMES[predictions[i]])} 
                            labelClassess={testLabels.map((label, i) => label === predictions[i] ? 'correct' : 'incorrect')}
                            allowRelabel={true} onRelabel={(i) => { activeTestImg = i; relabling = true; step = 5; }}
                        />
                    </div>
                </div>
                <div>
                    <button id="trainButton" on:click={() => {restartTraining()}}>Train Again</button>

                    <button id="trainButton" on:click={() => {
                            studentProgressStore.update((data) => {
                                data.last_visited = '/level3/outro?page=1';
                                return data;
                            });
                            goto('/level3/outro?page=1');
                        }}
                        disabled={testAccuracy < 90}
                        >I'm done!</button>           
                </div>
            </div>
        </div>
    {/if}

    {#if showAddDialog} 
        <div id="addDialog">
            <div id="addDialogInner">
                <div class="header">Add Training Set Images...</div>
                <div id="trainingSets">
                    <TraininatorImageSet className="Face" imgs={trainingSet2FaceImgs} booster={booster} />
                </div>
                <button id="trainButton" on:click={fakeUpload}>Upload</button>
            </div>
        </div>
    {/if}

    {#if showBotBuddyDialog}
        <div id="botBuddyDialog">
            <div id="botBuddyDialogInner">
                <div class="header">Bot Buddy Says...</div>
                <div id="botBuddyDialogText">
                    <img src="/img/characters/bot-buddy/bot-buddy-point.png" alt="Bot Buddy" />
                    <p>Don't forget to add more images to the training set!</p>
                    <p>Click the green + button to add more images!</p>
                </div>
                <button id="trainButton" on:click={() => {showBotBuddyDialog = false;}}>Got it!</button>
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
        gap: 1vw;
        width: 95vw;
        margin: 0 auto;
        height: 80vh;
    }

    #trainingSets {
        overflow-y: scroll;
        height: 60vh;
        scrollbar-color: white transparent;
    }

    #testingSetsPost {
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
        font-size: 2.5vh;
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
        margin: 1vh auto;  
        line-height: 3.5vh;
    }

    #trainButton:hover:not(:disabled) {
        transform: scale(1.05);
    }

    #trainButton:active:not(:disabled) {
        transform: scale(0.95);
    }

    #trainButton:disabled {
        background: radial-gradient(farthest-corner at bottom right, #999 75%, #fff 100%);
        background-color: #999;
        color: #666;
        border-color: #666;
    }

    #header {
        display: flex;
        justify-content: space-between;
        padding: 1vh;
        margin: 1vh;
        width: 100%;
        padding-left: 20vw;
        padding-right: 20vw;
    }

    #header div {
        font-size: 1rem;
        text-transform: uppercase;
        background-color: #f0f0f01d;
        color: #000;
        border-radius: 10px;
        padding: 0.5vh 4vw;
    }

    #header div.activestep {
        background-color: #f0f0f0;
        color: #000;
    }

    #modelPerformance {
        color: #eee;
        font-size: 1.2rem;
        width: 100%;
        text-align: center;
        margin: 0vh auto;
        margin-bottom: 1vh;
    }

    #modelPerformance span {
        font-size: 1.5rem;
        background-color: #ffb814e4;
        color: #fefefe;
        border-radius: 10px;
        padding: 0.4vh 0.4vw;
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

    #addDialog, #botBuddyDialog {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #000000a9;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        backdrop-filter: blur(5px);
    }

    #botBuddyDialog img {
        width: 15vw;
    }

    #botBuddyDialogText {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: #eee;
        font-size: 2.5vh;
    }

    #addDialog #addDialogInner, #botBuddyDialog #botBuddyDialogInner {
        background-color: #6c6c6c;
        color: #000;
        border-radius: 10px;
        padding: 2vh;
        width: 80vw;
        height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
</style>