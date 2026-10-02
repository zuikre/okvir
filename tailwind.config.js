/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-arabic)', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['var(--font-arabic)', 'IBM Plex Sans Arabic', 'Readex Pro', 'Cairo', 'sans-serif'],
        amiri: ['Amiri', 'serif'],
        mono: ['JetBrains Mono', 'var(--font-arabic)', 'Courier New', 'monospace'],
      },
    },
  },
  plugins: [],
};
