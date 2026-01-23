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
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 1),
            avatars: ['/img/characters/level-2/dash/dash-wave.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/Dash_l2s47.wav',
        },
        {
            id: 2,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 2),
            avatars: ['/img/characters/level-2/dash/dash-front.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/Dash_l2s48.wav',
        },
        {
            id: 3,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 3),
            avatars: ['/img/characters/level-2/dash/dash-wave.png'],
            background: '/img/backgrounds/level2/car-training/2.png',
            audio: '/audio/level2/dash/Dash_l2s49.wav',
        },
        {
            id: 4,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 4),
            avatars: ['/img/characters/level-2/dash/dash-dance.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/Dash_l2s50.wav',
        },
        {
            id: 5,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 5),
            avatars: ['/img/characters/level-2/dash/dash-wave.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/Dash_l2s51.wav',
        },
        {
            id: 6,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 6),
            avatars: ['/img/characters/level-2/dash/dash-front.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/Dash_l2s52.wav',
        },
        {
            id: 7,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 7),
            avatars: ['/img/characters/level-2/dash/dash-wave.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/Dash_l2s53.wav',
        },
        {
            id: 8,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 8),
            avatars: ['/img/characters/level-2/dash/dash-front.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/Dash_l2s54.wav',
        },
        {
            id: 9,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 9),
            avatars: [''],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/Dash_l2s55.wav',
            pos: 'center'
        },
        {
            id: 10,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 10),
            avatars: [''],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/Dash_l2s56.wav',
            pos: 'center'
        },
        {
            id: 11,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 11),
            avatars: ['/img/characters/level-2/dash/dash-wave.png'],
            background: '/img/backgrounds/level2/car-training/3.svg', 
            audio: '/audio/level2/dash/Dash_l2s57.wav',
        },
        {
            id: 12,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 12),
            avatars: ['/img/characters/level-2/dash/dash-dance.png'],
            background: '/img/backgrounds/level2/car-training/3.svg',
            audio: '/audio/level2/dash/Dash_l2s58.wav',
        },
        {
            id: 13,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 13),
            avatars: ['/img/characters/level-2/dash/dash-front.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/Dash_l2s59.wav',
        },
        {
            id: 14,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 14),
            avatars: ['/img/characters/level-2/dash/dash-front.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/Dash_l2s60.wav',
        },
        {
            id: 15,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 15),
            avatars: ['/img/characters/level-2/dash/dash-thumb-flipped.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/Dash_l2s61.wav',
        },
        {
            id: 16,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 16),
            avatars: ['/img/characters/level-2/dash/dash-front.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/Dash_l2s62.wav',
        },
        {
            id: 17,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 17),
            avatars: ['/img/characters/level-2/dash/dash-front.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/Dash - nonhuman test.mp3',
        },
        {
            id: 18,
            speakers: [getCharacterName(currentLanguage, 'dash')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level2', 'carTraining', 18),
            avatars: ['/img/characters/level-2/dash/dash-thumb-flipped.png'],
            background: '/img/backgrounds/level2/car-training/1.png',
            audio: '/audio/level2/dash/Dash_l2s64.wav',
        },
    ]
};

export default script;