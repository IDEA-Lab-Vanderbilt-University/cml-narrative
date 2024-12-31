<script lang="ts">
    export let trainingProgress: number = 0;
    export let trainingStep: string = "";
</script>

<progress id="trainingProgress" value={trainingProgress} max="100"></progress>
<div id="trainingStep">{trainingStep}</div>

<style>
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

    #trainingProgress::-webkit-progress-bar {
        background-color: #f0f0f01d;
        border-radius: 1vh;
    }

    #trainingProgress::-webkit-progress-value {
        background: linear-gradient(to right, #82ecff, #30e0ff);
        border-radius: 1vh;
        transition: all 0.3s;
    }

    #trainingProgress::-moz-progress-bar {
        background: linear-gradient(to right, #82ecff, #30e0ff);
        border-radius: 1vh;
    }

    #trainingStep {
        color: #eee;
        font-size: 2rem;
        width: 100%;
        text-align: center;
        margin: 1vh auto;
    }
</style>