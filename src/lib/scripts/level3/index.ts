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
            dialog: 'Finding out how the smart cars are trained and tested was super fun! I love downloading new information!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level3/1.png',
            audio: '/audio/bot-buddy/bot-buddy-l3s1.wav',
        }
    ]
};

export default script;