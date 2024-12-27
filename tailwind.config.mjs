/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
            backgroundImage: {
                'gradient-violet': 'linear-gradient(to top, #7028e4 0%, #e5b2ca 100%)',
              },
            colors: {
                primary: {
                  50:  '#fbf4ff',
                  100: '#f5e6ff',
                  200: '#ecd2ff',
                  300: '#ddaeff',
                  400: '#c97bff',
                  500: '#b448ff',
                  600: '#a225f8',
                  700: '#8914d7',
                  800: '#7616b3',

                  900: '#61148f',
                  950: '#43006b',
                },
                secondary: {
                  // ...
                },
                tertiary: {
                  // ...
                },
              },
        },
	},
	plugins: [typography],
    darkMode: 'class', 
}
