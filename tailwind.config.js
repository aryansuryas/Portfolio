/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '1rem',
    },
    extend: {
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'calc(var(--radius) * 2)',
        xl: 'calc(var(--radius) * 3)',
        '2xl': 'calc(var(--radius) * 4)',
      },
      fontFamily: {
        sans: ['var(--font-jakarta)', 'sans-serif'],
        display: ['var(--font-fraunces)', 'serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};