import { redirect } from '@sveltejs/kit';
import { isLevel4Enabled } from '$lib/utils/featureFlags';

export const load = () => {
	if (!isLevel4Enabled) {
		throw redirect(307, '/');
	}
};
