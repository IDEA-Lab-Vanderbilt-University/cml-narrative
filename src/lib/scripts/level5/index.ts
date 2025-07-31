
import type { Script } from '$lib/types/Script';
import { studentDataStore } from '$lib/utils/stores/store';
import { get } from 'svelte/store';

let agent = get(studentDataStore);

const script: Script = {
    lines: [
        {
            id: 1,
            speakers: ['Captain Storm'],
            dialog: 'Welcome back Agent. Sorry I could not attend the S.P.O.T. robot showcase, but I heard all the agents did an excellent job.',
            avatars: ['/img/characters/captain-storm/storm_lol.png'],
            background: '/img/backgrounds/captain_office.jpg',
            pos: 'left',
            audio: '/audio/level5/captain_storm/captain_storm_l5s1.mp3'
        },
        {
            id: 2,
            speakers: ['Captain Storm'],
            dialog: 'Before we say goodbye, go to your tablet to complete your final travel log entry and receive your final badge promoting you to Junior Agent.',
            avatars: ['/img/characters/captain-storm/storm_thumbs_up_inverted.png'],
            background: '/img/backgrounds/captain_office.jpg',
            pos: 'left',
            audio: '/audio/level5/captain_storm/captain_storm_l5s2.mp3'
        },
        {
            id: 3,
            speakers: ['SPOT Tablet'],
            dialog: 'SPOT TABLET WITH FINAL TRAVEL LOG BUTTON',
            avatars: [],
            background: '',
        },
        {
            id: 4,
            speakers: ['SPOT Tablet'],
            dialog: 'Mission Control needs to know a few more things before you get your final badge.',
            avatars: [],
            background: '',
            audio: '/audio/level5/L5-S4.mp3'
        },
        {
            id: 5,
            speakers: ['SPOT Tablet'],
            dialog: 'Question',
            avatars: [],
            background: '',
        },
        {
            id: 6,
            speakers: ['SPOT Tablet'],
            dialog: 'Question',
            avatars: [],
            background: '',
        },
        {
            id: 7,
            speakers: ['SPOT Tablet'],
            dialog: 'Question',
            avatars: [],
            background: '',
        },
        {
            id: 8,
            speakers: ['SPOT Tablet'],
            dialog: 'Question',
            avatars: [],
            background: '',
        },
        {
            id: 9,
            speakers: ['SPOT Tablet'],
            dialog: 'Question',
            avatars: [],
            background: '',
        },
        {
            id: 10,
            speakers: ['SPOT Tablet'],
            dialog: 'BADGE GET',
            avatars: [],
            background: '',
        },
        {
            id: 11,
            speakers: ['Captain Storm'],
            dialog: `It’s been an honor working with you Agent ${agent.agent_name}. You are now an official junior agent at S.P.O.T. We hope that you continue building technologies that make the world a better place. Goodbye and best of luck to you!`,
            avatars: ['/img/characters/captain-storm/clapping_storm_inverted.png', '/img/characters/agent-gear/vanil_wave.png', '/img/characters/agent-fern/fern_wave.png', '/img/characters/agent-spark/spark_wave.png'],
            background: '/img/backgrounds/Spark_Lab.jpg',
            pos: 'left',
            audio: '/audio/level5/captain_storm/captain_storm_l5s15.mp3'
        }
    ]
};

export default script;