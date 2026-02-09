import type { Script } from '$lib/types/Script';
import { settingsStore } from '$lib/utils/stores/store';
import { getCharacterName, type Language } from '$lib/utils/translations';
import { getScriptTranslationWithFallback } from '$lib/utils/getScriptTranslation';

let currentLanguage: Language = 'en';
settingsStore.subscribe((value) => {
	currentLanguage = (value.language as Language) || 'en';
});

const script: Script = {
	lines: [
        {
            id: 1,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'outro', 1),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/level1/computer_voice/Computer_voice_L1S33.wav',
            pos: 'left',
        },
        {
            id: 2,
            speakers: [getCharacterName(currentLanguage, 'captainStorm')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'outro', 2),
            avatars: ['/img/characters/captain-storm/storm_yeah.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/level2/computer_voice/Computervoice_l2s66.wav',
        },
        {
            id: 3,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'outro', 3),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/level2/computer_voice/L2-S71.mp3',
        },
        {
            id: 4,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'outro', 4),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/level2/computer_voice/L2-S72.mp3',
        },
        {
            id: 5,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'outro', 5),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/level2/computer_voice/L2-S73.mp3',
        },
        {
            id: 6,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'outro', 6),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/level1/computer_voice/Computer_voice_L1S33.wav',
        },
        {
            id: 7,
            speakers: [getCharacterName(currentLanguage, 'agentGear')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'outro', 7),
            avatars: ['/img/characters/agent-gear/agent-gear.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/level2/computer_voice/Computer_voice_L2S39.wav',
        },
        {
            id: 8,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'outro', 8),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/level2/computer_voice/Computervoice_l2s72.wav',
        },
        {
            id: 9,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'outro', 9),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/computer_voice/computervoice_megajoules.mp3',
        },
    ]
};

export default script;