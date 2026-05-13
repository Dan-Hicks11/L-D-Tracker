/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        hx: {
          50:  '#f0f4ff',
          100: '#e0ebff',
          200: '#c0d4ff',
          300: '#93b4fd',
          400: '#6089fa',
          500: '#3b5ff5',
          600: '#2540eb',
          700: '#1c30d4',
          800: '#1c2bab',
          900: '#1c2a87',
          950: '#141a52',
        },
      },
    },
  },
  plugins: [],
}

