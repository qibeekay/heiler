const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
		'./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
		'./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			colors: {
				greens: '#008847',
				bgGreen: '#F2FFF9',
				lemongreen: '#EEFFF7',
				dark: '#1B1B1B',
				lightDark: '#A3B1AA',
				textgray: '#939493',
			},
			backgroundImage: {
				back: "url('/bg.jpg')",
			},
			boxShadow: {
				'right-only': '2px 0 4px -2px rgba(0, 0, 0, 0.2)',
				'bottom-only': '0 2px 4px -2px rgba(0, 0, 0, 0.2)',
				'top-only': '0 -2px 4px -2px rgba(0, 0, 0, 0.2)',
			},
		},
		screens: {
			xs: '350px',
			sm: '480px',
			md: '768px',
			lg: '976px',
			llg: '1250px',
			xl: '1440px',
			xll: '1669px',
		},
		fontFamily: {
			roboto: ['Roboto', 'sans-serif'],
			inter: ['Inter', 'sans-serif'],
		},
	},
	plugins: [],
});
