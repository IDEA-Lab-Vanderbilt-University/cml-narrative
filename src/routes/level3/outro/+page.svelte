<script lang="ts">
	import { goto } from '$app/navigation';
	import DialogBox from '$lib/components/dialog/DialogBox.svelte';
	import Scene from '$lib/components/scene/Scene.svelte';
	import TabletButton from '$lib/components/tablet/TabletButton.svelte';
	import { NavigationDirection } from '$lib/types/Enums';
	import type { Line } from '$lib/types/Script';
	import { getLineDialog } from '$lib/utils/getLineDialog';
	import type { StudentProgress } from '$lib/types/UserData.js';
	import DataService from '$lib/utils/DataService/index.js';
	import { languageStore } from '$lib/utils/stores/languageStore';
	import { studentDataStore, studentProgressStore, useNewLevel4 } from '$lib/utils/stores/store.js';
	import type { Language } from '$lib/utils/translations';
	import { createEventDispatcher } from 'svelte';
	import script from '$lib/scripts/level3/outro/index.js';
	import Tablet from '$lib/components/tablet/Tablet.svelte';
	import SpotApplication from '$lib/components/sequences/tablet/tablet-tutorial/SpotApplication.svelte';
	import IncomingMessageModal from '$lib/components/modals/IncomingMessageModal.svelte';
	import ReadMessageModal from '$lib/components/modals/ReadMessageModal.svelte';
	import TextResponseModal from '$lib/components/activities/free-response/TextResponseModal.svelte';
	import BadgeGetModal from '$lib/components/modals/BadgeGetModal.svelte';
	import MegaJoulesGetModal from '$lib/components/modals/MegaJoulesGetModal.svelte';
	import { BadgesByName } from '$lib/utils/Assets/Badges.js';
	import { isLevel4Enabled } from '$lib/utils/featureFlags';

	export let data;

	let line: Line;
	$: line = data.line;

	let currentLanguage: Language = 'en';
	languageStore.subscribe((lang: Language) => {
		currentLanguage = lang;
	});

    let lineNumber = 1;
    $: lineNumber = line.id;

	/**
	 * Handles an emitted dialogEvent as sent from a DialogControl component and progresses the script as such
	 * @param event can be destructured to obtain which way the dialog in a script should progress
	 */
	const handleDialogEvent = async (event: any) => {
		var state: NavigationDirection = event.detail.state;

		handleNavigation(state);
	};

	/**
	 * Determine the state of the DialogEvent that was emitted. Then, we will navigate
	 * the user to the appropriate url with appropriate querystring which represents
	 * which line in the script should be returned to the user.
	 */
	const handleNavigation = async (direction: NavigationDirection) => {
		let target = '';

		if (direction == NavigationDirection.forward) {
			if (line.id == script.lines.length) {
                // Next level
				if (useNewLevel4 || !isLevel4Enabled) {
					target = '/level4new?page=1';
				} else {
					target = '/level4?page=1';
				}
			} else {
				target = `/level3/outro?page=${line.id + 1}`;
			}

		} else if (direction == NavigationDirection.backward) {
			if(line.id > 1) {
				target = `/level3/outro?page=${line.id - 1}`;
			} else {
				target = '/level3?page=1';
			}
		}

		if (target) {
			studentProgressStore.update((data) => {
				data.last_visited = target;
				return data;
			});
			goto(target);
		}
	};

	$: {
		if (line.id == 18){
			studentProgressStore.update((data) => {
				data.megajoules = 100;
				return data;
			});
		}
	}

    let content: HTMLDivElement | null;

</script>

