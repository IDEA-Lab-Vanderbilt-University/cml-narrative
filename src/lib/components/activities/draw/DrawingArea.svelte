<script lang="ts">
	import { onMount } from "svelte";
	import ColorSwatch from "./ColorSwatch.svelte";

    export let onSubmit: (img: HTMLImageElement) => void;

let colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'blue',
    'purple',
    'black',
    'white'
];

let selectedColor = 'black';

function selectColor(event: CustomEvent) {
    selectedColor = event.detail;
}

let canvas: HTMLCanvasElement | null = null;

const clearCanvas = () => {
    const ctx = canvas?.getContext('2d');
    if (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
};

const submit = () => {
    if(!canvas) return;
    const img = new Image();
    img.src = canvas.toDataURL();
    onSubmit(img);
};

onMount(() => {
    if (canvas) {
        const ctx = canvas.getContext('2d');

        if(ctx) {
            canvas.width = canvas.clientWidth * 2;
            canvas.height = canvas.clientHeight * 2;
            clearCanvas();
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            canvas.addEventListener('mousedown', (event) => {
                if (event.buttons === 1) {
                    ctx.strokeStyle = selectedColor;
                    ctx.lineWidth = 10;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    ctx.beginPath();
                    ctx.translate(0.5,0.5);
                    ctx.moveTo(event.layerX * 2 + 0.5, event.layerY * 2 + 0.5);
                }
            });

            canvas.addEventListener('mousemove', (event) => {
                if (event.buttons === 1) {
                    ctx.lineTo(event.layerX * 2 + 0.5, event.layerY * 2 + 0.5);
                    ctx.stroke();
                }
            });

            canvas.addEventListener('mouseup', () => {
                ctx.closePath();
            });

            canvas.addEventListener('mouseleave', () => {
                ctx.closePath();
            });

            canvas.addEventListener('touchstart', (event) => {
                if (event.touches.length === 1) {
                    ctx.strokeStyle = selectedColor;
                    ctx.lineWidth = 10;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    ctx.beginPath();
                    ctx.translate(0.5,0.5);
                    ctx.moveTo(event.touches[0].clientX * 2 + 0.5, event.touches[0].clientY * 2 + 0.5);
                }
            });

            canvas.addEventListener('touchmove', (event) => {
                if (event.touches.length === 1) {
                    ctx.lineTo(event.touches[0].clientX * 2 + 0.5, event.touches[0].clientY * 2 + 0.5);
                    ctx.stroke();
                }
            });

            canvas.addEventListener('touchend', () => {
                ctx.closePath();
            });

            canvas.addEventListener('touchcancel', () => {
                ctx.closePath();
            });

            canvas.addEventListener('touchleave', () => {
                ctx.closePath();
            });

            canvas.addEventListener('resize', () => { 
                if (canvas) {
                    canvas.width = canvas.clientWidth * 2;
                    canvas.height = canvas.clientHeight * 2;
                }
            });
        }

    }
});
</script> 


<section>
    {#each colors as color}
        <ColorSwatch color={color} on:change={selectColor} />
    {/each}
</section>

<canvas id="drawing-area" bind:this={canvas}></canvas>

<button on:click={clearCanvas}>Clear</button> <button id="submit" on:click={submit}>Submit</button>



<style>
    section {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1vh;
        position: absolute;
    }

    #drawing-area {
        width: 100%;
        height: 65vh;
        background-color: white;
    }
    

    button {
        margin: 1vh;
        padding: 1vh;
        background-color: #f0f0f0;
        border: 1px solid black;
        border-radius: 5px;
        cursor: pointer;
        transition: all 0.2s;
    }

    button:hover {
        background-color: #e0e0e0;
        transform: scale(1.05);
    }

    button#submit {
        background-color: #28dc28;
    }

    button#submit:hover {
        background-color: #1cb41c;
    }
</style>