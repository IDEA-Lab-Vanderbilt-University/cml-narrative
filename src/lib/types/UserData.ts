/**
 /src/lib/types/UserData.ts
 UserData.ts
 cml-narrative
 
 Created by Ian Thompson on January 10th 2023
 icthomp@g.clemson.edu
 
 https://idealab.sites.clemson.edu
 
*/

export interface UserData {
	name: {
		first: string;
		last: string;
	};
	age: number;
	interests: string[];
	avatarImg?: string;
	agentName: string;
	email: string;
	password: string;
	progress: UserProgress;
}

export interface UserProgress {
	level: number;
	levelLabel: string;
	subLevel: number;
	subLevelLabel: string;
	lastUpdated: Date | undefined;
}

export interface StudentData {
	id?: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