<Scene background={line.background} audio={line.audio}>
	<div class="w-full" slot="dialog">

        {#if ![12, 13, 14].includes(line.id)}
			<DialogBox {line} on:dialogEvent={handleDialogEvent} />
		{/if}
	</div>

	<div slot="content" class="h-full w-full" bind:this={content}>
        {#if ![10, 11, 12, 13, 14, 15, 16, 17, 18].includes(line.id)}
        	<TabletButton on:click={() => { 
                const event  = new CustomEvent('showTablet', {
                    bubbles: true
                });
                
                content?.dispatchEvent(event);
            }}
            />
        {/if}
    
        {#if line.id == 10}
            <IncomingMessageModal from="Mission Control" onNext={() => handleNavigation(NavigationDirection.forward)} />
        {/if}

		{#if line.id == 11}
			<ReadMessageModal from={line.speakers[0]} onNext={() => handleNavigation(NavigationDirection.forward)}>
					<div class="border-white border-2 p-4 w-7/12">
						<p class="text-3xl">
							{getLineDialog(line)}
						</p>
					</div>
			</ReadMessageModal>
		{/if}

		{#if line.id == 12}
			<TextResponseModal id="biasGroups" title={currentLanguage === 'es' ? '¿Por qué las tecnologías de aprendizaje automático podrían funcionar para algunos grupos de personas y no para otros?' : 'Why might machine learning technologies work for some groups of people and not other groups of people?'} onSuccess={() => handleNavigation(NavigationDirection.forward)} prompt="" placeholder="" />
		{/if}

		{#if line.id == 13}
			<TextResponseModal id="biasEffects" title={currentLanguage === 'es' ? '¿Cómo podrías tú u otras personas verse afectadas negativamente cuando los diseñadores de tecnología usan conjuntos de datos de entrenamiento sesgados?' : 'How could you or others be negatively effected when technology designers use biased training datasets?'} onSuccess={() => handleNavigation(NavigationDirection.forward)} prompt="" placeholder="" />
		{/if}

		{#if line.id == 14}
			<TextResponseModal id="biasMitigation" title={currentLanguage === 'es' ? '¿Cómo se puede reducir el sesgo en un conjunto de datos de entrenamiento?' : 'How can bias in a training dataset be reduced?'} onSuccess={() => handleNavigation(NavigationDirection.forward)} prompt="" placeholder="" />
		{/if}

		{#if line.id == 15}
			<IncomingMessageModal from="Mission Control" onNext={() => handleNavigation(NavigationDirection.forward)} />
		{/if}

		{#if line.id == 16}
			<ReadMessageModal from={line.speakers[0]} onNext={() => handleNavigation(NavigationDirection.forward)}>
					<div class="border-white border-2 p-2 w-10/12">
						{#if currentLanguage === 'es'}
							<p class="text-2xl">
								¡Excelente trabajo al terminar la Parte 3 de tu misión! Gracias a tu Bot Buddy y a tu Registro de Viaje, aprendimos algo importante:
							</p>
							<ul class="text-2xl">
								<li>Las personas que crean tecnología construyen conjuntos de datos de entrenamiento. Los conjuntos de datos sesgados pueden incluir demasiada o muy poca información sobre ciertos grupos, como niños o personas que han sido excluidas en el pasado.</li>
								<li>Cuando eso sucede, algunas personas podrían no poder usar ciertas tecnologías. Eso puede hacerles las cosas más difíciles.</li>
								<li>Podemos reducir el sesgo al asegurarnos de que los conjuntos de datos de entrenamiento incluyan más tipos de personas de diferentes grupos.</li>
							</ul>

							<p class="text-2xl">
								¡Has ganado la insignia Cazasesgos! Tu medidor de megajoules está lleno y listo para llevarte de regreso a casa.
							</p>
							<p class="text-2xl">
								Cuando regreses al Control de Misión de SPOT, te espera una última misión. ¡Buen viaje, estamos ansiosos por verte!
							</p>
						{:else}
							<p class="text-2xl">
								Great job finishing Part 3 of your mission! Thanks to your Bot Buddy and Travel Log, we learned something important:
							</p>
							<ul class="text-2xl">
								<li>Technology creators build training datasets. Biased training datasets can include too much or too little information about certain groups—like kids or people who’ve been left out in the past.</li>
								<li>When that happens, some people might not be able to use certain technologies. That can make things harder for them.</li>
								<li>We can reduce bias by making sure training datasets include more types of people from different groups.</li>
							</ul>

							<p class="text-2xl">
								You’ve earned the Bias Buster Badge! Your megajoules meter is full and ready to bring you home.
							</p>
							<p class="text-2xl">
								Once you're back at SPOT Mission Control, one last mission awaits. Safe travels—we can’t wait to see you!
							</p>
						{/if}
					</div>
			</ReadMessageModal>
		{/if}

		{#if line.id == 17}
			<BadgeGetModal badge={BadgesByName['Bias Buster']} handleClick={() => handleNavigation(NavigationDirection.forward)} />
		{/if}

		{#if line.id == 18}
			<MegaJoulesGetModal amount={80} handleClick={() => handleNavigation(NavigationDirection.forward)} />
		{/if}
		
    </div>
</Scene>

<style>
    
</style>