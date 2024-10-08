import type { Script } from '$lib/types/Script';
import type { UserData } from '$lib/types/UserData';
import { userDataStore } from '$lib/utils/stores/store';

let agent: UserData = {
	name: {
		first: '',
		last: ''
	},
	age: 0,
	interests: [],
	avatarImg: '',
	agentName: '',
	email: '',
	password: '',
	progress: {
		level: 0,
		levelLabel: '',
		subLevel: 0,
		subLevelLabel: '',
		lastUpdated: undefined
	}
};

userDataStore.subscribe((value) => {
	agent = value as UserData;
});



const script: Script = {
	lines: [
		{
			id: 1,
			speakers: ['Bot Buddy'],
			dialog:
				'Here we are in 2075! We made it!',
			avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
			background: '/img/backgrounds/level2/1.png',
			audio: '/audio/level1/bot_buddy/bot_buddy_l2s1.wav',
			pos: 'left'
		},
	],
};

export default script;