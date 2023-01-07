/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        cantora: ["Cantora One"]
      },
      colors: {
				peach: "#ffbd59",
				jet: "#3e3c3c",
				independence: "#585f76"
			},
      keyframes: {
				wiggle: {
					'0%, 100%': { transform: 'rotate(-10deg)' },
					'50%': { transform: 'rotate(10deg)' }
				},
			},
			animation: {
				wiggle: 'wiggle 0.8s ease-in-out 4',
			}
    },
  },
	plugins: [require('daisyui')]
}
