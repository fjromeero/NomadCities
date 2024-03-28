/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	
	theme: {
		screens: {
			'auth-max': {'raw': '(max-width: 830px)'},
			'auth-min': {'raw': '(min-width: 830px)'},
			'responsive-city-image-max': {'raw': '(max-width: 1200px)'},
			'responsive-city-image-min': {'raw': '(min-width: 1200px)'},
			'mobile': {'raw': '(max-width: 640px)'},
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
			gridTemplateColumns: {
				'bento': 'repeat(4, 1fr)',
				'preview': 'repeat(2, 1fr)',
			},
			gridAutoRows: {
				'bento': 'minmax(100px, 270px)',
				'preview': 'minmax(100px, auto)',
			},
			
		},
	},
	plugins: [],
}
