/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		screens: {
			'auth-max': {'raw': '(max-width: 830px)'},
			'auth-min': {'raw': '(min-width: 830px)'},
			...defaultTheme.screens
		},
		extend: {
			fontFamily: {
				alfaslab: ['"Alfa Slab One"', ...defaultTheme.fontFamily.sans],
				paytoneone: ['"Paytone One"', ...defaultTheme.fontFamily.sans],
			},
			flexGrow: {
				0: '0',
				3: '3'
			},
		},
	},
	plugins: [],
}
