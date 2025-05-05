import * as tf from '@tensorflow/tfjs';

let mobilenet: tf.LayersModel | Promise<tf.LayersModel | undefined> | null = null;
const MOBILE_NET_INPUT_HEIGHT = 224;
const MOBILE_NET_INPUT_WIDTH = 224;
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

export function rgbToHsl(r: number, g: number, b: number) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = (max + min) / 2;
    let s = h;
    let l = h;

    if (max == min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }

        h /= 6;
    }

    return [h, s, l];
}

export function hslToRgb(h: number, s: number, l: number) {
    let r, g, b;

    if (s == 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [r * 255, g * 255, b * 255];
}

function applyRotation(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, image: HTMLImageElement) {
    const angleMax = 25; // Maximum rotation angle in degrees

    // Random rotation angle between -angleMax and +angleMax
    const angle = ((Math.random() + 0.25) * 1.8 * angleMax) - angleMax;

    // Scale depends on the angle: the more the angle, the smaller the scale range
    const scaleBase = 1.1; // Base scale to ensure it overflows slightly
    const scaleFactor = Math.max(1.65, Math.abs(angle) / angleMax * 2.5); // Adjust scale based on angle
    const scale = scaleBase + Math.random() * (scaleFactor - scaleBase);

    // Rotate the image
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle * Math.PI / 180);
    ctx.scale(scale, scale);
    ctx.drawImage(image, -canvas.width / 2, -canvas.height / 2);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function applyFlip(data: Uint8ClampedArray, newImageData: ImageData, canvas: HTMLCanvasElement) {
    for (let i = 0; i < data.length; i += 4) {
        const x = i / 4 % canvas.width;
        const y = Math.floor(i / 4 / canvas.width);

        const flippedX = canvas.width - x - 1;
        const index = (flippedX + y * canvas.width) * 4;

        newImageData.data[index] = data[i];
        newImageData.data[index + 1] = data[i + 1];
        newImageData.data[index + 2] = data[i + 2];
        newImageData.data[index + 3] = data[i + 3];
    }
}

function applyAdjust(data: Uint8ClampedArray, newImageData: ImageData) {
    const hue = Math.round((Math.random() * 20 + 10) * Math.sign(Math.random() - 0.5));
    const saturation = Math.round(Math.random() * 2 + 1);

    for (let i = 0; i < data.length; i += 4) {
        const hsl = rgbToHsl(data[i], data[i + 1], data[i + 2]);
        const rgb = hslToRgb(hsl[0] + hue, hsl[1] * saturation, hsl[2]);

        newImageData.data[i] = rgb[0];
        newImageData.data[i + 1] = rgb[1];
        newImageData.data[i + 2] = rgb[2];
        newImageData.data[i + 3] = data[i + 3];
    }
}

const createBoostedImage = (img: string, label: number, booster: Booster) => new Promise<tf.Tensor>((resolve) => {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        console.error('Canvas context not available');
        return;
    }

    const image = new Image();
    image.src = img;
    image.onload = () => {
        // Set the canvas size to the image size
        canvas.width = image.width;
        canvas.height = image.height;

        // Draw the image on the canvas
        ctx.drawImage(image, 0, 0);

        // Get the image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Create a new image data object
        const newImageData = ctx.createImageData(imageData);

        // Apply the booster
        switch (booster) {
            case 'rotate':
                applyRotation(ctx, canvas, image);
                break;
            case 'flip':
                applyFlip(data, newImageData, canvas);
                break;
            case 'adjust':
                applyAdjust(data, newImageData);
                break;
            default:
                break;
        }

        // Update the canvas with the new image data
        ctx.putImageData(newImageData, 0, 0);

        // Convert the canvas to a tensor
        const tensor = tf.browser.fromPixels(canvas).resizeBilinear([MOBILE_NET_INPUT_HEIGHT, MOBILE_NET_INPUT_WIDTH]).toFloat().div(255);
        resolve(tensor);
    };
});

export 
async function trainModel(trainingSets: string[][], booster: Booster, onProgress: (progress: number) => void, onStep: (step: string) => void, epochs: number = 7) {

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
