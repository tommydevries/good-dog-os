/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1b1b1b',
        forest: { DEFAULT: '#33502f', light: '#cdd9c9', dark: '#22361f' },
        cream: '#faf8f3',
        sand: '#eef1ec',
        clay: '#c2603f',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Charter', 'serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
