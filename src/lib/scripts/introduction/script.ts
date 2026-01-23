/**
 /src/lib/scripts/introduction/script.ts
 script.ts
 cml-narrative
 
 Created by Ian Thompson on January 7th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { Script, Line } from '$lib/types/Script';
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
			speakers: [getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'main', 1),
			avatars: ['/img/characters/captain-storm/storm_yeah.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s1.wav',
			pos: 'right'
		},
		{
			id: 2,
			speakers: [getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'main', 2),
			avatars: ['/img/characters/captain-storm/gesture_2_storm.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s2.wav',
			pos: 'right'
		},
		{
			id: 3,
			speakers: [getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'main', 3),
			avatars: ['/img/characters/captain-storm/storm_thumbs_up.png'],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s12.wav',
			pos: 'right'
		},
		{
			id: 4,
			speakers: [getCharacterName(currentLanguage, 'agentFern'), getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'main', 4),
			avatars: [
				'/img/characters/agent-fern/fern_wave_inverted.png',
				'/img/characters/captain-storm/storm_gesture_4.png'
			],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s13.wav',
			pos: 'normal'
		},
		{
			id: 5,
			speakers: [getCharacterName(currentLanguage, 'agentGear'), getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'main', 5),
			avatars: [
				'/img/characters/agent-gear/vanil_wave.png',
				'/img/characters/captain-storm/storm_gesture_4.png'
			],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s14.wav',
			pos: 'normal'
		},
		{
			id: 6,
			speakers: [getCharacterName(currentLanguage, 'agentSpark'), getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'main', 6),
			avatars: [
				'/img/characters/agent-spark/spark_wave.png',
				'/img/characters/captain-storm/storm_gesture_4.png'
			],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s15.wav',
			pos: 'normal'
		},
		{
			id: 7,
			speakers: [getCharacterName(currentLanguage, 'agentSpark')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'main', 7),
			avatars: ['/img/characters/agent-spark/spark_wave.png'],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s14.wav',
			pos: 'right'
		},
		{
			id: 8,
			speakers: [getCharacterName(currentLanguage, 'agentSpark')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'main', 8),
			avatars: ['/img/characters/agent-spark/spark_surprised.png'],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s16.wav',
			pos: 'right'
		},
		{
			id: 9,
			speakers: [getCharacterName(currentLanguage, 'agentSpark')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'main', 9),
			avatars: ['/img/characters/agent-spark/spark_gesture_1.png'],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s18.wav',
			pos: 'left'
		},
		{
			id: 10,
			speakers: [getCharacterName(currentLanguage, 'agentFern'), getCharacterName(currentLanguage, 'agentSpark')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'main', 10),
			avatars: [
				'/img/characters/agent-fern/fern_sweet.png',
				'/img/characters/agent-spark/spark_gesture_1_inverted.png'
			],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s19.wav',
			pos: 'normal'
		},
		{
			id: 11,
			speakers: [getCharacterName(currentLanguage, 'agentGear'), getCharacterName(currentLanguage, 'agentSpark')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'main', 11),
			avatars: [
				'/img/characters/agent-gear/vanil_cute_inverted.png',
				'/img/characters/agent-spark/spark_gesture_1_inverted.png'
			],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s20.wav',
			pos: 'normal'
		},
		{
			id: 12,
			speakers: [getCharacterName(currentLanguage, 'agentSpark')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'main', 12),
			avatars: ['/img/characters/agent-spark/spark_aww.png'],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s21.wav',
			pos: 'left'
		},
		{
			id: 13,
			speakers: [getCharacterName(currentLanguage, 'agentSpark')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'main', 13),
			avatars: ['/img/characters/agent-spark/spark_talking.png'],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s22.mp3',
			pos: 'left'
		}
	]
};
export default script;
