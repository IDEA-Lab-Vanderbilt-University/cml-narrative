<script lang="ts">
	import Tablet from '$lib/components/tablet/Tablet.svelte';

    export let from = 'Mission Control';
    export let onNext: () => void;
</script>

<Tablet showMeter={false}>
    <div class="flex flex-col items-center justify-center space-y-6 text-white" id="mailscreen">
        <h1 class="text-5xl">Incoming message 
            from {from}!</h1>
        <img src="/img/misc/mail.png" alt="letter" id="mailicon" />
        <button on:click={onNext}>
            <img src="/img/misc/readbutton.png" alt="Read" id="readbutton" />
        </button>
    </div>
</Tablet>

<style>
    #mailicon {
        height: 20vh;
        animation: shake 1.5s infinite ease-in-out;
    }

    @keyframes shake {
        0% { transform: rotate(0deg); }
        10% { transform: rotate(5deg); }
        15% { transform: rotate(0deg); }
        20% { transform: rotate(-5deg); }
        25% { transform: rotate(0deg); }
    }

    #readbutton {
        height: 10vh;
        transition: transform 0.2s;
    }

    #readbutton:hover {
        transform: scale(1.1);
    }

    #readbutton:active {
        transform: scale(0.9);
    }

    #mailscreen {
        justify-items: center;
        align-items: center;
        height: 100%;
        gap: 1vh;
    }
</style>