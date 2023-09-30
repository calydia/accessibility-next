/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lt-gray': '#333333',
        'lt-blue-light': '#bbc9f7',
        'lt-blue-middle': '#dfe7fc',
        'lt-blue-dark': '#033573',
        'lt-purple': '#54007b',
        'lt-perfume': '#e6cafc',
        'dk-blue-light': '#ade5f8',
        'dk-blue-darkest': '#010017',
        'dk-purple-header': '#35035e',
        'dk-blue-header': '#18399A',
        'dk-blue-royal': '#4169e1',
        'dk-purple': '#18032b',
        'dk-gray': '#cfcfcf',
        'wheat': '#f5deb3',
        'blue-tory': '#18399a',
        'lt-code-bg': '#dfe7fc',
        'lt-code-border': '#bbc9f7',
        'dk-code-bg': '#070038',
        'dk-code-border': '#18399a'
      },
      fontFamily: {
        'title': ['var(--font-rock-salt)', 'cursive'],
        'sans': ['var(--font-average-sans)', 'Arial', 'sans-serif'],
        'menu': ['var(--font-lato)', 'Arial', 'sans-serif'],
      },
      outlineOffset: {
        15: '15px',
      },
      spacing: {
        '4-px': '16px',
        '6-px': '24px',
        '8-px': '32px',
        '12-px': '48px'
      },
      height: {
        '125-px': '125px',
        '250-px': '250px',
        '350-px': '350px'
      },
      maxWidth: {
        'screen-menu': '100rem'
      },
    },
  },
  plugins: [],
}
