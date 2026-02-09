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
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaAlgorithm', 1),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/level1/chef_bot/Chef_bot_L1S25.wav',
        },
        {
            id: 2,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaAlgorithm', 2),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/level1/chef_bot/Chef_bot_L1S26.wav',
        },
        {
            id: 3,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaAlgorithm', 3),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/level1/chef_bot/Chef_bot_L1S27.wav',
        },
        {
            id: 4,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaAlgorithm', 4),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/level1/chef_bot/Chef Bot - If Then Statements.mp3',
        },
        {
            id: 5,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaAlgorithm', 5),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/level1/chef_bot/Chef Bot - failed.mp3',
        },
        {
            id: 6,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaAlgorithm', 6),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/level1/chef_bot/Chef_bot_L1S29.wav',
        }
    ],
};