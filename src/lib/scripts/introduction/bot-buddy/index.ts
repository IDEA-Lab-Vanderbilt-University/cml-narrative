/**
 /src/lib/scripts/introduction/onboarding/tablet-tutorial/bot-buddy/index.ts
 index.ts
 cml-narrative
 
 Created by Ian Thompson on January 14th 2023
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
	agent = value as Student;
});

settingsStore.subscribe((value) => {
	currentLanguage = (value.language as Language) || 'en';
});

const script: Script = {
	lines: [
		{
			id: 1,
			speakers: [
				getCharacterName(currentLanguage, 'captainStorm'),
				getCharacterName(currentLanguage, 'agentSpark')
			],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'botBuddy', 1),
			avatars: [
				'/img/characters/captain-storm/storm_thumbs_up_inverted.png',
				'/img/characters/agent-spark/spark_gesture_1_inverted.png'
			],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s48.wav',
			pos: 'normal'
		},
		{
			id: 2,
			speakers: [getCharacterName(currentLanguage, 'agentFern')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'botBuddy', 2, { agentName: agent.agent_name || 'Agent' }),
			avatars: ['/img/characters/agent-fern/fern_wave_inverted.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/agent_fern/agent_fern_l0s52.mp3',
			pos: 'left'
		},
		{
			id: 3,
			speakers: [getCharacterName(currentLanguage, 'agentFern')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'botBuddy', 3),
			avatars: ['/img/characters/agent-fern/fern_talking.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/agent_fern/agent_fern_l0s53.mp3',
			pos: 'right'
		},
		{
			id: 4,
			speakers: [getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'botBuddy', 4),
			avatars: ['/img/characters/captain-storm/storm_unsure.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s55.wav',
			pos: 'left'
		},
		{
			id: 5,
			speakers: [getCharacterName(currentLanguage, 'agentFern')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'botBuddy', 5),
			avatars: ['/img/characters/agent-fern/fern_oh_no.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/agent_fern/agent_fern_l0s56.mp3',
			pos: 'right'
		},
		{
			id: 6,
			speakers: [getCharacterName(currentLanguage, 'agentGear')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'botBuddy', 6),
			avatars: ['/img/characters/agent-gear/vanilla_strong_inverted.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/agent_gear/agent_gear_l0s57.wav',
			pos: 'right'
		},
		{
			id: 7,
			speakers: [getCharacterName(currentLanguage, 'botBuddy')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'botBuddy', 7),
			avatars: ['/img/characters/bot-buddy/bot-buddy-smug.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/bot_buddy/bot_buddy_l0s59.wav',
			pos: 'left'
		},
		{
			id: 8,
			speakers: [getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'botBuddy', 8),
			avatars: ['/img/characters/captain-storm/storm_better_laugh.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/crash-bang.mp3',
			pos: 'left'
		},
		{
			id: 9,
			speakers: [getCharacterName(currentLanguage, 'botBuddy')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'botBuddy', 9),
			avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/bot_buddy/bot_buddy_l0s63.wav',
			pos: 'left'
		},
		{
			id: 10,
			speakers: [getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'botBuddy', 10),
			avatars: ['/img/characters/captain-storm/storm_2_thumbs_up.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s65.wav',
			pos: 'left'
		},
		{
			id: 11,
			speakers: [getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'botBuddy', 11, { agentName: agent.agent_name || 'Agent' }),
			avatars: ['/img/characters/captain-storm/storm_gesture_4_inverted.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s66.wav',
			pos: 'left'
		},
		{
			id: 12,
			speakers: [getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'botBuddy', 12),
			avatars: ['/img/characters/captain-storm/clapping_storm.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s67.wav',
			pos: 'left'
		},
		{
			id: 13,
			speakers: [getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'botBuddy', 13),
			avatars: ['/img/characters/captain-storm/gesture_2_storm_inverted.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s68.wav',
			pos: 'left'
		},
		{
			id: 14,
			speakers: [getCharacterName(currentLanguage, 'spotAgents')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'botBuddy', 14),
			avatars: ['/img/characters/agent-groups/spot_agents.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/spot_agents/level0_s69_you_can_count_on_us_01.wav',
			pos: 'left'
		},
		{
			id: 15,
			speakers: [getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'introduction', 'botBuddy', 15),
			avatars: ['/img/characters/agent-groups/spot_agents_2.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s70.wav',
			pos: 'left'
		}
	]
};
export default script;
