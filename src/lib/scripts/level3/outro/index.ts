import type { Script } from '$lib/types/Script';

const script: Script = {
	lines: [
		{
            id: 1,
            speakers: ['Bot Buddy'],
            dialog: 'I feel good about this! I hope that changing the dataset to add MORE and DIFFERENT faces of kids will help the cars recognize kids\' faces and let them in!!!',
            avatars: ['/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level2/factory1.png',
            audio: '/audio/level3/bot_buddy/bot_buddy_L3_S26.mp3',
        },
        {
            id: 2,
            speakers: ['Security Bot', ''],
            dialog: 'Hello, Bot! Do you work here?',
            avatars: ['/img/characters/level-3/security-bot/security-bot-1.png', '/img/characters/bot-buddy/bot-buddy-ohno.png'],
            background: '/img/backgrounds/level2/factory1.png',
            audio: '/audio/level3/security_bot/security_bot_L3_S27.mp3',
        },
        {
            id: 3,
            speakers: ['', 'Bot Buddy'],
            dialog: 'No... I... we were just leaving. Nothing to see here Security Bot!',
            avatars: ['/img/characters/level-3/security-bot/security-bot-1.png', '/img/characters/bot-buddy/bot-buddy-stop.png'],
            background: '/img/backgrounds/level2/factory1.png',
            audio: '/audio/level3/bot_buddy/bot_buddy_L3_S28.mp3',
        },
        {
            id: 4,
            speakers: ['', 'Bot Buddy'],
            dialog: 'Agent, let’s go and find Kelvin and tell him what we learned!',
            avatars: ['/img/characters/level-3/security-bot/security-bot-1.png', '/img/characters/bot-buddy/bot-buddy-stop.png'],
            background: '/img/backgrounds/level2/factory1.png',
            audio: '/audio/level3/bot_buddy/bot_buddy_L3_S29.mp3',
        },
        {
            id: 5,
            speakers: ['Kelvin', ''],
            dialog: 'Hey! What are you guys doing here?',
            avatars: ['/img/characters/level-2/boy/boy_waiting-removebg-preview.png', '/img/characters/bot-buddy/bot-buddy-stop.png'],
            background: '/img/backgrounds/level3/2.png',
            audio: '/audio/level3/kelvin/kelvin_L3_S30.mp3',
        },
        {
            id: 6,
            speakers: ['', 'Bot Buddy'],
            dialog: 'We have some good news, Kelvin! The training data images that Vroom Vroom used were mostly of adults-not kids like you. That\'s why so many kids couldn\'t use the cars.',
            avatars: ['/img/characters/level-2/boy/boy_waiting-removebg-preview.png', '/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level3/2.png',
            audio: '/audio/level3/bot_buddy/bot_buddy_L3_S31.mp3',
        },
        {
            id: 7,
            speakers: ['', 'Bot Buddy'],
            dialog: 'We added MORE and DIFFERENT types of kid images to the training dataset to reduce BIAS. Now, the self-driving cars will recognize kids better!',
            avatars: ['/img/characters/level-2/boy/boy_waiting-removebg-preview.png', '/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level3/2.png',
            audio: '/audio/level3/bot_buddy/bot_buddy_L3_S32.mp3',
        },
        {
            id: 8,
            speakers: ['', 'Bot Buddy'],
            dialog: 'We can never completely get rid of BIAS because we all have opinions that influence how we choose our datasets. So, we should be more mindful when we put together training datasets.',
            avatars: ['/img/characters/level-2/boy/boy_waiting-removebg-preview.png', '/img/characters/bot-buddy/bot-buddy-stop.png'],
            background: '/img/backgrounds/level3/2.png',
            audio: '/audio/level3/bot_buddy/bot_buddy_L3_S33.mp3',
        },
        {
            id: 9,
            speakers: ['Kelvin', ''],
            dialog: 'Wow! Thanks for helping us out. This solves one problem with our technologies. But we still have a lot of work to do to make sure people are treated fairly when designing technologies.',
            avatars: ['/img/characters/level-2/boy/boy_waiting-removebg-preview.png', '/img/characters/bot-buddy/bot-buddy-happy-2.png'],
            background: '/img/backgrounds/level3/2.png',
            audio: '/audio/level3/kelvin/kelvin_L3_S34.mp3',
        },
        {
            id: 10,
            speakers: ['SPOT Computer'],
            dialog:
                'Incoming message from Mission Control!',
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level3/computer_voice/computer_voice_L3_S35.mp3',
            pos: 'left',
        },
        {
            id: 11,
            speakers: ['Captain Storm'],
            dialog:
                'Your Bot Buddy’s system has informed us that you have completed your third mission. Mission Control needs to know a few more things. We have included our questions in this message.',
            avatars: ['/img/characters/captain-storm/storm_yeah.png'],
            background: '/img/backgrounds/level1/cafe.png',           
            audio: '/audio/level3/computer_voice/computer_voice_L3_S36.mp3',
            pos: 'left',
        },
        {
            id: 12,
            speakers: ['SPOT Computer'],
            dialog:
                'bias opinion 1',
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level3/computer_voice/computer_voice_L3_S37.mp3',
            pos: 'left',
        },
        {
            id: 13,
            speakers: ['SPOT Computer'],
            dialog:
                'bias opinion 2',
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level3/computer_voice/computer_voice_L3_S38.mp3',
            pos: 'left',
        },
        {
            id: 14,
            speakers: ['SPOT Computer'],
            dialog:
                'bias opinion 3',
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level3/computer_voice/computer_voice_L3_S39.mp3',
            pos: 'left',
        },
        {
            id: 15,
            speakers: ['SPOT Computer'],
            dialog:
                'Incoming message from Mission Control!',
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level3/computer_voice/computer_voice_L3_S40.wav',
            pos: 'left',
        },
        {
            id: 16,
            speakers: ['Agent Spark'],
            dialog: 'Congratulations on completing the third part of your mission!',
            avatars: ['/img/characters/level-1/agent-spark/agent-spark-1.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level1/agent-spark/agent-spark-l1s16.wav',
            pos: 'right',
        },
        {
            id: 17,
            speakers: ['SPOT Computer'],
            dialog:
                'Badge GET!',
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/level3/computer_voice/computer_voice_L3_S41.mp3',
            pos: 'left',
        },
        {
            id: 18,
            speakers: ['SPOT Computer'],
            dialog:
                'MegaJoules GET!',
            avatars: ['/img/characters/level-1/spot-computer.png'],
            background: '/img/backgrounds/level1/cafe.png',
            audio: '/audio/computer_voice/computervoice_megajoules.mp3',
            pos: 'left',
        },
    ]
};

export default script;