import * as tf from '@tensorflow/tfjs';
import { applyRotation, applyFlip, applyAdjust, MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH, createBoostedImage } from './TraininatorImageUtils';

let mobilenet: tf.LayersModel | Promise<tf.LayersModel | undefined> | null = null;
let mobileNetOutputDims = 1280;

export type Booster = 'none' | 'rotate' | 'flip' | 'adjust';

/**
 * Loads the MobileNet model and warms it up so ready for use.
 **/
export async function loadMobileNetFeatureModel() {
    if (mobilenet) {
        if(mobilenet instanceof Promise) {
            mobilenet = await mobilenet ?? null;
        }

        return mobilenet;
    }

    if (!tf) {
        console.error('TensorFlow.js not loaded');
        return;
    }

    const URL = 'https://storage.googleapis.com/teachable-machine-models/mobilenet_v2_weights_tf_dim_ordering_tf_kernels_0.35_224_no_top/model.json';
    
    let mobilenet_dl = tf.loadLayersModel(URL);

    const loadedModel = await mobilenet_dl;
    
    if (!loadedModel) {
        console.error('Failed to load MobileNet model');
        return;
    }

    const layer = loadedModel.getLayer('out_relu');
    const truncatedModel = tf.model({ inputs: loadedModel.inputs, outputs: layer.output });
    const model = tf.sequential();
    model.add(truncatedModel);
    model.add(tf.layers.globalAveragePooling2d({})); // go from shape [7, 7, 1280] to [1280]

    // Warm up the model by passing zeros through it once.
    tf.tidy(function () {
        if (!model) {
            return;
        }

        let answer = model.predict(tf.zeros([1, MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH, 3]));

        if (answer instanceof tf.Tensor) {
            console.log(answer.shape);
            mobileNetOutputDims = answer.shape[1] ?? 1280;
            console.log('MobileNet output dims: ', mobileNetOutputDims);
            answer.dispose();
        }
    });

    mobilenet = model;
    return model;
}

export function saveModel(model: tf.LayersModel, url: string) {
    const jointModel = new tf.Sequential();
    if (mobilenet instanceof tf.LayersModel) {
        jointModel.add(mobilenet);
        jointModel.add(model);
        jointModel.save(url);
    }
}

export function cleanUpMobileNet() {
    if (mobilenet) {
        if (mobilenet instanceof Promise) {
            mobilenet.then((model) => {
                if(model){
                    model.dispose();
                }
            });
        } else {
            mobilenet.dispose();
        }

        mobilenet = null;
    }
}

