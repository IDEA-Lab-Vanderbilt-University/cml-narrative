/**
 /src/lib/scripts/introduction/script.ts
 script.ts
 cml-narrative
 
 Created by Ian Thompson on January 7th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { Script, Line } from "$lib/types/Script";

const script: Script = {
    lines: [
        {
            id: 1,
            speaker: 'Captain Storm',
            dialog: 'Welcome to the SPOT Agency, my name is Captain Storm.',
            avatar: '/img/characters/captain-storm/storm_yeah.png',
            background: "/img/backgrounds/captain_office.jpg"
        },
        {
            id: 2,
            speaker: 'Captain Storm',
            dialog: 'Recently, a team of scientists and researchers found a way to travel into the future! ',
            avatar: '/img/characters/captain-storm/gesture_2_storm.png',
            background: "/img/backgrounds/captain_office.jpg"
            
        },
        {
            id: 3,
            speaker: 'Captain Storm',
            dialog:
                'But now they need volunteers to go on a mission to the year 2075 to see what the future is like.',
            avatar: '/img/characters/captain-storm/gesture_2_storm.png',
            background: "/img/backgrounds/captain_office.jpg"
    
        },
        {
            id: 4,
            speaker: 'Captain Storm',
            dialog: 'They are specifically interested in the type of technology that will be available. ',
            avatar: '/img/characters/captain-storm/gesture_2_storm.png',
            background: "/img/backgrounds/captain_office.jpg"
    
        },
        {
            id: 5,
            speaker: 'Captain Storm',
            dialog: 'But they need volunteers to go on a mission to the year 2075 to see what the future is like and what type of technology is available.',
            avatar: '/img/characters/captain-storm/gesture_2_storm.png',
            background: "/img/backgrounds/captain_office.jpg"
    
        },
        {
            id: 6,
            speaker: 'Captain Storm',
            dialog: 'You have the opportunity to volunteer as a Special Agent for this mission. We need you to help explore future technology.',
            avatar: '/img/characters/captain-storm/storm_gesture_4.png',
            background: "/img/backgrounds/captain_office.jpg"
    
        },
        {
            id: 7,
            speaker: 'Captain Storm',
            dialog: 'If you find problems with any type of future technology, the main goal of your mission is to find out what the issue is and why the issue is occurring.',
            avatar: '/img/characters/captain-storm/storm_gesture_4.png',
            background: "/img/backgrounds/captain_office.jpg"
    
        },
        {
            id: 8,
            speaker: 'Captain Storm',
            dialog: 'This will help you and your community back in the present.',
            avatar: '/img/characters/captain-storm/storm_gesture_4.png',
            background: "/img/backgrounds/captain_office.jpg"
    
        },
        {
            id: 9,
            speaker: 'Captain Storm',
            dialog: 'We can solve future problems from the past! Pretty cool, right? But it\'s very top secret!',
            avatar: '/img/characters/captain-storm/storm_yeah.png',
            background: "/img/backgrounds/captain_office.jpg"
    
        },
        {
            id: 10,
            speaker: 'Captain Storm',
            dialog: 'Let me tell you your secret mission. In your mission, you will go to the future and learn about future technology. ',
            avatar: '/img/characters/captain-storm/storm_gesture_4.png',
            background: "/img/backgrounds/captain_office.jpg"
    
        },
        {
            id: 11,
            speaker: 'Captain Storm',
            dialog: 'You will bring back information that will help you design technologies that are good for your community.',
            avatar: '/img/characters/captain-storm/storm_gesture_4.png',
            background: "/img/backgrounds/captain_office.jpg"
    
        },
        {
            id: 12,
            speaker: 'Captain Storm',
            dialog: 'So glad you are now a part of our team! Now Agent Spark will get you set up in the SPOT system.',
            avatar: '/img/characters/captain-storm/storm_gesture_4.png',
            background: "/img/backgrounds/Agency_Walkway.jpg"
    
        },
        {
            id: 13,
            speaker: 'Agent Spark',
            dialog: 'Hello! Great to meet you Agent...',
            avatar: '/img/characters/agent-spark/spark_wave.png',
            background: "/img/backgrounds/Agency_Walkway.jpg"
    
        },
        {
            id: 14,
            speaker: 'Agent Spark',
            dialog: "Oops, you don't have a secret agent name yet! That's so important!",
            avatar: '/img/characters/agent-spark/spark_surprised.png',
            background: "/img/backgrounds/Agency_Walkway.jpg"
    
        },
        {
            id: 15,
            speaker: 'Agent Spark',
            dialog: "Your agent name should be something that inspires you! Mine is Agent Spark because I love electronic gadgets. ",
            avatar: '/img/characters/agent-spark/spark_gesture_1.png',
            background: "/img/backgrounds/Agency_Walkway.jpg"
    
        },
        {
            id: 16,
            speaker: 'Agent Spark',
            dialog: "Agent Fern is inspired by plants and things that grow and Agent Gear is inspired by designing things.",
            avatar: '/img/characters/agent-spark/spark_gesture_1.png',
            background: "/img/backgrounds/Agency_Walkway.jpg"
    
        },
        {
            id: 17,
            speaker: 'Agent Spark',
            dialog: "What inspires you? \nI'm sure you will choose a great secret agent name!",
            avatar: '/img/characters/agent-spark/spark_aww.png',
            background: "/img/backgrounds/Agency_Walkway.jpg"
    
        },
        {
            id: 18,
            speaker: 'Agent Spark',
            dialog: "Here is your SPOT tablet. You will use this to keep track of your mission to the future. Let's get yours set up! ",
            avatar: '/img/characters/agent-spark/spark_talking.png',
            background: "/img/backgrounds/Agency_Walkway.jpg",
    
        }
    ],
    length: 18
}
export default script