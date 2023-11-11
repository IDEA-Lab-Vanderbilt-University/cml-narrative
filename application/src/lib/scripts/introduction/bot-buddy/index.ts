/**
 /src/lib/scripts/introduction/onboarding/tablet-tutorial/bot-buddy/index.ts
 index.ts
 cml-narrative
 
 Created by Ian Thompson on January 14th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { Script, Line } from '$lib/types/Script';
import type { UserData } from '$lib/types/UserData';
import { agentData } from '$lib/utils/stores/store';

let agent: UserData = {};

agentData.subscribe((value) => {
	agent = value as UserData;
});

const script: Script = {
	lines: [
		{
			id: 1,
			speakers: ['Captain Storm', 'Agent Spark'],
			dialog:
				'Thank you Agent Spark! It looks like our new agent-in-training is ready to go to the lab!',
			avatars: [
				'/img/characters/captain-storm/storm_thumbs_up.png',
				'/img/characters/agent-spark/spark_gesture_1.png'
			],
			background: '/img/backgrounds/Agency_Walkway.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s48.wav'
		},
		{
			id: 2,
			speakers: ['Captain Storm'],
			dialog: 'This is the lab! Before you start training, you will need a...',
			avatars: ['/img/characters/captain-storm/storm_gesture_4.png'],
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 3,
			speakers: ['Agent Fern'],
			dialog: 'Bot Buddy!!!',
			avatars: ['/img/characters/agent-fern/fern_point.png'],
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 4,
			speakers: ['Captain Storm'],
			dialog: 'Yes, thank you Agent Fern! A Bot Buddy!',
			avatars: ['/img/characters/captain-storm/storm_laughing.png'],
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 5,
			speakers: ['Agent Fern'],
			dialog: `Great to see you, Captain Storm! Welcome, Agent ${agent.agentName}! I can't wait to tell you about Bot Buddy!`,
			avatars: ['/img/characters/agent-fern/fern_wave.png'],
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 6,
			speakers: ['Agent Fern'],
			dialog:
				'Your Bot Buddy will be your companion during this mission. The Bot Buddy can provide clues and receive directions from Mission Control.',
			avatars: ['/img/characters/agent-fern/fern_talking.png'],
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 7,
			speakers: ['Agent Fern'],
			dialog: 'It will be super useful in your mission to the future!',
			avatars: ['/img/characters/agent-fern/fern_bro.png'],
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 8,
			speakers: ['Captain Storm'],
			dialog: 'Agent Fern... where is Bot Buddy?',
			avatars: ['/img/characters/captain-storm/storm_unsure.png'],
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 9,
			speakers: ['Agent Fern'],
			dialog: "I don't know!!",
			avatars: ['/img/characters/agent-fern/fern_oh_no.png'],
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 10,
			speakers: ['Agent Gear'],
			dialog:
				'I have them, Captain Storm! Sorry I was late, I wanted our new agent to have the updated model!',
			avatars: ['/img/characters/agent-gear/vanilla_strong.png'],
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 11,
			speakers: ['Agent Gear'],
			dialog: `Agent ${agent.agentName}, this is Bot Buddy! Your new helpful robot will accompany you on your mission to the future.`,
			avatars: ['/img/characters/agent-gear/vanilla_gesture_2.png'],
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 12,
			speakers: ['Bot Buddy'],
			dialog: '$$((( ooo!>>> =+=; $^(( %&<!!',
			avatars: ['/img/characters/bot-buddy/bot-buddy-base.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/bot_buddy/bot_buddy_los59.wav'
		},
		{
			id: 13,
			speakers: ['Agent Fern And Agent Gear'],
			dialog: 'What !!!!!!!! ????????????',
			avatars: ['/img/characters/agent-groups/agent_fern_and_gear.png'],
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 14,
			speakers: ['Agent Fern And Agent Gear'],
			dialog: "Well That doesn't sound right.",
			avatars: ['/img/characters/agent-groups/agent_fern_and_gear.png'],
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 15,
			speakers: [''],
			dialog: '*CRASH* \n*BANG*',
			avatars: ['/img/characters/captain-storm/storm_better_laugh.png'],
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 16,
			speakers: ['Bot Buddy'],
			dialog: 'Hello! I am Bot Buddy! I am your robot assistant.',
			avatars: ['/img/characters/bot-buddy/bot-buddy-base.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/bot_buddy/bot_buddy_l0s63.wav'
		},
		{
			id: 17,
			speakers: ['Agent Gear', 'Agent Fern'],
			dialog: 'Nailed it!!',
			avatars: [
				'/img/characters/agent-gear/vanilla_strong.png',
				'/img/characters/agent-fern/fern_smooth.png'
			],
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 18,
			speakers: ['Captain Storm'],
			dialog: 'Excellent! Thank you Agent Gear and Agent Fern!',
			avatars: ['/img/characters/captain-storm/storm_2_thumbs_up.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s65.wav'
		},
		{
			id: 19,
			speakers: ['Captain Storm'],
			dialog: `Agent ${agent.agentName}, Mission Control needs you to complete some training before going on the mission.`,
			avatars: ['/img/characters/captain-storm/storm_gesture_4.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s66.wav'
		},
		{
			id: 20,
			speakers: ['Captain Storm'],
			dialog:
				'This training helps us understand what you know about technology and Artificial Intelligence.',
			avatars: ['/img/characters/captain-storm/clapping_storm.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s67.wav'
		},
		{
			id: 21,
			speakers: ['Captain Storm'],
			dialog:
				'Then, the Tech Team will load your Bot Buddy with additional information and knowledge to help you on your mission.',
			avatars: ['/img/characters/captain-storm/gesture_2_storm.png'],
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 22,
			speakers: ['SPOT Agents'],
			dialog: 'You can count on us!',
			avatars: ['/img/characters/agent-groups/spot_agents.png'],
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 23,
			speakers: ['Captain Storm'],
			dialog:
				"Thanks, team! At the end of this first training, you will receive your first badge! Let's get started!",
			avatars: ['/img/characters/captain-storm/storm_arms_up.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s70.wav'
		}
	],
	length: 24
};
export default script;
