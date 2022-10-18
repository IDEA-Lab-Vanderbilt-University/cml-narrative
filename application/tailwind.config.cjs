/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				peach: "#ffbd59",
				jet: "#3e3c3c"
			}
		}
	},
	plugins: [require('daisyui')]
};
