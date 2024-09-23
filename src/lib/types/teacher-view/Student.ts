export interface Student {
	id?: string;
	teacher_id: string;
	first_name: string;
	last_name: string;
	age?: number;
	interests?: string[];
	avatar?: string;
	agent_name?: string;
}
