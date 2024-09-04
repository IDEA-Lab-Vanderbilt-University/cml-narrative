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
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png', '/img/characters/bot-buddy/bot-buddy-happy.png'],
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

	],
	length: 7
};

export default script;