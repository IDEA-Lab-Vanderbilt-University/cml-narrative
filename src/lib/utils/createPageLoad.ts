import type { Script } from "$lib/types/Script";
import { error, redirect } from "@sveltejs/kit";
import type { PageLoad } from "../../routes/$types";
import { accessTokenStore } from "./stores/store";
import { get } from "svelte/store";

/**
 * Creates a page load function that is used to determine the current page of the script, or 404 error if the page is out of bounds.
 *
 * @param script - The script to load the page from, or null if the page should only require a positive integer page number
 * @returns The page load function
 */
export function createPageLoad(script: Script | null = null): PageLoad {
	return ({ params, url }) => {
		// Require login to view the page 
		// Get accessTokenStore value
		if (!get(accessTokenStore)) {
			// Redirect to login page
			throw redirect(302, '/');
		}

		/**
		 * Page number of the current route.
		 *
		 * This is found by grabbing the search param for "page".
		 *
		 * An example url could look like: www.website.com/introduction?page=XXXX
		 *
		 * The XXXX should be a number. We use this to determine what line of the script should be
		 * returned to the user.
		 */
		const page = Number.parseInt(url.searchParams.get('page') ?? '0');

		if (script == null) {
			// Only check to determine if the page is greater than one. 
			if (page >= 1) {
				return { page };
			}
		} else {
			// Check to determine if the page is greater than one and less than the amount of lines in
			// the given script segment. If the request goes out of bounds, a 404 occurs
			if (page >= 1 && page <= script.lines.length) {
				return {
					line: script.lines[page - 1],
					lineNumber: page,
					length: script.lines.length
				};
			}
		}

		throw error(404, 'Not found');
	};
}
