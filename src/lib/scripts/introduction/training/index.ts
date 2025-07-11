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
import { studentDataStore } from '$lib/utils/stores/store';

let agent: Student = {};

studentDataStore.subscribe((value) => {
	agent = value as Student;
});

const script: Script = {
	lines: [
		{
			id: 1,
			speakers: ['Agent Spark'],
			dialog: "It's time for your SPOT Agent Training!",
			avatars: ['/img/characters/agent-spark/spark_gesture_1.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s71.wav',
			pos: 'left'
		},
		{
			id: 6,
			speakers: ['Agent Spark'],
			dialog: 'Ever heard of Algorithms?',
			avatars: ['/img/characters/agent-spark/spark_gesture_inverted.png'],
			background: '/img/backgrounds/captain_office.jpg',
			// audio: '/audio/level0/agent_spark/agent_spark_l0s80.wav'
			audio: '/audio/level0/agent_spark/agent_spark_l0s80.wav',
			pos: 'left'
			// audio: [
			// 	'/audio/level0/computer/computer_l0_s74.wav',
			// 	'/audio/level0/agent_spark/agent_spark_l0s80.wav']
		},
		{
			id: 8,
			speakers: ['Agent Spark'],
			dialog: 'Gear, did you overload the generator again?',
			avatars: ['/img/characters/agent-spark/spark_sad.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s82.wav',
			pos: 'left'
		},
		{
			id: 9,
			speakers: ['Agent Gear'],
			dialog: "Oops, Sorry! I'm fixing it now!",
			avatars: ['/img/characters/agent-gear/vanilla_idea.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_gear/agent_gear_l0s90.wav',
			pos: 'right'
		},
		{
			id: 10,
			speakers: ['Agent Spark'],
			dialog: 'Anyway, back to algorithms. What do you think an algorithm is?',
			avatars: ['/img/characters/agent-spark/spark_gesture_1.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s84.wav',
			pos: 'left'
		},
		{
			id: 11,
			speakers: ['Captain Storm'],
			dialog:
				'There is no right or wrong answer. We need to know what you know to get you and your Bot Buddy ready for your trip.',
			avatars: ['/img/characters/captain-storm/gesture_2_storm.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s85.wav',
			pos: 'right'
		},
		{
			id: 12,
			speakers: ['Captain Storm'],
			dialog: `Interesting thoughts, Agent ${agent.agent_name}!`,
			avatars: ['/img/characters/captain-storm/storm_thumbs_up.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s88.wav',
			pos: 'right'
		},
		{
			id: 14,
			speakers: ['Agent Spark'],
			dialog:
				'Remember, there is no right or wrong answer, we just need to know what you know to get you ready for your mission!',
			avatars: ['/img/characters/agent-spark/spark_aww.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s90.wav',
			pos: 'left'
		},
		{
			id: 15,
			speakers: ['Agent Gear'],
			dialog:
				'One more thing before you go. We need to know more about what you think by answering a few questions. Open your tablet at the top of your screen and complete the survey to tell us more about you.',
			avatars: ['/img/characters/agent-gear/vanilla_talking.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/agent_gear/agent_gear_l0s103.wav',
			pos: 'left'
		},
		{
			id: 16,
			speakers: ['Agent Spark', 'Captain Storm'],
			dialog: `WAHOOO! Yay, ${agent.agent_name}!`,
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
			speakers: ['Captain Storm'],
			dialog:
				'Congratulations, you have earned your Agent-in-Training badge! You are now an official SPOT Agent! Check your SPOT tablet to see your new badge!',
			avatars: ['/img/characters/captain-storm/clapping_storm_inverted.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s94.wav',
			pos: 'right'
		},
		{
			id: 18,
			speakers: ['Captain Storm'],
			dialog:
				'Congratulations, you have earned your Agent-in-Training badge! You are now an official SPOT Agent! Check your SPOT tablet to see your new badge!',
			avatars: ['/img/characters/captain-storm/clapping_storm_inverted.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '',
			pos: 'right'
		},
	],
};
export default script;
