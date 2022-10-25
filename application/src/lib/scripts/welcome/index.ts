/**
 welcomeScript.ts
 cml-narrative
 
 Created by Ian Thompson on October 25th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

/**
 script1.ts
 cml-narrative
 
 Created by Ian Thompson on October 18th 2022
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { AgentData } from '$lib/types/AgentData';
import { agentData } from '$lib/util/stores/store'

let agent: AgentData = {} as AgentData

agentData.subscribe(value => {
    agent = value as AgentData;
});

const script = [
    {
        id: 1,
        speaker: 'Agent Spark',
        dialog: `Agent ${agent.agentName}, I love it!`,
        avatar: '/img/characters/agent-spark/spark_clapping.png',
        background: "/img/backgrounds/Spark_Lab.jpg"
    },
  
];

export default script;