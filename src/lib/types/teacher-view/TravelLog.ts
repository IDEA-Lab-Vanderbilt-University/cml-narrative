import type { Student } from './Student';

export interface TravelLog {
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
