/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        // Dark theme palette
        slate: {
          950: '#0f1117',
          900: '#161b25',
          800: '#1e2535',
          700: '#252d3f',
          600: '#2a3347',
          500: '#3a4560',
        },
        amber: {
          DEFAULT: '#f5a623',
          light: '#ffc75a',
          dark: '#3d2e0a',
        },
      },
    },
  },
  plugins: [],
}
