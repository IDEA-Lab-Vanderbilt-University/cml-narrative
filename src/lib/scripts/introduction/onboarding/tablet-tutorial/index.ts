/**
 /src/lib/scripts/introduction/onboarding/tablet-tutorial/index.ts
 index.ts
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { Script, Line } from '$lib/types/Script';
import { getScriptTranslationWithFallback } from '$lib/utils/getScriptTranslation';
import { settingsStore } from '$lib/utils/stores/store';

let currentLanguage = 'en';

settingsStore.subscribe((value) => {
	currentLanguage = (value.language as string) || 'en';
});

const script: Script = {
	lines: [
		{
			id: 1,
			speakers: ['Agent Spark'],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'tabletTutorial', 1),
			avatars: ['/img/characters/agent-spark/spark_clapping.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/computer/computer_l0_s37.wav'
		},
		{
			id: 2,
			speakers: ['Agent Spark'],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'tabletTutorial', 2),
			avatars: ['/img/characters/agent-spark/spark_clapping.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/computer/computer_l0_s38.wav'
		},
		{
			id: 3,
			speakers: ['Agent Spark'],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'tabletTutorial', 3),
			avatars: ['/img/characters/agent-spark/spark_clapping.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/computer/computer_l0_s39.wav'
		},
		{
			id: 4,
			speakers: ['Agent Spark'],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'tabletTutorial', 4),
			avatars: ['/img/characters/agent-spark/spark_clapping.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/computer/computer_l0_s40.wav'
		},
		{
			id: 5,
			speakers: ['Agent Spark'],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'tabletTutorial', 5),
			avatars: ['/img/characters/agent-spark/spark_clapping.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/computer/computer_l0_s41.wav'
		},
		{
			id: 6,
			speakers: ['Agent Spark'],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'tabletTutorial', 6),
			avatars: ['/img/characters/agent-spark/spark_clapping.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/computer/computer_l0_s42.wav'
		},
		{
			id: 7,
			speakers: ['Agent Spark'],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'tabletTutorial', 7),
			avatars: ['/img/characters/agent-spark/spark_clapping.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/computer/computer_l0_s43.wav'
		},
		{
			id: 8,
			speakers: ['Agent Spark'],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'tabletTutorial', 8),
			avatars: ['/img/characters/agent-spark/spark_clapping.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/computer/computer_l0_s44.wav'
		},
		{
			id: 9,
			speakers: ['Agent Spark'],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'tabletTutorial', 9),
			avatars: ['/img/characters/agent-spark/spark_clapping.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/computer/computer_l0_s45.wav'
		}
	]
};
export default script;
