/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class', 
    theme: {
		extend: {
            backgroundImage: {
                'gradient-violet': 'linear-gradient(to top, #7028e4 0%, #e5b2ca 100%)',
                "d-gradient-asideMenu" : 'linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.3))',
                "d-main-background": 'linear-gradient(to top, rgba(112, 40, 228), rgba(0, 0, 0))', //bg-gradient-to-tl from-[#7028e4] to-[#000000],
                // "l-gradient-asideMenu" : 'linear-gradient(to top left, rgba(188, 0, 255,1), rgba(188, 0, 255, 0.5))',
                 "l-gradient-asideMenu" : 'radial-gradient(circle, rgba(233,179,252,1) 0%, rgba(191,143,255,1) 100%);',
                "l-main-background": 'linear-gradient(to top, rgba(255, 255, 255), rgba(255, 255, 255))',
            },
            colors: {
                light_main:'#8914d7',
                light_hover:'#bc5bff',
                light_title:'#61148f',
                light_text_menu:'#480073',
                light_text:'#252526',
                light_text_light:'#888890',
                light_focus:'#61148f',
                light_active:'#61148f',
                light_icons:'#a225f8',
                dark_main:'#a225f8',
                dark_title:'#b448ff',
                dark_hover:'#c97bff',
                dark_text:'#f5e6ff',
                dark_text_light:'#ecd2ff',
                dark_text_menu:'#b952ff',
                dark_focus:'',
                dark_active:'',
                dark_icons:'#ddaeff',
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
   
}
