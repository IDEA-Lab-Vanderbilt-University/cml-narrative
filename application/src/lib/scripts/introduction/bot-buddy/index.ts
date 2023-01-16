/**
 /src/lib/scripts/introduction/onboarding/tablet-tutorial/bot-buddy/index.ts
 index.ts
 cml-narrative
 
 Created by Ian Thompson on January 14th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { Script, Line } from "$lib/types/Script";

const script: Script = {
    lines: [
        {
            id: 1,
            speaker: 'Captain Storm',
            dialog: "Thank you Agent Spark! It looks like our new agent-in-training is ready to go to the lab!",
            avatar: '/img/characters/captain-storm/storm_thumbs_up.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 2,
            speaker: 'Captain Storm',
            dialog: "This is the lab! Agent Fern will help you.",
            avatar: '/img/characters/captain-storm/storm_gesture_4.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 3,
            speaker: 'Captain Storm',
            dialog: "But, before you start your training, you will need a...",
            avatar: '/img/characters/captain-storm/storm_gesture_4.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 4,
            speaker: 'Agent Fern',
            dialog: "A Bot Buddy!",
            avatar: '/img/characters/agent-fern/fern_point.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 5,
            speaker: 'Captain Storm',
            dialog: "Yes, thank you Agent Fern! A Bot Buddy!",
            avatar: '/img/characters/captain-storm/storm_laughing.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 6,
            speaker: 'Agent Fern',
            dialog: "Great to see you, Captain Storm! Welcome, [AGENT NAME]! I can't wait to tell you about Bot Buddy!",
            avatar: '/img/characters/agent-fern/fern_wave.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 7,
            speaker: 'Agent Fern',
            dialog: "Your Bot Buddy will be your companion during this mission. Bot Buddies can provide clues and receive directions form Mission Control.",
            avatar: '/img/characters/agent-fern/fern_talking.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 8,
            speaker: 'Agent Fern',
            dialog: "It will be super useful in your mission to the future!",
            avatar: '/img/characters/agent-fern/fern_bro.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 9,
            speaker: 'Captain Storm',
            dialog: "Agent Fern... where are the Bot Buddies?",
            avatar: '/img/characters/captain-storm/storm_unsure.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 10,
            speaker: 'Agent Fern',
            dialog: "I don't know!!",
            avatar: '/img/characters/agent-fern/fern_oh_no.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 11,
            speaker: 'Agent Gear',
            dialog: "I have them, Captain Storm! Sorry I was late, I wanted our new agent to have all the options to choose from!",
            avatar: '/img/characters/agent-gear/vanilla_strong.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 12,
            speaker: 'Agent Gear',
            dialog: "[AGENT NAME], please choose the Bot Buddy you want to accompany you on your mission to the future.",
            avatar: '/img/characters/agent-gear/vanilla_gesture_2.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 13,
            speaker: 'Agent Gear',
            dialog: "All of the Bot Buddies have the same abilities so you can choose the one tou like best!",
            avatar: '/img/characters/agent-gear/vanilla_talking.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 14,
            speaker: 'Bot Buddy',
            dialog: "$$((( ooo!>>> =+=; $^(( %&<!!",
            avatar: '/img/characters/bot-buddy/bot-buddy-base.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 15,
            speaker: 'Agent Gear',
            dialog: "????????????",
            avatar: '/img/characters/agent-gear/vanil_nonplussed.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 16,
            speaker: '',
            dialog: "*CRASH* \n*BANG*",
            avatar: '/img/characters/captain-storm/storm_better_laugh.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 17,
            speaker: 'Bot Buddy',
            dialog: "Hello! I will be your Bot Buddy!",
            avatar: '/img/characters/bot-buddy/bot-buddy-base.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 18,
            speaker: 'Agent Gear',
            dialog: "Nailed it!!",
            avatar: '/img/characters/agent-gear/vanilla_strong.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 19,
            speaker: 'Captain Storm',
            dialog: "Excellent! Thank you Agent Gear and Agent Fern!",
            avatar: '/img/characters/captain-storm/storm_2_thumbs_up.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 20,
            speaker: 'Captain Storm',
            dialog: "Mission Control needs you to complete some training before going on the mission.",
            avatar: '/img/characters/captain-storm/storm_gesture_4.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 21,
            speaker: 'Captain Storm',
            dialog: "This training helps us understand what you know about technology and Artificial Intelligence.",
            avatar: '/img/characters/captain-storm/clapping_storm.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 22,
            speaker: 'Captain Storm',
            dialog: "Then, the Tech Team will load your Bot Buddy with additional information and knowledge to help you on your mission.",
            avatar: '/img/characters/captain-storm/gesture_2_storm.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 23,
            speaker: 'SPOT Agents',
            dialog: "You can count on us!",
            avatar: '/img/characters/agent-gear/vanilla_talking.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },
        {
            id: 24,
            speaker: 'Captain Storm',
            dialog: "Thanks, team! At the end of this first training, you will receive your first badge! Let's get started!",
            avatar: '/img/characters/captain-storm/storm_arms_up.png',
            background: "/img/backgrounds/Spark_Lab.jpg"
        },

    ],
    length: 24
}
export default script