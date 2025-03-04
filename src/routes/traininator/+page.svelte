<script lang="ts">
	import { onMount, onDestroy, getContext } from 'svelte';
	import * as tf from '@tensorflow/tfjs';
	import Dropzone from 'svelte-file-dropzone';

	import Welcome from '$lib/components/sequences/traininator/Welcome.svelte';
	import ModelName from '$lib/components/sequences/traininator/ModelName.svelte';
	import AddClasses from '$lib/components/sequences/traininator/AddClasses.svelte';
	import TraininatorProgressBar from '$lib/components/activities/traininator/TraininatorProgressBar.svelte';
	import TraininatorCard from '$lib/components/activities/traininator/TraininatorCard.svelte';
	import ThresholdSlider from '$lib/components/activities/traininator/ThresholdSlider.svelte';
	import TraininatorImageSet from '$lib/components/activities/traininator/TraininatorImageSet.svelte';
	import {
		cleanUpMobileNet,
		loadMobileNetFeatureModel,
		testModel,
		trainModel,
		type Booster
	} from '$lib/utils/traininator/TraininatorUtils';
	import TraininatorBoostersList from '$lib/components/activities/traininator/TraininatorBoostersList.svelte';
	import TraininatorModelMatrix from '$lib/components/activities/traininator/TraininatorModelMatrix.svelte';
	import { PUBLIC_BACKEND_API_URL } from '$env/static/public';
    import { RequestFactory } from '$lib/utils/network/RequestFactory';

	// export let data: PageData;

	// Current step in the training/testing process
	let step = 1;
	// $: {
	// 	step = data.page;
	// }
	// Should we show the add images dialog?
	let showAddDialog = false;

	const startTraining = () => {
		for (let i = 0; i < trainingSets.length; i++) {
			if (trainingSets[i].length === 0) {
				alert('You need at least one image for each category');
				return;
			}
		}
		step = 5;
	};

	let booster: Booster = 'none';

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

	let modelName: string = '';
	let classes: string[] = [];
	let selectedClassIndex = 0;
	let trainingSets: string[][] = [];
	let testSets: string[] = [];

	let trainingProgress = 0;
	let trainingStep = 'Loading Training Data...';
	let isTraining = false;

	let showSetThresholdModal = true;
	let targetAccuracy = 90;
	let testingProgress = 0;
	let testingStep = 'Loading Testing Data...';
	let isTesting = false;

	// const CLASS_NAMES = ['Face', 'No Face'];

	let predictions: number[] = [];

	let activeTestImg = 0;
	let testLabels: number[] = [];

	const nextTestImage = (choice: number) => {
		testLabels.push(choice);
		activeTestImg++;
		if (activeTestImg >= testSets.length) {
			step = 9;
		}
	};

	let model: tf.Sequential;

    async function uploadModel() {
        try {
            const res = await RequestFactory(`${PUBLIC_BACKEND_API_URL}/upload-model`, 'POST', {
                model: model.toJSON()
            });
            console.log(res);
        } catch (error) {
            alert('Error uploading model');
            console.log(error);
        }
    }

	$: {
		if (step == 5 && !isTraining) {
			isTraining = true;

			trainModel(
				trainingSets,
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

				if (!mdl) {
					console.log('Error training model');
					step = 4;
					return;
				}

				model = mdl;
				setTimeout(() => {
					step = 6;
				}, 1000);
			});
		}
	}

	$: {
		if (step == 7 && !isTesting) {
			isTesting = true;

			testModel(
				model,
				testSets,
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

				if (!preds) {
					console.log('Error testing model');
					step = 6;
					return;
				}

				predictions = preds;

				setTimeout(() => {
					step = 8;
				}, 1000);
			});
		}
	}

	let testAccuracy = 0;
	let testModelMatrix: number[][] = [];
	let testModelMatrixCellClasses: string[][] = [];

	$: {
		if (step == 9) {
			testAccuracy =
				(testLabels.filter((label, i) => label === predictions[i]).length / testLabels.length) *
				100;

			// Create matrix with independent rows
			testModelMatrix = Array(classes.length)
				.fill(null)
				.map(() => Array(classes.length).fill(0));

			// Populate confusion matrix
			for (let i = 0; i < testLabels.length; i++) {
				testModelMatrix[testLabels[i]][predictions[i]]++;
			}

			// Create cell classes matrix with independent rows
			testModelMatrixCellClasses = Array(classes.length)
				.fill(null)
				.map(() => Array(classes.length).fill('incorrect'));

			// Mark diagonal as correct
			for (let i = 0; i < classes.length; i++) {
				testModelMatrixCellClasses[i][i] = 'correct';
			}
		}
	}
</script>

