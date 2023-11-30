/**
 /src/lib/scripts/training/index.ts
 index.ts
 cml-narrative
 
 Created by Ian Thompson on January 16th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { Script, Line } from '$lib/types/Script';

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
			speakers: ['Agent Spark'],
			dialog: "It's time for your SPOT Agent Training!",
			avatars: [Assets.Characters.AgentSpark.gesture],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s71.wav'
		},
		{
			id: 2,
			speakers: ['Agent Spark'],
			dialog: 'We will start by talking about technology!',
			avatars: [Assets.Characters.AgentSpark.gesture],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s72.wav'
		},
		{
			id: 3,
			speakers: ['Captain Storm'],
			dialog: '',
			avatars: [Assets.Characters.AgentSpark.gesture],
			background: '/img/backgrounds/captain_office.jpg'
		},
		{
			id: 4,
			speakers: ['Agent Spark'],
			dialog:
				'It can be tricky... On your SPOT Tablet, tell us which technologies you think are helpful or harmful.',
			avatars: [Assets.Characters.AgentSpark.gesture],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s74.wav'
		},
		{
			id: 6,
			speakers: ['Agent Spark'],
			dialog: 'Ever heard of Algorithms?',
			avatars: [Assets.Characters.AgentSpark.gesture],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s80.wav'
		},
		{
			id: 7,
			speakers: ['Agent Spark'],
			dialog: '...',
			avatars: [Assets.Characters.AgentSpark.gesture],
			background: '/img/backgrounds/captain_office.jpg'
		},
		{
			id: 8,
			speakers: ['Agent Spark'],
			dialog: 'Gear, did you overload the generator again?',
			avatars: [Assets.Characters.AgentSpark.gesture],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s82.wav'
		},
		{
			id: 9,
			speakers: ['Agent Gear'],
			dialog: 'Yeah, sorry! Fixing it now!',
			avatars: [Assets.Characters.AgentGear.embarassed],
			background: '/img/backgrounds/captain_office.jpg'
		},
		{
			id: 10,
			speakers: ['Agent Spark'],
			dialog: 'Anyway, back to algorithms. What do you think it is?',
			avatars: [Assets.Characters.AgentSpark.gesture],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s84.wav'
		},
		{
			id: 11,
			speakers: ['Captain Storm'],
			dialog:
				'There is no right or wrong answer. We need to know what you know to get you ready for your trip.',
			avatars: [Assets.Characters.CaptainStorm.gesture_2],
			background: '/img/backgrounds/captain_office.jpg'
		},
		{
			id: 12,
			speakers: ['Captain Storm'],
			dialog: `Interesting thoughts, Agent ${agent.agentName}!`,
			avatars: [Assets.Characters.CaptainStorm.thumbs_up],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s88.wav'
		},
		{
			id: 13,
			speakers: ['Agent Spark'],
			dialog: 'The phrase "machine learning" has become popular today. What o you think it means?',
			avatars: [Assets.Characters.AgentSpark.gesture],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s89.wav'
		},
		{
			id: 14,
			speakers: ['Agent Spark'],
			dialog:
				'Remember, there is no right or wrong answer, but we need to know what you know to get you ready for your trip!',
			avatars: [Assets.Characters.AgentSpark.gesture],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s90.wav'
		},
		{
			id: 15,
			speakers: ['Agent Spark'],
			dialog: `WAHOOO! Yay, ${agent.agentName}!`,
			avatars: [Assets.Characters.AgentSpark.gesture],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s93.wav'
		},
		{
			id: 16,
			speakers: ['Captain Storm'],
			dialog:
				'Congratulations, you have earned your Agent-in-Training badge! You are now an official SPOT Agent! Check your SPOT tablet to see your new badge!',
			avatars: ['/img/characters/captain-storm/clapping_storm.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s94.wav'
		},
		{
			id: 18,
			speakers: ['Agent Gear'],
			dialog: `In addition to earning your Training Badge, your Bot Buddy has been loaded with information that might be needed for the mission. You are now ready to travel to the year 2075!`,
			avatars: ['/img/characters/agent-gear/vanil_thumbs_up.png'],
			background: '/img/backgrounds/captain_office.jpg'
		},
		{
			id: 19,
			speakers: ['Agent Gear'],
			dialog:
				'One more thing before you go. We need to know more about what you think by answering a few questions. Open your tablet at the top of your screen and complete the survey to tell us more about you.',
			avatars: ['/img/characters/agent-gear/vanilla_talking.png'],
			background: '/img/backgrounds/captain_office.jpg'
		}
	],
	length: 19
};
export default script;
