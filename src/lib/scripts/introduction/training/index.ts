/**
 /src/lib/scripts/training/index.ts
 index.ts
 cml-narrative
 
 Created by Ian Thompson on January 16th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { Script } from '$lib/types/Script';
import type { Student } from '$lib/types/UserData';
import { studentDataStore, settingsStore } from '$lib/utils/stores/store';
import { getScriptTranslationWithFallback } from '$lib/utils/getScriptTranslation';
import { getCharacterName, type Language } from '$lib/utils/translations';

let agent: Student = {};
let currentLanguage: Language = 'en';

studentDataStore.subscribe((value) => {
	agent = value as Student;
});

settingsStore.subscribe((value) => {
	currentLanguage = (value.language as Language) || 'en';
});

const script: Script = {
	lines: [
		{
			id: 1,
			speakers: [getCharacterName(currentLanguage, 'agentSpark')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'training', 1),
			avatars: ['/img/characters/agent-spark/spark_gesture_1.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s71.wav',
			pos: 'left'
		},
		{
			id: 6,
			speakers: [getCharacterName(currentLanguage, 'agentSpark')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'training', 6),
			avatars: ['/img/characters/agent-spark/spark_gesture_inverted.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s80.wav',
			pos: 'left'
		},
		{
			id: 8,
			speakers: [getCharacterName(currentLanguage, 'agentSpark')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'training', 8),
			avatars: ['/img/characters/agent-spark/spark_sad.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s82.wav',
			pos: 'left'
		},
		{
			id: 9,
			speakers: [getCharacterName(currentLanguage, 'agentGear')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'training', 9),
			avatars: ['/img/characters/agent-gear/vanilla_idea.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_gear/agent_gear_l0s90.wav',
			pos: 'right'
		},
		{
			id: 10,
			speakers: [getCharacterName(currentLanguage, 'agentSpark')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'training', 10),
			avatars: ['/img/characters/agent-spark/spark_gesture_1.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s84.wav',
			pos: 'left'
		},
		{
			id: 11,
			speakers: [getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'training', 11),
			avatars: ['/img/characters/captain-storm/gesture_2_storm.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s85.wav',
			pos: 'right'
		},
		{
			id: 12,
			speakers: [getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'training', 12, { agentName: agent.agent_name || 'Agent' }),
			avatars: ['/img/characters/captain-storm/storm_thumbs_up.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s88.wav',
			pos: 'right'
		},
		{
			id: 14,
			speakers: [getCharacterName(currentLanguage, 'agentSpark')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'training', 14),
			avatars: ['/img/characters/agent-spark/spark_aww.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s90.wav',
			pos: 'left'
		},
		{
			id: 15,
			speakers: [getCharacterName(currentLanguage, 'agentGear')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'training', 15),
			avatars: ['/img/characters/agent-gear/vanilla_talking.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_gear/agent_gear_l0s103.wav',
			pos: 'left'
		},
		{
			id: 16,
			speakers: [getCharacterName(currentLanguage, 'agentSpark'), getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'training', 16, { agentName: agent.agent_name || 'Agent' }),
			avatars: [
				'/img/characters/agent-spark/spark_gesture_2_inverted.png',
				'/img/characters/captain-storm/storm_dance.png'
			],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s93.wav',
			pos: 'normal'
		},
		{
			id: 18,
			speakers: [getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'training', 18),
			avatars: ['/img/characters/captain-storm/clapping_storm_inverted.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s94.wav',
			pos: 'right'
		},
		{
			id: 18,
			speakers: [getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'training', 18),
			avatars: ['/img/characters/captain-storm/clapping_storm_inverted.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '',
			pos: 'right'
		},
	],
};
export default script;
