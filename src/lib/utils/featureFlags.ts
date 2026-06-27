import { env } from '$env/dynamic/public';

const parseBooleanFlag = (value: string | undefined, defaultValue: boolean) => {
	if (!value) return defaultValue;
	const normalized = value.trim().toLowerCase();
	return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
};

export const isLevel4Enabled = parseBooleanFlag(env.PUBLIC_ENABLE_LEVEL4, false);
export const isLevel5Enabled = parseBooleanFlag(env.PUBLIC_ENABLE_LEVEL5, false);
