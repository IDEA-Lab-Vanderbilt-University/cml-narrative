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

let agent: Student = {};

studentDataStore.subscribe((value) => {
	agent = value as Student;
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
			speakers: ['Captain Storm'],
			dialog: `Agent ${agent.agent_name}! It's time to send you and Bot Buddy to the future! I'll be here at Mission Control, but we will stay in contact through the Travel Log in your SPOT Tablet.`,
			avatars: ['/img/characters/captain-storm/storm_yeah.png'],
			background: '/img/backgrounds/Spark_Lab_time_machine.png',
			audio: '/audio/level0/captain_storm/captn_storm_l0s107.wav',
			pos: 'left'
		},
		{
			id: 2,
			speakers: ['Captain Storm'],
			dialog:
				'I am powering up the time machine! As you enter the time machine, take a deep breath and good luck Agent!',
			avatars: ['/img/characters/captain-storm/storm_point.png'],
			background: '/img/backgrounds/Spark_Lab_time_machine.png',
			audio: '/audio/level0/captain_storm/captn_storm_l0s108.wav',
			pos: 'left'
		}
	]
};

export default script;
