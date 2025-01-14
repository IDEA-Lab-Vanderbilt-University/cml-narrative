<script lang="ts">
    export let className: string;
    export let imgs: string[];
    export let booster: string;
    export let prefix: string;
    export let labels: string[] = [];
    export let labelClassess: string[] = [];
    export let allowAdd: boolean = false;
    export let onAdd: () => void = () => {};
    
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
</script>

<div class="trainingSet">
    <a id={className} />
    <div class="trainingSetHeader">
        <h2>{className} ({imgs.length})
            {#if allowAdd}
                <button class="addbtn" on:click={onAdd}>+</button>
            {/if}
        </h2>
    </div>
    <div class="trainingSetImages">
        {#each imgs as img, i}
            <div class="imgContainer">
                <img src={prefix + img} alt={img} class="trainingImg" />
                {#if labels.length > 0}
                    <div class="boosterOverlay {labelClassess[i]}"> 
                        {labels[i]}
                    </div>
                {/if}
            </div>
        {/each}
        {#if allowAdd}
        <div class="imgContainer">
            <button class="addbtn" on:click={onAdd}>+</button>
        </div>
    {/if}
    </div>
    {#if booster != 'none'}
        <div class="boosterImages">
            {#each imgs as img}
                <div class="imgContainer">
                    <img src={prefix + img} alt={img} class="trainingImg" style={getBoosterStyle(booster, img)} />
                </div>
            {/each}
        </div>
        <div class="boosterOverlay">
            +{imgs.length} Boosted Images!
        </div>
    {/if}
</div>

<style>
    
    .trainingSetImages {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        max-width: 100%;
    }

    .imgContainer {
        align-content: center; 
    }

    .boosterImages {
        display: flex;
        flex-wrap: nowrap;
        overflow: hidden;
        width: 100%;
        max-width: 64vw;
        mask: linear-gradient(to right,  #0000 0%, #000 10%, #000 90%, #0000 100%);
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
        margin: 0 auto;
        text-align: center;
        border-radius: 10px;
        padding: 1vh 0;
        position: relative;
        z-index: 1;
        align-content: center;
        height: 4vw;
        margin-top: -5.75vw;
    }
    
    .imgContainer .boosterOverlay {
        display: block ruby;
        top: -25%;
        margin-top: -50%;
        font-size: 1.25vw;
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

    .trainingSetHeader {
        color: #eee;
        font-size: 2rem;
        width: 100%;
    }

    .correct {
        background-color: #00ff009a;
    }

    .incorrect {
        background-color: #ff00009a;
    }

    .addbtn {
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        margin-left: 1vw;
    }

    h2 .addbtn {
        width: 3vw;
        height: 3vw;
        font-size: 1.5rem;
        line-height: 3vw;
    }

    .imgContainer .addbtn {
        width: 7.5vw;
        min-width: 7.5vw;
        height: 7.5vw;
        min-height: 7.5vw;
        transform-origin: center center;
        margin: 0;
        padding: 0;
        font-size: 4vw;
        line-height: 7.5vw;
        margin: 0.25vw;
    }

</style>