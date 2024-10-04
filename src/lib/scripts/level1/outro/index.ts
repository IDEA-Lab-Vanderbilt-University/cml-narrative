import type { Script } from '$lib/types/Script';

export const script: Script = {
    lines: [
        {
            id: 1,
            speakers: ['Bot Buddy'],
            dialog:
                'I can\'t wait to see our pizzas! Let\'s open mine first!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s1.wav',
            pos: 'right',
        },
        {
            id: 2,
            speakers: ['Bot Buddy'],
            dialog:
                'Mmmmm... thick crust pizza with nuts and bolts and spicy jalapenos! Doesn\'t it look delicious?!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s2.wav',
            pos: 'right',
        },
        {
            id: 3,
            speakers: ['Bot Buddy'],
            dialog:
                'Oh, yuck. I would never eat your pizza! That is not what I like. It looks like algorithms can be very different depending on who makes them. As you can see, algorithms are not just based on order of instructions, but also on preferences and opinions.',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/bot_buddy/bot_buddy_l1s3.wav',
            pos: 'right',
        },
        {
            id: 4,
            speakers: ['SPOT Computer'],
            dialog:
                'Incoming message from Mission Control!',
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/spot_computer/spot_computer_l1s1.wav',
            pos: 'left',
        },
        {
            id: 5,
            speakers: ['Captain Storm'],
            dialog:
                'Your Bot Buddy’s system has informed us that you have completed your first mission. Mission Control needs to know a few more things. We have included our questions in this message.',
            avatars: ['/img/characters/captain-storm/storm_yeah.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/captain_storm/captn_storm_l1s1.wav',
            pos: 'left',
        },
        {
            id: 6,
            speakers: ['SPOT Computer'],
            dialog:
                'Incoming message from Captain Storm!',
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/spot_computer/spot_computer_l1s1.wav',
            pos: 'left',
        },
        
    ]
};

