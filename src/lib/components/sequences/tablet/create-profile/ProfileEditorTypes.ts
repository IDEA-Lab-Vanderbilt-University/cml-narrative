/**
 * ProfileEditorTypes.ts
 * Type definitions for the ProfileEditor component
 * 
 * Created for cml-narrative project
 */

import type { Student } from '$lib/types/UserData';

export interface ProfileStep {
	id: number;
	component: any;
	props?: Record<string, any>;
	validateFn?: (data: Student) => boolean;
	errorMessage?: string;
	showProfileBanner?: boolean;
}

export interface ProfileEditorConfig {
	steps: ProfileStep[];
	startPage?: number;
	showProfileBanner?: boolean;
	enableProfileViewing?: boolean;
	showNavigation?: boolean;
}

export interface ProfileEditorEvents {
	submit: { profileData: Student };
	stepChanged: { step: number; direction: 'forward' | 'backward' };
}

export type ValidationFunction = (data: Student) => boolean;

export interface StepValidationConfig {
	step: number;
	validateFn: ValidationFunction;
	errorMessage: string;
}
