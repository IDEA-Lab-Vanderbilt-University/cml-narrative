export interface Student {
	id?: string;
	teacher_id?: string;
	first_name?: string;
	last_name?: string;
	age?: number;
	interests?: string[];
	avatar?: string;
	agent_name?: string;
	updated_at?: {
		secs_since_epoch: number;
		nanos_since_epoch: number;
	},
	progress?: StudentProgress;
    class_name?: string;
}

export interface StudentProgress {
	id?: string;
	student_id?: string;
	last_visited?: string;
	badge_count?: number;
	megajoules?: number;
	updated_at?: {
		secs_since_epoch: number;
		nanos_since_epoch: number;
	};
}

export interface TravelLog {
    id?: string;
    student_id?: string;
    description: string;
    data: string;
    status: string;
    created_at?: {
        secs_since_epoch: number;
        nanos_since_epoch: number;
    };
    updated_at?: {
        secs_since_epoch: number;
        nanos_since_epoch: number;
    };
}

export interface TravelLogWithStudent {
    id?: string;
    student_id: string;
    description: string;
    data: string;
    status: string;
    created_at: {
        secs_since_epoch: number;
        nanos_since_epoch: number;
    };
    updated_at: {
        secs_since_epoch: number;
        nanos_since_epoch: number;
    };
    student?: Student;
}

export interface Teacher {
    id?: string;
    first_name?: string;
    last_name?: string;
    agent_name?: string;
    email?: string;
    password?: string;
    updated_at?: {
        secs_since_epoch: number;
        nanos_since_epoch: number;
    };
    school?: string;
}

export interface TraininatorModelMessage {
    id?: string;
    student_id?: string;
    name: string;
    metadata_json: Record<string, any>;
    created_at?: {
        secs_since_epoch: number;
        nanos_since_epoch: number;
    };
    updated_at?: {
        secs_since_epoch: number;
        nanos_since_epoch: number;
    };
}
