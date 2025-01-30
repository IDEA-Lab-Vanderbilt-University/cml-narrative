
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
			dialog: 'Now that our megajoules meter is full, its time to leave 2075 and go back to Mission Control! I bet the team has lots of questions for us!',
			avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
			background: '/img/backgrounds/level1/1.png',
			pos: 'left',
		},
		{
			id: 2,
			speakers: ['Bot Buddy'],
			dialog: 'Let’s go back to Mission Control!',
			avatars: [],
			background: '',
		},
		{
			id: 3,
			speakers: ['Captain Storm'],
			dialog: 'Welcome back,  Agent! We are excited to see you!',
			avatars: ['/img/characters/captain-storm/storm_yeah.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
		},
		{
			id: 4,
			speakers: ['Captain Storm'],
			dialog: 'You have shared so much with us in your travel log! We can’t wait to apply what you have learned to the design of our technology here!',
			avatars: ['/img/characters/captain-storm/storm_yeah.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
		},
		{
			id: 5,
			speakers: ['Captain Storm'],
			dialog: 'Now, we are going to talk about robots!',
			avatars: ['/img/characters/captain-storm/storm_yeah.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
		},
		{
			id: 6,
			speakers: ['Captain Storm'],
			dialog: 'Based on what you just learned in your time travel, you are going to help us design an AI robot prototype!',
			avatars: ['/img/characters/captain-storm/storm_yeah.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
		},
		{
			id: 7,
			speakers: ['Captain Storm'],
			dialog: 'Agent, on your SPOT tablet, open file named  “Robot Prototype.”',
			avatars: ['/img/characters/captain-storm/storm_yeah.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
		}
    ],
};

export default script;