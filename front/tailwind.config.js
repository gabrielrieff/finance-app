/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      }
    }
  },
  colors: {
    black: '#000000',
    white: '#FFFFFF',
    red: '#FF0000',
    green: {
      700: '#124417',
      600: '#18781b',
      500: '#49aa26'
    },
    grey: {
      300: '#eeeeee',
      200: '#f0f2f5',
      700: '#5f5f5f',
      900: '#242424'
    },
    blue: {
      700: '#0033b8',
      500: '#4ad5de'
    }
  },
  plugins: []
};
