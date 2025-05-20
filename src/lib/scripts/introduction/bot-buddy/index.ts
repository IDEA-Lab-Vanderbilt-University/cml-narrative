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
import { studentDataStore } from '$lib/utils/stores/store';

let agent: Student = {};

studentDataStore.subscribe((value) => {
	agent = value as Student;
});

const script: Script = {
	lines: [
		{
			id: 1,
			speakers: ['Captain Storm', 'Agent Spark'],
			dialog:
				'Thank you Agent Spark! It looks like our new agent-in-training is ready to go into the lab!',
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
			speakers: ['Agent Fern'],
			dialog: `Great to see you, Captain Storm! Welcome, Agent ${agent.agent_name}! I can't wait to tell you about Bot Buddy!`,
			avatars: ['/img/characters/agent-fern/fern_wave_inverted.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/agent_fern/agent_fern_l0s52.mp3',
			pos: 'left'
		},
		{
			id: 3,
			speakers: ['Agent Fern'],
			dialog:
				'Your Bot Buddy will be your companion during this mission. The Bot Buddy can provide clues and receive directions from Mission Control.',
			avatars: ['/img/characters/agent-fern/fern_talking.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/agent_fern/agent_fern_l0s53.mp3',
			pos: 'right'
		},
		{
			id: 4,
			speakers: ['Captain Storm'],
			dialog: 'Agent Fern... where is Bot Buddy?',
			avatars: ['/img/characters/captain-storm/storm_unsure.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s55.wav',
			pos: 'left'
		},
		{
			id: 5,
			speakers: ['Agent Fern'],
			dialog: "I don't know!!",
			avatars: ['/img/characters/agent-fern/fern_oh_no.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/agent_fern/agent_fern_l0s56.mp3',
			pos: 'right'
		},
		{
			id: 6,
			speakers: ['Agent Gear'],
			dialog:
				'I have it, Captain Storm! Sorry I was late, I wanted our new agent to have the updated model!',
			avatars: ['/img/characters/agent-gear/vanilla_strong_inverted.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/agent_gear/agent_gear_l0s57.wav',
			pos: 'right'
		},
		{
			id: 7,
			speakers: ['Bot Buddy'],
			dialog: '$$((( ooo!>>> =+=; $^(( %&<!!',
			avatars: ['/img/characters/bot-buddy/bot-buddy-smug.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/bot_buddy/bot_buddy_l0s59.wav',
			pos: 'left'
		},
		{
			id: 8,
			speakers: ['Captain Storm'],
			dialog: '*CRASH* \n*BANG*',
			avatars: ['/img/characters/captain-storm/storm_better_laugh.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/crash-bang.mp3',
			pos: 'left'
		},
		{
			id: 9,
			speakers: ['Bot Buddy'],
			dialog: 'Hello! I am Bot Buddy! I will be your robot assistant.',
			avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/bot_buddy/bot_buddy_l0s63.wav',
			pos: 'left'
		},
		{
			id: 10,
			speakers: ['Captain Storm'],
			dialog: 'Excellent! Thank you Agent Gear and Agent Fern!',
			avatars: ['/img/characters/captain-storm/storm_2_thumbs_up.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s65.wav',
			pos: 'left'
		},
		{
			id: 11,
			speakers: ['Captain Storm'],
			dialog: `Agent ${agent.agent_name}, Mission Control needs you to complete some training before going on the mission.`,
			avatars: ['/img/characters/captain-storm/storm_gesture_4_inverted.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s66.wav',
			pos: 'left'
		},
		{
			id: 12,
			speakers: ['Captain Storm'],
			dialog:
				'This training helps us understand what you know about technology and Artificial Intelligence.',
			avatars: ['/img/characters/captain-storm/clapping_storm.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s67.wav',
			pos: 'left'
		},
		{
			id: 13,
			speakers: ['Captain Storm'],
			dialog:
				'Then, the Tech Team will load your Bot Buddy with additional information and knowledge to help you on your mission.',
			avatars: ['/img/characters/captain-storm/gesture_2_storm_inverted.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s68.wav',
			pos: 'left'
		},
		{
			id: 14,
			speakers: ['SPOT Agents'],
			dialog: 'You can count on us!',
			avatars: ['/img/characters/agent-groups/spot_agents.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/spot_agents/level0_s69_you_can_count_on_us_01.wav',
			pos: 'left'
		},
		{
			id: 15,
			speakers: ['Captain Storm'],
			dialog:
				"Thanks, team! At the end of this first training, you will receive your first badge! Let's get started!",
			avatars: ['/img/characters/agent-groups/spot_agents_2.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/captain_storm/captn_storm_l0s70.wav',
			pos: 'left'
		}
	]
};
export default script;
