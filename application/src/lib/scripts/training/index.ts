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

let agent: UserData = {};

agentData.subscribe((value) => {
	agent = value as UserData;
});

const script: Script = {
	lines: [
		{
			id: 1,
			speaker: 'Agent Spark',
			dialog: "It's time for your SPOT Agent Training!",
			avatar: Assets.Characters.AgentSpark.gesture,
			background: '/img/backgrounds/captain_office.jpg',
            audio: "/audio/level0/agent_spark/agent_spark_l0s71.wav"
		},
		{
			id: 2,
			speaker: 'Agent Spark',
			dialog: 'We will start by talking about technology!',
			avatar: Assets.Characters.AgentSpark.gesture,
			background: '/img/backgrounds/captain_office.jpg',
            audio: "/audio/level0/agent_spark/agent_spark_l0s72.wav"
		},
		{
			id: 3,
			speaker: 'Captain Storm',
			dialog: '',
			avatar: Assets.Characters.AgentSpark.gesture,
			background: '/img/backgrounds/captain_office.jpg'
		},
		{
			id: 4,
			speaker: 'Agent Spark',
			dialog: 'It can be tricky... On your SPOT Tablet, tell us which technologies you think are helpful or harmful.',
			avatar: Assets.Characters.AgentSpark.gesture,
			background: '/img/backgrounds/captain_office.jpg',
            audio: "/audio/level0/agent_spark/agent_spark_l0s74.wav"
		},
		{
			id: 6,
			speaker: 'Agent Spark',
			dialog: 'Ever heard of Algorithms?',
			avatar: Assets.Characters.AgentSpark.gesture,
			background: '/img/backgrounds/captain_office.jpg',
            audio: "/audio/level0/agent_spark/agent_spark_l0s80.wav"
		},
		{
			id: 7,
			speaker: 'Agent Spark',
			dialog: '...',
			avatar: Assets.Characters.AgentSpark.gesture,
			background: '/img/backgrounds/captain_office.jpg'
		},
		{
			id: 8,
			speaker: 'Agent Spark',
			dialog: 'Gear, did you overload the generator again?',
			avatar: Assets.Characters.AgentSpark.gesture,
			background: '/img/backgrounds/captain_office.jpg',
            audio: "/audio/level0/agent_spark/agent_spark_l0s82.wav"
		},
		{
			id: 9,
			speaker: 'Agent Gear',
			dialog: 'Yeah, sorry! Fixing it now!',
			avatar: Assets.Characters.AgentGear.embarassed,
			background: '/img/backgrounds/captain_office.jpg'
		},
		{
			id: 10,
			speaker: 'Agent Spark',
			dialog: 'Anyway, back to algorithms. What do you think it is?',
			avatar: Assets.Characters.AgentSpark.gesture,
			background: '/img/backgrounds/captain_office.jpg',
            audio: "/audio/level0/agent_spark/agent_spark_l0s84.wav"
		},
		{
			id: 11,
			speaker: 'Captain Storm',
			dialog:
				'There is no right or wrong answer. We need to know what you know to get you ready for your trip.',
			avatar: Assets.Characters.CaptainStorm.gesture_2,
			background: '/img/backgrounds/captain_office.jpg'
		},
		{
			id: 12,
			speaker: 'Captain Storm',
			dialog: `Interesting thoughts, Agent ${agent.agentName}!`,
			avatar: Assets.Characters.CaptainStorm.thumbs_up,
			background: '/img/backgrounds/captain_office.jpg',
            audio: "/audio/level0/captain_storm/captn_storm_l0s88.wav"
		},
		{
			id: 13,
			speaker: 'Agent Spark',
			dialog: 'The phrase "machine learning" has become popular today. What o you think it means?',
			avatar: Assets.Characters.AgentSpark.gesture,
			background: '/img/backgrounds/captain_office.jpg',
            audio: "/audio/level0/agent_spark/agent_spark_l0s89.wav"
		},
		{
			id: 14,
			speaker: 'Agent Spark',
			dialog:
				'Remember, there is no right or wrong answer, but we need to know what you know to get you ready for your trip!',
			avatar: Assets.Characters.AgentSpark.gesture,
			background: '/img/backgrounds/captain_office.jpg',
            audio: "/audio/level0/agent_spark/agent_spark_l0s90.wav"
		},
		{
			id: 15,
			speaker: 'Agent Spark',
			dialog: `WAHOOO! Yay, ${agent.agentName}!`,
			avatar: Assets.Characters.AgentSpark.gesture,
			background: '/img/backgrounds/captain_office.jpg',
            audio: "/audio/level0/agent_spark/agent_spark_l0s93.wav"
		},
		{
			id: 16,
			speaker: 'Captain Storm',
			dialog:
				'Congratulations, you have earned your Agent-in-Training badge! You are now an official SPOT Agent! Check your SPOT tablet to see your new badge!',
			avatar: '/img/characters/captain-storm/clapping_storm.png',
			background: '/img/backgrounds/captain_office.jpg',
            audio: "/audio/level0/captain_storm/captn_storm_l0s94.wav"
		},
		{
			id: 18,
			speaker: 'Agent Gear',
			dialog: `In addition to earning your Training Badge, your Bot Buddy has been loaded with information that might be needed for the mission. You are now ready to travel to the year 2075!`,
			avatar: '/img/characters/agent-gear/vanil_thumbs_up.png',
			background: '/img/backgrounds/captain_office.jpg'
		},
		{
			id: 19,
			speaker: 'Agent Gear',
			dialog:
				'One more thing before you go. We need to know more about what you think by answering a few questions. Open your tablet at the top of your screen and complete the survey to tell us more about you.',
			avatar: '/img/characters/agent-gear/vanilla_talking.png',
			background: '/img/backgrounds/captain_office.jpg'
		}
	],
	length: 19
};
export default script;
