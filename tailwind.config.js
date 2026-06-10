/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'near-black': '#0A0A0A',
        violet: { 500: '#7C3AED', 600: '#6D28D9' },
        coral: { 500: '#F97316', 600: '#EA580C' },
        honey: { 500: '#F59E0B', 600: '#D97706' },
        warm: { offwhite: '#FFFBF5', cream: '#FFF7ED' },
      },
      fontFamily: {
        heading: ['Manrope', 'sans-serif'],
        body: ['Source Sans 3', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
      },
    },
  },
  plugins: [],
}
