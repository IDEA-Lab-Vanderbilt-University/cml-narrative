<script lang="ts">
	import { onMount } from "svelte";
	import ColorSwatch from "./ColorSwatch.svelte";

    export let onSubmit: (img: HTMLImageElement) => void;
    export let onBack: null | (() => void) = null;

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

let offScreenCanvas = document.createElement('canvas');
let prevWidth = 0;
let prevHeight = 0;

function resizeCanvas() {
    if (!canvas || !offScreenCanvas) return;
    
    const offScreenCtx = offScreenCanvas.getContext('2d');
    if (!offScreenCtx) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if(prevWidth == 0 || prevHeight == 0) {
        prevWidth = canvas.width;
        prevHeight = canvas.height;
    }

    // Save current content on off-screen canvas
    offScreenCanvas.width = prevWidth;
    offScreenCanvas.height = prevHeight;
    offScreenCtx.drawImage(canvas, 0, 0);

    // Resize the canvas to the new window size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Calculate the scale factor
    const scaleX = canvas.width / prevWidth;
    const scaleY = canvas.height / prevHeight;

    // Redraw the saved content with scaling
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(scaleX, scaleY);
    ctx.drawImage(offScreenCanvas, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset the transformation matrix after scaling

    // Update previous canvas dimensions for the next resize
    prevWidth = canvas.width;
    prevHeight = canvas.height;
}

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

const getMousePosition = (event: MouseEvent) => {
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect(); // Get the canvas position on the screen
    return {
        x: (event.clientX - rect.left) * (canvas.width / rect.width),
        y: (event.clientY - rect.top) * (canvas.height / rect.height)
    };
};

const getTouchPosition = (event: TouchEvent) => {
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect(); // Get the canvas position on the screen
    return {
        x: (event.touches[0].clientX - rect.left) * (canvas.width / rect.width),
        y: (event.touches[0].clientY - rect.top) * (canvas.height / rect.height)
    };
};

onMount(() => {
    if (canvas) {
        let ctx = canvas.getContext('2d');
        if(ctx) {
            resizeCanvas();
            clearCanvas();
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';

            canvas.addEventListener('mousedown', (event) => {
                if (canvas && event.buttons === 1) {
                    let ctx = canvas.getContext('2d');
                    if (!ctx) return;

                    ctx.strokeStyle = selectedColor;
                    ctx.lineWidth = 10;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    ctx.beginPath();
                    ctx.translate(0.5,0.5);
                    
                    const pos = getMousePosition(event);
                    ctx.moveTo(pos.x, pos.y);
                }
            });

            canvas.addEventListener('mousemove', (event) => {
                if (canvas && event.buttons === 1) {
                    let ctx = canvas.getContext('2d');
                    if (!ctx) return;
                    
                    const pos = getMousePosition(event);
                    ctx.lineTo(pos.x, pos.y);
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
                if (canvas && event.touches.length === 1) {
                    ctx.strokeStyle = selectedColor;
                    ctx.lineWidth = 10;
                    ctx.lineCap = 'round';
                    ctx.lineJoin = 'round';
                    ctx.beginPath();
                    ctx.translate(0.5,0.5);
                    
                    const pos = getTouchPosition(event);
                    ctx.moveTo(pos.x, pos.y);
                }
            });

            canvas.addEventListener('touchmove', (event) => {
                if (canvas && event.touches.length === 1) {
                    const pos = getTouchPosition(event);
                    ctx.lineTo(pos.x, pos.y);
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
                    resizeCanvas();
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
{#if onBack}
    <button id="back" on:click={onBack}>Back</button>
{/if}



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