import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'near-black': '#0A0A0A',
        'flame-orange': '#FF5722',
        'vivid-magenta': '#D81B60',
        'acid-green': '#69F0AE',
        'off-white': '#F5F5F5',
      },
      fontFamily: {
        'satoshi': ['Satoshi', 'system-ui', 'sans-serif'],
        'archivo': ['Archivo Black', 'Arial Black', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'prism-rotate': 'prismRotate 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        prismRotate: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'prism-gradient': 'conic-gradient(from 0deg, #FF5722, #D81B60, #69F0AE, #FF5722)',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.bg-gradient-conic': {
          backgroundImage: 'conic-gradient(var(--tw-gradient-stops))',
        },
      })
    }),
  ],
}

export default config
