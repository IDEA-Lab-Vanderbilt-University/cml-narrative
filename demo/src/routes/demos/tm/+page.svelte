<!--
 +page.svelte
 application
 
 Created by Ian Thompson on October 3rd 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
--->

<script>
    import * as mobilenetModule from '@tensorflow-models/mobilenet';
    import * as tf from '@tensorflow/tfjs';
    import * as knnClassifier from '@tensorflow-models/knn-classifier';
    import * as tmImage from '@teachablemachine/image';
	import { onMount } from 'svelte';


    // Number of classes to classify
const NUM_CLASSES = 3;
// Webcam Image size. Must be 227. 
const IMAGE_SIZE = 227;
// K value for KNN
const TOPK = 10;


class Main {
  constructor() {
    // Initiate variables
    this.infoTexts = [];
    this.training = -1; // -1 when no class is being trained
    this.videoPlaying = false;

    // Initiate deeplearn.js math and knn classifier objects
    this.bindPage();
    

    // Create video element that will contain the webcam image
    this.video = document.createElement('video');
    this.video.setAttribute('autoplay', '');
    this.video.setAttribute('playsinline', '');

    // Add video element to DOM
    document.body.appendChild(this.video);

    // Create training buttons and info texts    
    for (let i = 0; i < NUM_CLASSES; i++) {
      const div = document.createElement('div');
      document.body.appendChild(div);
      div.style.marginBottom = '10px';

      // Create training button
      const button = document.createElement('button')
      button.innerText = "Train " + i;
      div.appendChild(button);

      // Create training button
      const buttonPrint = document.createElement('button')
      buttonPrint.innerText = "Print";
      div.appendChild(buttonPrint);

      // Listen for mouse events when clicking the button
      button.addEventListener('mousedown', () => this.training = i);
      button.addEventListener('mouseup', () => this.training = -1);
      buttonPrint.addEventListener("mouseup", async () => {
      
        tmImage.load(this.mobilenet.model)
    })

      // Create info text
      const infoText = document.createElement('span')
      infoText.innerText = " No examples added";
      div.appendChild(infoText);
      this.infoTexts.push(infoText);
    }


    // Setup webcam
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.video.srcObject = stream;
        this.video.width = IMAGE_SIZE;
        this.video.height = IMAGE_SIZE;

        this.video.addEventListener('playing', () => this.videoPlaying = true);
        this.video.addEventListener('paused', () => this.videoPlaying = false);
      })
  }

  async downloadJSON(knn) { 
    let dataset = this.knn.getClassifierDataset()
    var datasetObj = {}
    Object.keys(dataset).forEach((key) => { let data = dataset[key].dataSync(); datasetObj[key] = Array.from(data); }); 
    let jsonStr = JSON.stringify(datasetObj)
    let jsonModel = JSON.stringify(datasetObj); 
    let downloader = document.createElement('a'); 
    downloader.download = "model.json"; 
    downloader.href = 'data:text/text;charset=utf-8,' + encodeURIComponent(jsonModel); 
    document.body.appendChild(downloader); 
    downloader.click(); 
    downloader.remove(); 
}


  async bindPage() {
    this.knn = knnClassifier.create();
    this.mobilenet = await mobilenetModule.load();
  

    this.start();
  }

  start() {
    if (this.timer) {
      this.stop();
    }
    this.video.play();
    this.timer = requestAnimationFrame(this.animate.bind(this));
  }

  stop() {
    this.video.pause();
    cancelAnimationFrame(this.timer);
  }

  async animate() {
    if (this.videoPlaying) {
      // console.log(this.mobilenet.endpoints)
      // console.log(this.knn.getClassifierDataset())
      // console.log(await mobilenetModule.load());
      // Get image data from video element
      const image = tf.FromPixels(this.video);

      let logits;
      // 'conv_preds' is the logits activation of MobileNet.
      const infer = () => this.mobilenet.infer(image, 'conv_preds');

      // Train class if one of the buttons is held down
      if (this.training != -1) {
        logits = infer();

        // Add current image to classifier
        this.knn.addExample(logits, this.training)
      }

      const numClasses = this.knn.getNumClasses();
      if (numClasses > 0) {

        // If classes have been added run predict
        logits = infer();
        const res = await this.knn.predictClass(logits, TOPK);

        for (let i = 0; i < NUM_CLASSES; i++) {

          // The number of examples for each class
          const exampleCount = this.knn.getClassExampleCount();
         
          // Make the predicted class bold
          if (res.classIndex == i) {
            this.infoTexts[i].style.fontWeight = 'bold';
          } else {
            this.infoTexts[i].style.fontWeight = 'normal';
          }

          // Update info text
          if (exampleCount[i] > 0) {
            this.infoTexts[i].innerText = ` ${exampleCount[i]} examples - ${res.confidences[i] * 100}%`
          }
        }
      }

      // Dispose image when done
      image.dispose();
      if (logits != null) {
        logits.dispose();
      }
    }
    this.timer = requestAnimationFrame(this.animate.bind(this));
  }
}

onMount(() => {
    new Main()
})
// window.addEventListener('load', () => new Main());
</script>

