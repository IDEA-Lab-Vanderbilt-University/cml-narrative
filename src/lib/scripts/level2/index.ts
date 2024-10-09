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
				'Oh! It looks like we are getting an alert! Let’s see what it says!',
			avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
			background: '/img/backgrounds/level2/1.png',
			audio: '/audio/level1/bot_buddy/bot_buddy_l2s1.wav',
			pos: 'left'
		},
        {
            id: 2,
            speakers: ['Computer Voice'],
            dialog:
                'Detecting problems with self-driving cars near the school!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level2/1.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s2.wav',
            pos: 'left'
        },
        {
            id: 3,
            speakers: ['Bot Buddy'],
            dialog:
                'Let’s go see if we can find one of those cars and investigate what the problem is!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level2/1.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s3.wav',
            pos: 'left'
        },
        {
            id: 4,
            speakers: ['Bot Buddy'],
            dialog: 'We found one! Oh, there are no drivers needed! How do these cars work?',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level2/2.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s4.wav',
            pos: 'left'
        },
        {
            id: 5,
            speakers: ['Bot Buddy'],
            dialog: 'Amazing! In the future, they use cameras to scan people\'s faces and that allows them to get a ride.',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level2/2.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s5.wav',
            pos: 'left'
        },
        {
            id: 6,
            speakers: ['Bot Buddy'],
            dialog: 'It seems like kids use these self-driving cars to get to school! So cool!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level2/2.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s6.wav',
            pos: 'left'
        },
        {
            id: 7,
            speakers: ['Bot Buddy'],
            dialog: 'Oh no, the self-driving car isn\'t working for that kid.',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level2/2.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s7.wav',
            pos: 'left'
        },
        {
            id: 8,
            speakers: ['Bot Buddy'],
            dialog: 'Hello, I am Bot Buddy. What\'s your name? Why isn\'t the car working for you?',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png', '/img/characters/level-2/kid.png'],
            background: '/img/backgrounds/level2/2.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s8.wav',
            pos: 'left'
        },
        {
            id: 9,
            speakers: ['Kelvin'],
            dialog: 'Hi, I\'m Kelvin. These self-driving cars never work for me except when I\'m with my parents. It\'s so frustrating! It only works for some of my friends.',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png', '/img/characters/level-2/kid.png'],
            background: '/img/backgrounds/level2/2.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s9.wav',
            pos: 'right'
        },
        {
            id: 10,
            speakers: ['Kelvin'],
            dialog: 'Today I have soccer practice, and I\'m going to be late…AGAIN!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png', '/img/characters/level-2/kid.png'],
            background: '/img/backgrounds/level2/2.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s10.wav',
            pos: 'right'
        },
        {
            id: 11,
            speakers: ['Bot Buddy'],
            dialog: 'Don\'t worry! The SPOT team is here to help!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png', '/img/characters/level-2/kid.png'],
            background: '/img/backgrounds/level2/2.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s11.wav',
            pos: 'left'
        },
        {
            id: 12,
            speakers: ['Kelvin'],
            dialog: 'Umm, the what?',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png', '/img/characters/level-2/kid.png'],
            background: '/img/backgrounds/level2/2.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s12.wav',
            pos: 'right'
        },
        {
            id: 13,
            speakers: ['Bot Buddy'],
            dialog: 'The... the.. Serving People on Transportation Team!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png', '/img/characters/level-2/kid.png'],
            background: '/img/backgrounds/level2/2.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s13.wav',
            pos: 'left'
        },
        {
            id: 14,
            speakers: ['Bot Buddy'],
            dialog: 'Yes, that is definitely who we work for! We are not secret agents or anything like that...',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png', '/img/characters/level-2/kid.png'],
            background: '/img/backgrounds/level2/2.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s14.wav',
            pos: 'left'
        },
        {
            id: 15,
            speakers: ['Bot Buddy'],
            dialog: 'Sorry, Agent. I almost blew our cover again!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level2/2.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s15.wav',
            pos: 'center',
            size: 'full',
        },
        {
            id: 16,
            speakers: ['Bot Buddy'],
            dialog: 'Let\'s test the self-driving car. Agent, could you try to scan your face and see if this car works for you?',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level2/3.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s16.wav',
            pos: 'left'
        },
        {
            id: 17,
            speakers: ['Computer Voice'],
            dialog: 'Hold your face still for a scan...',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level2/3.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s17.wav',
            pos: 'left'
        },
        {
            id: 18,
            speakers: ['Computer Voice'],
            dialog: 'Face Scan Failed.',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level2/3.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s18.wav',
            pos: 'left'
        },
        {
            id: 19,
            speakers: ['Bot Buddy'],
            dialog: 'Agent, it didn\'t work. Try it again. Maybe try smiling really big this time!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level2/3.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s19.wav',
            pos: 'left'
        },
        {
            id: 20,
            speakers: ['Computer Voice'],
            dialog: 'Hold your face still for a scan...',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level2/3.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s17.wav',
            pos: 'left'
        },
        {
            id: 21,
            speakers: ['Computer Voice'],
            dialog: 'Face Scan Failed.',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level2/3.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s18.wav',
            pos: 'left'
        },
        {
            id: 22,
            speakers: ['Kelvin'],
            dialog: 'What? It didn\'t work for you? I wonder why it doesn\'t work for some kids? We miss so many birthday parties and sometimes school!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png', '/img/characters/level-2/kid.png'],
            background: '/img/backgrounds/level2/3.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s22.wav',
            pos: 'right'
        },
        {
            id: 23,
            speakers: ['Kelvin'],
            dialog: 'It\'s so unfair and not cool! Do you think you could do anything to help?',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png', '/img/characters/level-2/kid.png'],
            background: '/img/backgrounds/level2/3.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s23.wav',
            pos: 'right'
        },
        {
            id: 24,
            speakers: ['Bot Buddy'],
            dialog: 'Yes, Agent- I mean my friend and I... will investigate this problem!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png', '/img/characters/level-2/kid.png'],
            background: '/img/backgrounds/level2/3.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s24.wav',
            pos: 'left'
        },
        {
            id: 25,
            speakers: ['Kelvin'],
            dialog: 'That would be awesome if you could help! I have to go back inside and get an adult to make the car work, so I don\'t miss soccer practice again.',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png', '/img/characters/level-2/kid.png'],
            background: '/img/backgrounds/level2/3.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s25.wav',
            pos: 'right'
        },
        {
            id: 26,
            speakers: ['Bot Buddy'],
            dialog: 'Agent, this is terrible! We need to find out who makes these self-driving cars and why some kids need adults to help them catch rides',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level2/3.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s26.wav',
            pos: 'center',
            size: 'full',
        },
        {
            id: 27,
            speakers: ['Bot Buddy'],
            dialog: 'The license plate on the self-driving car reads it\'s made by Vroom-Vroom car factory. Let\'s use my GPS and head over there.',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level2/3.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l2s27.wav',
            pos: 'center',
            size: 'full',
        },
        

	],
};

export default script;