<!-- <Tablet showMeter={false}> -->
{#if step >= 4}
	<div id="header">
		<div class={step < 6 ? 'activestep' : ''}>Training</div>
		<div class={step >= 6 ? 'activestep' : ''}>Testing</div>
	</div>
{/if}

{#if step == 1}
	<Welcome bind:step />
{:else if step == 2}
	<ModelName bind:step bind:modelName />
{:else if step == 3}
	<AddClasses bind:step bind:classes bind:trainingSets />
{:else if step == 4}
	<div id="traininatorbody">
		<div id="left">
			<div class="header">Categories</div>
			<ul id="categories">
				{#each classes as cls, i}
					<li><a href="#{cls}"><span>{cls}</span> {trainingSets[i]?.length}</a></li>
				{/each}
			</ul>
			<div class="header">Model Booster (x2)</div>
			<TraininatorBoostersList
				onSelect={(b) => {
					booster = b;
				}} />

			<button id="trainButton" on:click={startTraining}>Train Model</button>
		</div>
		<div id="right">
			<div class="header">Training Data</div>
			<div id="trainingSets">
				{#each classes as cls, i}
					<TraininatorImageSet
						className={cls}
						bind:imgs={trainingSets[i]}
						{booster}
						allowAdd={true}
						allowRemove={true}
						onAdd={() => {
							selectedClassIndex = i;
							showAddDialog = true;
						}}
						onRemove={(j) => {
							trainingSets[i] = trainingSets[i].filter((_, k) => k !== j);
						}} />
				{/each}
			</div>
		</div>
	</div>
{:else if step == 5}
	<div class="header">Training Model</div>
	<TraininatorProgressBar {trainingProgress} {trainingStep} />
{:else if step == 6}
	<div id="traininatorbody">
		<div id="left">
			<div class="header">Model Performance</div>
			<div id="modelPerformance">
				Should be correct <br />
				<span id="testgoal">{targetAccuracy}%</span> <br />
				of the time <br />
				(or better!)
			</div>

			<div class="header">Model Matrix:</div>
			<TraininatorModelMatrix
				{classes}
				modelMatrix={Array(classes.length).fill(Array(classes.length).fill('-'))} />

			<button
				id="trainButton"
				on:click={() => {
					if (testSets.length === 0) {
						alert('You need to add images for testing');
						return;
					}
					step = 7;
				}}>Test Model</button>
		</div>
		<div id="right">
			<div class="header">Testing Model</div>
			<div id="trainingSets">
				<TraininatorImageSet
					className="Test Set"
					bind:imgs={testSets}
					allowAdd={true}
					allowRemove={true}
					booster={'none'}
					onAdd={() => {
						selectedClassIndex = -1;
						showAddDialog = true;
					}}
					onRemove={(j) => {
						testSets = testSets.filter((_, k) => k !== j);
					}} />
			</div>
		</div>
	</div>
{:else if step == 7}
	<div class="header">Testing Model</div>
	<TraininatorProgressBar trainingProgress={testingProgress} trainingStep={testingStep} />
{:else if step == 8}
	<TraininatorCard
		prediction={predictions[activeTestImg]}
		image={testSets[activeTestImg]}
		{classes}
		choice={nextTestImage} />
{:else if step == 9}
	<div id="traininatorbody">
		<div id="left">
			<div id="left">
				<div class="header">Model Performance</div>
				<div id="modelPerformance">
					Should be correct <br />
					<span id="testgoal">{targetAccuracy}%</span> <br />
					of the time <br />
					(or better!)<br />
					Model Accuracy:
					<span
						id="testAccuracy"
						style="background-color: {testAccuracy >= targetAccuracy ? '#00ff00' : '#ff0000'}"
						>{testAccuracy.toFixed(2)}%</span>
					{#if testAccuracy >= targetAccuracy}😊{:else}😞{/if}
				</div>

				<div class="header">Model Matrix:</div>
				<TraininatorModelMatrix
					{classes}
					modelMatrix={testModelMatrix.map((r) => r.map(String))}
					cellClasses={testModelMatrixCellClasses} />
			</div>
			<button
				id="trainButton"
				on:click={() => {
					step = 4;
				}}>Re-train Model</button>
		</div>
		<div id="right">
			<div class="header">Test Set Results:</div>
			<div id="trainingSets">
				<div class="trainingSet">
					<TraininatorImageSet
						className="Test Set"
						imgs={testSets}
						booster={'none'}
						labels={testLabels.map(
							(label, i) => (label === predictions[i] ? '✓ ' : '✗ ') + classes[predictions[i]]
						)}
						labelClassess={testLabels.map((label, i) =>
							label === predictions[i] ? 'correct' : 'incorrect'
						)} />
				</div>
			</div>
			<button id="trainButton" on:click={() => {}}>I'm done!</button>
		</div>
	</div>
{/if}

{#if showAddDialog}
	<div id="addDialog">
		<div id="addDialogInner">
			<div class="header">
				Add Images for {selectedClassIndex != -1 ? classes[selectedClassIndex] : 'testing'}
			</div>
			<Dropzone
				accept={['image/*']}
				on:dropaccepted={(e) => {
					let acceptedFiles = e.detail.acceptedFiles;
					for (const file of acceptedFiles) {
						const reader = new FileReader();
						reader.onload = (e) => {
							if (selectedClassIndex === -1) {
								testSets = [...testSets, e.target.result];
							} else {
								trainingSets[selectedClassIndex] = [
									...trainingSets[selectedClassIndex],
									e.target.result
								];
							}
						};
						reader.readAsDataURL(file);
					}
					showAddDialog = false;
				}} />
		</div>
	</div>
{/if}

{#if step == 6 && showSetThresholdModal}
	<div id="addDialog">
		<div id="addDialogInner">
			<div class="header">Set How Accurate Your Model Should Be</div>
			<ThresholdSlider bind:threshold={targetAccuracy} minThreshold={50} />
			<button
				id="trainButton"
				on:click={() => {
					showSetThresholdModal = false;
				}}>Confirm</button>
		</div>
	</div>
{/if}

<canvas id="canvas" style="display: none;"></canvas>

<!-- </Tablet> -->

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

	#right {
		width: 80vw;
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

	#addDialog {
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

	#addDialog #addDialogInner {
		background-color: #6c6c6c;
		color: #000;
		border-radius: 10px;
		padding: 2vh;
		width: 60vw;
		height: 45vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
</style>
