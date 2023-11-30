/**
 /src/lib/scripts/introduction/welcome.ts
 welcome.ts
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { Script, Line } from '$lib/types/Script';
import type { UserData } from '$lib/types/UserData';
import { agentData } from '$lib/utils/stores/store';

let agent: UserData = {
	name: {
		first: '',
		last: ''
	},
	age: undefined,
	interests: [],
	agentName: ''
};

agentData.subscribe((value) => {
	agent = value as UserData;
});

const script: Script = {
	lines: [
		{
			id: 1,
			speakers: ['Agent Spark'],
			dialog: `Agent ${agent.agentName}, I love it!`,
			avatars: ['/img/characters/agent-spark/spark_clapping.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s35.wav'
		},
		{
			id: 2,
			speakers: ['Agent Spark'],
			dialog: `Now, let's take a look at all the features on your SPOT tablet.`,
			avatars: ['/img/characters/agent-spark/spark_clapping.png'],
			background: '/img/backgrounds/Spark_Lab.jpg',
			audio: '/audio/level0/agent_spark/agent_spark_l0s34.wav'
		}
	],
	length: 2
};
export default script;
