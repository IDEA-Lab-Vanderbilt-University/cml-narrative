<script lang="ts">
    export let title: string;
    export let definition: string;
</script>

<div class="defbox">
    <div class="inner">
        <h2>{title}</h2>
        <p>{definition}</p>
    </div>
</div>

<style>
    .defbox {
        background-image: url('/img/misc/scifiborder1.png');
        width: 40vw;
        height: 25vw;
        margin: 10vh auto;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
        display: flex;
        justify-content: center;
        z-index: 1;
    }

    .inner {
        padding: 20px;
        background: radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.8) 100%);
        width: 95%;
        height: 95%;
        align-self: center;
        border-radius: 3vw;
        z-index: -1;
    }

    h2 {
        font-size: 2.5vw;
        color: gold;
        text-align: left;
        font-family: 'Mokoto';
    }

    p {
        font-size: max(1.5rem, 1.5vw);
        color: white;
        text-align: left;
        text-align: center;
        margin-top: 2vw;
    }
</style>