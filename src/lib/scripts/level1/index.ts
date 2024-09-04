import type { Script } from '$lib/types/Script';


const script: Script = {
	lines: [
		{
			id: 1,
			speakers: ['Bot Buddy'],
			dialog:
				'Here we are in 2075! We made it!',
			avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
			background: '/img/backgrounds/level1/1.png',
			audio: '/audio/level1/bot_buddy/bot_buddy_l1s1.wav',
			pos: 'left'
		},
	],
	length: 1
};

export default script;