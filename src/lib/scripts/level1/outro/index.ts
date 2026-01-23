import type { Script } from '$lib/types/Script';
import { settingsStore } from '$lib/utils/stores/store';
import { getCharacterName, type Language } from '$lib/utils/translations';
import { getScriptTranslationWithFallback } from '$lib/utils/getScriptTranslation';

let currentLanguage: Language = 'en';
settingsStore.subscribe((value) => {
	currentLanguage = (value.language as Language) || 'en';
});

export const script: Script = {
    lines: [
        {
            id: 1,
            speakers: [getCharacterName(currentLanguage, 'botBuddy')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'outro', 1),
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s30.wav',
            pos: 'right',
        },
        {
            id: 2,
            speakers: [getCharacterName(currentLanguage, 'botBuddy')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'outro', 2),
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s31.wav',
            pos: 'right',
        },
        {
            id: 3,
            speakers: [getCharacterName(currentLanguage, 'botBuddy')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'outro', 3),
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s32.wav',
            pos: 'right',
        },
        {
            id: 4,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'outro', 4),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/computer_voice/Computer_voice_L1S33.wav',
            pos: 'left',
        },
        {
            id: 5,
            speakers: [getCharacterName(currentLanguage, 'captainStorm')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'outro', 5),
            avatars: ['/img/characters/captain-storm/storm_yeah.png'],
            background: '/img/backgrounds/level1/cafe.png',           
            audio: '/audio/level1/computer_voice/Computer_voice_L1S34.wav',
            pos: 'left',
        },
        {
            id: 6,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'outro', 6),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/computer_voice/Computer_voice_L1S35.wav',
            pos: 'left',
        },
        {
            id: 7,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'outro', 7),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/computer_voice/Computer_voice_L1S36.wav',
            pos: 'left',
        },
        {
            id: 8,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'outro', 8),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/computer_voice/Computer_voice_L1S37.wav',
            pos: 'left',
        },
        {
            id: 9,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'outro', 9),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/computer_voice/Computer_voice_L1S38.wav',
            pos: 'left',
        },
        {
            id: 10,
            speakers: [getCharacterName(currentLanguage, 'captainStorm')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'outro', 10),
            avatars: ['/img/characters/captain-storm/storm_yeah.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/computer_voice/Computer_voice_L1S39.wav',
            pos: 'left',
        },
        {
            id: 11,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'outro', 11),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/computer_voice/Computer_voice_L1S40.wav',
            pos: 'left',
        },
        
        {
            id: 12,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'outro', 12),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/computer_voice/computervoice_megajoules.mp3',
            pos: 'left',
        },
        {
            id: 13,
            speakers: [getCharacterName(currentLanguage, 'botBuddy')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'outro', 13),
            avatars: [ '/img/characters/bot-buddy/bot-buddy-happy.png', '/img/characters/level-1/host-bot.png',],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s43.wav',
            pos: 'left'
        },
        {
            id: 14,
            speakers: [getCharacterName(currentLanguage, 'botBuddy')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'outro', 14),
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/2.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s44.wav',
            pos: 'left'
        },
    ]
};

