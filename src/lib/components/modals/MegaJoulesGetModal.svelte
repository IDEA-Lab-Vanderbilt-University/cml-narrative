<script lang="ts">
	import Tablet from "../tablet/Tablet.svelte";
    import { languageStore } from '$lib/utils/stores/languageStore';
    import type { Language } from '$lib/utils/translations';

    import type { Student, StudentProgress } from '$lib/types/UserData';
    import { studentDataStore, studentProgressStore } from '$lib/utils/stores/store';
	import Badge from "../Badge.svelte";
    import { Confetti } from "svelte-confetti";
	import MegaJoulesMeter from "../tablet/MegaJoulesMeter.svelte";
	import { get } from "svelte/store";

    export let handleClick: () => void;

    let progress = get(studentProgressStore);

    export let amount: number;

    let currentLanguage: Language = 'en';
    languageStore.subscribe((lang: Language) => {
        currentLanguage = lang;
    });

    $: earnedText = currentLanguage === 'es'
        ? `¡Ganaste ${amount} megajoules!`
        : `You earned ${amount} Megajoules!`;

    $: closeText = currentLanguage === 'es' ? 'Cerrar' : 'Close';

    let earnedText = '';
    let closeText = 'Close';

    let imageAmount = Math.floor((progress.megajoules ?? 0) * 14 / 100);
    let confetti = 0;
</script>

<Tablet showMeter={false}>
    <div class="text-center text-white text-3xl font-mokoto p-16">
        {earnedText}
    </div>
    <div class="flex justify-center h-1/3">  
    	<img src={`/img/tablet/meter/meter-${imageAmount}.svg`} alt={currentLanguage === 'es' ? `${amount} megajoules` : `${amount} Megajoules`} on:click={() => { confetti++;}} />
    </div>
    <div class="flex justify-center">    
        {#key confetti}
            <Confetti x={[-2, 2]} y={[-0.5, 1.0]} amount={100} colorRange={[40, 50]} />
        {/key}
    </div>
    <div class="flex justify-center">
        <button class="btn btn-primary" on:click={handleClick}>
            {closeText}
        </button>
    </div>
</Tablet>

<style>

</style>