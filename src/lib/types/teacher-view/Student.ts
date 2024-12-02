export interface Student {
	id?: string;
	teacher_id: string;
	first_name: string;
	last_name: string;
	age?: number;
	interests?: string[];
	avatar?: string;
	agent_name?: string;
	updated_at?: {
		secs_since_epoch: number;
		nanos_since_epoch: number;
	},
	progress?: StudentProgress;
}

export interface StudentProgress {
	id: string;
	student_id: string;
	last_visited: string;
	badge_count: number;
	megajoules: number;
	updated_at: {
		secs_since_epoch: number;
		nanos_since_epoch: number;
	};
}
