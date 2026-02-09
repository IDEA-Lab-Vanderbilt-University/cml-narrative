
import type { Script } from '$lib/types/Script';
import { studentDataStore, settingsStore } from '$lib/utils/stores/store';
import { getCharacterName, type Language } from '$lib/utils/translations';
import { getScriptTranslationWithFallback } from '$lib/utils/getScriptTranslation';
import { get } from 'svelte/store';

let agent = get(studentDataStore);
let currentLanguage: Language = 'en';
settingsStore.subscribe((value) => {
    currentLanguage = (value.language as Language) || 'en';
});

const script: Script = {
    lines: [
        {
            id: 1,
            speakers: [getCharacterName(currentLanguage, 'captainStorm')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level5', 'main', 1),
            avatars: ['/img/characters/captain-storm/storm_lol.png'],
            background: '/img/backgrounds/captain_office.jpg',
            pos: 'left',
            audio: '/level5/captain_storm/captain_storm_l5s1.mp3'
        },
        {
            id: 2,
            speakers: [getCharacterName(currentLanguage, 'captainStorm')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level5', 'main', 2),
            avatars: ['/img/characters/captain-storm/storm_thumbs_up_inverted.png'],
            background: '/img/backgrounds/captain_office.jpg',
            pos: 'left',
            audio: '/level5/captain_storm/captain_storm_l5s2.mp3'
        },
        {
            id: 3,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level5', 'main', 3),
            avatars: [],
            background: '',
        },
        {
            id: 4,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level5', 'main', 4),
            avatars: [],
            background: '',
            audio: '/level5/L5-S4.mp3'
        },
        {
            id: 5,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level5', 'main', 5),
            avatars: [],
            background: '',
        },
        {
            id: 6,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level5', 'main', 6),
            avatars: [],
            background: '',
        },
        {
            id: 7,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level5', 'main', 7),
            avatars: [],
            background: '',
        },
        {
            id: 8,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level5', 'main', 8),
            avatars: [],
            background: '',
        },
        {
            id: 9,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level5', 'main', 9),
            avatars: [],
            background: '',
        },
        {
            id: 10,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level5', 'main', 10),
            avatars: [],
            background: '',
        },
        {
            id: 11,
            speakers: [getCharacterName(currentLanguage, 'captainStorm')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level5', 'main', 11, { agent }),
            avatars: ['/img/characters/captain-storm/clapping_storm_inverted.png', '/img/characters/agent-gear/vanil_wave.png', '/img/characters/agent-fern/fern_wave.png', '/img/characters/agent-spark/spark_wave.png'],
            background: '/img/backgrounds/Spark_Lab.jpg',
            pos: 'left',
            audio: '/level5/captain_storm/captain_storm_l5s15.mp3'
        }
    ]
};

export default script;