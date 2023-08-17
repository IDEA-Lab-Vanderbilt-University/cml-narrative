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
			speaker: 'Captain Storm',
			dialog: 'Welcome to the SPOT Agency, my name is Captain Storm.',
			avatar: '/img/characters/captain-storm/storm_yeah.png',
			background: '/img/backgrounds/captain_office.jpg',
			audio: "/audio/level0/captain_storm/captn_storm_l0s1.wav"
		},
		{
			id: 2,
			speaker: 'Captain Storm',
			dialog:
				'Recently, a team of scientists and researchers found a way to travel into the future! ',
			avatar: '/img/characters/captain-storm/gesture_2_storm.png',
			background: '/img/backgrounds/captain_office.jpg',
			audio: "/audio/level0/captain_storm/captn_storm_l0s2.wav"

		},
		{
			id: 3,
			speaker: 'Captain Storm',
			dialog:
				'But now they need volunteers to go on a mission to the year 2075 to see what the future is like.',
			avatar: '/img/characters/captain-storm/gesture_2_storm.png',
			background: '/img/backgrounds/captain_office.jpg',
			audio: "/audio/level0/captain_storm/captn_storm_l0s6.wav"
		},
		{
			id: 4,
			speaker: 'Captain Storm',
			dialog: 'Great choice! We are specifically interested in the type of technology that will be available in the future.',
			avatar: '/img/characters/captain-storm/gesture_2_storm.png',
			background: '/img/backgrounds/captain_office.jpg'
		},
		{
			id: 5,
			speaker: 'Captain Storm',
			dialog:
				"By seeing how technology works and affects people in the future, we might be able to prevent potential problems.",
			avatar: '/img/characters/captain-storm/gesture_2_storm.png',
			background: '/img/backgrounds/captain_office.jpg'
		},
		{
			id: 6,
			speaker: 'Captain Storm',
			dialog:
				'Your mission is to travel to the future and spot any problems with technology. Then you will try and solve those problems.',
			avatar: '/img/characters/captain-storm/storm_gesture_4.png',
			background: '/img/backgrounds/captain_office.jpg',
			audio: "/audio/level0/captain_storm/captn_storm_l0s10.wav"
		},
		{
			id: 7,
			speaker: 'Captain Storm',
			dialog:
				'You will bring back information that will help you design technologies that are good for your community.',
			avatar: '/img/characters/captain-storm/storm_gesture_4.png',
			background: '/img/backgrounds/captain_office.jpg',
			audio: "/audio/level0/captain_storm/captn_storm_l0s11.wav"
		},
		{
			id: 8,
			speaker: 'Captain Storm',
			dialog:
				'So glad you are now a part of our team! Now our agents will get you started and set up in the SPOT system.',
			avatar: '/img/characters/captain-storm/storm_gesture_4.png',
			background: '/img/backgrounds/captain_office.jpg'
		},
		{
			id: 9,
			speaker: 'Captain Storm',
			dialog: 'Agent Fern is our brilliant physicist who developed a way to time travel!',
			avatar: '/img/characters/captain-storm/storm_yeah.png',
			background: '/img/backgrounds/captain_office.jpg',
			audio: "/audio/level0/captain_storm/captn_storm_l0s13.wav"
		},
		{
			id: 10,
			speaker: 'Captain Storm',
			dialog: 'Agent Gear is our engineer who designed and built special SPOT robots!',
			avatar: '/img/characters/captain-storm/storm_gesture_4.png',
			background: '/img/backgrounds/captain_office.jpg',
			audio: "/audio/level0/captain_storm/captn_storm_l0s14.wav"
		},
		{
			id: 11,
			speaker: 'Captain Storm',
			dialog: 'Agent Spark is our software developer. She writes the code for all our SPOT tech!',
			avatar: '/img/characters/captain-storm/storm_gesture_4.png',
			background: '/img/backgrounds/captain_office.jpg',
			audio: "/audio/level0/captain_storm/captn_storm_l0s15.wav"
		},
		{
			id: 12,
			speaker: 'Agent Spark',
			dialog: 'Hello! Great to meet you Agent...',
			avatar: '/img/characters/agent-spark/spark_wave.png',
			background: '/img/backgrounds/Agency_Walkway.jpg'
		},
		{
			id: 13,
			speaker: 'Agent Spark',
			dialog: "Oops, you don't have a secret agent name yet! That's so important!",
			avatar: '/img/characters/agent-spark/spark_surprised.png',
			background: '/img/backgrounds/Agency_Walkway.jpg'
		},
		{
			id: 14,
			speaker: 'Agent Spark',
			dialog:
				'Your agent name should be something that inspires you! Mine is Agent Spark because I love electronic gadgets. ',
			avatar: '/img/characters/agent-spark/spark_gesture_1.png',
			background: '/img/backgrounds/Agency_Walkway.jpg'
		},
		{
			id: 15,
			speaker: 'Agent Spark',
			dialog: 'In addition to physics, Agent Fern loves plants and things that grow.',
			avatar: '/img/characters/agent-spark/spark_gesture_1.png',
			background: '/img/backgrounds/Agency_Walkway.jpg'
		},
		{
			id: 16,
			speaker: 'Agent Spark',
			dialog: 'Agent Gear is inspired by motorcycles!',
			avatar: '/img/characters/agent-spark/spark_aww.png',
			background: '/img/backgrounds/Agency_Walkway.jpg'
		},
		{
			id: 17,
			speaker: 'Agent Spark',
			dialog: "What inspires you? I'm sure you will choose a great secret agent name!",
			avatar: '/img/characters/agent-spark/spark_aww.png',
			background: '/img/backgrounds/Agency_Walkway.jpg'
		},
		{
			id: 18,
			speaker: 'Agent Spark',
			dialog:
				"Click on hte table above to open up your SPOT tablet. You will use this to keep track of your mission to the future and communicate to mission control Let's get yours set up!",
			avatar: '/img/characters/agent-spark/spark_talking.png',
			background: '/img/backgrounds/Agency_Walkway.jpg'
		}
	],
	length: 18
};
export default script;
