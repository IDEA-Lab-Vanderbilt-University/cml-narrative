<script lang="ts">
    export let prediction: number;
    export let classes: string[];
    export let image: string;
    export let buttonTextOverrides: string[] = [];

    export let choice = (i: number) => {
        console.log(`You chose ${classes[i]}`);
    }

</script>

<div class="card">
    <img class="card-img-top" src={image} alt="Image for prediction" />
    <div class="card-body">
        What category does this image belong to?
    </div>
    <div class="card-options">
        {#each classes as c, i}
            <button class="btn" on:click={choice.bind(null, i)}>
                {#if buttonTextOverrides.length > i}
                    {buttonTextOverrides[i]}
                {:else}
                    It's a {c}
                {/if}
            </button>
        {/each}
    </div>
</div>

<style>
    
    .card {
        width: 40vw;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin-top: 2vh;
        color: #eee;
    }

    .card-img-top {
        width: 15vw;
        height: 15vw;
        aspect-ratio: 1/1;
        object-fit: cover;
        object-position: center;
        border-radius: 10px;
        background-color: #f0f0f01d;
    }

    .card-body {
        width: 100%;
        font-size: 1.5rem;
        text-align: center;
        display: block;
        margin: 0 auto;
    }

    .card-options {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        gap: 1vw;
        margin-top: 1vh;
    }

    .card-options button {
        background-color: #49c5ff;
        color: #111;
        border: none;
        border: 2px solid #289dd3;
        height: 5vh;
        border-radius: 2.5vh;
        padding: 1vh 2vw;
        font-size: 1.5rem;
        cursor: pointer;
        transition: 0.3s;
    }

    .card-options button.btn-primary {
        background: radial-gradient(farthest-corner at bottom right, #17e010 75%, #fff 100%);
        background-color: #17e010;
        border: 2px solid #0f9a07;
    }

    .card-options button.btn-danger {
        background: radial-gradient(farthest-corner at bottom right, #ff3b3b 75%, #fff 100%);
        background-color: #ff3b3b;
        border: 2px solid #d32f2f;
    }

    .card-options button:hover {
        transform: scale(1.05);
    }

    .card-options button:active {
        transform: scale(0.95);
    }

    .card-predicted {
        color: #ffb649;
    }
</style>