<script lang="ts">
	import Tablet from "../tablet/Tablet.svelte";

    import type { Student } from '$lib/types/UserData';
    import { settingsStore, studentDataStore, studentProgressStore } from '$lib/utils/stores/store';
	import Badge from "../Badge.svelte";
    import { Confetti } from "svelte-confetti";
	import { get } from "svelte/store";
	import type { BadgeType } from "$lib/utils/Assets/Badges";
	import { onMount } from "svelte";

    export let handleClick: () => void;

    let agent: Student = get(studentDataStore);

    export let badgeName: string | null = null;
    export let badgeImage: string | null = null;
    export let badge: BadgeType | null = null;

    const spanishBadgeNames: Record<string, string> = {
        'Agent-In-Training': 'Agente en Entrenamiento',
        'Algorithm All Stars': 'Estrellas de los Algoritmos',
        'Machine Learning Master': 'Maestro de Aprendizaje Automático',
        'Bias Buster': 'Destructor de Sesgos',
        'Junior Agent': 'Agente Junior'
    };

    if (badge) {
        badgeName = badge.name;
        badgeImage = badge.image;
    }

    $: localizedBadgeName = $settingsStore.language === 'es'
        ? spanishBadgeNames[badgeName ?? ''] ?? (badgeName ?? '')
        : (badgeName ?? '');

    $: headerText = $settingsStore.language === 'es'
        ? `¡Felicitaciones, Agente ${agent.agent_name}!`
        : `Congratulations, Agent ${agent.agent_name}!`;

    $: subheaderText = $settingsStore.language === 'es'
        ? '¡Has ganado otra insignia!'
        : 'You have earned another badge!';

    $: closeText = $settingsStore.language === 'es' ? 'Cerrar' : 'Close';

    let confetti = 0;

    onMount(() => {
        if(badge && badge.count) {
            studentProgressStore.update((data) => {
                data.badge_count = badge.count;
                return data;
            });
        }
    });
</script>

<Tablet showMeter={false}>
    <div class="text-center text-white text-3xl font-mokoto p-16">
        {headerText} <br/>
        {subheaderText}
    </div>
    <div class="flex justify-center">    
        <Badge name={localizedBadgeName} image={badgeImage ?? ''} onClick={() => { confetti++;}} />
    </div>
    <div class="flex justify-center">    
        {#key confetti}        
            <Confetti x={[-2, 2]} y={[-0.5, 1.0]} amount={100} />
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