export async function trainModel(trainingSets: string[][], booster: Booster, onProgress: (progress: number) => void, onStep: (step: string) => void, epochs: number = 7) {

    onProgress(0);
    onStep('Loading training data...');

    await loadMobileNetFeatureModel();
    
    if (!mobilenet) {
        console.error('MobileNet model not loaded');
        return;
    }

    let model = tf.sequential();
    model.add(tf.layers.dense({inputShape: [1280], units: 128, activation: 'relu'}));
    model.add(tf.layers.dense({units: trainingSets.length, activation: 'softmax'}));


    model.compile({
        optimizer: 'adam',
        loss: (trainingSets.length === 2) ? 'binaryCrossentropy': 'categoricalCrossentropy',
        metrics: ['accuracy']
    });
    
    console.log('Model created: ', );
    model.summary();
    console.log('Training model...');


    const trainingData: tf.Tensor[] = [];
    const trainingLabels: number[] = [];
    const trainingSetImgsCount = trainingSets.reduce((sum, set) => sum + set.length, 0);
    let trainingProgress = 0;

    const loadImage = (img: string, label: number) => {
        return new Promise<void>((resolve) => {
            const image = new Image();
            image.src = img;
            image.onload = () => {
                const tensor = tf.browser.fromPixels(image).resizeBilinear([MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH]).toFloat().div(255);
                trainingData.push(tensor);
                trainingLabels.push(label);
                resolve();
            }
        });
    }

    const loadAllImages = async () => {
        const promises = [];

        for(const set of trainingSets) {
            for(const img of set) {
                promises.push(loadImage(img, trainingSets.indexOf(set)));
            }
        }

        await Promise.all(promises);
    }

    await loadAllImages();

    onProgress(5);
    onStep('Training data loaded!');
    
    if (booster != 'none'){
        onStep('Model Booster!');

        const boostPromises: Promise<tf.Tensor>[] = [];
        const boostLabels: number[] = [];

        // Create promises for all boosted images
        for (const set of trainingSets) {
            const label = trainingSets.indexOf(set);
            for (const img of set) {
                const boostPromise = createBoostedImage(img, label, booster);
                boostPromises.push(boostPromise);
                boostLabels.push(label);
            }
        }

        // Wait for all image boosting promises to resolve concurrently
        const boostedTensors = await Promise.all(boostPromises);

        // Add the generated tensors and labels to the main arrays
        trainingData.push(...boostedTensors);
        trainingLabels.push(...boostLabels);

        // Ensure progress is accurately set after completion
        onProgress(10);
    }

    console.log('Training data loaded: ', trainingData);
    console.log('Training labels loaded: ', trainingLabels);

    if (!mobilenet) {
        console.error('MobileNet model not loaded');
        mobilenet = loadMobileNetFeatureModel();
    }

    if (mobilenet instanceof Promise) {
        mobilenet = await mobilenet ?? null;
    }

    if (!mobilenet) {
        console.error('MobileNet model not loaded');
        return;
    }
    
    console.log('MobileNet model loaded', mobilenet);

    console.log('Extracting features...');

    // Predict the features for all images
    const features: tf.Tensor[] = [];
    for (let i = 0; i < trainingData.length; i++) {
        const img = trainingData[i];
        const expanded = img.expandDims(0);
        const feature = mobilenet.predict(expanded);
        expanded.dispose();

        if(feature instanceof tf.Tensor) {
            features.push(feature);
            
            // Update the training progress
            onProgress(Math.round((i + 1) / trainingData.length * 5) + 5);
        } else {
            console.error('Feature extraction failed');
            return;
        }
    }

    console.log('Features extracted');

    // Convert the features to tensors
    const xs = tf.concat(features);
    const ys = tf.oneHot(tf.tensor1d(trainingLabels, 'int32'), trainingSets.length);

    onStep('Training Model...');

    // Train the model
    await model.fit(xs, ys, {
        epochs,
        callbacks: {
            onEpochEnd: async (epoch: number, logs: any) => {
                onProgress(Math.round((epoch + 1) / epochs * 90) + 10);
                console.log('Epoch: ', epoch, ' Loss: ', logs.loss, ' Accuracy: ', logs.acc);
            }
        }
    });

    onProgress(100);
    onStep('Model trained!');

    // Dispose of the tensors to free up memory
    xs.dispose();
    ys.dispose();
    for (const feature of features) {
        feature.dispose();
    }
    for (const img of trainingData) {
        img.dispose();
    }

    console.log(model.summary());
    return model;
}

/**
 * Predicts the labels for the test set so we can evaluate the model.
 **/
export async function testModel(model: tf.Sequential, testSetImgs: string[], onProgress: (progress: number) => void, onStep: (step: string) => void) {
    if (!model) {
        console.error('Model not trained');
        return;
    }

    const testData: tf.Tensor[] = [];

    let testingProgress = 0;
    onStep('Loading test data...');

    const loadImage = (img: string) => {
        return new Promise<void>((resolve) => {
            const image = new Image();
            image.src = img;
            image.onload = () => {
                const tensor = tf.browser.fromPixels(image).resizeBilinear([MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH]).toFloat().div(255);
                testData.push(tensor);

                // Update the testing progress
                testingProgress += 5 / testSetImgs.length;
                onProgress(testingProgress);

                resolve();
            }
        });
    }

    const loadAllImages = async () => {
        const promises = [];

        for (const img of testSetImgs) {
            promises.push(loadImage(img));
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
        mobilenet = await mobilenet ?? null;
    }

    if (!mobilenet) {
        console.error('MobileNet model not loaded');
        return;
    }

    // Predict the features for all images
    const features: tf.Tensor[] = [];
    for (let i = 0; i < testData.length; i++) {
        onStep('Predicting image ' + (i + 1) + '/' + testData.length);
        const img = testData[i];
        const feature = mobilenet.predict(img.expandDims(0));

        if(feature instanceof tf.Tensor) {
            features.push(feature);
            
            // Update the testing progress
            onProgress(Math.round((i + 1) / testData.length * 5) + 5);
        } else {
            console.error('Feature extraction failed');
            return;
        }
    }

    onStep('Finalizing predictions...');

    console.log('Features extracted');

    let predictions = [];        
    
    for(let i = 0; i < features.length; i++) {
        const feature = features[i];
        const prediction = model.predict(feature) as tf.Tensor;
        const predictionData = await prediction.data();
        const predictedLabel = predictionData.indexOf(Math.max(...predictionData));
        console.log('Predicted label: ', predictedLabel, ' Prediction: ', predictionData);
        predictions.push(predictedLabel);
        onProgress(Math.round((i + 1) / features.length * 90) + 10);
    }

    // Dispose of the tensors to free up memory
    for (const feature of features) {
        feature.dispose();
    }

    for (const tensor of testData) {
        tensor.dispose();
    }

    console.log('Predictions: ', predictions);
    return predictions;
}
