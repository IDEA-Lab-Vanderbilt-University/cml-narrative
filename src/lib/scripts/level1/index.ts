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
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s4.wav',
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
                'Remember what an algorithm is? Let\'s go back to your training notes in your SPOT tablet.',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s8.wav',
            pos: 'left'
        },
        {
            id: 9,
            speakers: ['Bot Buddy'],
            dialog:
                'My database says that an algorithm is a set of step-by-step instructions that describe how to perform a task. It is kind of like a recipe!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s9.wav',
            pos: 'left'
        },
        {
            id: 10,
            speakers: ['Bot Buddy'],
            dialog:
                'Let\'s go into the kitchen and see if we can use an algorithm to make our own pizzas.',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s10.wav',
            pos: 'left'
        },
	],
	length: 10
};

export default script;