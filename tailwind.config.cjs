/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				body: "rgb(var(--color-bg))",
				"box-bg": "rgb(var(--color-box))",
				"box-shadow": "rgb(var(--box-sd))",
				"box-border": "rgb(var(--box-border))",
				primary: "#1d4ed8",
				"heading-1": "rgb(var(--heading-1))",
				"heading-2": "rgb(var(--heading-2))",
				"heading-3": "rgb(var(--heading-3))",
			},
			screens:{
				midmd:"880px"
			},
			keyframes: {
				fadeIn: {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				fadeOut: {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' },
				},
				flicker: {
					'0%, 100%': { opacity: '1' },
					'16.67%': { opacity: '0.8' },
					'33.33%': { opacity: '1' },
					'50%': { opacity: '0.8' },
					'66.67%': { opacity: '1' },
					'83.33%': { opacity: '0.8' },
				}
			},
			animation: {
				fadeIn: 'fadeIn 0.4s ease-in',
				fadeOut: 'fadeOut 0.9s ease-out',
				flicker: 'flicker 0.6s ease-in-out'
			}
		},
	},
	plugins: [],
}