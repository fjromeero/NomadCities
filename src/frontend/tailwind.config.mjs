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
			'main-1': {'raw': '(max-width: 2200px)'},
			'main-2': {'raw': '(max-width: 1775px)'},
			'main-3': {'raw': '(max-width: 1250px)'},
			'main-4': {'raw': '(max-width: 950px)'},
			'main-5': {'raw': '(max-width: 600px)'},
			...defaultTheme.screens
		},
		extend: {
			maxWidth: {
				'main': '2500px',
			},
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
				'main': 'repeat(6, minmax(0, 1fr))',
				'main-1': 'repeat(5, minmax(0, 1fr))',
				'main-2': 'repeat(4, minmax(0, 1fr))',
				'main-3': 'repeat(3, minmax(0, 1fr))',
				'main-4': 'repeat(2, minmax(0, 1fr))',
				'main-5': 'repeat(1, minmax(0, 1fr))',
				'comments-modal': '333px auto',
			},
			gridAutoRows: {
				'bento': 'minmax(100px, 270px)',
				'preview': 'minmax(100px, 400px)',
				'main': 'minmax(min-content, max-content)',
			},
			
		},
	},
	plugins: [],
}
