<script lang="ts">
	import { onMount } from "svelte";
	import Tablet from "../tablet/Tablet.svelte";


    export let onSuccess: () => void;

    let secretCode = 'AAA';

    onMount(() => {
        // Randomly generate a 3-letter code with three different letters
        let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        secretCode = Array.from({ length: 3 }, () => {
            const randomIndex = Math.floor(Math.random() * letters.length);
            const randomLetter = letters[randomIndex];
            
            letters = letters.replace(randomLetter, ''); // Remove the letter from the pool

            return randomLetter;
        }).join('');
    });

    const checkCode = () => {
        const input1 = document.getElementById('input1') as HTMLInputElement;
        const input2 = document.getElementById('input2') as HTMLInputElement;
        const input3 = document.getElementById('input3') as HTMLInputElement;

        const code = input1.value.toUpperCase() + input2.value.toUpperCase() + input3.value.toUpperCase();

        if (code === secretCode) {
            onSuccess();
        }
    };
</script>

<Tablet showMeter={false} showBottomButtons={false}>
    <div class="flex flex-col items-center justify-center space-y-6 text-white" id="mailscreen2">
        <p class="text-3xl w-full text-center">Your secret code is: {secretCode}</p>
        <p class="text-3xl w-full text-center">Input code below to confirm:</p>
        <div class="flex flex-row items-center justify-center space-x-4">
            <input type="text" placeholder="" length="1" id="input1" name="input1" class="codeinput text-3xl text-center" on:change={checkCode} on:keyup={() => {if (input1.value.length === 1) {document.getElementById('input2').focus()}}} />
            <input type="text" placeholder="" length="1" id="input2" name="input2" class="codeinput text-3xl text-center" on:change={checkCode} on:keyup={() => {if (input2.value.length === 1) {document.getElementById('input3').focus()}}} />
            <input type="text" placeholder="" length="1" id="input3" name="input3" class="codeinput text-3xl text-center" on:change={checkCode} on:keyup={checkCode} />
        </div>
    </div>
</Tablet>

<style>
    .codeinput {
        width: 15vh;
        height: 20vh;
        font-size: 10vh;
        text-align: center;
        background-color: rgba(255, 255, 255, 0.2);
        border: 2px solid white;
        color: white;
        border-radius: 25px;
        text-transform: uppercase;
    }
</style>