/**
 /src/lib/scripts/outro/index.ts
 index.ts
 cml-narrative
 
 Created by Ian Thompson on July 19th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { Script } from '$lib/types/Script';
import type { Student } from '$lib/types/UserData';
import { studentDataStore } from '$lib/utils/stores/store';
import { settingsStore } from '$lib/utils/stores/store';
import { getCharacterName, type Language } from '$lib/utils/translations';
import { getScriptTranslationWithFallback } from '$lib/utils/getScriptTranslation';

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
		// {
		// 	id: 1,
		// 	speakers: ['Agent Gear'],
		// 	dialog:
		// 		'Awesome! We have sent this information to Mission Control! Thank you, Agent! Good luck in 2075!',
		// 	avatars: ['/img/characters/agent-gear/vanil_thumbs_up_inverted.png'],
		// 	background: '/img/backgrounds/Spark_Lab.jpg',
		// 	audio: '/audio/level0/agent_gear/agent_gear_l0s113.wav',
		// 	pos: 'left'
		// },
		{
			id: 1,
			speakers: [getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'outro', 'main', 1, { agentName: agent.agent_name || 'Agent' }),
			avatars: ['/img/characters/captain-storm/storm_yeah.png'],
			background: '/img/backgrounds/Spark_Lab_time_machine.png',
			audio: '/level0/captain_storm/captn_storm_l0s107.wav',
			pos: 'left'
		},
		{
			id: 2,
			speakers: [getCharacterName(currentLanguage, 'captainStorm')],
			dialog: () => getScriptTranslationWithFallback(currentLanguage as any, 'outro', 'main', 2),
			avatars: ['/img/characters/captain-storm/storm_point.png'],
			background: '/img/backgrounds/Spark_Lab_time_machine.png',
			audio: '/level0/captain_storm/captn_storm_l0s108.wav',
			pos: 'left'
		}
	]
};

export default script;
