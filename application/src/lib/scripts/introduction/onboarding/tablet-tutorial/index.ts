/**
 /src/lib/scripts/introduction/onboarding/tablet-tutorial/index.ts
 index.ts
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

import type { Script, Line } from '$lib/types/Script';

const script: Script = {
	lines: [
		{
			id: 1,
			speaker: 'Agent Spark',
			dialog: 'This is your SPOT tabled! Used for all official SPOT missions!',
			avatar: '/img/characters/agent-spark/spark_clapping.png',
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 2,
			speaker: 'Agent Spark',
			dialog: 'Use your Travel Log to share information and send updated to SPOT Mission Control',
			avatar: '/img/characters/agent-spark/spark_clapping.png',
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 3,
			speaker: 'Agent Spark',
			dialog:
				'This is the profile button. You can check and edit your profile. You can see the progress of other agents too!',
			avatar: '/img/characters/agent-spark/spark_clapping.png',
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 4,
			speaker: 'Agent Spark',
			dialog:
				'YOu need to earn badges to move from "Special Agent in Training" to "Advanced Special Agent"',
			avatar: '/img/characters/agent-spark/spark_clapping.png',
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 5,
			speaker: 'Agent Spark',
			dialog:
				'The Settings button lets you change the color of your frame! I like mine to be yellow!',
			avatar: '/img/characters/agent-spark/spark_clapping.png',
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 6,
			speaker: 'Agent Spark',
			dialog:
				'Your Time Travel Machine holds 100 megajoules of power, which is exactly the amount it takes to get to the year 2075!',
			avatar: '/img/characters/agent-spark/spark_clapping.png',
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 7,
			speaker: 'Agent Spark',
			dialog:
				'To return to present dau, you will need to refuel by gaining 100 megajoules of power while you are in the future',
			avatar: '/img/characters/agent-spark/spark_clapping.png',
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 8,
			speaker: 'Agent Spark',
			dialog:
				'Complete entries within your Time Travel Log to power up. Mission Control will send you some megajoules of power each time you make an entry.',
			avatar: '/img/characters/agent-spark/spark_clapping.png',
			background: '/img/backgrounds/Spark_Lab.jpg'
		},
		{
			id: 9,
			speaker: 'Agent Spark',
			dialog: 'Now you have all the information on how to use the SPOT tablet!',
			avatar: '/img/characters/agent-spark/spark_clapping.png',
			background: '/img/backgrounds/Spark_Lab.jpg'
		}
	],
	length: 9
};
export default script;
