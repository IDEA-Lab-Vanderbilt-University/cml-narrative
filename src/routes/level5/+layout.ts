import { redirect } from '@sveltejs/kit';
import { isLevel5Enabled } from '$lib/utils/featureFlags';

export const load = () => {
	if (!isLevel5Enabled) {
		throw redirect(307, '/');
	}
};
