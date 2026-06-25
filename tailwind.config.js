/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#23211e', soft: '#5b554d', faint: '#938c81' },
        paper: '#fffdf8',
        cream: '#f7f3ea',
        sand: '#ece5d6',
        line: '#e3dccd',
        forest: { DEFAULT: '#2c4327', light: '#c8d5c2', dark: '#1b2d17', tint: '#eef2e9' },
        clay: { DEFAULT: '#b9543a', tint: '#f5e8e3' },
        gold: { DEFAULT: '#a07c2c' },
        sky: { DEFAULT: '#3b6ea5' },
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.04em' }],
        hero: ['clamp(2.75rem, 7vw, 4.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em' }],
        display: ['clamp(2rem, 4.5vw, 2.75rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
      },
      letterSpacing: { tightish: '-0.011em' },
      borderRadius: { xl2: '1.1rem', '3xl': '1.6rem' },
      boxShadow: {
        card: '0 1px 2px rgba(35,33,30,0.04), 0 10px 30px -16px rgba(35,33,30,0.16)',
        lift: '0 2px 6px rgba(35,33,30,0.06), 0 22px 48px -22px rgba(35,33,30,0.26)',
        ring: '0 0 0 1px rgba(44,67,39,0.08)',
      },
      maxWidth: { measure: '38rem' },
    },
  },
  plugins: [],
}
