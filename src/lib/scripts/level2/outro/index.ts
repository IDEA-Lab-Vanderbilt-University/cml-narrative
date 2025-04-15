import type { Script } from '$lib/types/Script';

const script: Script = {
	lines: [
        {
            id: 1,
            speakers: ['SPOT Computer'],
            dialog:
                'Incoming message from Mission Control!',
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/computer_voice/Computer_voice_L1S33.wav',
            pos: 'left',
        },
        {
            id: 2,
            speakers: ['Captain Storm'],
            dialog: 'Your Bot Buddy’s system has informed us that you have completed your second mission. Mission Control needs to know a few more things. We have included our questions in this message.',
            avatars: ['/img/characters/captain-storm/storm_yeah.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level2/computer_voice/Computervoice_l2s66.wav',
        },
        {
            id: 3,
            speakers: ['SPOT Computer'],
            dialog: 'Car opinion 1',
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level2/computer_voice/Computer_voice_L2S35.wav',
        },
        {
            id: 4,
            speakers: ['SPOT Computer'],
            dialog: 'Car opinion 2',
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level2/computer_voice/Computer_voice_L2S36.wav',
        },
        {
            id: 5,
            speakers: ['SPOT Computer'],
            dialog: 'Car opinion 3',
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level2/computer_voice/Computer_voice_L2S37.wav',
        },
        {
            id: 6,
            speakers: ['SPOT Computer'],
            dialog: 'Incoming message from Mission Control!',
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/computer_voice/Computer_voice_L1S33.wav',
        },
        {
            id: 7,
            speakers: ['Agent Gear'],
            dialog: 'blah blah blah',
            avatars: ['/img/characters/agent-gear/agent-gear.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level2/computer_voice/Computer_voice_L2S39.wav',
        },
        {
            id: 8,
            speakers: ['SPOT Computer'],
            dialog: 'Badge GET!',
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level2/computer_voice/Computervoice_l2s72.wav',
        },
        {
            id: 9,
            speakers: ['SPOT Computer'],
            dialog: 'Megajoules GET!',
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/computer_voice/computervoice_megajoules.mp3',
        },
    ]
};

export default script;