/**
 /src/lib/scripts/outro/index.ts
 index.ts
 cml-narrative
 
 Created by Ian Thompson on July 19th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { Script } from '$lib/types/Script';
import type { UserData } from '$lib/types/UserData';
import { Assets } from '$lib/utils/Assets';
import { agentData } from '$lib/utils/stores/store';

let agent: UserData = {
	name: {
		first: '',
		last: ''
	},
	age: undefined,
	interests: [],
	agentName: ''
};

agentData.subscribe((value) => {
	agent = value as UserData;
});

const script: Script = {
	lines: [
		{
			id: 1,
			speakers: ['Agent Gear'],
			dialog:
				'Awesome! We have sent this information to Mission Control! Thank you, Agent! Good luck in 2075!',
			avatars: [Assets.Characters.AgentGear.thumbs_up],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/agent_gear/agent_gear_l0s113.wav'
		},
		{
			id: 2,
			speakers: ['Captain Storm'],
			dialog: `Agent ${agent.agentName}! It's time to send you and Bot Buddy to the future! I'll be here at Mission Control, but we will stay in contact through the Travel Log in your SPOT Tablet.`,
			avatars: [Assets.Characters.CaptainStorm.arms_up],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s107.wav'
		},
		{
			id: 3,
			speakers: ['Captain Storm'],
			dialog:
				'I am powering up the time machine! As you enter the time machine, take a deep breath and good luck Agent!',
			avatars: [Assets.Characters.CaptainStorm.thumbs_up],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s108.wav'
		}
	],
	length: 3
};

export default script;
