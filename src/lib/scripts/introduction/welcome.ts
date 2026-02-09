/**
 /src/lib/scripts/introduction/welcome.ts
 welcome.ts
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { Script, Line } from '$lib/types/Script';
import type { Student } from '$lib/types/UserData';
import { studentDataStore, settingsStore } from '$lib/utils/stores/store';
import { getScriptTranslationWithFallback } from '$lib/utils/getScriptTranslation';
import { getCharacterName, type Language } from '$lib/utils/translations';

let agent: Student = {};
let currentLanguage: Language = 'en';

studentDataStore.subscribe((value) => {
	agent = value;
});

settingsStore.subscribe((value) => {
	currentLanguage = (value.language as Language) || 'en';
});

const script: Script = {
	lines: [
		{
			id: 1,
			speakers: [getCharacterName(currentLanguage, 'agentSpark')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'welcome', 1),
			avatars: ['/img/characters/agent-spark/spark_gesture_1.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/level0/agent_spark/agent_spark_l0s34.wav',
			pos: 'left'
		}
	]
};
export default script;
