import type { Script } from '$lib/types/Script';
import type { Student } from '$lib/types/UserData';
import { studentDataStore } from '$lib/utils/stores/store';
import { getScriptTranslationWithFallback } from '$lib/utils/getScriptTranslation';
import { settingsStore } from '$lib/utils/stores/store';

let agent: Student = {};
let currentLanguage = 'en';

studentDataStore.subscribe((value) => {
	agent = value as Student;
});

settingsStore.subscribe((value) => {
	currentLanguage = (value.language as string) || 'en';
});

const script: Script = {
	lines: [
		{
			id: 1,
			speakers: ['Bot Buddy'],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'main', 1),
			avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
			background: '/img/backgrounds/level1/1.png',
			audio: '/audio/level1/bot_buddy/bot_buddy_l1s1.wav',
			pos: 'left'
		},
        {
            id: 2,
            speakers: ['Bot Buddy'],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'main', 2),
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level1/1.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s2.wav',
            pos: 'left'
        },
        {
            id: 3,
            speakers: ['Bot Buddy'],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'main', 3),
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/2.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s3.wav',
            pos: 'left'
        },
        {
            id: 4,
            speakers: ['Pizza Host Bot', 'Bot Buddy'],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'main', 4),
            avatars: ['/img/characters/level-1/host-bot.png', '/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/Pizza_Host_Bot_L1S4.mp3',
            pos: 'left'
        },
        {
            id: 5,
            speakers: ['Bot Buddy'],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'main', 5),
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s5.wav',
            pos: 'right'
        },
        {
            id: 6,
            speakers: ['Bot Buddy'],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'main', 6),
            avatars: ['/img/characters/bot-buddy/bot-buddy-pizza.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s6.wav',
            pos: 'center',
            size: 'full',
        },
        {
            id: 7,
            speakers: ['Bot Buddy'],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'main', 7),
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s7.wav',
            pos: 'left'
        },
        {
            id: 8,
            speakers: ['Bot Buddy'],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'main', 8),
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s11.wav',
            pos: 'left'
        },
        {
            id: 9,
            speakers: ['Bot Buddy'],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'main', 9),
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/16596.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s12.wav',
            pos: 'right'
        },
        {
            id: 10,
            speakers: ['Chef Bot'],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'main', 10),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/16596.png',
            audio: '/audio/level1/chef_bot/Chef_Bot_L1S13.wav',
            pos: 'left'
        },
        {
            id: 11,
            speakers: ['Bot Buddy'],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'main', 11, { agentName: agent.agent_name || 'Agent' }),
            avatars: ['/img/characters/bot-buddy/bot-buddy-ohno.png'],
            background: '/img/backgrounds/level1/16596.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s14.wav',
            pos: 'center',
            size: 'full',
        },
        {
            id: 12,
            speakers: ['Bot Buddy'],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'main', 12),
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/16596.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s15.wav',
            pos: 'center',
            size: 'full',
        },

	],
};

export default script;