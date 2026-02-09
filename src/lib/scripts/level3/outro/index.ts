import type { Script } from '$lib/types/Script';
import { getScriptTranslationWithFallback } from '$lib/utils/getScriptTranslation';
import { getCharacterName, type Language } from '$lib/utils/translations';
import { settingsStore } from '$lib/utils/stores/store';

let currentLanguage: Language = 'en';
settingsStore.subscribe((value) => {
	currentLanguage = (value.language as Language) || 'en';
});

const script: Script = {
	lines: [
		{
            id: 1,
            speakers: [getCharacterName(currentLanguage, 'botBuddy')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 1),
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level2/factory1.png',
            audio: '/level3/bot_buddy/bot_buddy_L3_S26.mp3',
        },
        {
            id: 2,
            speakers: [getCharacterName(currentLanguage, 'securityBot'), ''],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 2),
            avatars: ['/img/characters/level-3/security-bot/security-bot-1.png', '/img/characters/bot-buddy/bot-buddy-ohno.png'],
            background: '/img/backgrounds/level2/factory1.png',
            audio: '/level3/security_bot/security_bot_L3_S27.mp3',
        },
        {
            id: 3,
            speakers: ['', getCharacterName(currentLanguage, 'botBuddy')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 3),
            avatars: ['/img/characters/level-3/security-bot/security-bot-1.png', '/img/characters/bot-buddy/bot-buddy-stop.png'],
            background: '/img/backgrounds/level2/factory1.png',
            audio: '/level3/bot_buddy/bot_buddy_L3_S28.mp3',
        },
        {
            id: 4,
            speakers: ['', getCharacterName(currentLanguage, 'botBuddy')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 4),
            avatars: ['/img/characters/level-3/security-bot/security-bot-1.png', '/img/characters/bot-buddy/bot-buddy-stop.png'],
            background: '/img/backgrounds/level2/factory1.png',
            audio: '/level3/bot_buddy/bot_buddy_L3_S29.mp3',
        },
        {
            id: 5,
            speakers: [getCharacterName(currentLanguage, 'kelvin'), ''],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 5),
            avatars: ['/img/characters/level-2/boy/boy_waiting-removebg-preview.png', '/img/characters/bot-buddy/bot-buddy-stop.png'],
            background: '/img/backgrounds/level3/2.png',
            audio: '/level3/kelvin/kelvin_L3_S30.mp3',
        },
        {
            id: 6,
            speakers: ['', getCharacterName(currentLanguage, 'botBuddy')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 6),
            avatars: ['/img/characters/level-2/boy/boy_waiting-removebg-preview.png', '/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level3/2.png',
            audio: '/level3/bot_buddy/bot_buddy_L3_S31.mp3',
        },
        {
            id: 7,
            speakers: ['', getCharacterName(currentLanguage, 'botBuddy')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 7),
            avatars: ['/img/characters/level-2/boy/boy_waiting-removebg-preview.png', '/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level3/2.png',
            audio: '/level3/bot_buddy/bot_buddy_L3_S32.mp3',
        },
        {
            id: 8,
            speakers: ['', getCharacterName(currentLanguage, 'botBuddy')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 8),
            avatars: ['/img/characters/level-2/boy/boy_waiting-removebg-preview.png', '/img/characters/bot-buddy/bot-buddy-stop.png'],
            background: '/img/backgrounds/level3/2.png',
            audio: '/level3/bot_buddy/bot_buddy_L3_S33.mp3',
        },
        {
            id: 9,
            speakers: [getCharacterName(currentLanguage, 'kelvin'), ''],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 9),
            avatars: ['/img/characters/level-2/boy/boy_waiting-removebg-preview.png', '/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level3/2.png',
            audio: '/level3/kelvin/kelvin_L3_S34.mp3',
        },
        {
            id: 10,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 10),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/level3/computer_voice/computer_voice_L3_S35.mp3',
            pos: 'left',
        },
        {
            id: 11,
            speakers: [getCharacterName(currentLanguage, 'captainStorm')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 11),
            avatars: ['/img/characters/captain-storm/storm_yeah.png'],
            background: '/img/backgrounds/level1/cafe.png',           
            audio: '/level3/computer_voice/computer_voice_L3_S36.mp3',
            pos: 'left',
        },
        {
            id: 12,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 12),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/level3/computer_voice/computer_voice_L3_S37.mp3',
            pos: 'left',
        },
        {
            id: 13,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 13),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/level3/computer_voice/computer_voice_L3_S38.mp3',
            pos: 'left',
        },
        {
            id: 14,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 14),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/level3/computer_voice/computer_voice_L3_S39.mp3',
            pos: 'left',
        },
        {
            id: 15,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 15),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/level3/computer_voice/computer_voice_L3_S40.wav',
            pos: 'left',
        },
        {
            id: 16,
            speakers: [getCharacterName(currentLanguage, 'agentSpark')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 16),
            avatars: ['/img/characters/level-1/agent-spark/agent-spark-1.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/level1/agent-spark/agent-spark-l1s16.wav',
            pos: 'right',
        },
        {
            id: 17,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 17),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/level3/computer_voice/computer_voice_L3_S41.mp3',
            pos: 'left',
        },
        {
            id: 18,
            speakers: [getCharacterName(currentLanguage, 'spotTablet')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'outro', 18),
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/computer_voice/computervoice_megajoules.mp3',
            pos: 'left',
        },
    ]
};

export default script;