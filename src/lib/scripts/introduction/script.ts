/**
 /src/lib/scripts/introduction/script.ts
 script.ts
 cml-narrative
 
 Created by Ian Thompson on January 7th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { Script, Line } from '$lib/types/Script';

const script: Script = {
	lines: [
		{
			id: 1,
			speakers: ['Captain Storm'],
			dialog: 'Welcome to the SPOT Agency! My name is Captain Storm.',
			avatars: ['/img/characters/captain-storm/storm_yeah.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s1.wav',
			pos: 'right'
		},
		{
			id: 2,
			speakers: ['Captain Storm'],
			dialog:
				'Recently, our team of scientists and researchers found a way to travel into the future! ',
			avatars: ['/img/characters/captain-storm/gesture_2_storm.png'],
			background: '/img/backgrounds/captain_office.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s2.wav',
			pos: 'right'
		},
		{
			id: 3,
			speakers: ['Captain Storm'],
			dialog:
				'So glad you are now a part of our team! Now our agents will get you started and set up in the SPOT system.',
			avatars: ['/img/characters/captain-storm/storm_thumbs_up.png'],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s12.wav',
			pos: 'right'
		},
		{
			id: 4,
			speakers: ['Agent Fern', 'Captain Storm'],
			dialog: 'Agent Fern is our brilliant physicist who developed a way to time travel!',
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
			speakers: ['Agent Gear', 'Captain Storm'],
			dialog: 'Agent Gear is our engineer who designed and built our robots at SPOT agency!',
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
			speakers: ['Agent Spark', 'Captain Storm'],
			dialog: 'Agent Spark is our software developer. She writes the code for all our SPOT tech!',
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
			speakers: ['Agent Spark'],
			dialog: 'Hello! Great to meet you Agent...',
			avatars: ['/img/characters/agent-spark/spark_wave.png'],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s14.wav',
			pos: 'right'
		},
		{
			id: 8,
			speakers: ['Agent Spark'],
			dialog: "Oohh! you don't have a secret agent name yet! That's so important!",
			avatars: ['/img/characters/agent-spark/spark_surprised.png'],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s16.wav',
			pos: 'right'
		},
		{
			id: 9,
			speakers: ['Agent Spark'],
			dialog:
				'Your agent name should be something that inspires you! Mine is Agent Spark because I love electronic gadgets. ',
			avatars: ['/img/characters/agent-spark/spark_gesture_1.png'],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s18.wav',
			pos: 'left'
		},
		{
			id: 10,
			speakers: ['Agent Fern', 'Agent Spark'],
			dialog: 'In addition to physics, Agent Fern loves plants and all things that grow in nature.',
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
			speakers: ['Agent Gear', 'Agent Spark'],
			dialog: 'Agent Gear is inspired by motorcycles!',
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
			speakers: ['Agent Spark'],
			dialog: "What inspires you? I'm sure you will choose a great secret agent name!",
			avatars: ['/img/characters/agent-spark/spark_aww.png'],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s21.wav',
			pos: 'left'
		},
		{
			id: 13,
			speakers: ['Agent Spark'],
			dialog:
				"Open your SPOT tablet. You will use this to keep track of your mission to the future and communicate to mission control. Let's get yours set up!",
			avatars: ['/img/characters/agent-spark/spark_talking.png'],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s22.mp3',
			pos: 'left'
		}
	]
};
export default script;
