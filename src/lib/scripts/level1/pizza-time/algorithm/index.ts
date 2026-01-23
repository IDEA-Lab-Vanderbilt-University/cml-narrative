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
            audio: '/audio/level1/chef_bot/chef_bot_l1s1.wav',
        },
        {
            id: 2,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaAlgorithm', 2),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/audio/level1/chef_bot/chef_bot_l1s2.wav',
        },
        {
            id: 3,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaAlgorithm', 3),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/audio/level1/chef_bot/chef_bot_l1s3.wav',
        },
        {
            id: 4,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaAlgorithm', 4),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/audio/level1/chef_bot/chef_bot_l1s4.wav',
        },
        {
            id: 5,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaAlgorithm', 6),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/audio/level1/chef_bot/chef_bot_l1s5.wav',
        }
    ],
};