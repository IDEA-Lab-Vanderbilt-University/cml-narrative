<script lang="ts">
	import { createEventDispatcher } from "svelte";

    export let color: string;

    let dispatch = createEventDispatcher();

</script>

<input 
    type="radio" 
    id="color-swatch" 
    name="drawingcolor" 
    value={color} 
    style="background-color: {color}"
    on:change={() => dispatch('change', color)}
/>


<style>
    input {
        width: 2vh;
        height: 2vh;
        border-radius: 50%;
        margin: 0.5vh;
        cursor: pointer;
        border: 3px solid black;
        appearance: none;
    }

    input:checked {
        border: 3px solid white;
    }
</style>

