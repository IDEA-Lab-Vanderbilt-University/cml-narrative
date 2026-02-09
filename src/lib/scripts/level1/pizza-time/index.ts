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
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaTime', 1),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/level1/chef_bot/Chef Bot - welcome.mp3',
            pos: 'left'
        },
        {
            id: 2,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaTime', 2),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/level1/chef_bot/Chef_bot_L1S17.wav',
            pos: 'left'
        },
        {
            id: 3,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaTime', 3),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/level1/computer_voice/Computer_voice_L1S18.wav',
            pos: 'left'
        },
        {
            id: 4,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaTime', 4),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/level1/computer_voice/Computer_voice_L1S19.wav',
            pos: 'left'
        },
        {
            id: 5,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaTime', 5),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/level1/computer_voice/Computer_voice_L1S20.wav',
            pos: 'left'
        },
        {
            id: 6,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaTime', 6),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/level1/computer_voice/Computer_voice_L1S21.wav',
            pos: 'left'
        },
        {
            id: 7,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaTime', 7),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/level1/computer_voice/Computer_voice_L1S22.wav',
            pos: 'left'
        },
        {
            id: 8,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaTime', 8),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/level1/computer_voice/Computer_voice_L1S23.wav',
            pos: 'left'
        },
        {
            id: 9,
            speakers: [getCharacterName(currentLanguage, 'chefBot')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level1', 'pizzaTime', 9),
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/pizza-time/1.png',
            audio: '/level1/chef_bot/Chef_bot_L1S24.wav',
            pos: 'left'
        },
    ],
};

export default script;