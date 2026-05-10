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
            speakers: [getCharacterName(currentLanguage, 'botBuddy')],
            dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'level3', 'traininator', 1),
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level2/factory1.png',
        }
    ],
};

export default script;