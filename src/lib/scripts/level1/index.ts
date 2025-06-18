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
			speakers: ['Bot Buddy'],
			dialog:
				'Here we are in 2075! We made it!',
			avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
			background: '/img/backgrounds/level1/1.png',
			audio: '/audio/level1/bot_buddy/bot_buddy_l1s1.wav',
			pos: 'left'
		},
        {
            id: 2,
            speakers: ['Bot Buddy'],
            dialog:
                'All that time travel made me hungry! Let\'s see what they have to eat here. I hope in 2075 they still have pizza!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level1/1.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s2.wav',
            pos: 'left'
        },
        {
            id: 3,
            speakers: ['Bot Buddy'],
            dialog:
                'Mmmmmm! Pizza!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/2.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s3.wav',
            pos: 'left'
        },
        {
            id: 4,
            speakers: ['Pizza Host Bot', 'Bot Buddy'],
            dialog:
                'Welcome! Please have a seat and a server will be with you shortly.',
            avatars: ['/img/characters/level-1/host-bot.png', '/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/Pizza_Host_Bot_L1S4.mp3',
            pos: 'left'
        },
        {
            id: 5,
            speakers: ['Bot Buddy'],
            dialog:
                'Wow, there are no humans working here! This is the first technology we can look into!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s5.wav',
            pos: 'right'
        },
        {
            id: 6,
            speakers: ['Bot Buddy'],
            dialog:
                'Delicious pizza technology...',
            avatars: ['/img/characters/bot-buddy/bot-buddy-pizza.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s6.wav',
            pos: 'center',
            size: 'full',
        },
        {
            id: 7,
            speakers: ['Bot Buddy'],
            dialog:
                'These robots must have been trained with an algorithm on how to make and serve pizza!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s7.wav',
            pos: 'left'
        },
        {
            id: 8,
            speakers: ['Bot Buddy'],
            dialog:
                'Let\'s go into the kitchen and see if we can use an algorithm to make our own pizzas.',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s11.wav',
            pos: 'left'
        },
        {
            id: 9,
            speakers: ['Bot Buddy'],
            dialog:
                'Hello, robot from the future–I mean regular, normal pizza chef robot! Can we try making our own pizzas using an algorithm?',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/16596.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s12.wav',
            pos: 'right'
        },
        {
            id: 10,
            speakers: ['Chef Bot'],
            dialog:
                'Yes you can! I\'ll help you!',
            avatars: ['/img/characters/level-1/chef-bot.png'],
            background: '/img/backgrounds/level1/16596.png',
            audio: '/audio/level1/chef_bot/Chef_Bot_L1S13.wav',
            pos: 'left'
        },
        {
            id: 11,
            speakers: ['Bot Buddy'],
            dialog:
                'Sorry, Agent ' + agent.agent_name + ', I almost blew our cover back there.',
            avatars: ['/img/characters/bot-buddy/bot-buddy-ohno.png'],
            background: '/img/backgrounds/level1/16596.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s14.wav',
            pos: 'center',
            size: 'full',
        },
        {
            id: 12,
            speakers: ['Bot Buddy'],
            dialog:
                'Now let\'s make some pizza!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/16596.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s15.wav',
            pos: 'center',
            size: 'full',
        },

	],
};

export default script;